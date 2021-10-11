let APIKey = "ad6d0544-e47a-4f70-a697-6c4078e4291f";

const url = "https://api.pokemontcg.io/v2/cards"
const searchInput = document.getElementById("searchInput");
const suggestionPanel = document.getElementById("suggestions")
let pokemonArray = [];

window.onload = function createArray()
{
  fetch(url)
    .then(function(response)
    {
      return response.json();
    })

    .then(function(json)
    {
      for (let i = 0; i < json.data.length; i++)
      {
        pokemonArray[i] = json.data[i];
        console.log(pokemonArray[i].name);
      }
    })
}

searchInput.addEventListener("keyup", function()
{
  const input = searchInput.value;
  suggestionPanel.innerHTML = '';
  document.getElementById("footer").style.position = "absolute";

  const suggestions = pokemonArray.filter(function(card)
  {
    return card.name.toLowerCase().startsWith(input);
  });

  suggestions.forEach(function(suggested)
  {
    const div = document.createElement('div');
    div.innerHTML = suggested.name + " (" + suggested.set.name + ")";
    suggestionPanel.appendChild(div);
    suggestionPanel.style.borderTop = "2px solid black";
  });

  if (input === '')
  {
    suggestionPanel.innerHTML = '';
    suggestionPanel.style.borderTop = "none";
  }
});

suggestionPanel.addEventListener("click", function(selection)
{
  suggestionPanel.innerHTML = '';
  let pokemon = "";

  pokemon = selection.target.innerText.split('(');
  set = pokemon[1];
  set = set.slice(0, -1);
  pokemon = pokemon[0].slice(0, -1);

  console.log(pokemon);
  console.log(set);

  const pokemonWithName = pokemonArray.filter(poke => poke.name === pokemon);
  console.log(pokemonWithName);

  const pokemonInSet = pokemonWithName.filter(poke => poke.set.name === set)
  console.log(pokemonInSet);

  let pokemonPhoto = "";
  let info = "";

  let cardURL = pokemonInSet[0].images.small;
  pokemonPhoto += "<img src =" + cardURL + " width = 300px>"

  info += "<p>" + pokemonInSet[0].name + " (" + pokemonInSet[0].set.name + ")</p>";
  info += "<p>Type: " + pokemonInSet[0].types + "</p>";
  info += "<p>Weaknesses: " + pokemonInSet[0].weaknesses[0].type + "</p>";
  info += "<p>Rarity: " + pokemonInSet[0].rarity + "</p>";
  info += "<p>&nbsp</p>"
  info += "<p><a href =" + pokemonInSet[0].tcgplayer.url + ">Buy here</a>" + "</p>";

  cardPicture.innerHTML = pokemonPhoto;
  cardInfo.innerHTML = info;

  document.getElementById("pokemonResults").style.width = "400px";
  document.getElementById("pokemonResults").style.paddingTop = "45px";
  document.getElementById("pokemonResults").style.paddingBottom = "40px";
  document.getElementById("pokemonResults").style.borderRadius = "30px";
  document.getElementById("pokemonResults").style.backgroundColor = "black";
});
