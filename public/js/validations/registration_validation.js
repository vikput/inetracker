jQuery('#registration-form').validate({
    rules : {
        username : {
            required : true,
            minlength : 3,
            maxlength : 6
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
            maxlength : "Maximum 6 characters are allowed."
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
        checkUsername(jQuery('#username').val()).then(function(result){
            if (parseInt(result.data) === 0) {
                jQuery.ajax({
                    url : '/save-user',
                    type : 'POST',
                    headers : { 'X-CSRF-Token': jQuery('#csrf_token').val() },
                    data : jQuery(form).serialize(),
                    beforeSend: function(){
                      jQuery('.loader').show()
                    },
                    complete: function(){
                      jQuery('.loader').hide();
                    },
                    success : function(response){
                        if (response.data.status === 'success') {
                            swal({
                                  title: 'Success!',
                                  text: response.data.message,
                                  icon: response.data.status,
                                  button: 'Ok'
                            });
                            jQuery("#registration-form")[0].reset();
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
                        swal({
                            title: 'Error!',
                            text: 'Something went wrong, please try again later.',
                            icon: 'error',
                            button: 'Ok'
                        });
                    }
                });
            } else {
                swal({
                      title: 'Error!',
                      text: result.message,
                      icon: 'error',
                      button: 'Ok'
                });
            }
        },function(error){
            swal({
                  title: 'Error!',
                  text: 'Something went wrong, please try again later.',
                  icon: 'error',
                  button: 'Ok'
            });
        });
        return false;
     }
});

checkUsername = function(username){
  return new Promise(function(resolve, reject){
      jQuery.ajax({
          url : '/check-username',
          type : 'POST',
          headers : { 'X-CSRF-Token': jQuery('#csrf_token').val() },
          data : {username : username},
          success : function(response){
              resolve(response);
          },
          error : function(error){
              reject(error);
          }
      });
  });
}