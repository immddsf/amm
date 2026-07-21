<?php

header("Content-Type: application/json; charset=utf-8");

$phone = $_POST["email"] ?? "";

if (!$phone) {
    echo json_encode([
        "error" => "رقم الجوال فارغ"
    ]);
    exit;
}


$ch = curl_init();

curl_setopt_array($ch, [

    CURLOPT_URL => "https://sdcappsa.com/api/v3/119/users/password/forget",

    CURLOPT_POST => true,

    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Accept: application/json",
        "X-Localization: ar",
        "Timestamp: 1784640512",
        "Nonce: 9c9b337879bfb67ca2b4886714335576",
        "Signature: fe8a4c9e740d63b49008b0ce2198da631e635746bec78259379023e70526060d"
    ],

    CURLOPT_POSTFIELDS => json_encode([
        "email" => $phone
    ]),

    CURLOPT_RETURNTRANSFER => true,

    CURLOPT_SSL_VERIFYPEER => true
]);


$response = curl_exec($ch);


if (curl_errno($ch)) {

    echo json_encode([
        "curl_error" => curl_error($ch)
    ]);

    exit;
}


$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);


curl_close($ch);


echo json_encode([
    "status" => $status,
    "response" => json_decode($response, true)
]);

?>
