import { type Ability, type Move, type Types } from 'models/models';

export const typeColors: Types = {
	normal: '#A8A878',
	fire: '#F08030',
	fighting: '#C03028',
	water: '#6890F0',
	flying: '#A890F0',
	grass: '#78C850',
	poison: '#A040A0',
	electric: '#F8D030',
	ground: '#E0C068',
	psychic: '#F85888',
	rock: '#B8A038',
	ice: '#98D8D8',
	bug: '#A8B820',
	dragon: '#7038F8',
	ghost: '#705898',
	dark: '#705848',
	steel: '#B8B8D0',
	fairy: '#EE99AC',
};

export const defaultAbility: Ability = {
	'name': 'description'
};

export const defaultMove: Move = {
	accuracy: 0,
	ailment: '',
	damageClass: 'status',
	effectChance: 0,
	description: '',
	category: '',
	critRate: 0,
	drain: 0,
	flinchChance: 0,
	healing: 0,
	isContact: false,
	maxHits: 0,
	maxTurns: 0,
	minHits: 0,
	minTurns: 0,
	statChangeChance: 0,
	name: '',
	power: 0,
	powerPoints: 0,
	priority: 0,
	statChanges: [],
	target: '',
	type: ''
};
