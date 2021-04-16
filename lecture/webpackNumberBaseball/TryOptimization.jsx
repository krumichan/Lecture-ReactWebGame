import React, { PureComponent } from 'react';

class TryOptimization extends PureComponent {

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