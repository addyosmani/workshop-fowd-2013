/*global define, alert */
define(["backbone", "jquery", "underscore", "collections/kitlers"], function (Backbone, $, _, KitlersCol) {

  return Backbone.View.extend({
    el:"#page_list",

    events:{
      "click .detect":"detect"
    },

    initialize:function() {
      
      this.col = new KitlersCol();

      this.col.on("all",this.render,this);

      this.col.fetch();

      this.tpl = _.template($("#kitemplate").html());


    },

    render:function() {
      this.$el.html(
        this.col.map(function(k) {
          return this.tpl({"m":k});
        },this).join("")
      );
    },

    detect:function(evt) {
      var img = $("img",$(evt.target).parent());
      var coordinates = img.faceDetection();

       if(coordinates.length) {
          coordinates.forEach(function(coord) {

            $("<div>", {
              css: {
                position: "absolute",
                left: coord.positionX - 5 + parseInt(img.css("margin-left"),10) + "px",
                top: coord.positionY - 5 + "px",
                width: coord.width + "px",
                height: coord.height + "px",
                border: "3px solid red"
              }
            }).appendTo(img.parent());
          });
       }
    }
  });
});