<?php
if (isset($_GET['not_found'])) {
  http_response_code(404);
}

readfile('index.html');