define(['jquery.mockjax'], function(){

    var initialize = function() {
        $.mockjax({
            url: '/api/users/',
            responseTime: 500,
            responseText: [
                    {
                        "id":1,
                        "name":"Max",
                        "age":28
                    },
                    {
                        "id":2,
                        "name":"Fernando",
                        "age":39
                    }
                ]
            });
    };
    
    return {initialize: initialize};
});


