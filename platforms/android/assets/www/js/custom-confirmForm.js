/**
 * Created by pariskshitdutt on 17/10/15.
 */
confirmPin(localStorage.pin);
//$("#btnPinConfirm").click(function () {
//    if (ValidateForm("txtPinNumber", "pin number") && minLength("txtPinNumber", 5, "Please enter valid pin number") && IsNumber("txtPinNumber", 5, "Please enter valid phone number")) {
//        $(this).html("please wait...");
//    }
//});
$("#txtPinNumber").val(JSON.parse(localStorage.userData).pin);

function confirmPin(){
    $.ajax({
        type: 'POST',
        url: _apiBaseUrl + '/users/verifyPhonenumber',
        data: JSON.parse(localStorage.userData),
        contentType: 'application/x-www-form-urlencoded',
        dataType: "json",
        success: dataParserReg,
        error: ServiceError
    });
    function dataParserReg(data) {
        console.log(data);
        localStorage.token=data.token;
        localStorage.expiry=data.expiry;
        localStorage.secret=data.secret;
        next_page();
        //$(location).attr('href','confirmForm.html');
    }
}

function next_page(){
    $.ajax({
        type: 'GET',
        url: _apiBaseUrl + '/users/state',
        contentType: 'application/json',
        dataType: "json",
        success: function(data){
            console.log(data);
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
            if(localStorage.getItem('token')){
                console.log(localStorage.getItem('token'));
                $(location).attr('href','makeabooking.html');
            }else{
                $(location).attr('href','registration.html');
            }
        },
        timeout: 3000 // sets timeout to 3 seconds

    });
}