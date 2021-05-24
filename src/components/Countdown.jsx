import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import SpecialStage from './SpecialStage';

const Content = styled.div`
	display: flex;
	justify-content: center;
	margin: 1rem;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 200px;
	font-family: 'Inter', sans-serif;

	:not(:last-child) {
		margin-right: 2.4rem;
	}
`;

const Number = styled.span`
	color: #000;
	font-size: 100px;
	font-weight: 700;
`;

const Text = styled.span`
	color: #000;
	font-size: 18px;
	font-weight: 300;
`;

function Countdown(props) {
	const calculateTimeLeft = () => {
		const difference = +new Date(props.date) - +new Date();
		let timeLeft = {};

		const day = +Math.floor(difference / (1000 * 60 * 60 * 24));
		const hour = +Math.floor((difference / (1000 * 60 * 60)) % 24);
		const minute = +Math.floor((difference / 1000 / 60) % 60);
		const second = +Math.floor((difference / 1000) % 60);

		if (difference > 0) {
			timeLeft = {
				Days: String(day).padStart(2, '0'),
				Hours: String(hour).padStart(2, '0'),
				Minutes: String(minute).padStart(2, '0'),
				Seconds: String(second).padStart(2, '0'),
			};
		}
		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
	});

	const timerComponents = [];

	Object.keys(timeLeft).forEach((interval) => {
		timerComponents.push(
			<Wrapper key={interval}>
				<Number>{timeLeft[interval]}</Number>
				<Text>{interval}</Text>
			</Wrapper>
		);
	});

	return (
		<>
			{timerComponents.length ? (
				<Content>{timerComponents}</Content>
			) : (
				<SpecialStage />
			)}
		</>
	);
}

export default Countdown;
