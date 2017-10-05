window.onload = function() {
	QUnit.test('Leia', function(assert) {
		
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
			assert.deepEqual(actual, [div1, div2, div3], 'Leia("div") should return [div. div, div]');
			
			data.removeChild(div1);
			data.removeChild(div2);
			data.removeChild(div3);
			
			actual = Leia('*', data);
			assert.deepEqual(actual, [], 'Leia("*", data) should return []');
		})();
	});
}