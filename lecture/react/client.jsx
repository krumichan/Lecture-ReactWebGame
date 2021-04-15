const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./wordRelay/WordRelay')

ReactDom.render(<WordRelay/>, document.querySelector('#root'));