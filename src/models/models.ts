export interface Pokemon extends Stats {
	name: string,
	originalName: string,
	sprite: string,
	types: string[],
	abilities: string[],
}

export interface Stats {
	hp: number,
	attack: number,
	defense: number,
	specialAttack: number,
	specialDefense: number,
	speed: number,
}

export interface Type extends DamageRelation {
	name: string,
}

export interface DamageRelation {
	noDamageFrom: string[],
	quarterDamageFrom?: string[],
	halfDamageFrom: string[],
	doubleDamageFrom: string[],
	quadrupleDamageFrom?: string[],
}

export interface Types {
	normal: string,
	fire: string,
	fighting: string,
	water: string,
	flying: string,
	grass: string,
	poison: string,
	electric: string,
	ground: string,
	psychic: string,
	rock: string,
	ice: string,
	bug: string,
	dragon: string,
	ghost: string,
	dark: string,
	steel: string,
	fairy: string,
}

export type Ability = Record<string, string>;

export interface PokemonAutocompleteItem {
	pokedexNumber: number,
	name: string,
	sprite: string,
	generation: string
}
