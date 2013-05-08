define(['underscore', 'backbone'], function (_, Backbone) {
	var User = Backbone.Model.extend({
		initialize: function() {
			this.on('change', function(){
				this.updated_at = new Date();
			}, this);
		}	
	});

	return User;
});