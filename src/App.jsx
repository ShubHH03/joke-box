import { useState, useEffect } from 'react';

function App() {
	const [jokes, setJokes] = useState('');
	const [category, setCategory] = useState('');

	useEffect(() => {
		const fetchJokes = async () => {
			try {
				const response = await fetch(
					`https://api.freeapi.app/api/v1/public/randomjokes?query=${category}`,
				);
				const data = await response.json();
				setJokes(data.data);
				console.log(data.data);
			} catch (error) {
				console.log('Error fetching joke', error);
			}
		};

		const timeoutId = setTimeout(() => {
			fetchJokes();
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [category]);

	return (
		<>
			<h1>Random Jokes Viewer</h1>
			<input
				type="text"
				name="category"
				placeholder="Enter joke category"
				value={category || ''}
				onChange={(e) => setCategory(e.target.value)}
			/>
			<div>
				{jokes?.data?.map((joke) => (
					<div key={joke.id}>
						<p>{joke.content}</p>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
