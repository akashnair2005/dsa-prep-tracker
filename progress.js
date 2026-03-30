const container = document.getElementById("progress-container");

async function loadProgress() {
    const res = await fetch("http://localhost:3000/progress");
    const data = await res.json();

    let html = "<h2>Your Questions</h2>";

    for (let i = 1; i <= 5; i++) {
        const solved = data[i];

        html += `
            <p>
                Question ${i} 
                <span class="${solved ? 'solved' : 'unsolved'}">
                    ${solved ? "✅ Solved" : "❌ Not Solved"}
                </span>
            </p>
        `;
    }

    container.innerHTML = html;
}

loadProgress();