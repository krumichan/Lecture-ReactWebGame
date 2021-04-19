import React, { useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

const initialState = {
    winner: ''
    , turn: 'O'
    , tableData: [
        ['', '', '']
        , ['', '', '']
        , ['', '', '']
    ]
    , recentCell: [-1, -1]
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'SET_TURN';

const reducer = (state, action) => {
    switch (action.type) {
        // state.winner = action.winner <-- 이와 같이 직접적인 복사를 수행하면 안된다.

        case SET_WINNER: {
            return {
                // 기존 속성을 바꾸는 것이 아닌,
                // 새로운 속성을 할당하여 반환하는 형식.
                ...state
                , winner: action.winner
            }
        }

        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결 가능.
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state
                , tableData
                , recentCell: [action.row, action.cell]
            }
        }

        case CHANGE_TURN: {
            return {
                ...state
                , turn: state.turn === 'O' ? 'X' : 'O'
                ,
            }
        }
    }
};

const TicTacToeHooks = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    const onClickTable = useCallback(() => {
        // action을 dispatch에 등록한다.
        // dispatch는 받은 action 객체를 해석해서 수행하는데,
        // 그 때 호출되는 함수가 위의 reducer 함수가 된다.
        dispatch({ type: SET_WINNER, winner: 'O' });
    }, []);

    // 비동기 수행 관련은 반드시 useEffect를 사용해야한다. ( 위에서 선언한 state는 비동기 적으로 수행을 한다. )
    useEffect(() => {
        const [row, cell] = recentCell;
        if (row  < 0 || cell < 0) {
            return;
        }

        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }

        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }

        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }

        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }

        if (win) {
            dispatch({ type: SET_WINNER, winner: turn });
        } else {
            dispatch({ type: CHANGE_TURN });
        }

    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리</div>}
        </>
    );
}

export default TicTacToeHooks;