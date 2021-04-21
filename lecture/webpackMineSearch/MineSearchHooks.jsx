import React, {createContext, useMemo, useReducer, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

export const CODE = {
    OPENED: 0
    , NORMAL: -1
    , QUESTION: -2
    , FLAG: -3
    , QUESTION_MINE: -4
    , FLAG_MINE: -5
    , CLICKED_MINE: -6
    , MINE: -7
}

const position = (x, y) => {
    return [ x, y ];
}

const SEARCH_DIRECTION = [
    position(-1, -1)  // left up
    , position(0, -1)  // up
    , position(1, -1)  // right up
    , position(1,  0)// right
    , position(1, 1)  // right down
    , position(0, 1)  // down
    , position(-1, 1)  // left down
    , position(-1, 0)  // left
];

export const TableContext = createContext({
    tableData: []
    , halted: true
    , dispatch: () => {}
});

const initialState = {
    tableData: []
    , timer: 0
    , result: ''
    , halted: true
    , cellInfo: { row: 0, cell: 0, mine: 0 }
    ,
}

const makeCandidate = (row, cell) => {
    return Array(row * cell).fill().map((arr, i) => {
        return i;
    });
};

const makeNumber = (candidate) => {
    return candidate.splice(
        Math.floor(
            Math.random() * candidate.length)
        , 1
    )[0];
}

const makeShuffle = (row, cell, mine) => {
    const candidate = makeCandidate(row, cell);
    const shuffle = [];

    while (candidate.length > row * cell - mine) {
        shuffle.push(makeNumber(candidate));
    }

    return shuffle;
};

const initializeTable = (row, cell, def) => {
    const table = [];

    for (let i = 0; i < row; ++i) {
        const rows = [];
        table.push(rows);

        for (let j = 0; j < cell; ++j) {
            rows.push(def);
        }
    }

    return table;
};

const plantMine = (shuffle, table, cell, mine) => {
    const newTable = [...table];

    for (let i = 0; i < shuffle.length; ++i) {
        const vertical = Math.floor(shuffle[i] / cell);
        const horizontal = shuffle[i] % cell;
        newTable[vertical][horizontal] = mine;
    }

    return newTable;
};

const makeTable = (row, cell, mine) => {
    console.log(row, cell, mine);

    const shuffle = makeShuffle(row, cell, mine);
    const table = initializeTable(row, cell, CODE.NORMAL);

    const generatedTable = plantMine(shuffle, table, cell, CODE.MINE);
    console.log(generatedTable);

    return generatedTable;
};

const deepCopy = (table, row) => {
    const copyTable = [...table];
    table[row] = [...table[row]];

    return copyTable;
};

const deepCopyAll = (table, row) => {
    const copyTable = deepCopy(table, row);

    copyTable.forEach((row, i) => {
        copyTable[i] = [...copyTable[i]];
    });

    return copyTable;
}

const openCell = (table, row, cell, openCode) => {
    const copyTable = deepCopy(table, cell);
    copyTable[row][cell] = openCode;

    return copyTable;
};

const lockCell = (table, row, cell, condition, trueCode, falseCode) => {
    const copyTable = deepCopy(table, cell);
    copyTable[row][cell] = (copyTable[row][cell] === condition) ? trueCode : falseCode;

    return copyTable;
};

const aroundPositions = (row, cell, minX, maxX, minY, maxY) => {
    const positions = [];

    SEARCH_DIRECTION.forEach(([offsetX, offsetY]) => {
        const [posX, posY] = [row + offsetY, cell + offsetX];

        if (posX >= minX && posY >= minY && posX < maxX && posY < maxY) {
            positions.push([row + offsetY, cell + offsetX]);
        }
    });

    return positions;
};

const purePositions = (table, offsetPositions) => {
    return offsetPositions.filter(([offsetX, offsetY]) => {
        return !exclusiveSearch(table[offsetX][offsetY]);
    });
};

const exclusiveSearch = (cellData) => {
    return [CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION]
        .includes(cellData);
};

const listIfExists = (table, offsetPositions) => {
    const around = [];

    offsetPositions.forEach((offset) => {
       const [offsetX, offsetY] = offset;

       const checked = table[offsetX][offsetY];
       if (checked) {
           around.push(checked);
       }
    });

    return around;
}

const recursionSearch = (table, offsetPositions) => {
    let tempTable = table;

    offsetPositions.forEach((offset) => {
        const [offsetX, offsetY] = offset;
        tempTable = searchCell(tempTable, offsetX, offsetY);
    });

    return tempTable;
}

const searchCell = (table, row, cell) => {
    // 대상이 되는 offset list. ( 대상외를 분리시킨 결과 )
    const offsetPositions = purePositions(
        table
        // 모든 offset 습득.
        , aroundPositions(row, cell, 0, table[0].length, 0, table.length)
    );

    const count = listIfExists(table, offsetPositions)
        .filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
    table[row][cell] = count;

    // 주변 cell 도 확인을 위한 recursion 수행.
    if (count === 0) {
        table = recursionSearch(table, offsetPositions);
    }

    return table;
};

const isCompleted = (table, {row, cell, mine}) => {
    const expected = (row * cell) - mine;
    let real = 0;

    table.forEach((rows) => {
        rows.forEach((cell) => {
            real += ( cell >= CODE.OPENED ) ? 1 : 0;
        });
    });

    return expected === real;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';

export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    const { tableData, cellInfo, timer } = state;
    const { type, row, cell, mine } = action;

    switch (type) {
        case START_GAME: {
            return { ...state
                , tableData: makeTable(row, cell, mine)
                , halted: false
                , cellInfo: {row: row, cell: cell, mine: mine}
                , timer: 0
                , result: ''
            };
        }

        case OPEN_CELL: {
            const deep = deepCopyAll(
                openCell(tableData, row, cell, CODE.OPENED), row, cell);
            const searchedCell = searchCell(deep, row, cell);
            const halted = isCompleted(searchedCell, cellInfo);
            return { ...state
                , tableData: searchedCell
                , halted: halted
                , result: halted ? `${timer}초만에 승리하셨습니다.` : ''
            };
        }

        case CLICK_MINE: {
            return { ...state
                , tableData: openCell(tableData, row, cell, CODE.CLICKED_MINE)
                , halted: true
                , result: '졌습니다.'
            };
        }

        case FLAG_CELL: {
            return { ...state
                , tableData: lockCell(tableData, row, cell, CODE.MINE, CODE.FLAG_MINE, CODE.FLAG)
            };
        }

        case QUESTION_CELL: {
            return { ...state
                , tableData: lockCell(tableData, row, cell, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION)
            };
        }

        case NORMALIZE_CELL: {
            return { ...state
                , tableData: lockCell(tableData, row, cell, CODE.QUESTION_MINE, CODE.MINE, CODE.NORMAL)
            };
        }

        case INCREMENT_TIMER: {
            return {
                ...state
                , timer: timer + 1
            }
        }

        default: {
            return state;
        }
    }
}

const MineSearchHooks = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { timer, result, tableData, halted } = state;

    // 무의미한 render로 인해 발생하는 성능저하를 방지하기 위함.
    const value = useMemo(() => ({ tableData, halted, dispatch }) , [tableData, halted]);

    useEffect(() => {
        let timer;
        if (halted === false) {
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted]);

    return (
        // Context API에서 제공하는 Provider로
        // 이 내부의 Component들은 Context Data에 접근할 수 있다.
        <TableContext.Provider value={value}>
            <Form />
            <div>timer: {timer}</div>
            <Table />
            <div>{result !== '' && '결과:'} {result}</div>
        </TableContext.Provider>
    );
};

export default MineSearchHooks;