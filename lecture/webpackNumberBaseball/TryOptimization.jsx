import React, { PureComponent } from 'react';

class TryOptimization extends PureComponent {

    // 위로부터 받은 값을 이 위치에서 수정하면 안된다.
    // tryInfo.try = 'hello';

    // 수정이 필요할 경우 -- 시작 --
    constructor(props) {
        super(props);

        this.state = {
            result: this.props.tryInfo
            , try: this.props.tryInfo
        }
    }
    // 수정이 필요할 경우 -- 끝 --

    render() {
        const { k, tryInfo } = this.props;
        return (
            <li key={k}>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}

export default TryOptimization;