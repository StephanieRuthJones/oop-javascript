//encapsulate state and behavior with classes
//create a pokemon class that stores a Pokemon's name, image URL, and list of abilities
//add a method called createCard that generates a DOM node 
//fetch list of pokemon
//create a new instance of the pokemon class for each pokemon you retrieve
//generate cards for each pokemon
class Pokemon {
    constructor(name, imageUrl, abilities) {
        this.name = name
        this.imageUrl = imageUrl
        this.abilities = abilities
    }
    // static keyword indicates that the particular member belongs to a type itself, rather than to an instance of that type. 
    //This means that only one instance of that static member is created which is shared across all instances of the class
    static displayPokemon(name) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => response.json())
            .then(pokemon => {
                const abilities = pokemon.abilities.map(p => p.ability.name)
                return new Pokemon(pokemon.name, pokemon.sprites.front_default, abilities)
            }).then(pokemon => {
                const $li = document.createElement("li")
                $li.append(pokemon.createCard())

                const $ul = document.querySelector(".pokemon")
                $ul.append($li)

                return pokemon
            })
    }
    //in classes, just write createCard(){}, no function keyword
    //can reference name, imageUrl, and abilities without passing them to f below
    createCard() {
        const $card = document.createElement('div')

        const abilities = this.abilities
            .map(ability => `<li>${ability}</li>`)
            .join("") //makes array of strings one string

        $card.classList.add("pokemon-card") //reason don't use className = because it will overwrite classes that are already there; versus this which just adds the class
        $card.innerHTML = `
            <p>${this.name}</p>
            <img src=${this.imageUrl} alt="Pikachu"/>
            <ul class="abilities">${abilities}</ul>
            `

        //can return as a method or store it as an instance
        return $card
    }

}

Pokemon.displayPokemon('pikachu')
//with classes, we keep everything encapsulated rather than using separate functions (FP) that combine in unique ways to create what we want to create
//Why choose FP?
//when do a variable declaration and then do something with the variable, introduced concept of time into app
    //e.g., const a = 1 const b = a * 2
//most bugs run into in programming is purely an issue of time; FP avoids this issue
//can test individual functions independently 