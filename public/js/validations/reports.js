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
    	alert('Please select month.');
    	return false;
    } else if(!year && month) {
        alert('Please select year.');
        return false;
    } 

    if(fromDate && toDate) {
    	if (fromDate <= toDate) {
    		data.fromDate = fromDate;
    		data.toDate = toDate;
    	} else {
    		alert('From date should be less than To date.');
    		return false;
    	}
    }

    if (inCsrc) {
        data.inCsrc = inCsrc;
    } else {
    	alert('Please select income source.');
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
          console.log(response);
          jQuery('.reposts-response').html(response);
        },
        error: function(error){
          console.log(error);
        }
    })

    return false;   
});