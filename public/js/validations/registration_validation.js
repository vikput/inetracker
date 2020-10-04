jQuery('#registration-form').validate({
    rules : {
        username : {
            required : true,
            minlength : 3,
            maxlength : 10
        },
        firstname : {
            required : true,
            lettersonly : true,
            minlength : 3
        },
        lastname : {
            required : true,
            lettersonly : true,
            minlength : 3
        },
        password : {
            required : true,
            minlength : 6
        },
        confpassword : {
              equalTo: "#password"
        },
        securityquestion : {
            required : true,
        },
        securityanswer : {
            required : true
        }
    },
    messages : {
        username: {
            required : "Please enter your username.",
            minlength : "Minmum 3 characters required.",
            maxlength : "Maximum 10 characters are allowed."
        },
        firstname: {
              required: "Please enter your first name.",
              minlength : "Minmum 3 characters required."
        },
        lastname: {
              required: "Please enter your last name.",
              minlength : "Minmum 3 characters required."
        },
        password : {
            required : "Please enter your password.",
            minlength : "Minmum password length is 6"
        },
        securityquestion : {
            required : "Please select your security question.",
        },
        securityanswer : {
            required : "PLease enter your answer."
        }
    },
    errorElement: 'p',
      errorPlacement: function errorPlacement(error, element) {
        element.after(error);
     },
     submitHandler : function(form){
        jQuery.ajax({
            url : '/save-user',
            type : 'POST',
            data : jQuery(form).serialize(),
            success : function(response){
                console.log(response);
                if (response.data.status) {
                    swal({
                          title: 'Success!',
                          text: response.data.message,
                          icon: response.data.status,
                          button: 'Ok'
                    });
                } else {
                    swal({
                          title: 'Error!',
                          text: response.data.message,
                          icon: response.data.status,
                          button: 'Ok'
                    });
                }
            },
            error : function(error){
                console.log(error);
            }
        });
        return false;
     }
});

checkUsername = function(username){
    jQuery.ajax({
        url : '/check-username',
        type : 'POST',
        data : {username : username},
        success : function(response){
            console.log(response);
        },
        error : function(error){
            console.log(error);
        }
    })
}