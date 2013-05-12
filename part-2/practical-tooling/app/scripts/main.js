require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        backbone: '../components/backbone/backbone',
        underscore: '../components/underscore/underscore',
        bootstrap: 'vendor/bootstrap',
        face: 'vendor/face'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        face: {
            deps: ['jquery'],
            exports: ''
        },
        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        underscore: {
            deps: [''],
            exports: '_'
        }
    }
});

require(['router', 'jquery', 'bootstrap', 'face'], function (Router, $) {

    $(function() {
        window.R = new Router();
        window.R.start();
    });
});
