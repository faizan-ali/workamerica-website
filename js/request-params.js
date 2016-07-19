$( document ).ready(function() {
	$(window).load(function() {
		var invalid = getParam('invalid');
		var error = getParam('error');
		var name = getParam('invalidName');
		var email = getParam('invalidEmail');
		var phone = getParam('invalidPhone');
		var zip = getParam('invalidZip');
		var contact = getParam('contact');
		var register = getParam('register');
		var subscribe = getParam('subscribe');

console.log("hello");

		if (invalid == 'true') {
			$("#general-error").addClass('show');
		}

		if (error == 'true') {
			$("#bad-error").addClass('show');
		}

		if (name == 'true') {
			$("#name-error").addClass('show');
		}

		if (email == 'true') {
			$("#email-error").addClass('show');
		}

		if (phone == 'true') {
			$("#phone-error").addClass('show')
		}

		if (zip == 'true') {
			$("#zip-error").addClass('show')
		}

		if (contact == 'true') {
			$("#contact-thank-you").addClass('show');
		}

		if (subscribe == 'true') {
			$("#contact-thank-you").addClass('show');
		}

		if (register == 'true') {
			$("#register-thank-you").addClass('show');
		}
	});
});

function getParam(param) {
	var vars = {};
	window.location.href.replace(location.hash, '').replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function(m, key, value) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if (param) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}
