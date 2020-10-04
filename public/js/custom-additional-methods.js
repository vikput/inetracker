jQuery.validator.addMethod('numericOnly', function (value) {
		return /^[0-9]+$/.test(value);
}, 'Please only enter numeric values (0-9)');

jQuery.validator.addMethod('lettersonly', function (value) {
   return /^^[a-zA-Z,]+$/.test(value);
}, 'Only alphabates are allowed');

/*jQuery.validator.addMethod("pwcheck", function(value){
	let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
   	return pattern.test(value);
}, 'Password should be a combination of one uppercase , one lower case, one special char, one digit, minimum 6 and maximum 10 characters');
*/

jQuery.validator.addMethod('filesize', function (value, element, param) {
	return this.optional(element) || (element.files[0].size <= param)
}, 'File size must be less than 15kb');