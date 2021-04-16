import React, { Component } from 'react';

class SampleMapTry extends Component {
    render() {
        return (
            <li key={this.props.value.fruit}>
                <b>{this.props.value.fruit}: {this.props.value.taste}</b> - {this.props.index}
                <div>Contents Sample (1) - Sample Map Try</div>
                <div>Contents Sample (2) - Sample Map Try</div>
                <div>Contents Sample (3) - Sample Map Try</div>
                <div>Contents Sample (4) - Sample Map Try</div>
            </li>
        )
    }
}

export default SampleMapTry;