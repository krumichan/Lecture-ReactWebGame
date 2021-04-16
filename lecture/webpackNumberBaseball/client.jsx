const React = require('react');
const ReactDOM = require('react-dom');

import NumberBaseball from './NumberBaseball';
import NumberBaseballHooks from "./NumberBaseHooks";

import TRenderTest from "./TRenderTest";

ReactDOM.render(
    <>
        <NumberBaseball/>
        <hr/>
        <NumberBaseballHooks/>
        <hr/>
        <p/>
        <p/>
        <TRenderTest/>
    </>
    , document.querySelector('#root'));