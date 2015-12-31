function qStringify(params, upperParam) {
		var paramsArr = [];
		if(!params) return '';
			var keys = Object.keys(params);
		if(!keys.length) return '';
		for(var i = 0; i < keys.length; i++) {
			var currentKey = keys[i];
			var currentParam = params[currentKey];
			var newKey = upperParam ? upperParam + '[' + currentKey + ']' : currentKey;
			//serves as a way of getting the nested key string
			switch(typeof currentParam) {
				case 'object':
				//if it is an object then its nested and we have to make another go at it
				//we will pass in the key string so far for use in the next step
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

function qSerialize(str) {
	var splitQuery = str.split('&');
	// console.log(splitQuery);
	var query = {};
	var priorParameter;
	for(var i = 0; i < splitQuery.length; i++) {
		var currentQueryPortion = splitQuery[i];
		var keyAndValue = currentQueryPortion.split('=');
		var keys = keyAndValue[0].split('[').map(function(element, index) {
			if(index === 0) {
				return element;
			} else {
				return element.slice(0, element.length - 1);
			}
		});
		console.log(keys);
		// console.log(keys);
		var value = keyAndValue[1];
		if(keys.length === 1) {
			query[keys[0]] = value;
		} else {
			var currentObj = query;
			for(var j = 0; j < keys.length - 1; j++) {
				var currentKey = keys[j];
				// if(j !== 0) {
				// 	currentKey = currentKey.slice(0, currentKey.length - 1);
				// 	console.log(currentKey);
				// }
				if(!currentObj[currentKey]) {
					currentObj[currentKey] = {};
				}
				currentObj = currentObj[currentKey];
			}
			currentObj[keys[keys.length - 1]] = value;
		}
	}
	return query;
}