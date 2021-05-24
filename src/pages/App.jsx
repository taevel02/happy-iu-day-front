import styled from '@emotion/styled';
import React from 'react';

import Countdown from '../components/Countdown';

const Content = styled.div`
	height: 100vh;
	overflow: hidden;
`;

const Wrapper = styled.div`
	position: relative;
	left: 50%;
	top: 43%;
	transform: translateX(-50%) translateY(-50%);
	text-align: center;
`;

function App() {
	const year = +new Date().getFullYear();
	const month = +new Date().getMonth() + 1;
	const day = +new Date().getDate();

	return (
		<Content>
			<Wrapper>
				{month <= 5 && day <= 16 ? (
					<Countdown date={`05/16/${year}`} />
				) : (
					<Countdown date={`05/16/${year + 1}`} />
				)}
			</Wrapper>
		</Content>
	);
}

export default App;
