function qStringify(params, upperParam) {
		var paramsArr = [];
		if(!params) return '';
			var keys = Object.keys(params);
		if(!keys.length) return '';
		for(var i = 0; i < keys.length; i++) {
			var currentKey = keys[i];
			var currentParam = params[currentKey];
			var newKey = upperParam ? upperParam + '[' + currentKey + ']' : currentKey;
			switch(typeof currentParam) {
				case 'object':
				stringifiedParam = qStringify(currentParam, newKey);
				break;
			case 'string':
				stringifiedParam = newKey + '=' + currentParam;
				break;
			}
			paramsArr.push(stringifiedParam);
		}
		return paramsArr.join('&');
}