// fetch("https://pokeapi.co/api/v2/pokemon/ditto")
//     .then(response => {

//         if(!response.ok){
//             throw new Error("Could not fetch");
//         }
//         return response.json();
//     })
//     .then(data => console.log(data))
//     .catch(error => console.error(error))

FetchData();

async function FetchData() {
    try{
        const pokemonName = document.getElementById("PokomonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!response.ok){
            throw new Error("Couldn't fetch");
        }
        const data = await response.json();

        const name = document.getElementById("name");
        name.textContent = data.name;

        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemon");
        imgElement.src = pokemonSprite;
        imgElement.style = "block";
    }
    catch(error){
        console.error(error);
    }
}