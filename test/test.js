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
		})();
		actual = Leia('#color');
		assert.deepEqual(actual, [color], 'Leia("color") should return [element#color]');
	});
}

