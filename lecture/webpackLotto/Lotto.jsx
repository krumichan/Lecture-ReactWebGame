import React, { Component } from 'react';
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

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers()
        , winBalls: []
        , bonus: null
        , redo: false
        ,
    };

    timeouts = [];

    runTimeout() {
        const { winNumbers }  = this.state;
        const interval = 1000;

        for (let i = 0; i < winNumbers.length - 1; ++i) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prev) => {
                    return {
                        winBalls: [...prev.winBalls, winNumbers[i]]
                        ,
                    };
                });
            }, (i + 1) * interval);
        }

        this.timeouts[winNumbers.length - 1] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[winNumbers.length - 1],
                redo: true
            });
        }, winNumbers.length * interval);
    }

    componentDidMount() {
        this.runTimeout();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.timeouts.length === 0) {
            this.runTimeout();
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((t) => {
            clearTimeout(t);
        });
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers()
            , winBalls: []
            , bonus: null
            , redo: false
            ,
        });

        this.timeouts = [];
    }

    render() {
        const { winBalls, bonus, redo } = this.state;

        return (
          <>
              <div>당첨 숫자</div>
              <div id="result-window">
                  {winBalls.map((v) => <Ball key={v} number={v} />)}
              </div>
              <div>보너스!</div>
              {bonus && <Ball number={bonus} />}
              {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
          </>
        );
    }
}

export default Lotto;