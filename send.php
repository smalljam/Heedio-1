<?php


$host   = "localhost";
$dbname = "DBNAME";
$user   = "USERNAME";
$pass   = "PASSWORD";

$email    = filter_var($_POST['signup-email'], FILTER_SANITIZE_EMAIL);
$datetime = date('Y-m-d H:i:s');

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);

    if (empty($email)) {
        $status = "error";
        $message = "The email address field must not be blank";
    } else if (!preg_match('/^[^0-9][A-z0-9._%+-]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/', $email)) {
        $status = "error";
        $message = "You must fill the field with a valid email address";
    } else {
        $existingSignup = $db->prepare("SELECT COUNT(*) FROM signups WHERE signup_email_address='$email'");
        $existingSignup->execute();
        $data_exists = ($existingSignup->fetchColumn() > 0) ? true : false;

        if (!$data_exists) {
            $sql = "INSERT INTO signups (signup_email_address, signup_date) VALUES (:email, :datetime)";
            $q = $db->prepare($sql);
            $q->execute(
                array(
                    ':email' => $email,
                    ':datetime' => $datetime
            ));

            if ($q) {
                $status = "success";
                $message = "Success";
            } else {
                $status = "error";
                $message = "An error occurred, please try again";
				var_dump($q);
            }
        } else {
            $status = "error";
            $message = "This email is already subscribed";

        }
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

	$arr['to_email']    = $email;
    $arr['from_email']  = "admin@study-up.com.ua";
    $arr['from_name']   = "Study-up";
    $arr['to_name']     = "";
    $arr['subject']     = "Success";
    $arr['message']     = "Glad to see you!";
	 // mail_send($arr);


    $data = array(
        'status' => $status,
        'message' => $message
    );
    echo json_encode($data);

    $db = null;
}
    catch(PDOException $e) {
    echo $e->getMessage();
}

