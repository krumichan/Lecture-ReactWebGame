import React, { Component } from 'react';

class Try extends Component {
    render() {
        const { key, tryInfo } = this.props;
        return (
            <li key={key}>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}

export default Try;