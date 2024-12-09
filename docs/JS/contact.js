const paragraphElement = document.querySelector('.profession');

setTimeout(() => {
  paragraphElement.style.visibility = "visible";
  paragraphElement.style.overflow = "hidden";
  paragraphElement.style.whiteSpace = "nowrap";
  paragraphElement.style.borderRight = "2px solid";
  paragraphElement.style.animation = "typing 2s steps(22) forwards, blink 1s step-end infinite";
}, 1000);
