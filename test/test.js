window.onload = function() {
	
	QUnit.test('Leia Basic Selector', function(assert) {
		
		var actual, expected, 
			data = document.getElementById('data');
		
		actual = Leia(null);
		assert.deepEqual(actual, [], 'Leia(null) should return []');
		
		actual = Leia(function() {});
		assert.deepEqual(actual, [], 'Leia(function type) should return []');
		
		(function() {
			var color = document.createElement('div');
			color.id = 'color';
			data.appendChild(color);
			
			actual = Leia('#color');
			assert.deepEqual(actual, [color], 'Leia("#color") should return [E#color]');
			
			actual = Leia('*#color');
			assert.deepEqual(actual, [color], 'Leia("*#color") should return [E#color]');
			
			actual = Leia('div#color');
			assert.deepEqual(actual, [color], 'Leia("div#color") should return [div#color]');
			
			actual = Leia('span#color');
			assert.deepEqual(actual, [], 'Leia("span#color") should return []');
						
			data.removeChild(color);
		})();
		
		(function() {
			var body;
			actual = Leia('body');
			body = document.getElementsByTagName('body')[0];
			assert.deepEqual(actual, [body], 'Leia("body") should return [body]');
			
			var div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div');
			data.appendChild(div1);
			data.appendChild(div2);
			data.appendChild(div3);
			
			actual = Leia('div', data);
			assert.deepEqual(actual, [div1, div2, div3], 'Leia("div",data) should return [div, div, div]');
			
			data.removeChild(div1);
			data.removeChild(div2);
			data.removeChild(div3);
			
			var div = document.createElement('div'),
				span = document.createElement('span');
			data.appendChild(div);
			data.appendChild(span)
			
			actual = Leia('*', data);
			assert.deepEqual(actual, [div, span], 'Leia("*", data) should return [div, span]');
			
			data.removeChild(div);
			data.removeChild(span);
		})();
	});
	
	QUnit.test('Leia Class Selector', function(assert) {
		var actual, expected, 
			data = document.getElementById('data');
			
		(function() {
			var red = document.createElement('div'),
				blue = document.createElement('div'),
				green = document.createElement('span');
			
			red.className = 'red';
			blue.className = 'blue';
			green.className = 'green';
			
			data.appendChild(red);
			data.appendChild(blue);
			data.appendChild(green);
			
			actual = Leia('.red');
			assert.deepEqual(actual, [red], 'Leia(".red") should return [E.red]');
			
			actual = Leia('.red', data);
			assert.deepEqual(actual, [red], 'Leia(".red", E) should return [E.red]');
			
			actual = Leia('div.red');
			assert.deepEqual(actual, [red], 'Leia("div.red") should return [E.red]');
			
			actual = Leia('span.red');
			assert.deepEqual(actual, [], 'Leia("span.red") should return []');
			
			data.removeChild(red);
			data.removeChild(blue);
			data.removeChild(green);
			
			var colorred = document.createElement('div'),
				colorblue = document.createElement('div'),
				colorgreen = document.createElement('span');
				
			colorred.className = 'color red';
			colorblue.className = 'color blue';
			colorgreen.className = 'color green';
			
			data.appendChild(colorred);
			data.appendChild(colorblue);
			data.appendChild(colorgreen);
			
			actual = Leia('.red');
			assert.deepEqual(actual, [colorred], 'Leia(".red") should return [E.color.red]');
			
			actual = Leia('.red', data);
			assert.deepEqual(actual, [colorred], 'Leia(".red", E) should return [E.color.red]');
			
			data.removeChild(colorred);
			data.removeChild(colorblue);
			data.removeChild(colorgreen);

			var prefixred = document.createElement('div'),
				suffixred = document.createElement('span'),
				middlered = document.createElement('div');
			
			prefixred.className = 'prefixred';
			suffixred.className = 'redsuffix';
			middlered.className = 'prefixredsuffix';
			
			data.appendChild(prefixred);
			data.appendChild(suffixred);
			data.appendChild(middlered);
			
			actual = Leia('.red', data);
			assert.deepEqual(actual, [], 'Leia(".red", E) should return []');
			assert.deepEqual(actual, [], 'Leia(".red", E) should return []');
			assert.deepEqual(actual, [], 'Leia(".red", E) should return []');
			
			data.removeChild(prefixred);
		})();
	});
	
	QUnit.test('Leia Hierarchy Selector', function(assert) {
		var actual, expected, 
			data = document.getElementById('data');
			
		(function() {
			var red = document.createElement('div'),
				blue = document.createElement('div'),
				green = document.createElement('span'),
				color = document.createElement('color');
			
			red.className = 'red';
			blue.className = 'blue';
			green.className = 'green';
			
			data.appendChild(color);
			color.appendChild(red);
			color.appendChild(blue);
			color.appendChild(green);
			
			actual = Leia('#data .red');
			assert.deepEqual(actual, [red], 'Leia("#data .red") should return [E.red]');
			
			actual = Leia('#other .red');
			assert.deepEqual(actual, [], 'Leia("#other .red") should return []');
		})();
	});
	
	QUnit.test('Leia Multiple Selector', function(assert) {
		var actual, expected,
			data = document.getElementById('data'),
			head = document.head || document.getElementsByTagName('head')[0],
			body = document.body || document.getElementsByTagName('body')[0];
			
		actual = Leia('head,body');
		assert.deepEqual(actual, [head, body], 'Leia("head,body") should return [HEAD,BODY]');
		
		/*
		actual = Leia('body,head');
		assert.deepEqual(actual, [document.head, document.body], 'Leia("body,head") should return [HEAD,BODY]');
		*/
	});
}