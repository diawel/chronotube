<?php
session_start();
ini_set('max_execution_time', 90);

$subscription = [];

if ($_SESSION['state'] == $_GET['state'] && isset($_GET['code'])) {
  unset($_SESSION['state']);

  require_once 'path.php';
  require_once $PATH['Google'] . '/vendor/autoload.php';

  $client = new Google_Client();
  $client->setAuthConfig($PATH['Google'] . '/client_secret.json');
  $client->authenticate($_GET['code']);

  $service = new Google_Service_YouTube($client);

  $channels = [];

  function fetch($pageToken) {
    global $service, $channels;

    $queryParams = [
      'maxResults' => 50,
      'mine' => true,
      'pageToken' => $pageToken
    ];
    $response = $service->subscriptions->listSubscriptions('snippet', $queryParams);
    $channels = array_merge($channels, $response->items);

    if ($response->nextPageToken) fetch($response->nextPageToken);
    else {
      $GLOBALS['subscription'] = $channels;
      render();
    }
  }
  fetch(null);
} else {
  header('Location: /');
  exit;
}

function render() {
  $json = str_replace(['\\', "'"], ['\\\\', "\\'"], json_encode($GLOBALS['subscription']));
  echo <<< EOM
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
        <script src="https://unpkg.com/dexie/dist/dexie.js"></script>
        <script>
          const db = new Dexie('CacheList')
          db.version(1).stores({files: 'purpose, blob'})

          db.files.put({
            purpose: 'subscription',
            blob: new Blob([
              '{$json}'
            ], {type: 'application/json'})
          }).then(() => {
            location.href = '/'
          }).catch((error) => {
            console.error(error)
          })
        </script>
      </body>
    </html>
  EOM;
}
?>


