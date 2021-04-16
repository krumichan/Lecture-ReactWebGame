import React, { memo } from 'react';

// memo는 PureComponent와 동일 역할을 해준다.
const TryHooksOptimization = memo(({ k, tryInfo }) => {
    return (
        <li key={k}>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
});

export default TryHooksOptimization;