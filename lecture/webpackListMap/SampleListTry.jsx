import React, { Component } from 'react';

class SampleListTry extends Component {
    render() {
        return (
            <li key={this.props.key}>
                <b>{this.props.value}</b> - {this.props.index}
                <div>Contents Sample (1) - Sample List Try</div>
                <div>Contents Sample (2) - Sample List Try</div>
                <div>Contents Sample (3) - Sample List Try</div>
                <div>Contents Sample (4) - Sample List Try</div>
            </li>
        )
    }
}

export default SampleListTry;