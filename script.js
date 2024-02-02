document.addEventListener('DOMContentLoaded', function () {
  const exploreButton = document.querySelector('.b-toggle');
  const hiddenButtons = document.querySelectorAll('.btn.hidden');

  exploreButton.addEventListener('click', function () {
    hiddenButtons.forEach(button => {
      button.classList.toggle('hidden');
    });
  });
});

var slides = document.querySelectorAll('#slider .slide');
var currentSlide = 0;

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide+direction+slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

const h2Elements = document.querySelectorAll('.hoverable');
const container = document.querySelector('.tooltip-container');

let h2Element;
h2Elements.forEach((aElement) => {
  aElement.addEventListener('mouseover', () => {
    const tooltipText = aElement.nextElementSibling.innerText;
    h2Element = document.createElement('h2');
    h2Element.classList.add('tooltipTitle');
    h2Element.innerText = tooltipText;
    container.appendChild(h2Element);
  });

  aElement.addEventListener('mouseout', () => {
    if (h2Element) {
      h2Element.remove();
    }
  });
});