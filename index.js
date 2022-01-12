const inputs = document.querySelectorAll('input');
const card1 = document.querySelector('.card1');
const card2 = document.querySelector('.card2');
const card3 = document.querySelector('.card3');
const validationButton = document.querySelectorAll('.button-mobile-valid');
const returnButton = document.querySelectorAll('.button-mobile-return');
let inputsArray = Array.from(inputs);
const formOFA = document.querySelector('[name="POFA"]');
let poidsIdeal;
let Bmi;
const dosesPOFA = document.querySelector('#doses-pofa');
const checkCi = document.querySelector('#ci-checkbox');
const rootCss = document.querySelector(':root');
const algoCardContainer = document.querySelector(
  '.card3__titration__algorithm__container'
);
const dexdorButton = document.querySelector('.little-button');
const inductionCard = document.querySelector('.card3__induction');
const entretienCard = document.querySelector('.card3__entretien');
let ivSpeed;
const debitSeringue = document.querySelector('#debit-seringue');

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
    ivSpeed = (poids * 1.5) / 10;
    dosesPOFA.innerHTML = `
      <li> - Ketamine: ${ketamine} mg soit ${ketamine / 10} ml</li>
      <li> - Lidocaine: ${lidocaine} mg soit ${lidocaine / 10} ml</li>
      <li> - Magnesium : ${magnesium} g soit ${Math.round(
      magnesium / 0.15
    )} ml</li>
      <li> - Dexamethasone: ${dexa} mg soit ${dexa / 4} ml</li>
      `;
    debitSeringue.textContent = ivSpeed;
    //console.log(ketamine, lidocaine, magnesium, dexa, ivSpeed);
    if (window.innerWidth < 415) {
      card1.classList.add('animate__fadeOutLeftBig');
      card1.style.display = 'none';
      card2.style.display = 'block';
      card2.classList.add('animate__fadeInRightBig');
    }
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

// all the logic for the simple round timer for POFA perfusion sur 5 min

const roundButton5 = document.querySelector('.round-timer5');
const roundButton2 = document.querySelector('.round-timer2');
function roundTime(e) {
  e.target.firstChild.nextSibling.style.animationPlayState = 'running';
}

// fonction du bouton de l'algo pour le dexdor
// 1- ca lance le chrono si !running ou ca l'arrête si running en remettant le texte a "start 2 min"
// TODO si lance le chrono affiche trois bouton rond : 1- fc < 40 = stop dexdor et discuter atropine 2- fc 45-70 et PAM OK ==> OK
//3- PAM baisse de 20% = ascencion noradre 3a- si PAM OK et Fc OK ==> OK 3b- si PAM OK et FC encore > 70 = poursuivre

function timerAlgo(e) {
  let roundTimer = e.target.parentNode;
  if (roundTimer.classList.contains('timer2-running')) {
    roundTimer.classList.remove('timer2-running');
    roundTimer.innerHTML = `<p>Start<br>2min</p>
    <svg>
      <circle r="30" cx="32" cy="32"></circle>
    </svg>`;
  } else {
    roundTimer.classList.add('timer2-running');
    roundTimer.innerHTML = `<p>Reset<br>2min</p>
    <svg>
      <circle r="30" cx="32" cy="32"></circle>
    </svg>`;
    algoCardContainer.classList.add('visible');
  }
}

roundButton5.addEventListener('click', roundTime);
roundButton2.addEventListener('click', timerAlgo);

function validDexdor(e) {
  algoCardContainer.classList.remove('visible');
  entretienCard.style.display = 'block';
  inductionCard.style.display = 'block';
  entretienCard.classList.add('visible');
  inductionCard.classList.add('visible');
}

dexdorButton.addEventListener('click', validDexdor);

// Logique des boutons de la deuxieme carte bouton return fait revenir al carte 1
// bouton validation fait apparaitre la carte 3
function nextCard(e) {
  const parentEl = e.target.parentNode;
  if (parentEl.classList.contains('fullscreen-mobile-welcome')) {
    parentEl.classList.add('animate__fadeOutLeftBig');
  } else {
    card2.classList.remove('animate__fadeInRightBig');
    card2.classList.add('animate__fadeOutLeftBig');
    card2.style.display = 'none';
    card3.style.display = 'block';
    card3.classList.add('animate__fadeInRightBig');
  }
}

function prevCard(e) {
  const parentClasses = e.target.parentNode.classList;
  if (parentClasses.contains('card2')) {
    card2.classList.remove('animate__fadeInRightBig');
    card2.classList.add('animate__fadeOutRightBig');
    card2.style.display = 'none';
    card1.style.display = 'block';
    card1.classList.remove('animate__fadeOutLeftBig');
    card1.classList.add('animate__fadeInLeftBig');
  } else {
    card3.classList.remove('animate__fadeInRightBig');
    card3.classList.add('animate__fadeOutRightBig');
    card2.style.display = 'block';
    card3.style.display = 'none';
    card2.classList.remove('animate__fadeOutLeftBig');
    card2.classList.add('animate__fadeInLeftBig');
  }
}

returnButton.forEach((e) => {
  e.addEventListener('click', prevCard);
});
validationButton.forEach((e) => {
  e.addEventListener('click', nextCard);
});
