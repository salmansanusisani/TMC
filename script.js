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


document.addEventListener("keydown", function (e) {
  // Only handle Arrow Up and Arrow Down
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();

    const chapters = document.querySelectorAll(".chapter");
    const currentY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Find the current chapter in view
    let currentIndex = 0;
    for (let i = 0; i < chapters.length; i++) {
      const rect = chapters[i].getBoundingClientRect();
      if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
        currentIndex = i;
        break;
      }
    }

    // Move up or down
    if (e.key === "ArrowDown" && currentIndex < chapters.length - 1) {
      chapters[currentIndex + 1].scrollIntoView({ behavior: "smooth" });
    } else if (e.key === "ArrowUp" && currentIndex > 0) {
      chapters[currentIndex - 1].scrollIntoView({ behavior: "smooth" });
    }
  }
});

function scrollToChapter(direction) {
  const chapters = document.querySelectorAll(".chapter");
  const viewportHeight = window.innerHeight;
  let currentIndex = 0;

  // find which chapter is centered
  for (let i = 0; i < chapters.length; i++) {
    const rect = chapters[i].getBoundingClientRect();
    if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
      currentIndex = i;
      break;
    }
  }

  // move based on direction
  if (direction === "down" && currentIndex < chapters.length - 1) {
    chapters[currentIndex + 1].scrollIntoView({ behavior: "smooth" });
  } else if (direction === "up" && currentIndex > 0) {
    chapters[currentIndex - 1].scrollIntoView({ behavior: "smooth" });
  }
}

document.getElementById("btn-up").addEventListener("click", () => scrollToChapter("up"));
document.getElementById("btn-down").addEventListener("click", () => scrollToChapter("down"));

// Smooth scroll for TOC links
document.querySelectorAll("#toc a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const tocToggle = document.getElementById("toc-toggle");
  const tocSidebar = document.getElementById("toc-sidebar");

  // Toggle sidebar open/close
  tocToggle.addEventListener("click", () => {
    tocSidebar.classList.toggle("open");
  });

  // Smooth scroll for TOC links
  document.querySelectorAll("#toc-sidebar a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
      tocSidebar.classList.remove("open"); // close menu after clicking
    });
  });
});
