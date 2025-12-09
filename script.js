document.getElementById("generateBtn").addEventListener("click", async () => {
  const task = document.getElementById("taskInput").value.trim();
  const output = document.getElementById("output");
  const outputContainer = document.getElementById("outputContainer");

  if (!task) {
    alert("Please enter a task.");
    return;
  }

  output.textContent = "Processing... please wait.";
  outputContainer.classList.remove("hidden");

  try {
    const response = await fetch("https://lendell-garcellano.app.n8n.cloud/webhook-test/portfolio-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ task })
    });

    const result = await response.json();

    output.textContent = JSON.stringify(result, null, 2);

  } catch (error) {
    output.textContent = "Error: " + error.message;
  }
});
