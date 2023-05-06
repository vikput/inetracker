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
    } else if (year && month==='') {
        swal({
            title: 'Error!',
            text: 'Please select month.',
            icon: 'error',
            button: 'Ok'
        });
        return false;
    } else if (month && year==='') {
        swal({
            title: 'Error!',
            text: 'Please select year.',
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
            text: 'Please select income sources.',
            icon: 'error',
            button: 'Ok'
        });
        return false;
    }
     
    jQuery.ajax({
    	url: '/report/fetch-detailed-report',
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
                text: error.responseText,
                icon: 'error',
                button: 'Ok'
            });
        }
    })

    return false;   
});

jQuery('#orsubmit').click(function(){
    let year = jQuery('#oryear').val();
    let month = jQuery('#ormonth').val();
    let data = {};

    if (year==='') {
        swal({
            title: 'Error!',
            text: 'Please select Year.',
            icon: 'error',
            button: 'Ok'
        });
        return false;
    } else {
        data.year = year;
        data.month = month;
    }

    jQuery.ajax({
        url: '/report/fetch-overall-report',
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
          jQuery('.overall-reports-response').html(response);
        },
        error: function(error){
            console.log(error);
            jQuery('.loader').hide();
            swal({
                title: 'Error!',
                text: error.responseText,
                icon: 'error',
                button: 'Ok'
            });
        }
    })

    return false;
});

jQuery('#assubmit').click(function(){
    let year = jQuery('#year').val();
    let month = jQuery('#month').val();
    let fromDate = jQuery('#from-date').val();
    let toDate = jQuery('#to-date').val();
    let vehical = jQuery('#auto-rick').val();
    
    let data = {};

    if (year && month) {
        data.year = year;
        data.month = month;        
    } else if (year && month==='') {
        swal({
            title: 'Error!',
            text: 'Please select month.',
            icon: 'error',
            button: 'Ok'
        });
        return false;
    } else if (month && year==='') {
        swal({
            title: 'Error!',
            text: 'Please select year.',
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

    if (vehical) {
        data.vehical = vehical;
    } else {
        swal({
            title: 'Error!',
            text: 'Please select vehical.',
            icon: 'error',
            button: 'Ok'
        });
        return false;
    }
     
    jQuery.ajax({
        url: '/report/fetch-auto-ship-report',
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
                text: error.responseText,
                icon: 'error',
                button: 'Ok'
            });
        }
    })

    return false;   
});