// 해당 파일에서 요구하는 package나 library.
const React = require('react')
const { Component } = React;

class WordRelay extends Component {
    state = {
        text: "Hello. webpack."
        ,
    };

    render() {
        return (
            <h1>{this.state.text}</h1>
        );
    }
}

// 해당 module을 외부에서도 접근할 수 있게 설정.
module.exports = WordRelay;