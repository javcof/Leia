/*
 * Leia CSS Selector Engine
 * Copyright 2017, javcof
 */

(function() {
	var i = 0,
		
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/
		;

	var Leia = function(selector, context, results) {
		var elem, m, match;
		
		context = context || document;
		results = results || [];
	 
		if (!selector && typeof selector !== 'string') {
			return results;
		}
		
		if ((match = rquickExpr.exec(selector))) {
			if ((m = match[1])) {
				if ((elem = document.getElementById(m))) {
					results.push(elem);
					return results;
				} else {
					return results;
				}
			} else if (match[2]) {
				Array.prototype.push(results, document.getElementsByTagName(selector));
				return results;
			} else if ((m = match[3])) {
				Array.prototype.push(results, document.getElementsByClassName(m));
				return results;
			}
		}

		return results;
	}

	window.Leia = Leia;
 })();