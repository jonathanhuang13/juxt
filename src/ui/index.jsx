require("babel-core/register");
require("babel-polyfill");

import ReactDOM from 'react-dom';
import React from 'react';
import Hello from './hello';

async function start() {
  //const foo = await fetch('http://localhost:3000/').then(r => r.json());
  ReactDOM.render(<Hello />, document.getElementById('main'));
}

start();
