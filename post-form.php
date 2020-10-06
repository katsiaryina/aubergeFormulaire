
<?php
  header('Acces-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


  $success = false;

  // Get submitted Data
  $data = json_decode(file_get_contents("php://input"));
  if (!$data) {
    die("Please Submit Data");
  }

  $account_id = htmlspecialchars(strip_tags($data->compte));
  $transit = htmlspecialchars(strip_tags($data->transit));
  $amount = htmlspecialchars(strip_tags($data->montant));

  ?>