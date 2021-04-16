import React, {Component} from 'react';

/**
 * class lifecycle..
 *
 * constructor → render → ref → componentDidMount
 * → setState/props changed → shouldComponentUpdate → render → componentDidUpdate
 *
 * remove component → componentWillUnmount → destroyed
 */

const rspPosition = {
    rock: '0'
    , scissor: '-142px'
    , paper: '-284px'
}

const rspIdentity = {
    rock: 1
    , scissor: 0
    , paper: -1
}

const computerChoice = (position) => {
    return Object.entries(rspPosition).find(function(v) {
        return v[1] === position;
    })[0];
};

class Rsp extends Component {
    state = {
        result: ''
        , score: 0
        , position: '0'
    };

    interval;

    /**
     * 해당 Component가 처음 rendering 된 후 호출되는 함수.
     * ⇒ 비동기 요청 수행.
     */
    componentDidMount() {
        this.interval = setInterval(() => {
            const { position } = this.state;

            if (position === rspPosition.rock) {
                this.setState({
                    position: rspPosition.scissor
                });
            } else if (position === rspPosition.scissor) {
                this.setState({
                    position: rspPosition.paper
                });
            } else if (position === rspPosition.paper) {
                this.setState({
                    position: rspPosition.rock
                });
            }
        }, 1000);
    }

    /**
     * 해당 Component가 re-rendering 된 후 호출되는 함수.
     */
    componentDidUpdate() {

    }

    /**
     * 해당 Component가 제거되기 직전에 호출되는 함수.
     * ⇒ 비동기 요청 정리 수행.
     */
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onClick = (choice) => {
        const { position } = this.state;

        clearInterval(this.interval);
        const myScore = rspIdentity[choice];
        const cpuScore = rspIdentity[computerChoice(position)];
        const diff = myScore - cpuScore;

        if (diff === 0) {
            this.setState({
                result: '비겼습니다!'
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prev) => {
                return {
                    result: '이겼습니다!'
                    , score: prev.score + 1
                };
            });
        } else {
            this.setState((prev) => {
                return {
                    result: '졌습니다!'
                    , score: prev.score - 1
                };
            });
        }
    };

    render() {
        const { result, score, position } = this.state;
        return (
            <>
                <div
                    id="computer"
                    style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${position} 0`}} />
                <div>
                    <button id="rock" className="btn" onClick={() => this.onClick('rock')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => this.onClick('scissor')}>가위</button>
                    <button id="paper" className="btn" onClick={() => this.onClick('paper')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}</div>
            </>
        );
    };
}

export default Rsp;