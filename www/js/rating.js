/**
 * Created by rohit on 29/12/15.
 */
var $star_rating = $('.star-rating i');

var SetRatingStar = function() {
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

$star_rating.on('click', function() {
    $star_rating.siblings('input.rating-value').val($(this).data('rating'));
    return SetRatingStar();
});

SetRatingStar();
$("#btnFeedback").on('click',function(){
    var rating=$("#rating").val();
    var feedback=$("#txtFeedback").val();
    console.log(rating,feedback);
    $.ajax({
        type: 'POST',
        url: _apiBaseUrl+'/users/protected/feedback',
        data: {rating:rating,feedback:feedback},
        contentType: 'application/x-www-form-urlencoded',
        beforeSend: function(xhr){
            xhr.setRequestHeader("Authorization",localStorage.token);
        },
        success: function(info){
            Materialize.toast("Thanks",1000);
            $(location).attr('href','myjourney.html');

        },
        error: function(err){
            //alert(JSON.stringify(err));
        }
    });
});