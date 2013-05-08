## Table of Contents

* [Configuration](#conf)
* [Basic Module Definition](#base)
* [Module with Dependencies](#dep)
* [Module with Require](#req)
* [Module with Conditional Dependencies](#con)
* [Module with Deferred ](#def)
* [Object State Sharing](#state)
* [Object Communication with Mediator](#medi)
* [Plugins](#plug)
* [Multipage Build](#build)
* [Resources](#res)

## <a name="conf">Configuration</a>
When using require() in the top-level HTML page (or top-level script file that does not define a module), a configuration object can be passed as the first option
```js
require.config({
    baseUrl: "/another/path",
    paths: {
        "some": "some/v1.0"
    },
    waitSeconds: 15
  });
```

## <a name="base">Basic Module Definition</a>

    define(id, dependencies, factory);

Using an ID is not recommended unless necessary.

    define(dependencies, factory);

Difference between define and require:

define

- loads dependencies
- call the callback funtction

require

- same steps like define
- registers the return value from the callback function

moduleA.js

```js
define( function(){
	var counter = 0;
	return {
		incrementCounter: function() {
			return ++counter;
		},
		resetCounter: function() {
			counter = 0;
			return counter;
		}
	};
});
```
app.js

```js
require(["moduleA"], function(moduleA) {
	console.log(moduleA.incrementCounter());
	console.log(moduleA.resetCounter());
	console.log(moduleA.incrementCounter());
});
```

## <a name="dep">Module with Dependencies</a>

```js
define(['moduleA'], function(moduleA) {
	return {
		incrementCounter: function() {
			return moduleA.incrementCounter();
		}
	};
});
```

## <a name="req">Module with Require</a>

```js
define(['require'],function (require) {
	// inner require
	return require('moduleA');
});
```

## <a name="dep">Module with Conditional Dependencies</a> 

```js
define(['require'], function (require) {

	if(false){

		require(['moduleB'],function(moduleB){
			console.log('Module B');
			moduleB.incrementCounter();
		});

	} else {

		require(['moduleC'],function(moduleC){
			console.log('Module C');
			moduleC.incrementCounter();
		});

	}

});
```

## <a name="def">Module with Deferred</a>

moduleA.js

```js
define(['require', 'jquery'], function (require, $) {

	var deferred = $.Deferred();

	require(['moduleB'],function(moduleB){
		deferred.resolve(moduleB);
	});

	return deferred.promise();

});
```

app.js

```js
require(['moduleA'],function(deferred){
	deferred.done(function(moduleA) {
		moduleA.incrementCounter();
	});
});
```

## <a name="state">Object State Sharing</a>

moduleCore.js

```js
define(function(){
	return {
		counter: 0
	};
});
```

moduleA.js

```js
define(['moduleCore'], function(core){
	return {
		incrementCounter: function() {
			return ++core.counter;
		}
	};
});
```

moduleB.js

```js
define(['moduleCore'], function(core){
	return {
		incrementCounter: function() {
			return ++core.counter;
		}
	};
});
```

app.js


```js
require(["moduleA"], function(moduleA) {
	console.log(moduleA.incrementCounter());
});

require(["moduleB"], function(moduleB) {
	console.log(moduleB.incrementCounter());
});
```

## <a name="medi">Object Communication with Mediator</a>

moduleA.js

```js
define(['moduleMediator'], function(mediator){
	mediator.subscribe('valueChange', function(msg){
		console.log(msg);
	});
});
```

moduleB.js

```js
define(['moduleMediator'], function(mediator) {
	var counter = 0;
	return {
		incrementCounter: function() {
			mediator.publish('valueChange', ++counter);
		}
	};
});
```

moduleMediator.js

```js
define(function(){
	"use strict";

	var channels = {};
	var mediator = {
		subscribe : function(channel, fn){
			if(!channels[channel]) channels[channel] = [];
			channels[channel].push({ callback : fn });
		},
		publish : function(channel){
			if(!channels[channel]) return false;
			for(var i = 0, l = channels[channel].length; i < l; i++){
				var subscription = channels[channel][i];
				subscription.callback(arguments[1]);
			}
		}
	};

	return mediator;

});
```

## <a name="plug">Plugins</a>

Common plugins:

- `text!` : A text file dependency
- `domReady!` : Cross browser domready solution
- `css!` : Dynamically require css
- `order!` : Force ordered evaluation

file.js

```js
define({
	"foo"	: "red",
	"bar"	: "blue",
	"ninja"	: "invisible"
});
```

plugin.js

```js
define({
	normalize: function (name, normalize) {
		return name;
	},
	load: function (name, req, load, config) {
		req([name], function (value) {
			load(value);
		});
	}
});
```

module.js

```js
define(['plugin!file'], function (file) {
	return file;
});
```
## <a name="build">Multipage Build</a>

single file build: 
- name
- out

multi file:
- modules
- dir

module 1
```js
js/lib/../common.js
----------------
js/lib/../common.js
js/lib/jquery.js
js/app/lib.js
js/app/controller/Base.js
js/app/model/Base.js
```
module 2
```js
js/lib/../page1.js
----------------
js/lib/../page1.js
js/app/controller/c1.js
js/app/model/m1.js
js/app/main1.js
```
module 3
```js
js/lib/../page2.js
----------------
js/lib/../page2.js
js/app/controller/c2.js
js/app/model/m2.js
js/app/main2.js
```

