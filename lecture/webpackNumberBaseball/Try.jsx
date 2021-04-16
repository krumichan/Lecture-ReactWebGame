import React, { Component } from 'react';

class Try extends Component {
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

export default Try;