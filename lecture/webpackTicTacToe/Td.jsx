import React, { useCallback } from 'react';
import { CLICK_CELL } from './TicTacToeHooks';

const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {

    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);

        // cellData가 존재하는 경우.
        if (cellData) {
            return;
        }

        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
};

export default Td;