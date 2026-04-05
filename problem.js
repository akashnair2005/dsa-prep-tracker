const API_BASE = "http://localhost:3000/api/lc";

const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');

const headerDiv = document.getElementById('prob-header');
const detailsDiv = document.getElementById('prob-details');
const tagsDiv = document.getElementById('prob-tags');
const hintsDiv = document.getElementById('prob-hints');

const toggleBtn = document.getElementById('toggle-status-btn');
const notesArea = document.getElementById('personal-notes');

let currentProblem = null;
let isLocalSolved = false;

async function fetchLeetCodeData() {
    if (!slug) {
        headerDiv.innerHTML = `<h2>No Title Slug provided</h2>`;
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/problem/${slug}`);
        if (!res.ok) throw new Error("Problem not found on LeetCode");
        
        currentProblem = await res.json();
        
        // Sync local solve status mapped by slug
        const localProgress = JSON.parse(localStorage.getItem('decipherSyncProgress')) || {};
        isLocalSolved = localProgress[slug] || false;

        // Auto-load notes
        const localNotes = JSON.parse(localStorage.getItem('decipherNotes')) || {};
        if (localNotes[slug]) {
            notesArea.value = localNotes[slug];
        }

        renderProblem();

    } catch (err) {
        console.error(err);
        headerDiv.innerHTML = `
            <h2 style="color:#ef4444">Error reaching LeetCode proxy</h2>
            <p>Ensure <code style="background: rgba(255,255,255,0.1); padding: 4px;">node server/server.js</code> is running.</p>
        `;
    }
}

function renderProblem() {
    // Header
    headerDiv.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
             <h2>${currentProblem.questionId}. ${currentProblem.title}</h2>
        </div>
        <div class="problem-meta" style="margin-top:10px;">
            <span class="diff-badge ${currentProblem.difficulty}">${currentProblem.difficulty}</span>
        </div>
    `;

    // Render LC content exactly as HTML
    detailsDiv.style.display = 'block';
    detailsDiv.innerHTML = currentProblem.content || "<p>No description available.</p>";

    // Tags
    if (currentProblem.topicTags && currentProblem.topicTags.length > 0) {
        hintsDiv.style.display = 'block';
        tagsDiv.innerHTML = currentProblem.topicTags.map(t => `<span class="tag">${t.name}</span>`).join('');
    }

    // Prepare solve button
    toggleBtn.style.opacity = '1';
    toggleBtn.style.pointerEvents = 'auto';
    updateSolveButton();
}

function updateSolveButton() {
    if (isLocalSolved) {
        toggleBtn.classList.add('solved-btn');
        toggleBtn.innerHTML = `Local ✓ Solved`;
    } else {
        toggleBtn.classList.remove('solved-btn');
        toggleBtn.innerHTML = `Mark Locally Solved`;
    }
}

// Event Listeners
toggleBtn.addEventListener('click', () => {
    isLocalSolved = !isLocalSolved;
    updateSolveButton();

    let localProgress = JSON.parse(localStorage.getItem('decipherSyncProgress')) || {};
    localProgress[slug] = isLocalSolved;
    localStorage.setItem('decipherSyncProgress', JSON.stringify(localProgress));
});

// Auto-save notes
notesArea.addEventListener('input', () => {
    let localNotes = JSON.parse(localStorage.getItem('decipherNotes')) || {};
    localNotes[slug] = notesArea.value;
    localStorage.setItem('decipherNotes', JSON.stringify(localNotes));
});

// Init
fetchLeetCodeData();
