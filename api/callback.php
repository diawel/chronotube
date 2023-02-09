<?php
session_start();
ini_set('max_execution_time', 90);

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
  }
  fetch(null);

  $_SESSION['subscription'] = json_encode($channels);
  $_SESSION['fetched'] = time();
}
header('Location: https://chronotube.diawel.me/');
exit;
