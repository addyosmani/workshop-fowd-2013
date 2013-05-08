require.config({
  paths: {
    'jquery': 'vendor/jquery/jquery',
    'jquery.mockjax':'vendor/jquery/jquery.mockjax',
    'underscore': 'vendor/underscore-amd/underscore',
    'backbone': 'vendor/backbone-amd/backbone',
    'backbone.offline': 'vendor/backbone.offline/index'
  },
  shim: {
  	'backbone.offline': {
  		deps: ['underscore', 'backbone'],
  		exports: 'Offline'
  },
  'jquery.mockjax':['jquery']
}
});


require(['collections/users','models/user','mocks'], function(Users, User, Mocks){
	Mocks.initialize();
  
  AppUsers = new Users();
	
  // Override fetch 
  AppUsers.fetch = function(options){
     options || (options = {});
     // Do some other stuff here before calling the actual fetch.
     return Backbone.Collection.prototype.fetch.call(this, options);
  };

  var fetchFunction = function(){
    console.log("Fetch successful");
  };

  AppUsers.fetch({success: fetchFunction});
});