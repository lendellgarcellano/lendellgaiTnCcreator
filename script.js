const taskInput = document.getElementById("taskInput");
const generateBtn = document.getElementById("generateBtn");
const outputContainer = document.getElementById("outputContainer");
const output = document.getElementById("output");
const response = await fetch("https://lendell-garcellano.app.n8n.cloud/webhook/portfolio-ai", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ task })
});


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
    const response = await fetch("https://lendell-garcellano.app.n8n.cloud/webhook/portfolio-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    });

    let result;
    try {
      result = await response.json();
    } catch {
      result = {
        title: "Service Unavailable",
        output: "The workflow encountered an error. This may be due to the free n8n plan message limit. Please try again later.",
        bullet_points: [],
        extra_notes: ""
      };
    }

    if (result.title && result.output) {
      output.innerHTML = `
        <h3 class="text-xl font-bold mb-2">${result.title}</h3>
        <p class="mb-2">${result.output}</p>
        ${
          result.bullet_points?.length
            ? `<ul class="list-disc ml-5 mb-2">${result.bullet_points.map(b => `<li>${b}</li>`).join('')}</ul>`
            : ''
        }
        ${
          result.extra_notes
            ? `<p class="text-gray-400 italic">Note: ${result.extra_notes}</p>`
            : ''
        }
      `;
    } else {
      output.textContent = JSON.stringify(result, null, 2);
    }

  } catch (error) {
    output.innerHTML = `
      <p class="text-red-600">Error: ${error.message}</p>
      <p class="text-gray-600 italic">If you are using the free n8n plan, the message limit may have been hit. Please try again after some time.</p>
    `;
  }
});
