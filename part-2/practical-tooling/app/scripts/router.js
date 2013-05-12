define(["backbone", "views/kitlers", "jquery"], function (Backbone,KitlersView, $) {

  return Backbone.Router.extend({

    routes: {
      "":"home",
      "kitlers":"list"
    },

    changePage:function(id) {
      $(".page").hide();
      $("#page_"+id).show();
    },

    home:function() {
      this.changePage("home");
    },

    list:function() {
      this.changePage("list");
      this.klv = new KitlersView();
    },

    start:function() {
      Backbone.history.start();
    }

  });
});
