import React from 'react';
import { render } from 'react-dom';
import {
	CellMeasurer,
	CellMeasurerCache,
	createMasonryCellPositioner,
	Masonry,
} from 'react-virtualized';
import ImageMeasurer from 'react-virtualized-image-measurer';

import list from '../utils/photo_data';
import Firework from './utils/Fireworks';

// Array of images with captions
// const list = [{image: 'http://...', title: 'Foo'}];

// We need to make sure images are loaded from scratch every time for this demo
const noCacheList = list.map((item, index) => ({
	title: `${index}. ${item.title}`,
	image: item.image + (item.image ? `?noCache=${Math.random()}` : ''),
}));

const keyMapper = (item, index) => item.image || index;

const columnWidth = 200;
const defaultHeight = 250;
const defaultWidth = columnWidth;

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
	defaultHeight,
	defaultWidth,
	fixedWidth: true,
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositionerConfig = {
	cellMeasurerCache: cache,
	columnCount: 8,
	columnWidth,
	spacer: 10,
};

const cellPositioner = createMasonryCellPositioner(cellPositionerConfig);

const MasonryComponent = ({ itemsWithSizes, setRef }) => {
	const cellRenderer = ({ index, key, parent, style }) => {
		const { item, size } = itemsWithSizes[index];
		const height = columnWidth * (size.height / size.width) || defaultHeight;

		return (
			<CellMeasurer cache={cache} index={index} key={key} parent={parent}>
				<div style={style}>
					{item.image && (
						<img
							src={item.image}
							alt={item.title}
							style={{
								height,
								width: columnWidth,
								display: 'block',
							}}
						/>
					)}
				</div>
			</CellMeasurer>
		);
	};

	return (
		<Masonry
			cellCount={itemsWithSizes.length}
			cellMeasurerCache={cache}
			cellPositioner={cellPositioner}
			cellRenderer={cellRenderer}
			height={1080}
			width={1920}
			keyMapper={keyMapper}
			ref={setRef}
		/>
	);
};

class SpecialStage extends React.Component {
	masonryRef = null;

	constructor(props) {
		super(props);
		this.state = { images: noCacheList };
		this.setMasonry = this.setMasonry.bind(this);
	}

	setMasonry(node) {
		this.masonryRef = node;
	}

	render() {
		const { images } = this.state;
		return (
			<div>
				<ImageMeasurer
					items={images}
					image={(item) => item.image}
					keyMapper={keyMapper}
					defaultHeight={defaultHeight}
					defaultWidth={defaultWidth}
				>
					{({ itemsWithSizes }) => (
						<MasonryComponent
							setRef={this.setMasonry}
							itemsWithSizes={itemsWithSizes}
						/>
					)}
				</ImageMeasurer>
				<Firework />
			</div>
		);
	}
}

// Render your grid
render(<SpecialStage />, document.getElementById('root'));

export default SpecialStage;
