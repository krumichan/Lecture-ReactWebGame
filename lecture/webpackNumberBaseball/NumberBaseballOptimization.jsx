import React, { PureComponent, createRef } from 'react';
import TryOptimization from './TryOptimization';

/**
 * 숫자 4개를 랜덤으로 뽑는 함수.
 */
function getNumbers() {   // this를 쓰지 않는 함수는 밖에 뺄수도 있다.
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];

    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(
            Math.floor(Math.random() * (9 - i))
            , 1
        );
        array.push(chosen[0]);
    }

    return array;
}

class NumberBaseballOptimization extends PureComponent {
    state = {
        result: ''
        , value: ''
        , tries: []
        , answer: getNumbers()
        ,
    };

    inputRef = createRef();

    onSubmit = (e) => {
        e.preventDefault();

        const { value, tries, answer } = this.state;
        const reloadGame = () => {
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: ''
                ,answer: getNumbers()
                , tries: []
            });
        };

        // 답이 맞았을 경우.
        if (value === answer.join('')) {
            this.setState((prev) => {
                return {
                    result: '홈런!'
                    , tries: [...prev.tries, { try: prev.value, result: '홈런' }]
                }
            });

            reloadGame();

            // 답이 틀렸을 경우.
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));

            // 틀린 횟수가 10번 이상일 경우.
            if (tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 [${answerArray.join(',')}] 였습니다.`,
                });

                reloadGame();

                // 틑린 횟수가 10번 미만일 경우.
            } else {
                let strike = 0;
                let ball = 0;

                for (let i = 0; i < 4; ++i) {
                    if (answerArray[i] === answer[i]) {
                        strike++;
                    } else if (answer.includes(answerArray[i])) {
                        ball++;
                    }
                }

                this.setState((prev) => {
                    return {
                        tries: [...prev.tries, { try: prev.value, result: `${strike} 스트라이크, ${ball} 볼`}]
                        , value: ''
                    }
                });
            }
        }

        this.inputRef.current.focus();
    }

    onChange = (e) => {
        this.setState({value: e.target.value});
    }

    render() {
        const { result, value, tries } = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmit}>
                    <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChange}/>
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v, i) => {
                        return (
                            <TryOptimization k={`${i + 1}차 시도 :`} tryInfo={v} />
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseballOptimization;