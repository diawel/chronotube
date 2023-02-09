<?php
session_start();

require_once 'path.php';

$client_secret = json_decode(
  file_get_contents($PATH['Google'] . '/client_secret.json'),
  true
);

$state = bin2hex(random_bytes(128/8));
$_SESSION['state'] = $state;

$query = http_build_query([
  'client_id' => $client_secret['web']['client_id'],
  'redirect_uri' => 'https://chronotube.diawel.me/api/callback.php',
  'response_type' => 'code',
  'scope' => 'https://www.googleapis.com/auth/youtube.readonly',
  'state' => $state
]);

header('Location: https://accounts.google.com/o/oauth2/v2/auth?' . $query);
exit;
