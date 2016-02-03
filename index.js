(function() {
	if(module && module.exports) {
		module.exports = {
			stringify: qStringify,

		}
	}
})()
function qStringify(params, upperParam) {
		var paramsArr = [];
		if(!params) return '';
			var keys = Object.keys(params);
		if(!keys.length) return '';
		for(var i = 0; i < keys.length; i++) {
			var currentKey = keys[i];
			var currentParam = params[currentKey];
			var encodedCurrentKey = encodeURIComponent(currentKey);
			var newKey = upperParam ? upperParam + '[' + encodedCurrentKey + ']' : encodedCurrentKey;
			//serves as a way of getting the nested key string
			switch(typeof currentParam) {
				case 'object':
				//if it is an object then its nested and we have to make another go at it
				//we will pass in the key string so far for use in the next step
				stringifiedParam = qStringify(currentParam, newKey);
				break;
			case 'string':
				stringifiedParam = newKey + '=' + encodeURIComponent(currentParam);
				break;
			default:
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
		var value = keyAndValue[1];
		if(keys.length === 1) {
			query[decodeURIComponent(keys[0])] = decodeURIComponent(value);
		} else {
			var currentObj = query;
			for(var j = 0; j < keys.length - 1; j++) {
				var decodedCurrentKey = decodeURIComponent(keys[j]);
				// if(j !== 0) {
				// 	currentKey = currentKey.slice(0, currentKey.length - 1);
				// 	console.log(currentKey);
				// }
				if(!currentObj[decodedCurrentKey]) {
					currentObj[decodedCurrentKey] = {};
				}
				currentObj = currentObj[decodedCurrentKey];
			}
			currentObj[decodeURIComponent(keys[keys.length - 1])] = decodeURIComponent(value);
		}
	}
	return query;
}