

## Models

```javascript
var Palette = Backbone.Model.extend({
	pickColor: function(){
		var bgColor = prompt('Please enter a color:');
		this.set({color: bgColor});
	}
});

window.palette = new Palette;

palette.on('change:color', function(model, bgColor){
	$('body').css({background: bgColor});
});

palette.set({color: 'pink'});

palette.pickColor();
```

```javascript
var model = new Backbone.Model();
model.set('name', 'Some Guy');
model.get('name');
model.attributes;
model.on('change', function(){}, this);

var ProductModel = Backbone.Model.extend({
  url: '/product',
  // OR
  localStorage: new Store('ProductModel')
});

var productModel = new ProductModel();
productModel.fetch();
productModel.save();
```


```javascript
var Smurf = Backbone.Model.extend({
	defaults:{
		name: 'John Smurf',
		age:0,
		skill: 'smurfing',
		children:[]
	},
	initialize: function(){
		console.log('Welcome new Smurf!')
	},
	adopt: function( childsName ){
		var childrenArray = this.get('children');
		childrenArray.push( childsName );
		this.set({ children: childrenArray });
	}
});

var papa = new Smurf({ name: 'Papa Smurf', age: 50, children: ['Brainy']});

papa.adopt('Smurfette');
papa.adopt('Grouchy');

var children = papa.get('children'); 
// ['Brainy', 'Smurfette', 'Grouchy']

```

## Collections

```javascript
var collection = new Backbone.Collection();
collection.add(someModel);
collection.remove(someModel);
collection.reset([model1, model2]);
collection.models;
collection.each(function(model){});

var ProductCollection = Backbone.Collection.extend({
  url: '/products',
  // OR
  localStorage: new Store('Products');
});

var products = new ProductCollection();
products.fetch();
products.sync();
```

```javascript
var Photo = Backbone.Model.extend({
	defaults:{
		caption: "None",
		source: "placeholder.jpg"
	},
	initialize: function(){
		console.log('New photo FTW!');
	}
});

var Album = Backbone.Collection.extend({
	model: Photo
});

var photo1 = new Photo({ caption: 'Holiday', source: 'DCM1.jpg' });
var photo2 = new Photo({ caption: 'Snow day', source: 'DCM2.jpg' });
var photo3 = new Photo({ caption: 'Camping', source: 'DCM3.jpg' });
var photo4 = new Photo({ caption: 'Christmas', source: 'DCM4.jpg' });

var tripsAlbum = new Album([ photo1, photo2, photo3, photo4 ]);
console.log( tripsAlbum.models ); 
// [photo1, photo2, photo3, photo4]

```


## Views

```javascript
var PhotoView = Backbone.View.extend({

	initialize: function(){
		this.model.on('change', this.render, this);
	},
	render: function(){
		this.$el.html('Name:' + this.model.get('name'));
	}
	
});

var photoView = new PhotoView({
	model: Photo,
	el: $('.photo')
});

photoView.render();
```



## Router

```javascript
var Workspace = Backbone.Router.extend({

	routes: {
	    "about":                "about",   // #about
	    "download/*path"		    "download" // #download/...
	    "search/:query":        "search",  // #search/red
	    "search/:query/p:page": "search"   // #search/red/p7
	},
	
	about: function(){  },
	download: function(path){ },
	search: function(query, page){  }
	
});
```

```javascript
var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    '/products': 'productIndex'
  },
  index: function(){
    window.router.navigate('/products', true);
  },
  productIndex: function(){
    var productsView = new ProductCollectionView();
    productView.render();
    $('#container').append(productView.el);
  }
});
window.router = new Router;
Backbone.history.start({pushState: true});
```


## Events

```javascript
var ProductView = Backbone.View.extend({
  initialize: function(){
    this.model.on('change', this.render, this);
    this.messageBus.on('clear:all', this.remove, this);
  },
  events: {
    'click .add': 'addProduct'
  },
  addProduct: function(){
    this.trigger('add', this);
  }
});
```
