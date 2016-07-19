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
		var exists = getParam('exists');

		if (exists == 'true') {
			$("#exists-error").toggleClass('hide');
			console.log("general");
		}

		if (invalid == 'true') {
			$("#general-error").toggleClass('hide');
			console.log("general");
		}

		if (error == 'true') {
			$("#bad-error").toggleClass('hide');
			console.log("bad");
		}

		if (name == 'true') {
			$("#name-error").toggleClass('hide');
			console.log("name");
		}

		if (email == 'true') {
			$("#email-error").toggleClass('hide');
			console.log("email");
		}

		if (phone == 'true') {
			$("#phone-error").toggleClass('hide');
			console.log("phone");
		}

		if (zip == 'true') {
			$("#zip-error").toggleClass('hide');
			console.log("zip");
		}

		if (contact == 'true') {
			$("#contact-thank-you").toggleClass('hide');
			console.log("contact");
		}

		if (register == 'true') {
			$("#register-thank-you").toggleClass('hide');
			console.log("register");
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
