const React = require('react');
const ReactDOM = require('react-dom');

import ResponseCheck from './ResponseCheck'
import ResponseCheckHooks from './ResponseCheckHooks'
import ResponseCheckHooksIfFor from './ResponseCheckHooksIfFor'

ReactDOM.render(
    <>
        <ResponseCheck/>
        <hr/>
        <ResponseCheckHooks/>
        <hr/>
        <ResponseCheckHooksIfFor/>
    </>
    , document.querySelector('#root'));