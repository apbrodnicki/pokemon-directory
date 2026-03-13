import { Autocomplete, Box, Button, List, TextField, Typography, createFilterOptions } from '@mui/material';
import { useFetchAllPokemonNames } from 'api/pokemon/useFetchAllPokemonNames';
import { useFetchPokemonAutocompleteItems } from 'api/useFetchPokemonAutocompleteItems';
import { PokemonListContext } from 'contexts/PokemonListContext';
import { generateKey, sortPokemonAutocompleteItemArrayByGeneration } from 'helper/helper';
import { useUpdatePokemonList } from 'hooks/useUpdatePokemonList';
import type { PokemonAutocompleteItem } from 'models/models';
import React, { useContext, useState } from 'react';
import { StyledGroupListItem, StyledOptionListItem, StyledPaper } from './custom/Styles';

export const UpdatePokemon = (): React.JSX.Element => {
	const { pokemonList } = useContext(PokemonListContext);

	const [pokemonInput, setPokemonInput] = useState<string[]>([]);
	const [autocompleteKey, setAutocompleteKey] = useState<string>('');
	const [addInputValue, setAddInputValue] = useState<string>('');
	const [removeInputValue, setRemoveInputValue] = useState<string>('');
	const [isLoadingAddAutocompleteItems, setIsLoadingAddAutocompleteItems] = useState<boolean>(true);
	const [isLoadingRemoveAutocompleteItems, setIsLoadingRemoveAutocompleteItems] = useState<boolean>(true);
	const isLoading = isLoadingAddAutocompleteItems || isLoadingRemoveAutocompleteItems;

	const updatePokemonList = useUpdatePokemonList();

	const allPokemonNames = useFetchAllPokemonNames();

	const addAutocompleteOptions = useFetchPokemonAutocompleteItems({
		pokemonList: allPokemonNames,
		setIsLoadingPokemonAutocompleteItems: setIsLoadingAddAutocompleteItems
	});
	const removeAutocompleteOptions = useFetchPokemonAutocompleteItems({
		pokemonList,
		setIsLoadingPokemonAutocompleteItems: setIsLoadingRemoveAutocompleteItems
	});

	const sortedRemoveAutocompleteOptions = sortPokemonAutocompleteItemArrayByGeneration(removeAutocompleteOptions);

	const onAutocompleteChange = (value: PokemonAutocompleteItem[]): void => {
		const names = (value).map((item) => item.originalName);
		setPokemonInput(names);
	};

	const onClick = (action: 'add' | 'remove'): void => {
		updatePokemonList({ action, pokemonInput, setPokemonInput });
	};

	const updateAutocompleteKey = (): void => {
		setAutocompleteKey(generateKey());
	};

	const addFilterOptions = createFilterOptions<PokemonAutocompleteItem>({
		matchFrom: 'any',
		ignoreCase: true,
		limit: 151,
	});

	const AutoCompleteElement = (isAddAutocomplete: boolean) => (
		<StyledPaper elevation={3} sx={{ width: { xs: '67%', md: '33%' } }}>
			<Autocomplete
				multiple
				disableCloseOnSelect
				filterOptions={(options, state) => isAddAutocomplete ? addFilterOptions(options, state) : options}
				key={autocompleteKey}
				options={isAddAutocomplete ? addAutocompleteOptions : sortedRemoveAutocompleteOptions}
				groupBy={(option) => option.generation}
				isOptionEqualToValue={(option, value) => option.name === value.name}
				getOptionLabel={(option) => option.name}
				onChange={(_, value) => { onAutocompleteChange(value); }}
				inputValue={isAddAutocomplete ? addInputValue : removeInputValue}
				onInputChange={(_event, value, reason) => {
					if (reason !== 'reset' && reason !== 'selectOption') {
						if (isAddAutocomplete) {
							setAddInputValue(value);
						} else {
							setRemoveInputValue(value);
						}
					}
				}}
				renderOption={(props, option) => {
					const { key, ...remainingProps } = props;

					return (
						<StyledOptionListItem key={key} {...remainingProps}>
							<Typography mr={3}>#{option.pokedexNumber}</Typography>
							<Typography flexGrow={1}>{option.name}</Typography>
							<Box
								minWidth={100}
								minHeight={100}
								display='flex'
								alignItems='center'
								justifyContent='center'
							>
								<Box component='img' src={option.sprite} loading='lazy' alt={option.name + ' sprite'} mr={1} />
							</Box>
						</StyledOptionListItem>
					);
				}}
				renderInput={(params) => (
					<>
						<TextField
							{...params}
							label={`${isAddAutocomplete ? 'Add' : 'Remove'} Pokémon`}
							variant='filled'
						/>
						<Button fullWidth onClick={() => {
							onClick(isAddAutocomplete ? 'add' : 'remove');
							updateAutocompleteKey();
						}}>
							<Typography variant='body1'>
								Submit
							</Typography>
						</Button>
					</>
				)}
				renderGroup={(params) => {
					const childrenArray = Array.isArray(params.children) ? params.children : [params.children];

					return (
						<StyledGroupListItem key={params.key}>
							<Box sx={{ width: '100%', backgroundColor: '#7A9E9F' }}>
								<Typography align='center'>
									{params.group}
								</Typography>
							</Box>
							<List sx={{ width: '100%', padding: 0 }}>
								{childrenArray.map((child: React.ReactNode, index: number) => (
									<Box key={`child-${index}`}>{child}</Box>
								))}
							</List>
						</StyledGroupListItem>
					);
				}}
			/>
		</StyledPaper>
	);

	return (
		<Box display='flex' justifyContent='center' alignItems='center' width='100%' flexDirection={{ xs: 'column', md: 'row' }}>
			{!isLoading && AutoCompleteElement(true)}
			{!isLoading && AutoCompleteElement(false)}
		</Box>
	);
};
