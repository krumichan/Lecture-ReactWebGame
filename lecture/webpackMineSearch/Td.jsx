import React, { useContext, useCallback, memo } from 'react';
import { TableContext, CODE } from "./MineSearchHooks";
import { OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from "./MineSearchHooks";

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE: {
            return {
                background: '#444'
            };
        }

        case CODE.OPENED: {
            return {
                background: 'white'
            };
        }

        case CODE.FLAG:
        case CODE.FLAG_MINE: {
            return {
                background: 'red'
            };
        }

        case CODE.QUESTION:
        case CODE.QUESTION_MINE: {
            return {
                background: 'yellow'
            };
        }

        default: {
            return {
                background: 'white'
            };
        }
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL: {
            return '';
        }

        case CODE.MINE: {
            // origin...
            // return '';

            // TODO: remove debugging character.
            // debugging...
            return 'X';
        }

        case CODE.FLAG:
        case CODE.FLAG_MINE: {
            return '!';
        }

        case CODE.QUESTION:
        case CODE.QUESTION_MINE: {
            return '?';
        }

        case CODE.CLICKED_MINE: {
            return '펑';
        }

        default: {
            return code || '';
        }
    }
};

const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }

        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION: {
                return;
            }

            case CODE.NORMAL: {
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            }

            case CODE.MINE: {
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
            }

            default: {
                return;
            }
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    // right click...
    const onRightClickTd = useCallback((e) => {
        e.preventDefault(); // 우클릭에 의해 생기는 menu를 뜨지 않게 하기 위함.

        if (halted) {
            return;
        }

        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE: {
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            }

            case CODE.FLAG:
            case CODE.FLAG_MINE: {
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                return;
            }

            case CODE.QUESTION:
            case CODE.QUESTION_MINE: {
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                return;
            }

            default: {
                return;
            }
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const data = tableData[rowIndex][cellIndex];
    return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={data} />;
});

const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
    console.log('td rendered');
    return (
        <td
            style={getTdStyle(data)}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >
            {getTdText(data)}
        </td>
    );
});

export default Td;