/* For slider */
var slides = document.querySelectorAll('#slider .slide');

var currentLeftSlide = slides.length-1;
var currentActiveSlide = 0;
var currentRightSlide = 1;

function changeSlide(direction) {
    slides[currentRightSlide].classList.remove('right');
    slides[currentActiveSlide].classList.remove('active');
    slides[currentLeftSlide].classList.remove('left');

    currentRightSlide = (currentRightSlide+direction+slides.length) % slides.length;
    currentActiveSlide = (currentActiveSlide+direction+slides.length) % slides.length;
    currentLeftSlide = (currentLeftSlide+direction+slides.length) % slides.length;

    slides[currentLeftSlide].classList.add('left');  
    slides[currentActiveSlide].classList.add('active');
    slides[currentRightSlide].classList.add('right');
}

/* For navigation */
document.addEventListener('DOMContentLoaded', function () {
  const exploreButton = document.querySelector('.b-toggle');
  const hiddenButtons = document.querySelectorAll('.btn.hidden');

  exploreButton.addEventListener('click', function () {
    hiddenButtons.forEach(button => {
      button.classList.toggle('hidden');
    });
  });
});

/* For tooltip */
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