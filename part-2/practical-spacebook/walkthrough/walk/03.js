$(function(){
  var router = new Router;

  // we always want to pass true, so this wraps
  // that extra work
  window.navigate = function(path){
    router.navigate(path, true);
  };

  Backbone.history.start();
});

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'timeline': 'timeline',
    'signup': 'signup'
  },

  index: function(){
    var loggedIn = ???;
    if(loggedIn == null) {
      window.navigate('/signup');
    } else {
      window.navigate('/timeline');
    }
  },

  signup: function(){
  },

  timeline: function(){
  }
});

var SignupView = Backbone.View.extend({
});

var UserModel = Backbone.Model.extend({
});

var CreateStatusView = Backbone.View.extend({
});

var PostModel = Backbone.Model.extend({
});

var PostCollection = Backbone.Collection.extend({
});

var PostView = Backbone.View.extend({
});

var PostCollectionView = Backbone.View.extend({
});

var CreateCommentView = Backbone.View.extend({
});

var CommentCollection = Backbone.Collection.extend({
});

var CommentView = Backbone.View.extend({
});

var CommentCollectionView = Backbone.View.extend({
});

