import { formatPokemonName, getGeneration } from 'helper/helper';
import type { GenericAbility, GenericAllPokemon, GenericDamageRelation, GenericPokemon, GenericType } from 'models/genericModels';
import type { Ability, DamageRelation, Pokemon, PokemonAutocompleteItem, Stats, Type } from 'models/models';

export const getSprite = (pokemon: GenericPokemon): string => {
	return pokemon.sprites.versions['generation-v']['black-white'].animated.front_default ?? pokemon.sprites.front_default; // choose gif over png
};

export const getPokedexNumber = (pokemon: GenericPokemon): number => {
	return pokemon.id;
};

export const filterPokemonData = (pokemon: GenericPokemon): Pokemon => {
	const types: string[] = [];
	const abilities: string[] = [];
	const stats = {
		hp: 0,
		attack: 0,
		defense: 0,
		'special-attack': 0,
		'special-defense': 0,
		speed: 0,
	};

	const name = formatPokemonName(pokemon.name);

	for (const type of pokemon.types) {
		types.push(type.type.name);
	}

	for (const ability of pokemon.abilities) {
		abilities.push(ability.ability.name);
	}

	for (const stat of pokemon.stats) {
		stats[stat.stat.name] = stat.base_stat;
	}

	const convertedStats: Stats = {
		specialAttack: stats['special-attack'],
		specialDefense: stats['special-defense'],
		...stats
	};

	return {
		name,
		originalName: pokemon.name,
		sprite: pokemon.sprites.versions['generation-v']['black-white'].animated.front_default ?? pokemon.sprites.front_default, // choose gif over png
		types,
		abilities,
		...convertedStats,
	};
};

export const getPokemonAutocompleteItem = (pokemon: GenericPokemon): PokemonAutocompleteItem => ({
	pokedexNumber: pokemon.id,
	name: pokemon.name,
	sprite: getSprite(pokemon),
	generation: getGeneration(pokemon.id)
});

export const getAbilityDescription = (ability: GenericAbility): Ability => {
	let description: string = '';
	let updatedAbility: Ability = {};

	if (ability.effect_entries.length > 0) {
		for (const entry of ability.effect_entries) {
			if (entry.language.name === 'en') {
				description = entry.short_effect;
				updatedAbility = { [ability.name]: description };
			}
		}
	} else if (ability.flavor_text_entries.length > 0) {
		for (const entry of ability.flavor_text_entries) {
			if (entry.language.name === 'en') {
				description = entry.flavor_text;
				updatedAbility = { [ability.name]: description };
			}
		}
	}

	return updatedAbility;
};

export const filterTypeData = (type: GenericType): Type => {
	const damageRelation: GenericDamageRelation = {
		no_damage_from: [],
		no_damage_to: [],
		half_damage_from: [],
		half_damage_to: [],
		double_damage_from: [],
		double_damage_to: [],
	};

	for (const relation in type.damage_relations) {
		for (const data of type.damage_relations[relation as keyof GenericDamageRelation]) {
			damageRelation[relation as keyof GenericDamageRelation].push(data.name);
		}
	}

	const convertedDamageRelation: DamageRelation = {
		noDamageFrom: damageRelation.no_damage_from,
		halfDamageFrom: damageRelation.half_damage_from,
		doubleDamageFrom: damageRelation.double_damage_from,
	};

	return {
		name: type.name,
		...convertedDamageRelation,
	};
};

export const getAllPokemonNames = (allPokemon: GenericAllPokemon): string[] => {
	return allPokemon.results.map((pokemon) => pokemon.name);
};
