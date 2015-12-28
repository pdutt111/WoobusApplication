/**
 * Created by pariskshitdutt on 01/11/15.
 */
    $.ajax({
        type: 'GET',
        url: _localUrl+'/users/state',
        contentType: 'application/json',
        dataType: "json",
        success: function(data){
            console.log(data);
            localStorage._apiBaseUrl=_localUrl;
            _apiBaseUrl=_localUrl;
            console.log(_apiBaseUrl);
            if(localStorage.getItem('token')){
                console.log(localStorage.getItem('token'));
                if(data.in_bus){
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
            localStorage._apiBaseUrl=_apiBaseUrl;
            //_apiBaseUrl="http://dev.cachefi.com/api/v1";
            if(localStorage.getItem('token')){
                console.log(localStorage.getItem('token'));
                $(location).attr('href','makeabooking.html');
            }else{
                $(location).attr('href','registration.html');
            }
        },
        timeout: 3000 // sets timeout to 3 seconds

    });