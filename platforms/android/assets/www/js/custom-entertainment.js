$(document).ready(function () {
    EntertainmentDetails();
});

function GetAllAudio() {
    $.ajax({
        method: 'GET',
        headers: {
            Authorization: localStorage.token
        },
        url: _apiBaseUrl + '/buses?start=' + searchData.searchfrom + '&end=' + searchData.searchto + '&date=' + searchData.searchdate,
        data: searchData,
        dataType: "json",
        success: dataParserBookingDetails,
        error: ServiceError
    });

    function dataParserBookingDetails(data) {
        if (data != null || data != undefined) {
            $.each(data, function (i, item) {

            });
        }
    }
}

function GetAllVideo(content) {
    console.log(content);
    $("#dvMovieList").html("");
    var selectMovie = "";
    for(var i=0;i<content.movies.length;i++){
        selectMovie = selectMovie +  '<div class="card z-depth-2"> <div class="card-image"> <img src="' + content.movies[i].pic + '" onerror="this.src=\'images/movie.jpg\'" />' +
            '<span class="card-title">' + content.movies[i].name +'</span> </div><div class="card-action white-text woobus">' +
            '<a href="#" class="white-text select-thumbnail-link" data-val="' + content.movies[i].path + '" data-name="' + content.movies[i].name +
            '"><i class="material-icons md-18 prefix">play_circle_filled</i> Play Movie</a></div></div>'
    }
    $("#dvMovieList").append(selectMovie);
}

$(document).on('click', '.select-thumbnail-link', function () {
    //var videoid = this.id;
    //videoid = videoid.replace('thumbvideo_', '');

    PlayVideo([this.getAttribute("data-val"), this.getAttribute("data-name")]);
});

function PlayVideo(path) {

    var videoFile =_localNginxUrl + path[0];
    var videoName = path[1];
    sessionStorage.videoUrl = videoFile;
    sessionStorage.videoName = videoName;
    //
    //$("#btnPlayVideo").attr({
    //    "src": videoFile,
    //    "autoplay": true,
    //    "height": "200px"
    //});
    //var elem = $("#btnPlayVideo");
    //if (elem.requestFullscreen) {
    //    elem.requestFullscreen();
    //} else if (elem.mozRequestFullScreen) {
    //    elem.mozRequestFullScreen();
    //} else if (elem.webkitRequestFullscreen) {
    //    elem.webkitRequestFullscreen();
    //}

    $(location).attr('href','player.html');

    //screen.lockOrientation('landscape');
    //so.setOrientation(so.Orientation.LANDSCAPE);
    //VideoPlayer.play(
    //    videoFile,
    //    {
    //        volume: 0.5,
    //        scalingMode: VideoPlayer.SCALING_MODE.SCALE_TO_FIT
    //    },
    //    function () {
    //        console.log("video completed");
    //    },
    //    function (err) {
    //        console.log(err);
    //    }
    //);
}

function EntertainmentDetails() {
    //var journeyData = {
    //    journeyBusId: "56043a5c361ffe41bd662044" //$("#txtFrom").val().trim()
    //};
    $.ajax({
        method: 'GET',
        url: _apiBaseUrl + '/content',
        //data: journeyData,
        dataType: "json",
        success: dataParserEntertainmentDetails,
        error: ServiceError
    });

    function dataParserEntertainmentDetails(data) {
        if (data != null || data != undefined) {
            var songs=[];
            var movies=[];
            var ebooks=[];
            for(var i=0;i<data.length;i++){
                console.log(data[i]);
                if(data[i].content_type=="movie"){
                    movies.push(data[i]);
                }else if(data[i].content_type=="song"){
                    songs.push(data[i]);
                }else{
                    ebooks.push(data[i]);
                }
            }
            var content={movies:movies,songs:songs,ebooks:ebooks};
            GetAllVideo(content);
        }
    }
}

/**
* END
 */


/**
 * Created by Indresh Singh for music player on 27/10/15.
 */

var playlist = [
    {
        url: "http://www.scottandrew.com/mp3/demos/holding_back_demo_011504.mp3",
        title: "Holding Back"
    },
    {
        url: "http://www.scottandrew.com/mp3/wb/where_ive_been/Scott_Andrew_and_the_Walkingbirds-Gravel_Road_Requiem.mp3",
        title: "Gravel Road Requiem"
    },
    {
        url: "http://www.scottandrew.com/mp3/syfy/01%20-%20Scott%20Andrew%20-%20More%20Good%20Days.mp3",
        title: "More Good Days"
    },
    {

        url: "http://www.scottandrew.com/mp3/syfy/01%20-%20Scott%20Andrew%20-%20More%20Good%20Days.mp3",
        title: "More Good Days"
    }
];

//Scott Andrew�s HTML5 audio player
var aud = $('#jukebox .aud').get(0);
var vid = $("#dvVideo video").get(0);
aud.pos = -1;

$('#jukebox .play').bind('click', function (evt) {
    evt.preventDefault();
    if (aud.pos < 0) {
        $('#jukebox .next').trigger('click');
    } else {
        aud.play();
    }
});

$(".target").click(function (evt) {
    vid.pause();
    evt.preventDefault();
    if (aud.pos == playlist.length) aud.pos = 0;
    aud.pos = $(this).data("tab-id");
    aud.setAttribute('src', playlist[aud.pos].url);
    $('#jukebox .info').html(playlist[aud.pos].title);
    aud.load();
    aud.play();
});

$('#jukebox .pause').bind('click', function (evt) {
    evt.preventDefault();
    aud.pause();
});

$('#jukebox .next').bind('click', function (evt) {
    evt.preventDefault();
    aud.pause();
    aud.pos++;
    if (aud.pos == playlist.length) aud.pos = 0;
    aud.setAttribute('src', playlist[aud.pos].url);
    $('#jukebox .info').html(playlist[aud.pos].title);
    aud.load();
});

$('#jukebox .prev').bind('click', function (evt) {
    evt.preventDefault();
    aud.pause();
    aud.pos--;
    if (aud.pos < 0) aud.pos = playlist.length - 1;
    aud.setAttribute('src', playlist[aud.pos].url);
    $('#jukebox .info').html(playlist[aud.pos].title);
    aud.load();
});

// JQuery doesn't seem to like binding to these HTML 5
// media events, but addEventListener does just fine

aud.addEventListener('progress', function (evt) {
    var width = parseInt($('#jukebox').css('width'));
    var percentLoaded = Math.round(evt.loaded / evt.total * 100);
    var barWidth = Math.ceil(percentLoaded * (width / 100));
    $('#jukebox .load-progress').css('width', barWidth);

});

aud.addEventListener('timeupdate', function (evt) {
    var width = parseInt($('#jukebox').css('width'));
    var percentPlayed = Math.round(aud.currentTime / aud.duration * 100);
    var barWidth = Math.ceil(percentPlayed * (width / 100));
    $('#jukebox .play-progress').css('width', barWidth);
});

aud.addEventListener('canplay', function (evt) {
    $('#jukebox .play').trigger('click');
});

aud.addEventListener('ended', function (evt) {
    $('#jukebox .next').trigger('click');
});


$('#jukebox .info').html(playlist[0].title);


/**
* END
 */