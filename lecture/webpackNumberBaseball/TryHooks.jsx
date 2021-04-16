import React from 'react';

// (props)  ⇒  ({ k, tryInfo })
const TryHooks = ({ k, tryInfo }) => {
    return (
        <li key={k}>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
};

export default TryHooks;