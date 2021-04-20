const React = require('react');
const ReactDOM = require('react-dom');

import MineSearch from "./MineSearchHooks";

ReactDOM.render(
    <>
        <h1>Mine Search Hooks</h1>
        <MineSearch />
    </>
, document.querySelector('#root'));