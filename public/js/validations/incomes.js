/**
  Income source actions
*/
jQuery('#income-sources').validate({
    rules : {
        incomesource : {
          required : true
        },
        annuallincome : {
          number: true
        }
    },
    messages : {
        incomesource: {
          required : "Please enter your income source."
        },
        annuallincome : {
          required : "Only numbers.",
        }
    },
    errorElement: 'p',
      errorPlacement: function errorPlacement(error, element) {
        element.after(error);
     },
     submitHandler : function(form){
        jQuery.ajax({
          url : '/income/save-income-sources',
          type : 'POST',
          headers : { 'X-CSRF-Token': jQuery('#csrf_token').val() },
          data : jQuery(form).serialize(),
          success : function(response){
            if (response.data.status === 'success') {
              swal({
                    title: 'Success!',
                    text: response.data.message,
                    icon: response.data.status,
                    button: 'Ok'
              });
              jQuery("#income-sources")[0].reset();
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
              text: 'Something went wrong, please try again later.',
              icon: 'error',
              button: 'Ok'
            });
          } 
        });
        return false;
     }
});
//-------------------------------------------------End-------------------------------------------------//
/**
  Income actions
*/
jQuery('#form-incomes').validate({
    rules : {
        incomesources : {
          required : true
        },
        inyear : {
          required: true
        },
        inmonth : {
          required : true
        },
        indate : {
          required : true
        },
        monthlyincome : {
          number : true
        }
    },
    messages : {
        incomesources: {
          required : "Please select your income source."
        },
        inyear : {
          required: "Please select year."
        },
        inmonth : {
          required : "Please select month."
        },
        indate : {
          required : "Please select date."
        },
        monthlyincome : {
          required : "Only numbers.",
        }
    },
    errorElement: 'p',
      errorPlacement: function errorPlacement(error, element) {
        element.after(error);
     },
     submitHandler : function(form){
        jQuery.ajax({
          url : '/income/save-incomes',
          type : 'POST',
          headers : { 'X-CSRF-Token': jQuery('#csrf_token').val() },
          data : jQuery(form).serialize(),
          success : function(response){
            if (response.data.status === 'success') {
              swal({
                    title: 'Success!',
                    text: response.data.message,
                    icon: response.data.status,
                    button: 'Ok'
              });
              jQuery("#form-incomes")[0].reset();
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
              text: 'Something went wrong, please try again later.',
              icon: 'error',
              button: 'Ok'
            });
          } 
        });
        return false;
     }
});
