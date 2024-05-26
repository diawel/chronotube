<?php
function cache_channel($id)
{
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_USERAGENT, 'Twitterbot/1.0');
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($curl, CURLOPT_AUTOREFERER, true);
  curl_setopt($curl, CURLOPT_URL, "https://www.youtube.com/channel/$id");
  $html = curl_exec($curl);

  $html = mb_convert_encoding(
    $html,
    'HTML-ENTITIES',
    'ASCII, JIS, UTF-8, EUC-JP, SJIS'
  );
  $dom_document = new DOMDocument();
  libxml_use_internal_errors(true);
  $dom_document->loadHTML($html);
  libxml_clear_errors();
  $xml_string = $dom_document->saveXML();
  $xml_object = simplexml_load_string($xml_string);
  $elements = json_decode(json_encode($xml_object), true);

  $channel = [
    'name' =>
      search_tag($elements, [
        'tag' => 'meta',
        'attribute' => ['property' => 'og:title'],
      ])['@attributes']['content'] ?? '',
    'description' =>
      search_tag($elements, [
        'tag' => 'meta',
        'attribute' => ['property' => 'og:description'],
      ])['@attributes']['content'] ?? '',
    'thumbnail' =>
      search_tag($elements, [
        'tag' => 'meta',
        'attribute' => ['property' => 'og:image'],
      ])['@attributes']['content'] ??
      'https://yt3.googleusercontent.com/a/default-user',
  ];

  file_put_contents(
    "./cached-channels/$id.json",
    json_encode($channel),
    LOCK_EX
  );
  return $channel;
}

function check_tag($element, $filter)
{
  if (!isset($element['@attributes'])) {
    return false;
  }
  $match = true;
  foreach ($filter['attribute'] as $attribute => $value) {
    if ($element['@attributes'][$attribute] != $value) {
      $match = false;
      break;
    }
  }
  return $match;
}

function search_tag($tree, $filter)
{
  $found = null;

  foreach ($tree as $key => $inner) {
    $tag = strtolower($key);
    if ($tag == '@attributes') {
      continue;
    }

    if ($tag == $filter['tag']) {
      if (gettype($inner) == 'array') {
        for ($i = 0; $i < count($inner); $i++) {
          if (check_tag($inner[$i], $filter)) {
            $found = $inner[$i];
            break;
          }
        }
      } elseif (check_tag($inner, $filter)) {
        $found = $inner;
        break;
      }
    } elseif (gettype($inner) == 'array') {
      $searched = search_tag($inner, $filter);
      if ($searched) {
        $found = $searched;
      }
    }
  }

  return $found;
}
