// ===============================
//  Site Script - Club d'Échecs
// ===============================

// Burger menu
document.getElementById('menu-toggle')?.addEventListener('click', function () {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
});

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach((item) => {
  item.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.add('hidden');
  });
});

// Toggle solution box visibility
document.getElementById('solution-button')?.addEventListener('click', function () {
  const solutionBox = document.getElementById('solution-box');
  if (solutionBox) solutionBox.classList.toggle('hidden');
});

// ===============================
//  ELO Progression (from evolution1)
// ===============================

// Fake dataset (can be replaced by a fetch from your backend/Excel export)

const matches = [
  { id: 1, date: '2024-01-15', player1: 'Jean Dupont', player2: 'Marie Lefèvre', result: 'win' },   // Jean gagne
  { id: 2, date: '2024-01-20', player1: 'Thomas Martin', player2: 'Marie Lefèvre', result: 'win' }, // Thomas gagne
  { id: 3, date: '2024-01-25', player1: 'Jean Dupont', player2: 'Thomas Martin', result: 'draw' },  // Nul
  { id: 4, date: '2024-02-01', player1: 'Marie Lefèvre', player2: 'Jean Dupont', result: 'loss' },  // Marie perd
  { id: 5, date: '2024-02-05', player1: 'Thomas Martin', player2: 'Marie Lefèvre', result: 'draw' },// Nul
  { id: 6, date: '2024-02-10', player1: 'Jean Dupont', player2: 'Thomas Martin', result: 'win' },   // Jean gagne
];


const initialElo = 1200;
const kFactor = 32;

const students = [...new Set(matches.flatMap((m) => [m.player1, m.player2]))];
const select = document.getElementById('student-select');

// Populate select options
if (select) {
  students.forEach((student) => {
    const option = document.createElement('option');
    option.value = student;
    option.textContent = student;
    select.appendChild(option);
  });
}

let eloChart;

function calculateEloHistory(studentName) {
  const playerElos = {};
  students.forEach((s) => (playerElos[s] = initialElo));
  const history = [{ date: 'Début', elo: initialElo }];

  // Sort matches by date (immutable)
  const sortedMatches = [...matches].sort((a, b) => new Date(a.date) - new Date(b.date));

  sortedMatches.forEach((match) => {
    const eloA = playerElos[match.player1];
    const eloB = playerElos[match.player2];
    const qA = Math.pow(10, eloA / 400);
    const qB = Math.pow(10, eloB / 400);
    const expectedA = qA / (qA + qB);
    const expectedB = qB / (qA + qB);

    let scoreA, scoreB;
    if (match.result === 'win') { scoreA = 1; scoreB = 0; }
    else if (match.result === 'loss') { scoreA = 0; scoreB = 1; }
    else { scoreA = 0.5; scoreB = 0.5; }

    // Update ELOs
    playerElos[match.player1] = eloA + kFactor * (scoreA - expectedA);
    playerElos[match.player2] = eloB + kFactor * (scoreB - expectedB);

    if (match.player1 === studentName || match.player2 === studentName) {
      history.push({ date: match.date, elo: playerElos[studentName] });
    }
  });

  return history;
}

function renderEloChart(studentName) {
  const canvas = document.getElementById('elo-chart');
  if (!canvas || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');

  const history = calculateEloHistory(studentName);
  const labels = history.map((h) => h.date);
  const data = history.map((h) => h.elo);

  if (eloChart) eloChart.destroy();

  eloChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: `Progression ELO de ${studentName}`,
          data,
          borderColor: '#ffc560',
          backgroundColor: 'rgba(255, 197, 96, 0.2)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: 'rgba(247, 247, 241, 0.1)' },
          ticks: { color: '#f7f7f1' },
        },
        y: {
          beginAtZero: false,
          grid: { color: 'rgba(247, 247, 241, 0.1)' },
          ticks: { color: '#f7f7f1' },
        },
      },
      plugins: {
        legend: {
          labels: { color: '#f7f7f1' },
        },
        tooltip: {
          backgroundColor: 'rgba(26, 32, 44, 0.8)',
          titleColor: '#ffc560',
          bodyColor: '#f7f7f1',
          borderColor: '#ffc560',
          borderWidth: 1,
        },
      },
    },
  });
}

// Event: select change
select?.addEventListener('change', (e) => {
  const value = e.target.value;
  renderEloChart(value);
});

// Initial chart
if (students.length > 0) {
  renderEloChart(students[0]);
}
