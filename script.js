const taskInput = document.getElementById("taskInput");
const generateBtn = document.getElementById("generateBtn");
const outputContainer = document.getElementById("outputContainer");
const output = document.getElementById("output");

generateBtn.addEventListener("click", async () => {
  const task = taskInput.value.trim(); 

  if (!task) {
    alert("Please enter a task.");
    return;
  }

  outputContainer.classList.remove("hidden");
  output.innerHTML = `
    <div class="flex items-center justify-center space-x-2">
      <div class="w-4 h-4 rounded-full animate-pulse bg-blue-500"></div>
      <div class="w-4 h-4 rounded-full animate-pulse bg-blue-500 delay-150"></div>
      <div class="w-4 h-4 rounded-full animate-pulse bg-blue-500 delay-300"></div>
      <span class="ml-2 text-gray-700">Processing...</span>
    </div>
  `;

  try {

    const response = await fetch(
      "https://lendell-garcellano.app.n8n.cloud/webhook/portfolio-ai",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })   
      }
    );

    const result = await response.json();

    if (result.title && result.output) {
      output.innerHTML = `
        <h3 class="text-xl font-bold mb-2">${result.title}</h3>
        <p>${result.output}</p>
      `;
    } else {
      output.textContent = JSON.stringify(result, null, 2);
    }

  } catch (err) {
    output.innerHTML = `<p class="text-red-600">Error: ${err.message}</p>`;
  }
});
