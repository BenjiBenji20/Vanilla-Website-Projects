const line1Element = document.querySelector('.line-1');
const line2Element = document.querySelector('.line-2');
const line3Element = document.querySelector('.line-3');
const line4Element = document.querySelector('.line-4');
const line5Element = document.querySelector('.line-5');

setTimeout(() => {
  line1Element.style.borderRight = "none";
}, 1050);

setTimeout(() => {
  line2Element.style.visibility = "visible";
  line2Element.style.overflow = "hidden";
  line2Element.style.whiteSpace = "nowrap";
  line2Element.style.borderRight = "2px solid";
  line2Element.style.animation = "typing 2s steps(22) forwards, blink 1s step-end infinite";
}, 2500);

setTimeout(() => {
  line2Element.style.borderRight = "none";

  line3Element.style.visibility = "visible";
  line3Element.style.overflow = "hidden";
  line3Element.style.whiteSpace = "nowrap";
  line3Element.style.borderRight = "2px solid";
  line3Element.style.animation = "typing 2s steps(22) forwards, blink 1s step-end infinite";
}, 4500);

setTimeout(() => {
  line3Element.style.borderRight = "none";

  line4Element.style.visibility = "visible";
  line4Element.style.overflow = "hidden";
  line4Element.style.whiteSpace = "nowrap";
  line4Element.style.borderRight = "2px solid";
  line4Element.style.animation = "typing 2s steps(22) forwards, blink 1s step-end infinite";
}, 6500);

setTimeout(() => {
  line4Element.style.borderRight = "none";

  line5Element.style.visibility = "visible";
  line5Element.style.overflow = "hidden";
  line5Element.style.whiteSpace = "nowrap";
  line5Element.style.borderRight = "2px solid";
  line5Element.style.animation = "typing 2s steps(22) forwards, blink 1s step-end infinite";
}, 8500);

const buttonElemet = document.getElementById("view-my-work");

setTimeout(() => {
  buttonElemet.style.animation = "visibility 2s steps(1) forwards";
}, 8800)

