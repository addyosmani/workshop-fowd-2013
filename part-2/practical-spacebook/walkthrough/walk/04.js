$(function(){
  // use a hard-coded id so that it always fetches
  // the same value from localstorage
  window.user = new UserModel({id: 1});
  window.user.fetch();

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
    if(window.user.get('name') == null) {
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
  localStorage: new Store('User')
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

