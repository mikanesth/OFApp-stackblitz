let inputs = document.querySelectorAll('input');
let inputsArray = Array.from(inputs);
let formOFA = document.querySelector('[name="POFA"]');
let poidsIdeal;
let Bmi;
let dosesPOFA = document.querySelector('#doses-pofa');
let checkCi = document.querySelector('#ci-checkbox');
let rootCss = document.querySelector(':root');

function checkNumbers(e) {
  //tablette.textContent = '';
  //e.target.style.background = 'white';
  let inputId = e.target.id;
  let inputValue = e.target.value;
  if (inputId.includes('taille')) {
    //console.log(inputValue)
    if (inputValue < 100 || inputValue > 220) {
      rootCss.style.setProperty('--after-bg-1', '#ed6b5ace');
      //tablette.textContent = 'la taille est hors range';
      return;
    }
    //tablette.textContent = 'la taille est OK';
    rootCss.style.setProperty('--after-bg-1', '#83c5be');
    return;
  }
  //console.log(inputValue)
  if (inputValue < 30 || inputValue > 200) {
    rootCss.style.setProperty('--after-bg-2', '#ed6b5ace');
    //tablette.textContent = 'le poids est hors range';
    return;
  }
  rootCss.style.setProperty('--after-bg-2', '#83c5be');
  //tablette.textContent = 'le poids est OK';
  return;
}

function idealWeight(t, s) {
  if (s) {
    return t - 100 - (t - 150) / 2.5;
  }
  return t - 100 - (t - 150) / 4;
}

function ketaCalc(iw) {
  let dose = 0.75 * iw;
  if (dose > 50) {
    return 50;
  }
  return Math.round(dose);
}

function lidoCalc(p) {
  let dose = 1.5 * p;
  if (dose > 100) {
    return 100;
  }
  return Math.floor(dose);
}
function magCalc(p) {
  let dose = p * 30;
  if (dose > 3000) {
    return 3;
  }
  return dose / 1000;
}
function dexaCalc(p) {
  let dose = p * 0.1;
  if (dose > 8) {
    return 8;
  }
  return Math.round(dose);
}

function finalCalcul(e) {
  e.preventDefault();
  if (checkCi.checked) {
    let taille = e.target[0].value;
    let tailleMetre = taille / 100;
    let poids = e.target[1].value;
    let femme = e.target[2].checked;
    Bmi = poids / (tailleMetre * tailleMetre);
    poidsIdeal = idealWeight(taille, femme);
    let ketamine = ketaCalc(poidsIdeal);
    let lidocaine = lidoCalc(poids);
    let magnesium = magCalc(poids);
    let dexa = dexaCalc(poids);
    let ivSpeed = (poids * 1.5) / 10;
    dosesPOFA.innerHTML = `
      <li> - Ketamine: ${ketamine} mg soit ${ketamine / 10} ml</li>
      <li> - Lidocaine: ${lidocaine} mg soit ${lidocaine / 10} ml</li>
      <li> - Magnesium : ${magnesium} g soit ${magnesium / 0.15} ml</li>
      <li> - Dexamethasone: ${dexa} mg soit ${dexa / 4} ml</li>
      `;
    console.log(ketamine, lidocaine, magnesium, dexa, ivSpeed);
  } else {
    alert('Validez les contre-indications SVP');
  }
}

formOFA.addEventListener('submit', finalCalcul);

inputsArray.forEach((input) => {
  if (input.type == 'number') {
    input.addEventListener('keyup', checkNumbers);
  }
});

console.log(inputsArray);

// all the logic for the round timer

const roundButton = document.querySelector('.round-timer');
function roundTime(e) {
  e.target.firstChild.nextSibling.style.animationPlayState = 'running';
  console.log(e.target.firstChild.nextSibling);
}
roundButton.addEventListener('click', roundTime);
