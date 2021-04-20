import React, {createContext, useMemo, useReducer} from 'react';
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
    return { x, y };
}

const SEARCH_DIRECTION = {
    LEFT_UP: position(-1, -1)
    , UP: position(0, -1)
    , RIGHT_UP: position(1, -1)
    , RIGHT: position(0, 1)
    , RIGHT_DOWN: position(1, 1)
    , DOWN: position(0, 1)
    , LEFT_DOWN: position(-1, 1)
    , LEFT: position(-1, 0)
}

export const TableContext = createContext({
    tableData: []
    , halted: true
    , dispatch: () => {}
});

const initialState = {
    tableData: []
    , timer: 0
    , result: 0
    , halted: true
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

const updateState = (state, putValue, halted) => {
    const updatedState = { ...state, tableData: putValue };
    return halted !== undefined ? { ...updatedState, halted: halted } : updatedState;
}

const searchCell = (table, row, cell) => {
    let arround = [];
    if (row > 0) {
        arround.push(table[row - 1][cell]);

        if (cell > 0) {

        }
    }
    if (table[row - 1]) {
        arround.concat(
            table[row - 1][cell - 1]
            , table[row - 1][cell]
            , table[row - 1][cell + 1]
        );
    }
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';

export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
    const { tableData } = state;
    const { type, row, cell, mine } = action;

    switch (type) {
        case START_GAME: {
            return updateState(state
                , makeTable(row, cell, mine), false);
        }

        case OPEN_CELL: {
            const mineCount = searchCell(tableData, row, cell);
            return updateState(state
                , openCell(tableData, row, cell, CODE.OPENED));
        }

        case CLICK_MINE: {
            return updateState(state
                , openCell(tableData, row, cell, CODE.CLICKED_MINE), true);
        }

        case FLAG_CELL: {
            return updateState(state
                , lockCell(tableData, row, cell, CODE.MINE, CODE.FLAG_MINE, CODE.FLAG));
        }

        case QUESTION_CELL: {
            return updateState(state
                , lockCell(tableData, row, cell, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION));
        }

        case NORMALIZE_CELL: {
            return updateState(state
                , lockCell(tableData, row, cell, CODE.QUESTION_MINE, CODE.MINE, CODE.NORMAL));
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

    return (
        // Context API에서 제공하는 Provider로
        // 이 내부의 Component들은 Context Data에 접근할 수 있다.
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
};

export default MineSearchHooks;