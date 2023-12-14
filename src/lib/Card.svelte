<script>
    import { onMount } from "svelte";

    /**@type {string}*/
    export let cardNumber;
    /** @type {string}*/
    export let cardTitle = 0;
    onMount(()=>{
        console.log(`la carte numéro ${cardNumber} a été montée`)
        document.documentElement.style.setProperty('--cardNumber', cardNumber)
    })
</script>

<div class={'data-card card'+cardNumber}>
    <div class="title-flex">
        <span>{cardNumber}</span>
        <h3>{cardTitle}</h3>
    </div>
    <slot />
</div>



<style>
.data-card {
    max-width: 300px;
    min-width: 280px;
    opacity: 1;
    max-height: 80vh;
    background: var(--bg-color);
    max-width: 30%;
    min-width: 380px;
    border-radius: 20px;
    text-align: center;
    box-shadow: var(--offset-big-box) var(--offset-big-box) var(--blur-big-box)
            var(--neu-darker),
            var(--offset-big-box-neg) var(--offset-big-box-neg) var(--blur-big-box)
            var(--neu-white);
}

.title-flex{
    display: flex;
    justify-content:left;

}

h3 {
    position: relative;
    left: calc(50% - 30px);
    transform: translateX(-50%)
}

span {
    text-align: left;
    position:absolute;
    top: 10px;
    left: 10px;
    display:block;
    margin-right: 10px;
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


</style>