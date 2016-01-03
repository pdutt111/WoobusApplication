/**
 * Created by rohit on 29/12/15.
 */
var star_ratings = [$('.star-rating.1 i'), $('.star-rating.2 i'), $('.star-rating.3 i'), $('.star-rating.4 i'),
    $('.star-rating.5 i'), $('.star-rating.6 i'), $('.star-rating.7 i')];

var SetRatingStar = function($star_rating) {
    return $star_rating.each(function() {
        if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
            $(this).html("")
            return $(this).append('star');
        } else {
            $(this).html("")
            return $(this).append('star_border');
        }
    });
};

star_ratings.forEach(function($star_rating) {
    $star_rating.on('click', function () {
        $star_rating.siblings('input.rating-value').val($(this).data('rating'));
        return SetRatingStar($star_rating);
    });
});

$("#btnFeedback").on('click',function(){
    var staff_rating = $("#staff_rating").val();
    var snacks_rating = $("#snacks_rating").val();
    var cleanliness_rating = $("#cleanliness_rating").val();
    var app_rating = $("#app_rating").val();
    var tracking_rating = $("#tracking_rating").val();
    var punctuality_rating = $("#punctuality_rating").val();
    var rating = $("#rating").val();
    var feedback = $("#txtFeedback").val();
    console.log(rating,feedback);
    $.ajax({
        type: 'POST',
        url: _apiBaseUrl+'/users/protected/feedback',
        data: {staff_rating:staff_rating, snacks_rating:snacks_rating, cleanliness_rating:cleanliness_rating,
            app_rating:app_rating, tracking_rating:tracking_rating, punctuality_rating:punctuality_rating,
            rating:rating, feedback:feedback},
        contentType: 'application/x-www-form-urlencoded',
        beforeSend: function(xhr){
            xhr.setRequestHeader("Authorization",localStorage.token);
        },
        success: function(info){
            Materialize.toast("Thank you! Your feedback is valuable to us.", 2000, 'rounded');
            $(location).attr('href','myjourney.html');

        },
        error: function(err){
            //alert(JSON.stringify(err));
        }
    });
});