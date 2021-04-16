const React = require('react');
const ReactDOM = require('react-dom');

import NumberBaseball from './NumberBaseball';
import NumberBaseballOptimization from './NumberBaseballOptimization'
import NumberBaseballHooks from "./NumberBaseballHooks";
import NumberBaseballHooksOptimization from "./NumberBaseballHooksOptimization";

import TRenderTest from "./TRenderTest";

ReactDOM.render(
    <>
        <NumberBaseball/>
        <hr/>
        <NumberBaseballOptimization/>
        <hr/>
        <NumberBaseballHooks/>
        <hr/>
        <NumberBaseballHooksOptimization/>
        <hr/>
        <p/>
        <p/>
        <TRenderTest/>
    </>
    , document.querySelector('#root'));