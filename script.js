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

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const cEffectElements = document.querySelectorAll('.c-effect');
  
    cEffectElements.forEach((cEffectElement) => {
      revealWordLetterByLetter(cEffectElement);
    });
  }, 475);
});


const h2Elements = document.querySelectorAll('.hoverable');
const container = document.querySelector('.tooltip-container');

let h2Element;
h2Elements.forEach((aElement) => {
  aElement.addEventListener('mouseover', () => {
    const tooltipText = aElement.nextElementSibling.innerText;
    h2Element = document.createElement('h2');
    h2Element.classList.add('mini-title', 'c-effect');
    h2Element.innerText = tooltipText;
    container.appendChild(h2Element);
  });

  aElement.addEventListener('mouseout', () => {
    if (h2Element) {
      h2Element.remove();
    }
  });
});



const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);


document.addEventListener('DOMContentLoaded', function () {
  const exploreButton = document.querySelector('.b-toggle');
  const hiddenButtons = document.querySelectorAll('.btn.hidden');

  exploreButton.addEventListener('click', function () {
    hiddenButtons.forEach(button => {
      button.classList.toggle('hidden');
    });
  });
});



particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 360,
      "density": {
        "enable": true,
        "value_area": 850
      }
    },
    "color": {
      "value": ["#fbb03b", "#ffffff"]
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
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
      "value": 0.75,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 0.2,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2.5,
        "size_min": 0,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.15,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 83.91608391608392,
        "size": 1,
        "duration": 3,
        "opacity": 1,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 2
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});