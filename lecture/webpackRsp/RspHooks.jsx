import React, { useState, useRef, useEffect } from 'react';

const rspPosition = {
    rock: '0'
    , scissor: '-142px'
    , paper: '-284px'
}

const rspIdentity = {
    rock: -1
    , scissor: 0
    , paper: 1
}

const computerChoice = (position) => {
    return Object.entries(rspPosition).find(function(v) {
        return v[1] === position;
    })[0];
};

const RspHooks = () => {
    const [result, setResult] = useState('');
    const [position, setPosition] = useState(rspPosition.rock);
    const [score, setScore] = useState(0);
    const interval = useRef();

    const changeHand = () => {
        const lmbSetPosition = (pos) => { setPosition(pos); }
        switch (position) {
            case rspPosition.rock:  { lmbSetPosition(rspPosition.scissor); break; }
            case rspPosition.scissor: { lmbSetPosition(rspPosition.paper); break; }
            case rspPosition.paper: { lmbSetPosition(rspPosition.rock); break; }
            default: { break; }
        }
    }

    useEffect(() => { // componentDidMount, componentDidUpdate 역할( 1:1 대응은 아님. )
        interval.current = setInterval(changeHand, 50);

        return () => { // componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [position]); // state가 변할 수 있는 변수 등을 여기에 넣는다. ( closure 문제 해결을 위함. )
    // useEffect는 'deps'에 들어간 값이 수정될 때마다 useEffect가 실행되어진다.

    const onClick = (choice) => () => {
        clearInterval(interval.current);
        const myScore = rspIdentity[choice];
        const cpuScore = rspIdentity[computerChoice(position)];
        const diff = myScore - cpuScore;

        if (diff === 0) {
            setResult('비겼습니다!');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prev) => prev + 1);
        } else {
            setResult('졌습니다!');
            setScore((prev) => prev - 1);
        }

        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 2000);
    };

    return (
        <>
            <div
                id="computer"
                style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${position} 0`}} />
            <div>
                <button id="rock" className="btn" onClick={onClick('rock')}>바위</button>
                <button id="scissor" className="btn" onClick={onClick('scissor')}>가위</button>
                <button id="paper" className="btn" onClick={onClick('paper')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}</div>
        </>
    );
};

export default RspHooks;