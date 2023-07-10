<?php
session_start();
ini_set('max_execution_time', 90);

$subscription = [];
$error = '';

if ($_SESSION['state'] == $_GET['state'] && isset($_GET['code'])) {
  unset($_SESSION['state']);

  require_once 'path.php';
  require_once PATH['GOOGLE_API'] . '/vendor/autoload.php';

  $client = new Google_Client();
  $client->setAuthConfig(PATH['GOOGLE_API'] . '/client_secret.json');
  $client->fetchAccessTokenWithAuthCode($_GET['code']);

  $service = new Google_Service_YouTube($client);

  $channels = [];

  function fetch($pageToken)
  {
    global $service, $channels, $error;
    try {
      $query_params = [
        'maxResults' => 50,
        'mine' => true,
        'pageToken' => $pageToken,
      ];
      $response = $service->subscriptions->listSubscriptions(
        'snippet',
        $query_params
      );
      $channels = array_merge($channels, $response->items);

      if ($response->nextPageToken) {
        fetch($response->nextPageToken);
      }
    } catch (Google_Exception $e) {
      $error = '登録チャンネルの取得に失敗しました。';
    }
  }
  fetch(null);

  $GLOBALS['subscription'] = $channels;
} else {
  header('Location: /');
  exit();
}
?>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <?php if ($error) {
      echo "<p>$error</p>";
      echo '<p>時間をおいて、やり直してください。</p>';
    } else {
       ?>
<script src="https://unpkg.com/dexie/dist/dexie.js"></script>
    <script>
      const db = new Dexie('CacheList')
      db.version(1).stores({files: 'purpose'})

      db.files.put({
        purpose: 'subscription',
        blob: new Blob([
          '<?php echo str_replace(
            ['\\', "'"],
            ['\\\\', "\\'"],
            json_encode($subscription)
          ); ?>'
        ], {type: 'application/json'})
      }).then(() => {
        location.href = '/'
      }).catch((error) => {
        console.error(error)
      })
    </script>
      <?php
    } ?>
  </body>
</html>
