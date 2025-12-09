<?php
if (!isset($_POST['task'])) {
    die("No task provided.");
}

$task = $_POST['task'];
$webhookUrl = "YOUR_WEBHOOK_URL_HERE"; // n8n Webhook URL

$data = ["task" => $task];

$options = [
    "http" => [
        "header"  => "Content-type: application/json\r\n",
        "method"  => "POST",
        "content" => json_encode($data),
    ],
];

$context  = stream_context_create($options);
$response = file_get_contents($webhookUrl, false, $context);

$result = json_decode($response, true);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AI Result</title>
    <link href="tailwind.css" rel="stylesheet">
</head>

<body class="bg-gray-50 text-gray-800">
    <div class="max-w-2xl mx-auto mt-20 p-8 bg-white shadow-xl rounded-lg">
        <h1 class="text-2xl font-bold mb-4">Generated Result</h1>

        <pre class="bg-gray-900 text-green-400 p-4 rounded overflow-auto text-sm">
<?php echo json_encode($result, JSON_PRETTY_PRINT); ?>
        </pre>

        <a href="index.php" class="inline-block mt-6 text-blue-600 hover:underline">
            ← Back
        </a>
    </div>
</body>
</html>
