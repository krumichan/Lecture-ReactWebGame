import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting'
        , message: '클릭해서 시작하세요.'
        , result: []
        ,
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;

        // 반응속도 체크 시작.
        if (state === 'waiting') {
            this.setState({
                state: 'ready'
                , message: '초록색이 되면 클릭하세요.'
            });

            // '성급한 클릭'이 되었을 경우,
            // 기존의 setTimeout을 없애기 위해 변수로 보관한다.
            this.timeout = setTimeout(() => {
                this.startTime = new Date();

                this.setState({
                    state: 'now'
                    , message: '지금 클릭'
                });
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤.

        // 성급한 클릭.
        } else if (state === 'ready') {
            // 설정되어 있는 timeout을 제거한다.
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting'
                , message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
            });

        // 반응속도 체크.
        } else if (state === 'now') {
            this.endTime = new Date();

            this.setState((prev) => {
                return {
                    state: 'waiting'
                    , message: '클릭해서 시작하세요.'
                    , result: [...prev.result, this.endTime - this.startTime]
                }
            });
        }
    };

    onReset = () => {
        this.setState({
            result: []
            ,
        });
    }

    renderAverage = () => {
        const { result } = this.state;
        return result.length === 0
        ? null
        : <>
            <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
            <button onClick={this.onReset}>reset</button>
        </>
    };

    render() {
        const { state, message } = this.state;
        return(
            <>
                <div
                    id="screen"
                    className={state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                {this.renderAverage()}

                {/* 삼항연산자 사용 */}
                {/*{*/}
                {/*    this.state.result.length === 0*/}
                {/*        ? null*/}
                {/*        : <div>평균 시작: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>*/}
                {/*}*/}

                {/* 아래의 코드가 위의 삼항 연산자와 같다. */}
                {/*{*/}
                {/*    this.state.result.length !== 0 */}
                {/*        && <div>평균 시작: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>*/}
                {/*}*/}
            </>
        );
    }
}

export default ResponseCheck;