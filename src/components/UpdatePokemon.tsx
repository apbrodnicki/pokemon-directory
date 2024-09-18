import { Autocomplete, Box, Button, Grid, List, ListItem, Paper, TextField, Typography, createFilterOptions, styled } from '@mui/material';
import { useFetchAllPokemonNames } from 'api/useFetchAllPokemonNames';
import { useFetchPokemonAutocompleteItems } from 'api/useFetchPokemonAutocompleteItems';
import { PokemonListContext } from 'contexts/PokemonListContext';
import { formatName } from 'helper/helper';
import { useUpdatePokemonList } from 'hooks/useUpdatePokemonList';
import type { PokemonAutocompleteItem } from 'models/models';
import React, { useContext, useState } from 'react';

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

	const addAutocompleteOptions = useFetchPokemonAutocompleteItems({ pokemonList: allPokemonNames, setIsLoadingPokemonAutocompleteItems: setIsLoadingAddAutocompleteItems });
	const removeAutocompleteOptions = useFetchPokemonAutocompleteItems({ pokemonList, setIsLoadingPokemonAutocompleteItems: setIsLoadingRemoveAutocompleteItems });

	const onAutocompleteChange = (value: PokemonAutocompleteItem[]): void => {
		const names = (value).map((item) => item.originalName);
		setPokemonInput(names);
	};

	const onClick = (action: 'add' | 'remove'): void => {
		updatePokemonList({ action, pokemonInput, setPokemonInput });
	};

	const updateAutocompleteKey = (): void => {
		setAutocompleteKey(`key-${Math.random().toString(36).substring(2, 11)}`);
	};

	const filterOptions = createFilterOptions({
		matchFrom: 'any',
		ignoreCase: true,
		limit: 151,
	});

	const StyledOptionListItem = styled(ListItem)(() => ({
		backgroundColor: '#B8D8D8',
		'&.MuiAutocomplete-option.Mui-focused': {
			backgroundColor: '#DDEDED'
		},
	}));

	const StyledGroupListItem = styled(ListItem)(() => ({
		padding: 0,
		flexDirection: 'column',
		alignItems: 'flex-start'
	}));

	return (
		<Grid container justifyContent='center'>
			{!isLoading && (
				<>
					<Grid item xs={12} lg={5} mx={3}>
						<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
							<Autocomplete
								multiple
								disableCloseOnSelect
								filterOptions={filterOptions}
								key={autocompleteKey}
								options={addAutocompleteOptions}
								groupBy={(option) => (option as PokemonAutocompleteItem).generation}
								isOptionEqualToValue={(option, value) => (option as PokemonAutocompleteItem).name === (value as PokemonAutocompleteItem).name}
								getOptionLabel={(option) => (option as PokemonAutocompleteItem).name}
								onChange={(_, value) => { onAutocompleteChange((value as PokemonAutocompleteItem[])); }}
								inputValue={addInputValue}
								onInputChange={(event, value, reason) => {
									if (event !== null && event.type === 'blur') {
										setAddInputValue('');
									} else if (reason !== 'reset') {
										setAddInputValue(value);
									}
								}}
								renderOption={(props, option) => {
									const { key, ...remainingProps } = props;

									return (
										<StyledOptionListItem {...remainingProps}>
											<Typography mr={3}>#{(option as PokemonAutocompleteItem).pokedexNumber}</Typography>
											<Typography flexGrow={1}>{formatName((option as PokemonAutocompleteItem).name)}</Typography>
											<Box
												minWidth={100}
												minHeight={100}
												display='flex'
												alignItems='center'
												justifyContent='center'
											>
												<Box component='img' src={(option as PokemonAutocompleteItem).sprite} loading='lazy' alt='sprite' mr={1} />
											</Box>
										</StyledOptionListItem>
									);
								}}
								renderInput={(params) => (
									<>
										<TextField
											{...params}
											label='Add Pokémon'
											variant='filled'
										/>
										<Button fullWidth onClick={() => {
											onClick('add');
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
						</Paper>
					</Grid>
					<Grid item xs={12} lg={5} mx={3}>
						<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
							<Autocomplete
								multiple
								disableCloseOnSelect
								key={autocompleteKey}
								options={removeAutocompleteOptions.slice().sort((a, b) => (a.generation < b.generation ? -1 : a.generation > b.generation ? 1 : 0))}
								groupBy={(option) => option.generation}
								isOptionEqualToValue={(option, value) => option.name === value.name}
								getOptionLabel={(option) => option.name}
								onChange={(_, value) => { onAutocompleteChange(value); }}
								inputValue={removeInputValue}
								onInputChange={(event, value, reason) => {
									if (event !== null && event.type === 'blur') {
										setRemoveInputValue('');
									} else if (reason !== 'reset') {
										setRemoveInputValue(value);
									}
								}}
								renderOption={(props, option) => {
									const { key, ...remainingProps } = props;

									return (
										<StyledOptionListItem {...remainingProps}>
											<Typography mr={3}>#{option.pokedexNumber}</Typography>
											<Typography flexGrow={1}>{formatName(option.name)}</Typography>
											<Box
												minWidth={100}
												minHeight={100}
												display='flex'
												alignItems='center'
												justifyContent='center'
											>
												<Box component='img' src={option.sprite} loading='lazy' alt='sprite' mr={1} />
											</Box>
										</StyledOptionListItem>
									);
								}}
								renderInput={(params) => (
									<>
										<TextField
											{...params}
											label='Remove Pokémon'
											variant='filled'
										/>
										<Button fullWidth onClick={() => {
											onClick('remove');
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
						</Paper>
					</Grid>
				</>
			)}
		</Grid>
	);
};
