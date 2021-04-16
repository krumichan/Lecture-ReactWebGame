import React, { useState, useRef } from 'react';

const ResponseCheckHooksIfFor = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef(null);
    const endTime = useRef(null);

    const onClickScreen = () => {

        // 반응속도 체크 시작.
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');

            // '성급한 클릭'이 되었을 경우,
            // 기존의 setTimeout을 없애기 위해 변수로 보관한다.
            timeout.current = setTimeout(() => {
                startTime.current = new Date();

                setState('now');
                setMessage('지금 클릭');

            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤.

            // 성급한 클릭.
        } else if (state === 'ready') {
            // 설정되어 있는 timeout을 제거한다.
            clearTimeout(timeout.current);

            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');

            // 반응속도 체크.
        } else if (state === 'now') {
            endTime.current = new Date();

            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prev) => [...prev, endTime.current - startTime.current]);
        }
    };

    const onReset = () => {
        setResult([]);
    }

    return(
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {(() => {
                if (result.length === 0) {
                    return null;
                } else {
                    return (
                        <>
                            <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                            <button onClick={onReset}>reset</button>
                        </>
                    );
                }
            })()}

            <div>
                for test
                {(() => {
                    const data = [1, 2, 3, 4, 5, 6];
                    const array = [];
                    for (let i = 0; i < data.length; ++i) {
                        array.push(<button value={i}>{i}</button>);
                    }
                    return array;
                })()}
            </div>
        </>
    );
};

export default ResponseCheckHooksIfFor;