import React, { useContext, useCallback } from 'react';
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

const Td = ({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }

        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED: {
                return;
            }

            case CODE.FLAG_MINE: {
                return;
            }

            case CODE.FLAG: {
                return;
            }

            case CODE.QUESTION_MINE: {
                return;
            }

            case CODE.QUESTION: {
                return;
            }

            case CODE.NORMAL: {
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex});
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
        if (halted) {
            return;
        }

        e.preventDefault(); // 우클릭에 의해 생기는 menu를 뜨지 않게 하기 위함.

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

    const oneData = tableData[rowIndex][cellIndex];
    return (
        <td
            style={getTdStyle(oneData)}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >
            {getTdText(oneData)}
        </td>
    );
};

export default Td;