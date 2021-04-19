const React = require('react');
const ReactDOM = require('react-dom');

import Rsp from './Rsp'
import RspHooks from "./RspHooks";

ReactDOM.render(
    <>
        <h1>RSP Class</h1>
        <Rsp/>
        <hr/>

        <h1>RSP Hooks</h1>
        <RspHooks/>
    </>
    , document.querySelector('#root')
);