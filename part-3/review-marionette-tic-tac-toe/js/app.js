
MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
    mainRegion: "#content"
});

Row = Backbone.Model.extend({
    defaults: {
        turn: ["player1"] //(static variable)
    },
    initialize: function() {
        this.set("row", ["", "", ""])
    },
    set_piece: function(pos) {
        var row = this.get('row');
        var piece = "<span class=\"unicode large-circle\"></span>";
        var turn = this.get("turn");
        if (turn[0] == "player1") {
            turn[0] = "player2"
            piece = "<span class=\"unicode multiplication-x\"></span>"
        }
        else {
            turn[0] = "player1"
        }
        row[pos] = piece;
        this.set('row', row); //not needed
    }
});

Matrix = Backbone.Collection.extend({
   model: Row
});

RowView = Backbone.Marionette.ItemView.extend({
   template: "#row-template",
    tagName: 'tr',
    className: 'row',
    events: {
        'click td': "make_move"
    },
    make_move: function(event){
        if ($(event.target).html() == "") {
            var move = {a:0, b:1, c:2}[event.target.className];
            this.model.set_piece(move);
            this.render();
        }
    }
});

MatrixView = Backbone.Marionette.CompositeView.extend({
   template: "#matrix-template",
    tagName: 'table',
    id: "matrix",
    className: 'table-striped table-bordered',
    itemView: RowView,

    appendHtml: function(collectionView, itemView) {
        collectionView.$("tbody").append(itemView.el);
    }
});

MyApp.addInitializer(function(options) {
   var matrixView = new MatrixView({
       collection: options.matrix
   });
    MyApp.mainRegion.show(matrixView);
});

$(document).ready(function(){
    var matrix = new Matrix([
        {}, {}, {}
    ]);
    MyApp.start({matrix: matrix});
});