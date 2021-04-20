import React, {useEffect, useRef, memo} from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {

    /// 변화를 감지하기 위한 코드 - 시작 ///
    const ref = useRef([]);
    useEffect(() => {
        console.log (rowData === ref.current[0], rowIndex === ref.current[1], dispatch = ref.current[2]);
        ref.current = [rowData, rowIndex, dispatch];
    }, [rowData, rowIndex, dispatch]);
    /// 변화를 감지하기 위한 코드 - 끝 ///

    return (
        <tr>
            {Array(rowData.length).fill().map(
                (td, i) => (
                    // Component 자체를 기억.
                    // useMemo(() =>
                        <Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch}>{''}</Td>
                        // , [rowData[i]]
                    // )
            ))}
        </tr>
    );
});

export default Tr;