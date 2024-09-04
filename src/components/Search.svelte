<script lang="ts">

import { fade } from 'svelte/transition';

//Toutes les villes dispos triées par population pour toujours proposer en premier la plus probable des réponses
const allCities = [
    "paris", "marseille", "lyon", "toulouse", "nice", "nantes", "montpellier", "strasbourg", "bordeaux", "lille",
    "rennes", "reims", "le havre", "saint-étienne", "toulon", "grenoble", "dijon", "angers", "nîmes", "villeurbanne",
    "clermont-ferrand", "saint-denis", "aix-en-provence", "le mans", "brest", "tours", "amiens", "limoges",
    "annecy", "perpignan", "boulogne-billancourt", "metz", "besançon", "orléans", "mulhouse", "rouen",
    "saint-denis", "caen", "argenteuil", "montreuil", "nancy", "saint-paul", "roubaix", "tourcoing",
    "dunkerque", "nanterre", "créteil", "avignon", "vitry-sur-seine", "poitiers", "ajaccio", "courbevoie",
    "versailles", "pau", "colombes", "asnières-sur-seine", "aulnay-sous-bois", "la rochelle", "rueil-malmaison",
    "antibes", "saint-maur-des-fossés", "calais", "champigny-sur-marne", "béziers", "cannes", "colmar", "bourges",
    "drancy", "quimper", "levallois-perret", "noisy-le-grand", "la seyne-sur-mer", "niort", "sarcelles", "mérignac",
    "issy-les-moulineaux", "lorient", "villeneuve-d'ascq", "neuilly-sur-seine", "troyes", "clichy", "chambéry",
    "le blanc-mesnil", "les abymes", "pessac", "ivry-sur-seine", "épinay-sur-seine", "vénissieux", "cergy", "antony",
    "tulle", "mantes-la-jolie", "vannes", "saint-nazaire", "sartrouville", "pantin", "suresnes", "maisons-alfort",
    "meaux", "montauban"
]

let query = "";
let result = "";
let cities = allCities;
let listOnScreen = false;
// export let weather;


function filterList(){
    if(query.length >= 3){
        cities = allCities.filter((el) => el.substring(0,query.length) == query);
    }else if(query.length < 3){
        cities = allCities;
    }
}

function updateQuery(el){
    console.log("On cherche " + el);
}

function searchQuery(el){
    query = el;
    listOnScreen = false;
    updateQuery(el);
    displayResult(el);
    getWeather(el);    
}

function displayResult(el){
    result = el;
}

/******************************/
/* API CALL TEST */

let weather;
let icon;
let iconCode;
let iconTime;
let temperature;

async function getWeather(city) {
		const response = await fetch('/getWeather?city=' + city);
		weather = await response.json();
        icon = weather.weather[0].icon;
        iconCode = icon.slice(0,2);
        iconTime = icon.slice(2,3);
        temperature = weather.main.temp -273,15;
        temperature = Math.round(temperature * 10) / 10
        console.log(weather);
        
	}
/******************************************/
</script>


<div class="component {iconTime} {iconTime}{iconCode}">

    <input type="text"
    class="search-input"
    id=""
    bind:value={query} 
    on:input={filterList}
    on:focusin={() => listOnScreen = true}>

    {#if listOnScreen}
        <div class="city-list"
            in:fade={{ duration: 100, delay: 100 }}
        >
        {#each cities as city}
            <button class="city-opt" style="width: 100%; margin: auto; padding: 10px" on:click={() => searchQuery(city)}>{ city }</button><br>
        {/each}
        </div>
    {/if}

    {#if weather !== undefined}

        <h2>{ query }</h2>
        <h3>{ temperature }°</h3>
        <img class="weather-icon" alt="" src="{iconCode}.png">
        

    {:else}
        <h1>What weather is it ?</h1>
        <button class="random-city">Random city</button>
    {/if}   

</div>





