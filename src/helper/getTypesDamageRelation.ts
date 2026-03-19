import type { DamageRelation, Type } from 'models/models';

export const getTypesDamageRelation = (types: Type[]): DamageRelation => {
	if (types.length === 2) {
		const damageRelation: DamageRelation = {
			noDamageFrom: [],
			quarterDamageFrom: [],
			halfDamageFrom: [],
			doubleDamageFrom: [],
			quadrupleDamageFrom: []
		};

		for (const currentType of types) {
			for (const currentDoubleDamageFromType of currentType.doubleDamageFrom) {
				if (!damageRelation.doubleDamageFrom.includes(currentDoubleDamageFromType)) {
					damageRelation.doubleDamageFrom.push(currentDoubleDamageFromType);
				} else {
					damageRelation.doubleDamageFrom = damageRelation.doubleDamageFrom.filter((type) => type !== currentDoubleDamageFromType);

					if (damageRelation.quadrupleDamageFrom !== undefined) {
						damageRelation.quadrupleDamageFrom.push(currentDoubleDamageFromType);
					} else {
						damageRelation.quadrupleDamageFrom = [];
					}
				}
			}

			for (const currentHalfDamageFromType of currentType.halfDamageFrom) {
				if (!damageRelation.halfDamageFrom.includes(currentHalfDamageFromType)) {
					damageRelation.halfDamageFrom.push(currentHalfDamageFromType);
				} else {
					damageRelation.halfDamageFrom = damageRelation.halfDamageFrom.filter((type) => type !== currentHalfDamageFromType);

					if (damageRelation.quarterDamageFrom !== undefined) {
						damageRelation.quarterDamageFrom.push(currentHalfDamageFromType);
					} else {
						damageRelation.quarterDamageFrom = [];
					}
				}
			}

			for (const currentNoDamageFromType of currentType.noDamageFrom) {
				if (!damageRelation.noDamageFrom.includes(currentNoDamageFromType)) {
					damageRelation.noDamageFrom.push(currentNoDamageFromType);
				}
			}
		}

		const neutralTypes = damageRelation.doubleDamageFrom.filter((type) => damageRelation.halfDamageFrom.includes(type));

		for (const currentNeutralType of neutralTypes) {
			damageRelation.doubleDamageFrom = damageRelation.doubleDamageFrom.filter((type) => type !== currentNeutralType);
			damageRelation.halfDamageFrom = damageRelation.halfDamageFrom.filter((type) => type !== currentNeutralType);
		}

		for (const currentNoDamageFromType of damageRelation.noDamageFrom) {
			if (damageRelation.quadrupleDamageFrom !== undefined && damageRelation.quadrupleDamageFrom.includes(currentNoDamageFromType)) {
				damageRelation.quadrupleDamageFrom = damageRelation.quadrupleDamageFrom.filter((type) => type !== currentNoDamageFromType);
			}
			if (damageRelation.doubleDamageFrom.includes(currentNoDamageFromType)) {
				damageRelation.doubleDamageFrom = damageRelation.doubleDamageFrom.filter((type) => type !== currentNoDamageFromType);
			}
			if (damageRelation.halfDamageFrom.includes(currentNoDamageFromType)) {
				damageRelation.halfDamageFrom = damageRelation.halfDamageFrom.filter((type) => type !== currentNoDamageFromType);
			}
			if (damageRelation.quarterDamageFrom !== undefined && damageRelation.quarterDamageFrom.includes(currentNoDamageFromType)) {
				damageRelation.quarterDamageFrom = damageRelation.quarterDamageFrom.filter((type) => type !== currentNoDamageFromType);
			}
		}

		return damageRelation;
	}

	return {
		noDamageFrom: types[0].noDamageFrom,
		halfDamageFrom: types[0].halfDamageFrom,
		doubleDamageFrom: types[0].doubleDamageFrom
	};
};

