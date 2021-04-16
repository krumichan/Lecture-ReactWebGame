import React, { PureComponent } from 'react';

// PureComponent : shouldComponentUpdate를 구현해놓은 class.
// 단점은, object{}나 array[]의 변화를 감지하기 어려워한다.
//  ex)
//    const array = this.state.array;
//    array.push(1);
//    this.setState({ array: array });
// 위와 같은 예제에서 PureComponent는 array의 변화를 감지하지 못한다.

class TRenderTest extends PureComponent {
    state = {
        counter: 0

        // , string: 'hello'
        // , number: 1
        // , boolean: true
        // , object: {}
        // , array: []
    };

    // // 어떤 경우에 rendering을 수행할지를 정한다.
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     // 현재의 state와 미래의 state를 비교한다.
    //     if (this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //
    //     return false;
    // }

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