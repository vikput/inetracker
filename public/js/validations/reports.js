jQuery('#submit').click(function(){
    let year = jQuery('#year').val();
    let month = jQuery('#month').val();
    let fromDate = jQuery('#from-date').val();
    let toDate = jQuery('#to-date').val();
    let inCsrc = jQuery('#income-sources').val();
    
    let data = {};
    if (year && month) {
    	data.year = year;
    	data.month = month;
    } else if (year && !month) {
    	swal({
            title: 'Error!',
            text: 'PLease select month.',
            icon: 'error',
            button: 'Ok'
        });
    	return false;
    } else if(!year && month) {
        swal({
            title: 'Error!',
            text: 'PLease select year.',
            icon: 'error',
            button: 'Ok'
        });
        return false;
    } 

    if(fromDate && toDate) {
    	if (fromDate <= toDate) {
    		data.fromDate = fromDate;
    		data.toDate = toDate;
    	} else {
            swal({
                title: 'Error!',
                text: 'From date should be less then To date.',
                icon: 'error',
                button: 'Ok'
            });
    		return false;
    	}
    }

    if (inCsrc) {
        data.inCsrc = inCsrc;
    } else {
    	swal({
            title: 'Error!',
            text: 'PLease select income sources.',
            icon: 'error',
            button: 'Ok'
        });
        return false;
    }
     
    jQuery.ajax({
    	url: '/report/fetch-detailed-reports',
    	type: 'POST',
    	headers : { 'X-CSRF-Token': jQuery('#csrf_token').val() },
    	data: data,
    	dataType: 'html',
    	beforeSend: function(){
          jQuery('.loader').show()
        },
        complete: function(){
          jQuery('.loader').hide();
        },
        success: function(response){
          jQuery('.reposts-response').html(response);
        },
        error: function(error){
            swal({
                title: 'Error!',
                text: response.data.message,
                icon: response.data.status,
                button: 'Ok'
            });
        }
    })

    return false;   
});