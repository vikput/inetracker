jQuery('#form-expenses').validate({
    rules : {
        incomesources : {
          required : true
        },
        exyear : {
          required: true
        },
        exmonth : {
          required : true
        },
        exdate : {
          required : true
        },
        monthlyexpense : {
          number : true
        }
    },
    messages : {
        incomesources: {
          required : "Please select your income source."
        },
        exyear : {
          required: "Please select year."
        },
        exmonth : {
          required : "Please select month."
        },
        exdate : {
          required : "Please select date."
        },
        monthlyexpense : {
          required : "Only numbers.",
        }
    },
    errorElement: 'p',
      errorPlacement: function errorPlacement(error, element) {
        element.after(error);
     },
     submitHandler : function(form){
        jQuery.ajax({
          url : '/expense/save-expenses',
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
              jQuery("#form-expenses")[0].reset();
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