<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AI Task & Content Generator</title>
    <link href="tailwind.css" rel="stylesheet">
</head>
<body class="bg-gray-100 text-gray-800">

    <div class="max-w-2xl mx-auto mt-20 p-8 bg-white shadow-xl rounded-lg">
        <h1 class="text-3xl font-bold mb-6 text-center">AI Task & Content Generator</h1>

        <p class="text-gray-600 text-center mb-6">
            Enter any task and let n8n + AI process it for you.
        </p>

        <form action="process.php" method="POST" class="space-y-4">
            <textarea 
                name="task" 
                class="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" 
                placeholder="Example: Generate a product description for a modern office chair." 
                required></textarea>

            <button 
                class="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
                Generate with AI
            </button>
        </form>
    </div>

</body>
</html>
