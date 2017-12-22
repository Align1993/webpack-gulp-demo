require('./css/test.css');
require('./less/testLess.less');
require('./sass/testSass.scss');
import _ from 'lodash';
import c from './js/test.js';
function component() {
	var element = document.createElement('div');
	    element.id = 'Div';
	var p = document.createElement('p');
        p.innerHTML = "learn sass";
        p.className = "redbox" ;
	element.innerHTML = _.join(['helld4do123456', 'webpack'], '');
   element.appendChild(p);
	return element;
}

document.body.appendChild(component());
c();