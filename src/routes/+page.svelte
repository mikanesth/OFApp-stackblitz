<script>
    import './global.css';
    import Card from '$lib/Card.svelte';
    import Footer from '$lib/Footer.svelte'
    import { onMount } from 'svelte';
    import { finalCalcul } from '$lib/dose';
    import perfusion from '$lib/img/perfusion.svg';
    /**@type {number}*/ let taille;
    /**@type {number}*/ let poids;
    /**@type {string}*/ let sexe;
    /**@type {number}*/ let imc;
    /**@type {string}*/ let randomStatus = 'none';
    /**@type {boolean}*/ let doseCalculated = false;
    /**@type {{keta: number, lido: number, mgso: number, dexa: number, ivSpeed: number}}*/ let doses;
    let rootCss;

    $: imc = Math.round(poids/(taille/100*taille/100)*10)/10
    
    
    onMount(()=>{
      rootCss = document.querySelector(':root');
      //gestion du status de randomisation dans l'étude //
      let randomStatusButton = document.querySelectorAll('.random-card');

      randomStatusButton.forEach(status => {
        status.addEventListener('click', (e)=>{
          randomStatus = e.target.id
          randomStatusButton.forEach(button => {
              button.style.backgroundColor = '#006d77'
              e.target.style.backgroundColor = '#83c5be';
              if(randomStatus == button.id){
                button.style.boxShadow = '1px 1px 3px var(--neu-darker), -1px -1px 3px var(--neu-white)'
              } else {
                button.style.boxShadow = 'var(--neu-button-color)'
              }
          }
          )
          console.log(randomStatus)
        })
      })
    })

  function checkNumbers(e) {
  //tablette.textContent = '';
  //e.target.style.background = 'white';
  console.log(e);
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



function calculDose(){
  if(randomStatus == 'none'){
    alert('Randomisation nécéssaire')
  } else {
    doseCalculated = true;
    doses = finalCalcul(taille, poids, imc, sexe, randomStatus);
  }
}

</script>

<div class="jumbo">
    <h1>Protocole DexCoeur</h1>
    <div class="ligne"></div>
    <div class="container__title">
      <div class="title_paragraph1">
        <p>
          Renseigner caractéristique du / de la patient(e) ainsi que son statut de randomisation
        </p>
      </div>
      <div class="title_paragraph2">
        <p>
          L'application vous donne les posologies pour la préparation du
          plateau, du pochon d'OFA et la vitesse de perfusion de la seringue
          Lido Keta
        </p>
      </div>
      <div class="title_paragraph3">
        <p>Descritption chronologique de l'induction puis de l'entretien</p>
      </div>
    </div>
</div>
<div class="data-container">
    <Card cardNumber={"1"} cardTitle={"Caractéristiques"}>
        <p id="random-status-title">Statut de randomisation</p>
            <div class="random-card-container">
              <div class="random-card" id="ofa">OFA</div>
              <div class="random-card" id="suf">SUF</div>
            </div>
    
            <!-- ::::::::::::::::::::: FORMULAIRE D'ENTREE DES CARACTERISTIQUES PATIENT :::::::::::::::::::: -->
            <form name="POFA" id="OFA-form">
              <label for="taille-input">Taille (en cm)</label>
              <input
                required
                type="number"
                min="100"
                max="220"
                name="taille"
                id="taille-input"
                placeholder="180"
                bind:value={taille}
                on:keyup={checkNumbers}
              />
              <br />
              <label for="poids-input">Poids (en Kg)</label>
              <input
                required
                type="number"
                min="30"
                max="220"
                name="poids"
                id="poids-input"
                placeholder="70"
                bind:value={poids}
                on:keyup={checkNumbers}
              />
              <br />
              <label for="women-radio"
                >Femme<input
                  required
                  type="radio"
                  name="sexe"
                  id="women-radio"
                  value="women"
                  bind:group={sexe} /><span></span
              ></label>
    
              <label for="men-radio"
                >Homme<input
                  required
                  type="radio"
                  name="sexe"
                  id="men-radio"
                  value="men"
                  bind:group={sexe} /><span></span
              ></label>
              <br />
                <p>IMC: {#if imc > 10}{imc}{/if}</p>
              <input type="submit" value="valider" on:click|preventDefault={calculDose}/>
            </form>
    </Card>
    {#if doseCalculated}
      <Card cardNumber={"2"} cardTitle={"Mon plateau d'induction"}>
        <div class="pofa-card">
          <!-- ////////////// SOUS CARTE DE LA PREPARATION DU SOLUTE D'OFA OU POFA ///////////////////: -->

          <div class="pastille-carte">Pochon OFA</div>
          <!--  PASTILLE POUR CARACTÉRISER LA CARTE DE PREPARATION (OFA CLASSIQUE MONITORAGE)-->

          <div class="pofa-card__flex-container">
            <div class="pofa-card__inside-flex-container">
              <img
                src={perfusion}
                alt="un soluté de perfusion"
              />
              <p>Dans 100ml de<br />NaCl 0.9%</p>
            </div>
            <ul id="doses-pofa">
              <li>- Ketamine: {doses.keta}mg soit {doses.keta/10}ml</li>
              <li>- Lidocaine: {doses.lido}mg soit {doses.lido/10}ml</li>
              <li>- Magnesium: {doses.mgso}g soit {Math.round(doses.mgso/0.15)}ml</li>
              <li>- Dexamethasone: {doses.dexa}mg soit {doses.dexa/4}ml</li>
            </ul>
          </div>
        </div>
        {#if randomStatus == "ofa"}
        <div class="dex-card-container">
          <div class="pastille-carte">Dexmedetomidine</div>
          <!-- ///////////////////// SOUS CARTE DE LA PREPARATION DE LA DEXMEDETO /////////////////////////////// -->
          <div class="dex-card">
            <p>
              <strong>Dexdor: </strong>1 ampoule de 200&#x3BC;g (2ml) dans 18ml
              SSI = seringue mère à 10&#x3BC;g/ml, en prélever 5ml dans seringue
              de 5ml
            </p>
          </div>
        </div>
        {/if}
        <div class="container_classic-drugs">
          <div class="pastille-carte">"Classiques"</div>
          <!-- /////////////////// SOUS CARTE DE PREPARATION DES DROGUES "CALSSIQUES" ////////////////////// -->
          <div class="classic-drug-card inner-card">
            <p><strong>Sufentanil:</strong> seringue de 50µg</p>
            <p><strong>Propofol:</strong> QSP 2 à 3 mg/kg</p>
            <p><strong>Curare:</strong> possible, au choix </p>
            <p><strong>Noradrénaline:</strong> seringue à 20µg/ml</p>
            <p><strong>Soluté:</strong> au choix</p>
            <p><strong>ALR:</strong> réalisable dans le protocole </p>


          </div>
        </div>
      </Card>

      <Card cardNumber={3} cardTitle={"Induction"}>
          <!-- :::::::::::::: CARTE DE RAPPEL SUR CHECKLIST ::::::::::::::::::: -->
        <div class="card3__checklist">
          <div class="pastille-carte">checklist</div>
          <item><input type="checkbox" name="standard" id="standard">  Monitorage standard (ECG, PNI, SpO2) </item>
          <item><input type="checkbox" name="bis" id="bis">  <strong>BIS (nécessaire)</strong> </item>
          <item><input type="checkbox" name="SPI" id="SPI">  <strong>SPI (nécessaire)</strong> </item>
          <item><input type="checkbox" name="nmt" id="nmt">  <strong>NMT (nécessaire)</strong> </item>
          <item><input type="checkbox" name="PA" id="PA">  <strong>Mesure PAM baseline allongé (nécéssaire)</strong> </item>
        </div>
        <!-- ::::::::::::::::: CARTE DU TIMER POUR PERFUSION DU POCHON OFA :::::::::::::::::::::: -->
        <div class="card3__POFA">
          <div class="pastille-carte">POFA</div>
          <div class="card3__POFA__innercontainer">
            <div class="card3__POFA__timer-text">
              <p>Perfuser le soluté POFA sur 5 minutes</p>
              <p>Utiliser le timer à droite si besoin</p>
            </div>
            <div class="round-timer5">
              <p>Start<br />5min</p>
              <svg>
                <circle
                  r="30"
                  cx="32"
                  cy="32"
                  style="animation-play-state: paused"
                ></circle>
              </svg>
            </div>
          </div>
        </div>
        <!-- :::::::::::::::::::::::::: CARTE SUR LA TITRATION DE LA DESMEDETO ::::::::::::: -->
        <div class="card3__titration">
          <div class="pastille-carte">Titration Dexdor</div>
          <div class="card3__titration__innercontainer">
            <div class="card3__titration__timer-text">
              <p>1- Mesure PA /1min pdt 10 min.</p>
              <p>2-Démarrer la noradrénaline 20µg à √10 (optionnel)</p>
              <p>3-Dexdor 10µg (1ml) / 1 min</p>
              <p>4-Titrer <strong>sur 5 min</strong> dose <strong>max 50µg</strong></p>
            </div>
            <div class="round-timer2">
              <p>Start<br />5min</p>
              <svg>
                <circle r="30" cx="32" cy="32"></circle>
              </svg>
            </div>
          </div>
          <div class="card3__titration__algorithm__container">
            <div class="card3__algorithm__card">
              <div class="algorithm__card__situation">
                <span>FC &lt; 50</span>
              </div>
              <div class="algorithm__card__reaction">
                Arrêt dexdor<br />+/-Atropine
              </div>
            </div>
            <div class="card3__algorithm__card cardOK">
              <div class="algorithm__card__situation situationOK">
                <span>FC [50-60]<br />PAM OK <br/>ou dose max</span>
              </div>
              <div class="algorithm__card__reaction reactionOK">
                Propofol 2,5 mg/kg <br>
                +/-Curare au choix <br>
                IOT ou ML
              </div>
            </div>
            <div class="card3__algorithm__card">
              <div class="algorithm__card__situation">
                <span>PAM &#8595; 20% ou &lt; 60</span>
              </div>
              <div class="algorithm__card__reaction">
                NAD<br />ou<br />Ephedrine
              </div>
            </div>
          </div>
        </div>

        <!-- ::::::::::::::::::::::: CARTE SUR INDUCTION CLASSIQUE ::::::::::::::::::::: -->
        <div class="card3__induction">
          <div class="pastille-carte">Induction</div>
          <p>
            Induction standard: <br>
            Sufentanil 0,25µg/kg <br>
            Propofol 2,5 mg/kg <br>
            +/- Curare au choix de l'anesthésiste<br/>
            Gestion des voies aeriennes: IOT ou ML
          </p>
        </div>
      </Card>

    <!-- fin du if de la validation du formulaire de calcul des doses initiales -->
    {/if}
</div>

<Footer/>


<style>
    .jumbo {
  font-family: 'Lato', sans-serif;
  color: var(--black);
  text-align: center;
}
    .jumbo h1 {
  margin-bottom: 10px;
  margin-top: 10px;
}

.title_paragraph1::before,
.title_paragraph2::before,
.title_paragraph3::before {
  right: 13%;
  top: 40px;
  font-size: 1rem;
  background: var(--bg-color);
  display: inline-block;
  color: var(--white);
  border-radius: 50%;
  padding: 5px;
  height: 20px;
  min-width: 20px;
  position: relative;
  text-align: center;
  box-shadow: 3px 3px 7px var(--neu-darker), -3px -3px 7px var(--neu-white);
}
.title_paragraph3::before {
  content: '3';
}
.title_paragraph2::before {
  content: '2';
}
.title_paragraph1::before {
  content: '1';
}

.container__title {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-left: 20px;
}

.title_paragraph1,
.title_paragraph2,
.title_paragraph3 {
  width: 28%;
  display: block;
  text-align: start;
  margin-top: -25px;
}

.data-container {
  width: 100%;
  padding-bottom: 10px;
  max-height: 100vh;
  margin-top: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

.ligne {
  width: 60%;
  height: 2px;
  border-bottom: solid 1px var(--neu-darker);
  margin: auto;
  border-color: var(--white);
}



</style>