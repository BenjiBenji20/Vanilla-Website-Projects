const buttonPress = document.querySelectorAll('.button');
let currentValue = '';
let toEvaluate = '';
let resultHandler = '';

// declare local storage to save previous calculations
let previousCalculations = JSON.parse(localStorage.getItem('previousCalculations')) || {
  firstCalculation: '',
  secondCalculation: '',
  thirdCalculation: ''
};

buttonPress.forEach(button => {
  button.addEventListener('click', () => {
    let buttonValue = button.value;
    let displayValue = document.getElementById("result");

    switch (buttonValue) {
      case 'c':
        currentValue = '0';
        break;
      
      case '=':
        try {
          // find and replace the non computer arithmetic operator
          currentValue = currentValue.replace("x", "*"); // multiplication (x) replace *
          currentValue = currentValue.replace("÷", "/"); // division (÷) replace /

          toEvaluate = currentValue;
          currentValue = eval(currentValue);
          resultHandler = ' = ' + currentValue;
        } catch (error) {
          console.error('Error arithmetic evaluation.', error);
        }
        break;

      case 'e': // Erase char or digit
        currentValue += buttonValue;

        for(let i = 0; i < currentValue.length; i++) {
          if(currentValue.charAt(i) === 'e') {
            currentValue = currentValue.slice(0, i - 1) + currentValue.slice(i + 1); // remove both the character before 'e' (at i - 1) and 'e' itself (at i)
            break;
          }
        }

        currentValue = currentValue.length < 1 ? '0' : currentValue; // To avoid null value
        break;
      
      default:
        try {
          if(Number(currentValue) === 0) {
            currentValue = '';
          }

          // Change operator value if multiply(*) or division(/) for display aesthetic
          if(buttonValue === '*') {
            buttonValue = 'x';
          }
          else if(buttonValue === '/'){
            buttonValue = '÷';
          }

          currentValue += buttonValue;
        } catch (error) {
          console.error('Error catching button', error);
        }
        break;
    }

    // Display to the calculator screen (view)
   displayValue.innerHTML = currentValue;
   // localStorage.removeItem('previousCalculations');

   previousCalculations.firstCalculation = toEvaluate + resultHandler;
   if(previousCalculations.firstCalculation) {
     previousCalculations.secondCalculation = previousCalculations.thirdCalculation;
     previousCalculations.thirdCalculation = previousCalculations.firstCalculation;
   }

   //Save to local storage
   localStorage.setItem('previousCalculations', JSON.stringify(previousCalculations));

   Object.keys(previousCalculations).forEach(prevCalc => {
     document.getElementById("prev-values").innerHTML = previousCalculations[prevCalc] + `\n`;
   });
  });
});
