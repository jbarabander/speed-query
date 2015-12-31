 	function decodeEncChars(param) {
 		var str = '';
 		if(typeof param === 'string') {
 			var i = 0;
 			while(i < param.length) {
 				switch(param.slice(i, i + 3)) {
 					case '%20':
 						str += ' ';
 						i += 3;
 						break;
 					case '%21':
 						str += '!';
 						i += 3;
 						break;
 					case '%24':
 						str += '$';
 						i += 3;
 						break;
 					case '%25':
 						str += '%';
 						i += 3;
 						break;
 					case '%26':
 						str += '&';
 						i += 3;
 						break;
 					case "%27":
 						str += "'";
 						i += 3;
 					 	break;
	 				case "%3D":
	 					str += '=';
	 					i += 3;
	 					break;
	 				case "%3F":
	 					str += '?';
	 					i += 3;
	 					break;
	 				default: 
	 					str += param[i];
	 					i++;
	 					break;
	 					//add more to switch case later	
 				}
 			}
 		}
 		return str;
 	}

 	// function nestedSplit(str, arr) {
 	// 	var splitArr = 
 	// }

 	// function recursivePortion(params) {
 	// 	if(!params) return '';
 	// 	var keys = Object.keys(param)
 	// }
 	var checkForEncChars = (function() {
 		var encodedChars = [
 			'%0A', '%0D', '%20', '%21', '%22', '%23', '%24', '%25', '%26', 
 			'%27', '%28', '%29', '%2A', '%2B', '%2C', '%2D', '%2E', '%2F', '%3A', 
 			'%3B', '%3C', '%3D', '%3F', '%40', '%5B', '%5D'
 		]
 		return function(str) {
 			return encodedChars.indexOf(str) !== -1;
 		}
 	})();

 	function encodeParam(param) {
 		console.log(param);
 		//POC - to be fleshed out with another function
 		var str = '';
 		if(typeof param === 'string') {
 			for(var i = 0; i < param.length; i++) {
 				switch(param[i]) {
 					case ' ':
 						str += '%20';
 						break;
 					case '!':
 						str += '%21';
 						break;
 					case '$':
 						str += '%24';
 						break;
 					case '%':
 						// if(checkForEncChars(param.slice(i, i + 3))) {
 						// 	str += '%';
 						// } else {
 							str += '%25';
 						// }
 						break;
 					case '&':
 						str += '%26';
 						break;
 					case "'":
 						str += '%27';
 					 	break;
 					case "=":
 						str += '%3D';
 						break;
 					case "?":
 						str += '%3F';
 						break;
 					default: 
 						str += param[i];
 						break;	
 				}
 			}
 		}
 		return str;
 	}

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
				stringifiedParam = newKey + '=' + encodeParam(currentParam);
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
			query[keys[0]] = decodeEncChars(value);
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
			currentObj[keys[keys.length - 1]] = decodeEncChars(value);
		}
	}
	return query;
}