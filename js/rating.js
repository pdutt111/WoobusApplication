/**
 * Created by rohit on 29/12/15.
 */
var $star_rating = $('.star-rating .fa');

var SetRatingStar = function() {
    return $star_rating.each(function() {
        if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
            return $(this).removeClass('fa-star-o').addClass('fa-star');
        } else {
            return $(this).removeClass('fa-star').addClass('fa-star-o');
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
            console.log(info);
        },
        error: function(err){
            alert(JSON.stringify(err));
        }
    });
});