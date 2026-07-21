<?php

header("Content-Type: application/json; charset=utf-8");


$input = file_get_contents("php://input");

$data = json_decode($input,true);


$phone = $data["email"];


$ch = curl_init();


curl_setopt($ch,CURLOPT_URL,
"https://sdcappsa.com/api/v3/119/users/password/forget");


curl_setopt($ch,CURLOPT_POST,true);


curl_setopt($ch,CURLOPT_HTTPHEADER,[

"Content-Type: application/json",
"Accept: application/json",
"X-Localization: ar",

"Timestamp: 1784640512",
"Nonce: 9c9b337879bfb67ca2b4886714335576",
"Signature: fe8a4c9e740d63b49008b0ce2198da631e635746bec78259379023e70526060d"

]);


curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode([
"email"=>$phone
]));


curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);


$response=curl_exec($ch);


curl_close($ch);


echo $response;

?>
