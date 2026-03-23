import type { DamageRelationFrom, Type } from 'models/models';

export const getDoubleTypeDamageRelationFrom = (types: Type[]): DamageRelationFrom => {
	const damageRelationFrom: DamageRelationFrom = {
		noDamageFrom: [],
		quarterDamageFrom: [],
		halfDamageFrom: [],
		doubleDamageFrom: [],
		quadrupleDamageFrom: []
	};

	for (const currentType of types) {
		for (const currentDoubleDamageFromType of currentType.doubleDamageFrom) {
			if (!damageRelationFrom.doubleDamageFrom.includes(currentDoubleDamageFromType)) {
				damageRelationFrom.doubleDamageFrom.push(currentDoubleDamageFromType);
			} else {
				damageRelationFrom.doubleDamageFrom = damageRelationFrom.doubleDamageFrom.filter((type) => type !== currentDoubleDamageFromType);

				if (damageRelationFrom.quadrupleDamageFrom !== undefined) {
					damageRelationFrom.quadrupleDamageFrom.push(currentDoubleDamageFromType);
				} else {
					damageRelationFrom.quadrupleDamageFrom = [];
				}
			}
		}

		for (const currentHalfDamageFromType of currentType.halfDamageFrom) {
			if (!damageRelationFrom.halfDamageFrom.includes(currentHalfDamageFromType)) {
				damageRelationFrom.halfDamageFrom.push(currentHalfDamageFromType);
			} else {
				damageRelationFrom.halfDamageFrom = damageRelationFrom.halfDamageFrom.filter((type) => type !== currentHalfDamageFromType);

				if (damageRelationFrom.quarterDamageFrom !== undefined) {
					damageRelationFrom.quarterDamageFrom.push(currentHalfDamageFromType);
				} else {
					damageRelationFrom.quarterDamageFrom = [];
				}
			}
		}

		for (const currentNoDamageFromType of currentType.noDamageFrom) {
			if (!damageRelationFrom.noDamageFrom.includes(currentNoDamageFromType)) {
				damageRelationFrom.noDamageFrom.push(currentNoDamageFromType);
			}
		}
	}

	const neutralTypes = damageRelationFrom.doubleDamageFrom.filter((type) => damageRelationFrom.halfDamageFrom.includes(type));

	for (const currentNeutralType of neutralTypes) {
		damageRelationFrom.doubleDamageFrom = damageRelationFrom.doubleDamageFrom.filter((type) => type !== currentNeutralType);
		damageRelationFrom.halfDamageFrom = damageRelationFrom.halfDamageFrom.filter((type) => type !== currentNeutralType);
	}

	for (const currentNoDamageFromType of damageRelationFrom.noDamageFrom) {
		if (damageRelationFrom.quadrupleDamageFrom !== undefined && damageRelationFrom.quadrupleDamageFrom.includes(currentNoDamageFromType)) {
			damageRelationFrom.quadrupleDamageFrom = damageRelationFrom.quadrupleDamageFrom.filter((type) => type !== currentNoDamageFromType);
		}
		if (damageRelationFrom.doubleDamageFrom.includes(currentNoDamageFromType)) {
			damageRelationFrom.doubleDamageFrom = damageRelationFrom.doubleDamageFrom.filter((type) => type !== currentNoDamageFromType);
		}
		if (damageRelationFrom.halfDamageFrom.includes(currentNoDamageFromType)) {
			damageRelationFrom.halfDamageFrom = damageRelationFrom.halfDamageFrom.filter((type) => type !== currentNoDamageFromType);
		}
		if (damageRelationFrom.quarterDamageFrom !== undefined && damageRelationFrom.quarterDamageFrom.includes(currentNoDamageFromType)) {
			damageRelationFrom.quarterDamageFrom = damageRelationFrom.quarterDamageFrom.filter((type) => type !== currentNoDamageFromType);
		}
	}

	return damageRelationFrom;
};

