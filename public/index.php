<?php
if ($_GET['notfound'] != '0') {
  http_response_code(404);
}

readfile('index.html');