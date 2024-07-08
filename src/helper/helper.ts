export const capitalizeFirstLetter = (word: string): string => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const reduceArray = (array: unknown[][]): unknown[] => {
	return array.reduce(
		(accumulator, currentArray) => {
			for (const currentElement of currentArray) {
				if (!accumulator.includes(currentElement)) {
					accumulator.push(currentElement);
				}
			}

			return accumulator;
		},
		[]
	);
};

/**
 * Converts an ability string for cleaner output, dry-skin -> Dry Skin
 * @param {string} name - A dash separated ability string.
 * @returns {string} A space separated/capitalized ability string.
 */
export const formatAbilityName = (name: string): string => {
	const updatedNameArray: string[] = [];

	for (const item of name.split('-')) {
		updatedNameArray.push(capitalizeFirstLetter(item));
	}

	return updatedNameArray.join(' ');
};

export const formatPokemonName = (name: string): string => {
	let updatedName: string = '';

	if (name.includes('-')) {
		const split = name.split('-');

		for (const word of split) {
			updatedName += capitalizeFirstLetter(word) + ' ';
		}

		if (updatedName.includes('Mega')) {
			updatedName = 'Mega ' + updatedName.replace('Mega', '');
		}
	} else {
		updatedName = capitalizeFirstLetter(name);
	}

	return updatedName;
};

export const getProgressColor = (progressValue: number): string => {
	const colorRanges = [
		{ max: 10, color: '#B30000' },
		{ max: 20, color: '#B35C00' },
		{ max: 30, color: '#B39900' },
		{ max: 40, color: '#B3B300' },
		{ max: 50, color: '#4CB300' },
		{ max: 60, color: '#1AB300' },
		{ max: 70, color: '#00B32D' },
		{ max: 80, color: '#00B371' },
		{ max: 90, color: '#0077B3' },
		{ max: 100, color: '#3D0077' },
	];

	for (const range of colorRanges) {
		if (progressValue <= range.max) {
			return range.color;
		}
	}

	return 'primary';
};

export const getGeneration = (pokedexNumber: number): string => {
	if (pokedexNumber <= 151) {
		return 'Generation I';
	} else if (pokedexNumber >= 152 && pokedexNumber <= 251) {
		return 'Generation II';
	} else if (pokedexNumber >= 252 && pokedexNumber <= 386) {
		return 'Generation III';
	} else if (pokedexNumber >= 387 && pokedexNumber <= 493) {
		return 'Generation IV';
	} else if (pokedexNumber >= 494 && pokedexNumber <= 649) {
		return 'Generation V';
	} else if (pokedexNumber >= 650 && pokedexNumber <= 721) {
		return 'Generation VI';
	} else if (pokedexNumber >= 722 && pokedexNumber <= 809) {
		return 'Generation VII';
	} else if (pokedexNumber >= 810 && pokedexNumber <= 905) {
		return 'Generation VIII';
	} else if (pokedexNumber >= 906 && pokedexNumber <= 1025) {
		return 'Generation IX';
	} else {
		return 'Other';
	}
};
