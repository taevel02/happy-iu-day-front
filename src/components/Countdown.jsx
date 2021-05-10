import React, { useEffect, useState } from 'react';

import SpecialStage from './SpecialStage';

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
			<span>
				{timeLeft[interval]} {interval}{' '}
			</span>
		);
	});

	return <>{timerComponents.length ? timerComponents : <SpecialStage />}</>;
}

export default Countdown;
