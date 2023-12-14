<script>
    import Card from '$lib/Card.svelte';
    import Footer from '$lib/Footer.svelte'

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
              />
              <br />
              <label for="women-radio"
                >Femme<input
                  required
                  type="radio"
                  name="sexe"
                  id="women-radio" /><span></span
              ></label>
    
              <label for="men-radio"
                >Homme<input
                  required
                  type="radio"
                  name="sexe"
                  id="men-radio" /><span></span
              ></label>
              <br />
              <input type="submit" value="valider" on:click|preventDefault={}/>
            </form>
    </Card>
    <Card cardNumber={"2"} cardTitle={"déroulement"}/>
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