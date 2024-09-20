export interface GenericPokemon {
	name: string,
	types: [{
		type: {
			name: string
		}
	}],
	abilities: [{
		ability: {
			name: string
		}
	}],
	stats: [{
		base_stat: number,
		stat: {
			name: keyof GenericStats
		}
	}],
	sprites: {
		front_default: string,
		versions: {
			'generation-v' : {
				'black-white': {
					animated: {
						front_default: string
					}
				}
			}
		}
	},
	id: number,
	[key: string]: unknown
}

export interface GenericStats {
	hp: string,
	attack: string,
	defense: string,
	'special-attack': string,
	'special-defense': string,
	speed: string
}

export interface GenericAllPokemon {
	results: [{
		name: string,
		url: string
	}],
	[key: string]: unknown
}

export interface GenericAbility {
	name: string,
	effect_entries: [{
		effect: string,
		language: {
			name: string
		}
	}],
	flavor_text_entries: [{
		flavor_text: string,
		language: {
			name: string
		}
	}],
	[key: string]: unknown
}

export interface GenericAbilities {
	results: [{
		name: string
	}],
	[key: string]: unknown
}

export interface GenericType {
	name: string,
	damage_relations: {
		no_damage_from: [{
			name: string
		}],
		no_damage_to: [{
			name: string
		}],
		half_damage_from: [{
			name: string
		}],
		half_damage_to: [{
			name: string
		}],
		double_damage_from: [{
			name: string
		}],
		double_damage_to: [{
			name: string
		}]
	},
	[key: string]: unknown
}

export interface GenericDamageRelation {
	no_damage_from: string[],
	no_damage_to: string[],
	half_damage_from: string[],
	half_damage_to: string[],
	double_damage_from: string[],
	double_damage_to: string[]
}

export interface GenericItem {
	effect_entries: [{
		effect: string,
		language: {
			name: string
		}
	}],
	fling_effect: {
		name?: string
	},
	fling_power: number,
	name: string,
	sprites: {
		default: string
	},
	[key: string]: unknown
}

export interface GenericMove {
	accuracy: number,
	damage_class: {
		name: 'status' | 'physical' | 'special'
	},
	effect_chance: number,
	effect_entries: [{
		effect: string,
		language: {
			name: string
		}
	}],
	meta: {
		ailment: {
			name: string
		},
		category: {
			name: string
		},
		crit_rate: number,
		drain: number,
		flinch_chance: number,
		healing: number,
		max_hits: number,
		max_turns: number,
		min_hits: number,
		min_turns: number,
		stat_chance: number
	}
	name: string,
	power: number,
	pp: number,
	priority: number,
	stat_changes: [{
		change: number,
		stat: {
			name: keyof GenericStats
		}
	}],
	target: {
		name: string
	},
	type: {
		name: string
	},
	[key: string]: unknown
}
