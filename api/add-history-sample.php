<?php
if (isset($_POST['line'])) {
  $fp = fopen('./log/history-sample.txt', 'w');
  fwrite($fp, "{$_POST['line']}\n");
  fclose($fp);
}
