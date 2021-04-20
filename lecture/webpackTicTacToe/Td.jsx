import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './TicTacToeHooks';

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {

    /// 변화를 감지하기 위한 코드 - 시작 ///
    const ref = useRef([]);
    useEffect(() => {
        console.log (rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch = ref.current[2], cellData === ref.current[3]);
        ref.current = [rowIndex, cellIndex, dispatch, cellData];
    }, [rowIndex, cellIndex, dispatch, cellData]);
    /// 변화를 감지하기 위한 코드 - 끝 ///
    
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
});

export default Td;