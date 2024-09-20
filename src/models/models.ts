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
	originalName: string,
	sprite: string,
	generation: string
}

export interface Item {
	description: string,
	flingEffect: string | null,
	flingPower: number,
	name: string,
	sprite: string
}

export interface Move {
	accuracy: number,
	ailment: string,
	damageClass: 'status' | 'physical' | 'special',
	effectChance: number,
	description: string,
	category: string,
	critRate: number,
	drain: number,
	flinchChance: number,
	healing: number,
	isContact: boolean,
	maxHits: number,
	maxTurns: number,
	minHits: number,
	minTurns: number,
	statChangeChance: number,
	name: string,
	power: number,
	powerPoints: number,
	priority: number,
	statChanges: Array<{
		change: number,
		stat: keyof Stats
	}>,
	target: string,
	type: string
}
