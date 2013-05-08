define(['underscore', 'backbone', 'backbone.offline', 'models/user'], function (_, Backbone, Offline, User) {
	var Users = Backbone.Collection.extend({
		
		url: '/api/users/',

		model: User,

		initialize: function() {
			this.storage = new Offline.Storage('users', this);
		}
				
	});

	return Users;
});