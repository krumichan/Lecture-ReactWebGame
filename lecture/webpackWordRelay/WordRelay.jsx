// 해당 파일에서 요구하는 package나 library.
const React = require('react')
const { Component } = React;

class WordRelay extends Component {
    state = {
        word: '첫단어'
        , value: ''
        , result: ''
    };
    input;

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                result: "딩동댕"
                , word: this.state.value
                , value: ''
            });
        } else {
            this.setState({
                result: "땡"
                , value: ''
            });
        }

        this.input.focus();
    };

    onChange = (e) => {
        this.setState({ value: e.target.value });
    };

    onRef = (c) => {
        this.input = c;
    };

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmit}>
                    {/* value와 onChange는 세트이다. 둘 다 반드시 넣어줘야 한다. */}
                    {/* value나 onChange가 없는 경우, 'defaultValue'를 추가해야 한다.
                         defaultValue={this.state.value} 이와 같은 형식이다. */}
                    <input ref={this.onRef} value={this.state.value} onChange={this.onChange}/>
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

// 해당 module을 외부에서도 접근할 수 있게 설정.
module.exports = WordRelay;