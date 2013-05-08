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
    if(window.user.get('name') == null) {
      window.navigate('/signup');
      return;
    }

    var posts = new PostCollection();
    posts.fetch()

    var statusView = new CreateStatusView({
      collection: posts
    });
    statusView.render();

    var postsView = new PostCollectionView({
      collection: posts
    });
    postsView.render();

    $('#container').children().remove();
    $('#container')
      .append(statusView.el)
      .append('<hr>')
      .append(postsView.el);
  }
});

var SignupView = Backbone.View.extend({
  template: '<form class="form-inline"><input type="text" placeholder="user name" /><button class="btn btn-primary">Sign In</button></form>',
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
  className: 'status',
  template: '<button class="btn logout pull-right">logout</button>'
    + '<form class="form-inline"><span class="username">{{ username }}</span>: '
    + '<div class="input-append"><input type="text" placeholder="How is your planet doing?" />'
    + '<button class="btn btn-primary create-status">Post</button></div></form>',

  events: {
    'click .create-status': 'createStatus',
    'click .logout': 'logout'
  },
  render: function(){
    var context = {
      username: window.user.get('name')
    };
    this.$el.html(Mustache.render(this.template, context));
  },

  // We need a unique id for saving this as well as
  // referencing it when we save comments for a post
  getNewPostId: function(){
    if(!this.newPostId) {
      this.newPostId = this.collection.length;
    }
    this.newPostId++;
    return this.newPostId;
  },
  createStatus: function(){
    var text = this.$('input').val();
    var post = new PostModel({
      id: this.getNewPostId(),
      text: text,
      username: window.user.get('name')
    });

    this.collection.add(post);

    // saving a model in a localStorage collection causes
    // it to be stored in localStorage
    post.save();

    this.$('input').val('');
  },
  logout: function(){
    window.user.set('name', null);
    window.navigate('/signup');
  }
});

var PostModel = Backbone.Model.extend({
});

var PostCollection = Backbone.Collection.extend({
  model: PostModel,
  localStorage: new Store('PostCollection')
});

var PostView = Backbone.View.extend({
  className: 'post',
  template: '<div class="post-text"><span class="username">{{ username }}</span>: {{ text }}</div>',
  renderView: function(view){
    view.render();
    this.$el.append(view.el);
  },
  render: function(){
    this.$el.html(Mustache.render(this.template, this.model.attributes));
  }
});

var PostCollectionView = Backbone.View.extend({
  className: 'posts',
  initialize: function(){
    this.collection.bind('add', this.postAdded, this);
  },
  postAdded: function(model){
    var postView = new PostView({
      model: model
    });
    this.renderView(postView);
  },
  renderView: function(view){
    view.render()
    this.$el.prepend(view.el)
  },
  render: function(){
    var view = this;
    this.collection.each(function(post){
      var postView = new PostView({model: post});
      view.renderView(postView);
    });
  }
});

var CreateCommentView = Backbone.View.extend({
});

var CommentCollection = Backbone.Collection.extend({
});

var CommentView = Backbone.View.extend({
});

var CommentCollectionView = Backbone.View.extend({
});

