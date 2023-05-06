jQuery('#login-form').validate({
    rules : {
        username : {
          required : true
        },
        password : {
          required : true
        }
    },
    messages : {
        username: {
          required : "Please enter your username."
        },
        password : {
          required : "Please enter your password.",
        }
    },
    errorElement: 'p',
      errorPlacement: function errorPlacement(error, element) {
        element.after(error);
     },
     submitHandler : function(form){
        jQuery.ajax({
          url : '/login/authenticate',
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
            if (response.status === 'success') {
              jQuery("#login-form")[0].reset();
              window.location.href = response.data;
            } else {
              swal({
                title: 'Error!',
                text: response.message,
                icon: response.status,
                button: 'Ok'
              });
            }
          },
          error : function(error){
            swal({
              title: 'Error!',
              text: error.responseText,
              icon: 'error',
              button: 'Ok'
            });
          } 
        });
        return false;
     }
});