const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getRandomLetter(targetLetter) {
  const availableLetters = letters.replace(targetLetter, '');
  const randomIndex = Math.floor(Math.random() * availableLetters.length);
  return availableLetters[randomIndex];
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function revealWordLetterByLetter(element) {
  const word = element.dataset.value;
  let currentText = '';

  for (let n = 0; n < word.length; n++) {
    const letter = word[n];

    for (let i = 0; i < 7; i++) {
      const randomLetter = getRandomLetter(letter);
      element.innerText = currentText + randomLetter;
      await delay(25);
    }

    currentText += letter;
    element.innerText = currentText;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll('.line');
  lines.forEach(line => line.classList.add('activate'));

  const elementsWithCEffectClass = document.querySelectorAll(".c-effect");
  const menuButton = document.getElementById('menuButton');
  const closeButton = document.getElementById('closeButton');
  const websiteName = document.getElementById('websiteName');
  const sidebar = document.querySelector('.sidebar');

  elementsWithCEffectClass.forEach(revealWordLetterByLetter);

  menuButton.addEventListener('click', toggleSidebar);
  closeButton.addEventListener('click', closeSidebar);

  function toggleSidebar() {
    sidebar.classList.toggle('expanded');
    toggleElementsDisplay();
    toggleEffects();
  }

  function closeSidebar() {
    sidebar.classList.remove('expanded');
    toggleElementsDisplay();
    toggleEffects();
  }

  function toggleElementsDisplay() {
    menuButton.style.display = sidebar.classList.contains('expanded') ? 'none' : 'block';
    websiteName.style.display = sidebar.classList.contains('expanded') ? 'block' : 'none';
    closeButton.style.display = sidebar.classList.contains('expanded') ? 'block' : 'none';
  }

  function toggleEffects() {
    elementsWithCEffectClass.forEach(effect => effect.classList.toggle('move'));
  }
});

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area":1000
      }
    },
    "color": {
      "value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8", "#9370db", "#f8c210", "#990000", "#7fffd4"]
    },
    
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#fff"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.6,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 120,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});