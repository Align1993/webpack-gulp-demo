require('./css/test.css');
require('./less/testLess.less');
require('./sass/testSass.scss');
import _ from 'lodash';
import c from './js/test.js';
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(
  <h1>Hello, world2018!</h1>,
  document.getElementById('react')
);
function component() {
	var element = document.createElement('div');
	    element.id = 'Div';
	var p = document.createElement('p');
        p.innerHTML = "learn sass";
        p.className = "redbox" ;
	element.innerHTML = _.join(['h1234444456', 'webpack'], '');
   element.appendChild(p);
	return element;
}

document.body.appendChild(component());
c();