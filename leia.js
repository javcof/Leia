/*
 * Leia CSS Selector Engine
 * Copyright 2017, jeffreyzhang
 */

(function() {
	var i = 0,
		slice = function(obj) {
			var arr = [];
			try {
				// (IE8-)NodeLists are host objects, using the Array.prototype.slice method on host objects is not guaranteed to work
				// https://stackoverflow.com/questions/13317752/array-prototype-slice-this-is-not-a-javascript-object-error-in-ie8
				// https://stackoverflow.com/questions/2735067/how-to-convert-a-dom-node-list-to-an-array-in-javascript
				arr = [].slice.apply(obj);
			} catch (e) {
				for (var i = 0, len = obj.length; i < len; i++) {
					arr.push(obj[i]);
				}
			}
			return arr;
		};

	var Leia = function(selector, context, results) {
		var elem, eles, m, match, set;
		
		context = context || document;
		results = results || [];
	 
		if (!selector || typeof selector !== 'string') {
			return results;
		}
		
		var ret = Leia.find(selector, context);
		results = Leia.filter(ret.expr, ret.set);
		
		return results;
	}
	
	Leia.find = function(expr, context) {
		var type, set;
		for (var i = 0, len = Leia.selectors.order.length; i < len; i++) {
			type = Leia.selectors.order[i];
			if ((match = Leia.selectors.match[type].exec(expr))) {
				set = Leia.selectors.find[type](match, context);
				
				if (set) {
					expr = expr.replace(Leia.selectors.match[type], '');
					break;
				}
			}
		}
		
		if (!set) {
			set = slice(context.getElementsByTagName('*'));
		}
		
		return { expr: expr, set: set };
	}
	
	Leia.filter = function(expr, set) {
		var expr2 = expr, match, bingo, item, results = [];
		while (expr && set.length) {
			for (var type in Leia.selectors.filter) {
				if ((match = Leia.selectors.match[type].exec(expr))) {
					if((item = set.shift())) {
						bingo = Leia.selectors.filter[type](item, match);
						if (bingo) {
							results.push(item);
							expr = expr.replace(Leia.selectors.match[type], '');
							break;
						}
					}			
				}
			}
		}
		
		return expr === expr2 ? set : results;
	}
	
	Leia.selectors = {
		order: ['ID', 'NAME', 'TAG'],
		match: {
			ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
			CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
			NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
			ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
			TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
			CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
			POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
			PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
		},
		find: {
			ID: function(match) {
				var elem = document.getElementById(match[1]);
				return elem ? [elem]: [];
			},
			TAG: function(match, context) {
				var eles = context.getElementsByTagName(match[1]);
				return slice(eles);
			}
		},
		filter: {
			TAG: function(elem, match) {
				return (elem.nodeType === 1 && match[1] === '*') || elem.nodeName === match[1].toUpperCase();
			},
			CLASS: function(elem, match) {
				return (' ' + elem.className + ' ').indexOf(' ' + match[1] + ' ') !== -1;
			}
		}
	}

	window.Leia = Leia;
 })();