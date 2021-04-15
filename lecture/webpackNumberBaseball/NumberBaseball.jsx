const React = require('react');
const {Component} = React;

/**
 * 숫자 4개를 랜덤으로 뽑는 함수.
 */
function getNumbers() {

}

class NumberBaseball extends Component {
    state = {
        result: ''
        , value: ''
        , tries: []
        , answer: getNumbers()
        ,
    };

    onSubmit = (e) => {
        e.preventDefault();
    }

    onChange = (e) => {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmit}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChange}/>
                </form>
                <div>시도: {this.state.tries.length}</div>

            </>
        );
    }
}

module.exports = NumberBaseball;