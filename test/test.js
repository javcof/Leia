window.onload = function() {
	QUnit.test('Leia', function(assert) {
		
		var actual, expected; 
		
		actual = Leia(null);
		assert.deepEqual(actual, [], 'Leia(null) should return []');
		
		actual = Leia(function() {});
		assert.deepEqual(actual, [], 'Leia(function type) should return []');
		
	});
}

