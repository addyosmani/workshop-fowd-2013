define(["backbone", "models/kitler"], function (Backbone, KitlerModel) {

  return Backbone.Collection.extend({
    model:KitlerModel,
    url:"/kitlers.json"
  });
});