// Reading Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrollPercent + '%';
});

// Theme Toggle
const toggleThemeBtn = document.getElementById('toggle-theme');
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

// Font Resize
let fontSize = 18;

function updateFontSize() {
  document.querySelectorAll("p").forEach(p => {
    p.style.fontSize = fontSize + 'px';
  });
}

document.getElementById('font-larger').addEventListener('click', () => {
  fontSize += 2;
  updateFontSize();
});

document.getElementById('font-smaller').addEventListener('click', () => {
  fontSize -= 2;
  updateFontSize();
});


// Download Book
document.getElementById('download-book').addEventListener('click', () => {
  const text = document.querySelector('#main').innerText;
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'The Main Characters.txt';
  link.click();
});

