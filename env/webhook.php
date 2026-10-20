<?php

/**
 * GitHub webhook handler template.
 * 
 * @see  https://developer.github.com/webhooks/
 * @author  Miloslav Hůla (https://github.com/milo)
 */

// In this file: /etc/apache2/sites-available/example.com.conf
// Put this line: SetEnv GITHUB_WEBHOOK_SECRET MY_SECRET
$hookSecret = getenv('GITHUB_WEBHOOK_SECRET');

set_error_handler(function($severity, $message, $file, $line) {
    throw new \ErrorException($message, 0, $severity, $file, $line);
});

set_exception_handler(function($e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo "Error on line {$e->getLine()}: " . htmlSpecialChars($e->getMessage());
    die();
});

// Fail closed: without a configured secret we cannot authenticate the sender.
if ($hookSecret === false || $hookSecret === '') {
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Webhook secret is not configured.';
    exit;
}
if (!isset($_SERVER['HTTP_X_HUB_SIGNATURE_256'])) {
    throw new \Exception("HTTP header 'X-Hub-Signature-256' is missing.");
} elseif (!extension_loaded('hash')) {
    throw new \Exception("Missing 'hash' extension to check the secret code validity.");
}
list($algo, $hash) = explode('=', $_SERVER['HTTP_X_HUB_SIGNATURE_256'], 2) + array('', '');
if ($algo !== 'sha256') {
    throw new \Exception('Only sha256 signatures are accepted.');
}
$rawPost = file_get_contents('php://input');
if (!hash_equals(hash_hmac('sha256', $rawPost, $hookSecret), $hash)) {
    throw new \Exception('Hook secret does not match.');
}

if (!isset($_SERVER['CONTENT_TYPE'])) {
    throw new \Exception("Missing HTTP 'Content-Type' header.");
} elseif (!isset($_SERVER['HTTP_X_GITHUB_EVENT'])) {
    throw new \Exception("Missing HTTP 'X-Github-Event' header.");
}

switch ($_SERVER['CONTENT_TYPE']) {
    case 'application/json':
        $json = $rawPost ?: file_get_contents('php://input');
        break;
    case 'application/x-www-form-urlencoded':
        $json = $_POST['payload'];
        break;
    default:
        throw new \Exception("Unsupported content type: $_SERVER[CONTENT_TYPE]");
}

# Payload structure depends on triggered event
# https://developer.github.com/v3/activity/events/types/
$payload = json_decode($json);
switch (strtolower($_SERVER['HTTP_X_GITHUB_EVENT'])) {
    case 'ping':
        echo 'pong';
        break;
    case 'push':
	echo 'push';    
	    break;
    default:
        header('HTTP/1.0 404 Not Found');
        echo "Event:$_SERVER[HTTP_X_GITHUB_EVENT] Payload:\n";
        print_r($payload); # For debug only. Can be found in GitHub hook log.
        die();
}
?>