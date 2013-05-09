/*global gmm */
if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer.module('NavbarModule', function (Mod, Viewer, Backbone, Marionette, $, _) {

        //==================================
        //initializer called on Viewer.start(options)
        //==================================
        Mod.addInitializer(function (options) {
            Mod.controller = new Controller({
                toolItems: options.toolItems,
                //we pass in the region from the app because it will be
                //converted into a Marionette.Region for us
                region: Viewer.toolsRegion
            });
        });


        //==================================
        //Controller for the NavbarModule
        //==================================
        var Controller = Backbone.Marionette.Controller.extend({
            initialize: function (options) {
                _.bindAll();
                this.region = options.region;
                console.log('NavbarModule:Controller:initialize');
                //convert tools array to a collection
                this.collection = new ToolItemCollection(options.toolItems);
                //create the list view and pass in the collection
                this.view = new ToolListView({ collection: this.collection });
                //render it all once, now. Since the items don't change
                //while the app is running, we never need to re-render
                this.region.show(this.view);

                $('#current-item').on('click', function () {
                    Viewer.vent.trigger('Navbar:ToggleMenu');
                    $('#menu-widget').toggleClass('rotated');                              
                });

                //hook up App events            
                Viewer.vent.on('Navbar:ChangeItemName', function (name) {
                    console.log('NavbarController caught Navbar:ChangeItemName');
                    //change the displayed value in the ui
                    $('#current-item-name').text(name);
                });  
                           
                Viewer.vent.on('Navbar:ShowMenu', function (name) {
                    console.log('NavbarController caught Navbar:ShowMenu');
                    //change the displayed value in the ui
                    $('#current-item-name').text(name);
                }); 
                 Viewer.vent.on('Navbar:HideMenu', function (name) {
                    console.log('NavbarController caught Navbar:HideMenu');
                    //change the displayed value in the ui
                    $('#current-item-name').text(name);
                });               
            }
        });


        //Model
        var ToolItemModel = Backbone.Model.extend({});
        //Collection
        var ToolItemCollection = Backbone.Collection.extend({
            model: ToolItemModel
        });

        var ToolItemView = Backbone.Marionette.ItemView.extend({
            model: ToolItemModel,
            template: '#tool-template',
            tagName: 'li', 
            events: {'click': 'itemClicked'},
            itemClicked: function(){
                console.log('ToolItemClicked: '+ this.model.get('name'));
                Viewer.vent.trigger(this.model.get('eventToRaise'), this);
            
            }      
        });

        var ToolListView = Backbone.Marionette.CollectionView.extend({
          itemView: ToolItemView,
          tagName: 'ul'
        });

        /*var MenuListView = Backbone.Marionette.ItemView.extend({
            el: '#menu-item-list-container',            
            initialize: function (options) {
                _.bindAll();
                this.collection = options.collection;
            },

            render: function () {
                //loop over the models in the collection
                console.log('Starting Menu Rendering...');
                _.each(this.collection.models, function (model) {
                    console.log('   rendering...' + model.get('name'));
                    //cook the view                 
                    var vw = new MenuListItemView({ model: model });
                    //if there were a lot of these, it would be much
                    //better to push them into an array THEN
                    //call .append(theArray) all at once
                    this.$el.append(vw.render().el);
                }, this);
                console.log('Done Menu Rendering...');
                return this;
            }

        });*/

        /*var ToolItemView = Backbone.Marionette.ItemView.extend({
            template: "#tool-item"
            initialize: function (options) {
                _.bindAll();
                //set the template in initialize so we know the DOM is ready
                this.template = _.template($('#menu-list-item').html());
            },
            events: { 'click': 'itemClicked' },
            render: function () {
                this.$el.append(this.template(this.model.toJSON()));
                return this;
            },
            itemClicked: function () {
                console.log('Tool Item selected ' + this.model.get('name'));
                //raise and event and the related Module will catch it                               
                Viewer.vent.trigger(this.model.get('eventToRaise'), this);
            }

        });*/

    });
})();