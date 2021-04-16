import React, { memo, useState } from 'react';

// memo는 PureComponent와 동일 역할을 해준다.
const TryHooksOptimization = memo(({ k, tryInfo }) => {

    // 위로부터 받은 값을 이 위치에서 수정하면 안된다.
    // tryInfo.try = 'hello';

    // 수정이 필요할 경우 -- 시작 --
    const [result, setResult] = useState(tryInfo.result);

    const onClick = () => {
        setResult('changed...');
    }
    // 수정이 필요한 경우 -- 끝 --

    return (
        <li key={k}>
            <div>{tryInfo.try}</div>
            <div onClick={onclick}>{tryInfo.result}</div>
        </li>
    );
});

export default TryHooksOptimization;