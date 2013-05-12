
define(["backbone"], function (Backbone) {

  return Backbone.Model.extend({
    shout:function() {
      alert(this.get("name"));
    }
  });
});