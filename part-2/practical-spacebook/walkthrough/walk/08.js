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
    var view = new SignupView;
    view.render();

    $('#container').children().remove();
    $('#container').append(view.el);
  },

  timeline: function(){
    var username = window.user.get('name');
    if(username == null) {
      window.navigate('/signup');
      return;
    }

    $('#container').html('<h1>Hello ' + username + '!</h1>');
  }
});

var SignupView = Backbone.View.extend({
  template: '<form class="form-inline"><input type="text" placeholder="user name" />'
    + '<button class="btn btn-primary">Sign In</button></form>'
  ,
  events: {
    'click button': 'submit'
  },
  render: function(){
    this.$el.html(this.template);
  },
  submit: function(){
    var name = this.$('input').val();
    window.user.set('name', name);
    window.user.save();

    window.navigate('/timeline');
  }
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

