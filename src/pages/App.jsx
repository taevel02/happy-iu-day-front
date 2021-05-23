import React from 'react';

import Countdown from '../components/Countdown';

function App() {
	const year = +new Date().getFullYear();
	const month = +new Date().getMonth() + 1;
	const day = +new Date().getDate();

	return (
		<>
			{month <= 5 && day <= 16 ? (
				<Countdown date={`05/16/${year}`} />
			) : (
				<Countdown date={`05/16/${year + 1}`} />
			)}
		</>
	);
}

export default App;
