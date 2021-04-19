import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './BallFunctionComponent';

function getWinNumbers() {
    console.log('getWinNumbers');

    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }

    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const LottoHooks = (callback, deps) => {
    /**
     * Hooks의 경우, render시 LottoHooks 전체를 다시 실행하기 때문에,
     * getWinNumbers()를 'winNumbers'에 직접 넣으면 계속 반복해서 실행되는 오류가 있다.
     * 그렇기 때문에, 이를 Caching하는 기능을 제공하는데, 그것이 useMemo 함수이다.
     * useMemo를 통해 getWinNumbers()를 호출하고, 얻은 값을 winNumbers에 우회해서 넣어준다.
     * ( deps는, deps 내의 값이 수정될 경우, useMemo 내부의 factory를 재실행한다. )
     *
     * useMemo : 복잡한 함수 결과값을 기억.
     * useRef : 일반적인 변수 값을 기억.
     */
    const lottoNumbers = useMemo(() => getWinNumbers(), []);

    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);

    const timeouts = useRef([]);

    /**
     * ajax 편법 패턴.
     */
    const enable = useRef(false);
    useEffect(() => {

        // 첫 자동 호출인 componentDidMount 를 회피하기 위함.
        if (!enable.current) {
            enable.current = true;
        } else {
            // do ajax...
        }
    }, []); // deps에는 updating trigger를 수행할 변수.


    useEffect(() => {
        const interval = 1000;
        const numLength = () => winNumbers.length - 1;

        for (let i = 0; i < numLength(); ++i) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prev) => [...prev, winNumbers[i]]);
            }, (i + 1) * interval);
        }

        timeouts.current[numLength()] = setTimeout(() => {
            setBonus(winNumbers[numLength()]);
            setRedo(true);
        }, winNumbers.length * interval);

        return () => {
            timeouts.current.forEach((t) => clearTimeout(t));
        }
    }, [timeouts.current]); // 빈 배열일경우 componentDidMount 와 동일.
    // 배열에 요소가 있을 경우, componentDidMount와 componentDidUpdate 둘 다 수행.

    /**
     * useEffect 함수는 여러개 정의할 수 있다.
     * ( Callback을 등록하는 함수라고 생각하면 편한다. )
     */
    useEffect(() => {
        console.log('로또 숫자를 생성합니다.');
    }, [winNumbers]);

    /**
     * useCallback은 함수를 Baking 해둔다.
     * ( 즉, render가 실행될 때, onClickRedo를 재선언하지 않는다. )
     *
     * 문제점은, Baking이기 때문에 내부에 값이 생성되었을 시 그 값을 계속 기억한다.
     * 예를 들어, 아래의 getWinNumbers()로 인해 생성된 7개의 숫자가 절대 변동되지 않는다.
     * 때문에, 이러한 문제를 해결하기 위해 deps에 선언해주어야 할 필요가 있다.
     * ( deps는 onClickRedo를 언제 다시 실행할지를 결정하는 수가 들어간다. )
     */
    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="result-window">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
}

export default LottoHooks;