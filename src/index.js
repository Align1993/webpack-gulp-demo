import _ from 'lodash';
function component() {
	var element = document.createElement('div');

	element.innerHTML = _.join(['helldd454do', 'webpack'], '');

	return element;
}


document.body.appendChild(component());