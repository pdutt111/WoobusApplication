/**
 * Created by pariskshitdutt on 01/11/15.
 */
console.log("fetching state of router");
    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.105:1337' + '/api/v1/users/state',
        contentType: 'application/json',
        dataType: "json",
        success: function(data){
            console.log(data);
            localStorage._apiBaseUrl="http://192.168.1.105:1337/api/v1";
            _apiBaseUrl="http://192.168.1.105:1337/api/v1";
            console.log(_apiBaseUrl);
            if(localStorage.getItem('token')){
                console.log(localStorage.getItem('token'));
                if(data.in_bus){
                    console.log("in bus");
                    $(location).attr('href','myjourney.html');
                }else{
                    $(location).attr('href','makeabooking.html');
                }
            }else{
                $(location).attr('href','registration.html');
            }
        },
        error: function(err){
            console.log(err);
            localStorage._apiBaseUrl="http://dev.cachefi.com/api/v1";
            _apiBaseUrl="http://dev.cachefi.com/api/v1";
            if(localStorage.getItem('token')){
                console.log(localStorage.getItem('token'));
                $(location).attr('href','makeabooking.html');
            }else{
                $(location).attr('href','registration.html');
            }
        },
        timeout: 5000 // sets timeout to 3 seconds

    });