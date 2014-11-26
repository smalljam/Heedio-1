<?php
$email    = filter_var($_POST['signup-email'], FILTER_SANITIZE_EMAIL);
$datetime = date('Y-m-d H:i:s');

try {
	$arr['to_email']    = "";
    $arr['from_email']  = "";
    $arr['from_name']   = "Subscriber";
    $arr['to_name']     = "";
    $arr['subject']     = "getrealemotions.com";
    $arr['message']     = $email;
	
    mail_send($arr);
    echo "201";

    //$db = null;
}
    catch(PDOException $e) {
    echo $e->getMessage();
}


function mail_send($arr)
{
    if (!isset($arr['to_email'], $arr['from_email'], $arr['subject'], $arr['message'])) {
        throw new HelperException('mail(); not all parameters provided.');
    }

    $to         = empty($arr['to_name']) ? $arr['to_email'] : '"' . mb_encode_mimeheader($arr['to_name']) . '" <' . $arr['to_email'] . '>';
    $from       = empty($arr['from_name']) ? $arr['from_email'] : '"' . mb_encode_mimeheader($arr['from_name']) . '" <' . $arr['from_email'] . '>';

    $headers    = array
    (
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset="UTF-8";',
        'Content-Transfer-Encoding: 7bit',
        'Date: ' . date('r', $_SERVER['REQUEST_TIME']),
        'Message-ID: <' . $_SERVER['REQUEST_TIME'] . md5($_SERVER['REQUEST_TIME']) . '@' . $_SERVER['SERVER_NAME'] . '>',
        'From: ' . $from,
        'Reply-To: ' . $from,
        'Return-Path: ' . $from,
        'X-Mailer: PHP v' . phpversion(),
        'X-Originating-IP: ' . $_SERVER['SERVER_ADDR'],
    );
        
    mail($to, '=?UTF-8?B?' . base64_encode($arr['subject']) . '?=', $arr['message'], implode("\n", $headers));
    
}
?>