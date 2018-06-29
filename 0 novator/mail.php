<?php
	require_once 'wp-load.php';
	$sendto = get_bloginfo('admin_email');
	$subject = "Заявка с сайта ";

	$form = $_POST['form'];
	$phone = $_POST['phone'];
	$mail = $_POST['mail'];
	$name = $_POST['name'];
	$desc = $_POST['desc'];
	$question = $_POST['question'];

	$headers  = "From: admin\r\n";
	$headers .= "Reply-To: admin\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html;charset=utf-8 \r\n";

	$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
	$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>$subject</h2>\r\n";

	$msg .= "<p><strong>Форма/товар: </strong> ".$form."</p>\r\n";
	$msg .= "<p><strong>Телефон: </strong> ".$phone."</p>\r\n";
	$msg .= "<p><strong>E-mail: </strong> ".$mail."</p>\r\n";
	if($_REQUEST['mail'] != null){
		$msg .= "<p><strong style='font-weight:bold'>E-mail: </strong> ".$mail."</p>\r\n";
	}
	if($_REQUEST['desc'] != null){
		$msg .= "<p><strong style='font-weight:bold'>Описание товара: </strong> ".$desc."</p>\r\n";
	}
	if($_REQUEST['question'] != null){
		$msg .= "<p><strong style='font-weight:bold'>Вопрос/сообщение: </strong> ".$question."</p>\r\n";
	}
	$msg .= "</body></html>";

	mail($sendto, $subject, $msg, $headers);
?>
