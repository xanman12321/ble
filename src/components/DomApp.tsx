import React, { FunctionComponent, ChangeEvent, Fragment } from 'react';
import styled from '@emotion/styled';
import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';

import { useStore } from 'src/hooks/useStore';
import { download } from 'src/utils/download';
import ModeBar from 'src/components/ModeBar';
import ParamsBox from 'src/components/ParamsBox';
import CursorStyle from 'src/components/CursorStyle';

const BottomLeftDiv = styled.div`
	padding: 4px;
	position: absolute;
	bottom: 0;
	left: 0;
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: flex-start; /* prevent stretching*/
`;

const DomApp: FunctionComponent<{}> = () => {
	const { level, editor } = useStore();

	function onClick(): void {
		const snapshot = JSON.stringify(getSnapshot(level), null, '\t');
		download(snapshot, 'level.json', 'application/json');
	}

	function on2StarsChange(ev: ChangeEvent<HTMLInputElement>): void {
		level.set2StarsTime(parseInt(ev.target.value));
	}
	function on3StarsChange(ev: ChangeEvent<HTMLInputElement>): void {
		level.set3StarsTime(parseInt(ev.target.value));
	}
	function onCellSizeChange(ev: ChangeEvent<HTMLInputElement>): void {
		editor.setGridCellSize(parseInt(ev.target.value));
	}

	return (
		<Fragment>
			<CursorStyle/>
			<ModeBar/>
			<BottomLeftDiv>
				<label>Time to get 2 stars: <input type="number" min="0" value={level.timings[0]} onChange={on2StarsChange}/> ms</label>
				<label>Time to get 3 stars: <input type="number" min="0" value={level.timings[1]} onChange={on3StarsChange}/> ms</label>
				<label>Grid size: <input type="number" min="0" value={editor.gridCellSize} onChange={onCellSizeChange}/></label>
				<ParamsBox/>
				<button onClick={onClick}>Save</button>
			</BottomLeftDiv>
		</Fragment>
	);
};

export default observer(DomApp);
