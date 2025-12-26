let fighters = [];
let matches = [];
let bout = 1;
let ring = "A";

function addFighter() {
  const name = document.getElementById("name").value;
  const club = document.getElementById("club").value;
  const gender = document.getElementById("gender").value;
  const weight = document.getElementById("weight").value;

  if (!name || !weight) {
    alert("Enter name and weight");
    return;
  }

  fighters.push({ name, club, gender, weight });
  document.querySelectorAll("input").forEach(i => i.value = "");
}

function generateDraw() {
  matches = [];
  bout = 1;

  const shuffled = [...fighters].sort(() => Math.random() - 0.5);

  for (let i = 0; i < shuffled.length; i += 2) {
    matches.push({
      bout: bout++,
      ring,
      red: shuffled[i],
      blue: shuffled[i + 1] || null
    });
  }

  renderMatches();
}

function renderMatches() {
  const container = document.getElementById("matches");
  container.innerHTML = "";

  matches.forEach(m => {
    const div = document.createElement("div");
    div.className = "match";
    div.innerHTML = `
      <strong>Ring ${m.ring} – Bout ${m.bout}</strong>
      <div class="red">🔴 ${m.red.name} (${m.red.club}, ${m.red.gender}, ${m.red.weight}kg)</div>
      <div class="blue">🔵 ${m.blue ? m.blue.name : "BYE"}</div>
    `;
    container.appendChild(div);
  });
}

/* EXPORT PDF */
document.getElementById("export-pdf-btn").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;

  doc.text("Boxing Tournament Draw", 10, y);
  y += 10;

  matches.forEach(m => {
    doc.text(`Ring ${m.ring} Bout ${m.bout}`, 10, y);
    y += 6;
    doc.text(`Red: ${m.red.name}`, 10, y);
    y += 6;
    doc.text(`Blue: ${m.blue ? m.blue.name : "BYE"}`, 10, y);
    y += 10;
  });

  doc.save("boxing-draw.pdf");
});

/* SAVE BACKUP */
function saveBackup() {
  const data = JSON.stringify({ fighters, matches });
  const blob = new Blob([data], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "boxing-draw-backup.json";
  a.click();
}
