// import node-fetch
const fetch = require('node-fetch');
const EVENTS_HTTP_ENDPOINT = process.env.HTTP_ENDPOINT;
const API_KEY = process.env.API_KEY;

const authorization = { 'x-api-key': API_KEY, host: EVENTS_HTTP_ENDPOINT };
const sendMessage = async () => {
	const event = {
		channel: '/payload1/zone1',
		events: [
			JSON.stringify({
				message: 'Hello World! Introducing AWS AppSync Events!',
			}),
		],
	};

	const response = await fetch(`https://${HTTP_DOMAIN}/event`, {
		method: 'POST',
		headers: authorization,
		body: JSON.stringify(event),
	});

	console.log(JSON.stringify(await response.json(), null, 2));
};

sendMessage();
