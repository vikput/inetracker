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
      checkIncomeSource(jQuery('#income-source').val()).then(function(result){
        if(parseInt(result.data) === 0){
            jQuery.ajax({
            url : '/income/save-income-sources',
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
                text: error.responseText,
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
          text: error.responseText,
          icon: 'error',
          button: 'Ok'
        });
      });
      return false;
    }
});

/*
  Check if income source is already exists

*/
checkIncomeSource = function(insource){
  return new Promise(function(resolve, reject){
      jQuery.ajax({
          url : '/income/check-income-sources',
          type : 'POST',
          headers : { 'X-CSRF-Token': jQuery('#csrf_token').val() },
          data : {insource : insource},
          success : function(response){
            resolve(response);
          },
          error : function(error){
            reject(error);
          }
      });
  });
}

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
              text: error.responseText,
              icon: 'error',
              button: 'Ok'
            });
          } 
        });
        return false;
     }
});
//-----------------------------------------------------End-----------------------------------------------//
