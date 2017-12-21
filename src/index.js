import _ from 'lodash';
import c from './js/test.js';
function component() {
	var element = document.createElement('div');

	element.innerHTML = _.join(['helld4do', 'webpack'], '');

	return element;
}


document.body.appendChild(component());
c();