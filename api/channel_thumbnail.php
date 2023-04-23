<?php
require_once 'cache_channel.php';

if (isset($_GET['id']) && preg_match('/^[\w-]+$/', $_GET['id'])) {
  $id = $_GET['id'];
  $cache = "./cached_channels/$id.json";
  if (file_exists($cache)){
    $channel = json_decode(file_get_contents($cache), true);
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_USERAGENT, 'Twitterbot/1.0');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($curl, CURLOPT_AUTOREFERER, true);
    curl_setopt($curl, CURLOPT_URL, $channel['thumbnail']);
    curl_exec($curl);
    if (curl_getinfo($curl, CURLINFO_HTTP_CODE) >= 400) 
      $channel = cache_channel($id);
  } else
    $channel = cache_channel($id);
  header('Location: ' . $channel['thumbnail']);
} else header('Location: https://yt3.googleusercontent.com/a/default-user');