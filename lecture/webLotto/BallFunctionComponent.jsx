import React, { memo } from 'react';

const BallFunctionComponent = memo(({ number }) => {
    let background;

    switch (Math.floor(number / 10)) {
        case 0: { background = 'red'; break; }
        case 1: { background = 'orange'; break; }
        case 2: { background = 'yellow'; break; }
        case 3: { background = 'blue'; break; }
        default: { background = 'green'; break; }
    }

    return (
        <div className="ball" style={{ background }}>{number}</div>
    );
});

export default BallFunctionComponent;