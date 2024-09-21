import { formatName, getGeneration } from 'helper/helper';
import type { GenericAbility, GenericAllPokemon, GenericDamageRelation, GenericItem, GenericMove, GenericPokemon, GenericType } from 'models/genericModels';
import type { Ability, DamageRelation, Item, Move, Pokemon, PokemonAutocompleteItem, Stats, Type } from 'models/models';

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
		name: formatName(pokemon.name),
		originalName: pokemon.name,
		sprite: getSprite(pokemon),
		types,
		abilities,
		...convertedStats,
	};
};

export const getPokemonAutocompleteItem = (pokemon: GenericPokemon): PokemonAutocompleteItem => ({
	pokedexNumber: pokemon.id,
	name: formatName(pokemon.name),
	originalName: pokemon.name,
	sprite: getSprite(pokemon),
	generation: getGeneration(pokemon.id)
});

export const getAbilityDescription = (ability: GenericAbility): Ability => {
	let description: string = '';
	let updatedAbility: Ability = {};

	if (ability.effect_entries.length > 0) {
		for (const entry of ability.effect_entries) {
			if (entry.language.name === 'en') {
				description = entry.effect;
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

export const getContactMoves = (contactMovesHtml: string): string[] => {
	const contactMovesArray: string[] = [];
	const contactMovesSection = contactMovesHtml.match(
		/id="Moves_that_make_contact"(?<contactMovesSectionCaptureGroup>[\s\S]*)id="Shadow_moves"/
	);

	if (contactMovesSection?.groups?.contactMovesSectionCaptureGroup !== undefined) {
		const contactMoves = [...contactMovesSection.groups.contactMovesSectionCaptureGroup.matchAll(
			/<td style="text-align:left"><a href="[^"]*" title="[^"]*"><span style="color:#000000;">(?<contactMoveCaptureGroup>[^<]*)/g
		)];

		const filteredContactMoves = contactMoves.map((contactMove) => {
			if (contactMove?.groups?.contactMoveCaptureGroup !== undefined) {
				return contactMove?.groups?.contactMoveCaptureGroup;
			} else {
				return contactMove[1];
			}
		});

		contactMovesArray.push(...filteredContactMoves);
	}

	return contactMovesArray;
};

export const filterItemData = (item: GenericItem): Item => {
	let description: string = '';

	for (const entry of item.effect_entries) {
		if (entry.language.name === 'en') {
			description = entry.effect;
		}
	}

	return {
		description,
		flingEffect: item.fling_effect?.name ?? null,
		flingPower: item.fling_power,
		name: item.name,
		sprite: item.sprites.default
	};
};

export const filterMoveData = (move: GenericMove, contactMoves: string[]): Move => {
	let description: string = '';
	const statChanges: Array<{
		change: number,
		stat: keyof Stats
	}> = [];

	for (const entry of move.effect_entries) {
		if (entry.language.name === 'en') {
			description = entry.effect;
		}
	}

	const name = formatName(move.name);

	if (move.stat_changes.length > 0) {
		for (const statChange of move.stat_changes) {
			statChanges.push({
				change: statChange.change,
				stat: statChange.stat.name.replace(/special-(a|d)/, (_match, captureGroup) => {
					return captureGroup === 'a' ? 'specialA' : 'specialD';
				}) as keyof Stats
			});
		}
	}

	return {
		accuracy: move.accuracy,
		ailment: move.meta.ailment.name,
		damageClass: move.damage_class.name,
		effectChance: move.effect_chance,
		description,
		category: move.meta.category.name,
		critRate: move.meta.crit_rate,
		drain: move.meta.drain,
		flinchChance: move.meta.flinch_chance,
		healing: move.meta.healing,
		isContact: contactMoves.includes(name),
		maxHits: move.meta.max_hits,
		maxTurns: move.meta.max_turns,
		minHits: move.meta.min_hits,
		minTurns: move.meta.min_turns,
		statChangeChance: move.meta.stat_chance,
		name,
		power: move.power,
		powerPoints: move.pp,
		priority: move.priority,
		statChanges,
		target: move.target.name,
		type: move.type.name
	};
};
