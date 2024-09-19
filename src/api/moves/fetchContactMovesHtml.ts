export const fetchContactMovesHtml = async (): Promise<string> => {
	const response = await fetch('https://bulbapedia.bulbagarden.net/wiki/Contact');
	return await response.text();
};
