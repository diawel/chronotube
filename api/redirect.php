<?php
session_start();

require_once 'path.php';

$client_secret = json_decode(
  file_get_contents(PATH['GOOGLE_API'] . '/client_secret.json'),
  true
);

$state = bin2hex(random_bytes(128 / 8));
$_SESSION['state'] = $state;

$referer = $_SERVER['HTTP_REFERER'];
$parsed_referer = parse_url($referer);
$origin = $parsed_referer['scheme'] . '://' . $parsed_referer['host'];
$origin .= $parsed_referer['port'] ? ':' . $parsed_referer['port'] : '';

$query = http_build_query([
  'client_id' => $client_secret['web']['client_id'],
  'redirect_uri' => $origin . '/api/callback.php',
  'response_type' => 'code',
  'scope' => 'https://www.googleapis.com/auth/youtube.readonly',
  'state' => $state,
  'prompt' => 'select_account',
]);

header('Location: https://accounts.google.com/o/oauth2/v2/auth?' . $query);
exit();
