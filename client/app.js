

const regionSelect = document.getElementById('region');
const errorSlider = document.getElementById('error-slider');
const errorInput = document.getElementById('error-input');
const seedInput = document.getElementById('seed');
const randomSeedBtn = document.getElementById('random-seed-btn');
const userTableBody = document.querySelector('#user-table tbody');

let page = 1; // Tracks page for infinite scroll

// Synchronize slider and input field
errorSlider.addEventListener('input', () => {
  errorInput.value = errorSlider.value;
  updateTable();
});

errorInput.addEventListener('input', () => {
  errorSlider.value = errorInput.value;
  updateTable();
});

regionSelect.addEventListener('change', updateTable);
seedInput.addEventListener('change', updateTable);

// Random seed generation
randomSeedBtn.addEventListener('click', () => {
  seedInput.value = Math.random().toString(36).substring(2);
  updateTable();
});

// Fetch data and update table
const updateTable = async () => {
  const region = regionSelect.value;
  const errorPerRecord = errorInput.value;
  const seed = seedInput.value;

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ region, errorPerRecord, seed, page }),
  });

  const records = await response.json();
  userTableBody.innerHTML = ''; // Clear table

  records.forEach((record, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${record.index}</td>
        <td>${record.name}</td>
        <td>${record.address}</td>
        <td>${record.phone}</td>
      </tr>
    `;
    userTableBody.innerHTML += row;
  });
};

// Infinite scroll logic
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    page += 1;
    updateTable();
  }
});
