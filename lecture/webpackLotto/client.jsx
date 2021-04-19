import React from 'react';
import ReactDOM from 'react-dom';

import Lotto from './Lotto';
import LottoHooks from "./LottoHooks";

ReactDOM.render(
    <>
        <h1>Lotto Class</h1>
        <Lotto/>
        <hr/>

        <h1>Lotto Hooks</h1>
        <LottoHooks/>
    </>
, document.querySelector('#root'));