$(document).ready(function () {
    console.log("running");
    getRouteDetails();
    setInterval(function () {
        getRouteDetails();
    }, 5*60*1000);
});

function getRouteDetails() {
    var token = sessionStorage.getItem("access_token");
    var headers = {};
    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }
    console.log("fetching route"+_apiBaseUrl);
    $.ajax({
        type: 'GET',
        url: _apiBaseUrl + '/route/currentRoute',
        dataType: "json",
        headers: headers,
        success: dataParserRoute,
        error: function(){
            console.log("not travelling");
        }
    });
}
function dataParserRoute(data) {
    var journeyData= JSON.stringify(data);
    var data=JSON.parse(journeyData);

    console.log(data.start);
    $("#from").html(data.start);
    $("#to").html(data.end);

    $("#distance").html(data.current_distance+" Kms");
    console.log(data.distance);

    var position_marker=((data.distance-data.current_distance)/data.distance)*78;//78 is because of the margins and so that it stays in the bounds needs to be sorted

    $("#marker").css({'left':position_marker + 5 + '%'});

    console.log(data.current_time_taken);
    var minutes=(data.current_time_taken/(1000*60)).toFixed(0);
    var time_taken = Math.floor(minutes/60)+"."+(minutes%60)+" Hrs";
    $("#time").html(time_taken);

    console.log(journeyData);

    for(var i=0; i < data.scheduled_stops.length; i++){
        //console.log()
        $("#stops").append('<a class="bin tooltipped modal-trigger" data-position="top" data-delay="50" data-tooltip="Restaurants" onclick="dialog(' +
            i + ')" href="#modal2">' +
            '<i class="material-icons white-text">restaurant_menu</i></a>');
    }
    sessionStorage.setItem('journey', journeyData);
    //window.location.href = "profile.html";
}

function dialog(count){
    var journey = JSON.parse(sessionStorage.getItem("journey"));
    console.log(journey);

    var dialog = journey.scheduled_stops[count];

    $("#stop_title").html(dialog.name);
    for(var i=0; i < dialog.restaurants_available.length; i++){
        $("#stop_restaurants").append(dialog.restaurants_available[i]+"<br>");
    }
    console.log(dialog.is_loo);
    if (dialog.is_loo) {
        $("#stop_facilities").append('<img class="facility-icon" src="images/icons-png/loo.png">')
    }
    if (dialog.is_food) {
        $("#stop_facilities").append('<img class="facility-icon" src="images/icons-png/food.png">')
    }
}


$("#btnStop").click(function () {
    
});

$("#btnAccessories").click(function () {

});
