import React from 'react'

export default function PokemonList( { pokemon } ) {
    return (
        <div>
            {pokemon.map(p => (
                //the key below is needed when you have an object inside of an array
                //this allows react to render things efficiently 
                <div key={p} >{p}</div>
            ))}
        </div>
    )
}
