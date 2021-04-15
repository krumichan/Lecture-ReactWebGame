import React, { Component } from 'react';

class SampleMapTry extends Component {
    render() {
        return (
            <li key={v.fruit}>
                <b>{v.fruit}: {v.taste}</b> - {i}
                <div>Contents Sample (1) - Sample Map Try</div>
                <div>Contents Sample (2) - Sample Map Try</div>
                <div>Contents Sample (3) - Sample Map Try</div>
                <div>Contents Sample (4) - Sample Map Try</div>
            </li>
        )
    }
}

export default SampleMapTry;