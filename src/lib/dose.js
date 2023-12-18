function idealWeight(t, s) {
    if (s == "women") {
      return t - 100 - (t - 150) / 2.5;
    }
    return t - 100 - (t - 150) / 4;
  }
  
  function ketaCalc(iw) {
    let dose = 0.5 * iw;
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

  /**
   * 
   * @param {number} taille 
   * @param {number} poids 
   * @param {number} imc 
   * @param {string} sexe 
   * @param {string} randomStatus 
   * @returns {{keta: number, lido: number, mgso: number, dexa: number, ivSpeed: number}}
   */
  
  export function finalCalcul(taille, poids, imc, sexe, randomStatus) {
    if(randomStatus == 'none'){
      alert('Randomisation nécéssaire')
    } else {
       let iw = idealWeight(taille, sexe);
       let keta = ketaCalc(iw);
       let lido = lidoCalc(poids);
       let mgso = magCalc(poids);
       let dexa = dexaCalc(poids);
        return {
            keta: keta,
            lido: lido,
            mgso: mgso,
            dexa: dexa,
            ivSpeed: (poids * 1.5) / 10
        }
    }
      //console.log(ketamine, lidocaine, magnesium, dexa, ivSpeed);
      if (window.innerWidth < 415) {
        card1.classList.add('animate__fadeOutLeftBig');
        card1.style.display ='none';
        card2.style.display ='block';
        card2.classList.add('animate__fadeInRightBig');
      }
  }