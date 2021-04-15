const React = require('react')
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('첫단어');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();

        if (word[word.length - 1] === value[0]) {
            setResult('딩동댕');
            setWord(value);
            setValue('');
        } else {
            setResult('땡');
            setValue('');
        }

        inputRef.current.focus();
    };

    const onChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmit}>
                {/* jsx에서 'for' 속성은 'htmlFor' 속성을 사용하고,
                    'class' 속성은 'className' 속성을 사용한다.
                    이렇게 명명된 속성들은 실제 web browser에 등록될 때,
                    다시 'for', 'class'로 변환되어 들어가게 된다.

                    즉,
                    for -> htmlFor
                    class -> className
                    위와 같이 변환해서 써야하며, 안그러면 error가 발생한다.
                    */}
                <label htmlFor="wordInput">글자를 입력하세요.</label>
                <input id="wordInput" className="wordInput" ref={inputRef} value={value} onChange={onChange}/>
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
}

module.exports = WordRelay;