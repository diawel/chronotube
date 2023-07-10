<?php
if (isset($_POST['line'])) {
  $fp = fopen('./log/history-sample.txt', 'a');
  fwrite($fp, "{$_POST['line']}\n");
  fclose($fp);
}
