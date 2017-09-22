/*
 * Leia CSS Selector Engine
 * Copyright 2017, javcof
 */

(function() {
	 var i = 0;
	 
	 var Leia = function(selector, context, results) {
		 context = context || document;
		 results = results || [];
		 
		 if (!selector && typeof selector !== 'string') {
			 return results;
		 }

		 return results;
	 }
	 
	 window.Leia = Leia;
 })();