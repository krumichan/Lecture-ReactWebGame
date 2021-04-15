const React = require('react');
const { useState, useRef } = React;

const TimesTable = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
            setResult('정답: ' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
        } else {
            setResult('땡');
            setValue('');
        }
        inputRef.current.focus();
    }

    return (
        <>
            <div>Hello, Hooks.<p/></div>
            <div>{first} * {second} 는?</div>
            <form onSubmit={onSubmit}>
                <input ref={inputRef} type="number" onChange={onChange} value={value}/>
                <button>입력!</button>
                <div id="result">{result}</div>
            </form>
        </>
    );
}

module.exports = TimesTable;