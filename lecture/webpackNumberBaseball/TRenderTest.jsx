import React, { Component } from 'react';

class TRenderTest extends Component {
    state = {
        counter: 0
        ,
    };

    // 어떤 경우에 rendering을 수행할지를 정한다.
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // 현재의 state와 미래의 state를 비교한다.
        if (this.state.counter !== nextState.counter) {
            return true;
        }

        return false;
    }

    onClick = () => {
        this.setState({});
    }

    render() {
        console.log('rendering', this.state);
        return (
            <ui>
                <button onClick={this.onClick}>클릭</button>
            </ui>
        );
    }
}

export default TRenderTest;