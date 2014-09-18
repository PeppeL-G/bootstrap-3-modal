if(Meteor.isClient){
	
	var templateName = 'modal_signUp'
	
	// Store user input in the Session object so it survives code reloads.
	// The error "" means there is no error.
	var usernameKey             = templateName+'_username'
	var usernameErrorKey        = templateName+'_usernameError'
	var emailKey                = templateName+'_email'
	var emailErrorKey           = templateName+'_emailError'
	var password0Key            = templateName+'_password0'
	var password0ErrorKey       = templateName+'_password0Error'
	var password1Key            = templateName+'_password1'
	var password1ErrorKey       = templateName+'_password1Error'
	var acceptsUserAgreementKey = templateName+'_acceptsUserAgreement'
	var occupiedUsernamesKey    = templateName+'_occupiedUsernames'
	
	Template[templateName].created = function(){
		
		Session.setDefault(usernameKey, "")
		Session.setDefault(emailKey, "")
		Session.setDefault(password0Key, "")
		Session.setDefault(password1Key, "")
		Session.setDefault(acceptsUserAgreementKey, false)
		Session.setDefault(occupiedUsernamesKey, [])
		// The other sessions are set in the validation autoruns below.
		
		// The validation autoruns below are to be consistent with the settings in
		// the accounts-ui-unstyled package.
		// https://github.com/meteor/meteor/blob/556c0e28e94b9351cbf0b28e80a71a4e35f1362a/packages/accounts-ui-unstyled/login_buttons.js#L74
		
		// Validate username.
		this.autorun(function(computation){
			if(Session.equals(usernameKey, "")){
				Session.set(usernameErrorKey, "Your username can't be empty.")
			}else{
				var username = Session.get(usernameKey)
				if(username.length <= 2){
					Session.set(usernameErrorKey, "Your username must be at least 2 characters long.")
				}else{
					var occupiedUsernames = Session.get(occupiedUsernamesKey)
					if(occupiedUsernames.indexOf(username) != -1){
						Session.set(usernameErrorKey, "This username is already taken by another member.")
					}else{
						Session.set(usernameErrorKey, "")
					}
				}
			}
		})
		
		// Validate email.
		this.autorun(function(computation){
			if(Session.equals(emailKey, "")){
				Session.set(emailErrorKey, "This is not a valid email.")
			}else{
				var email = Session.get(emailKey)
				if(email.indexOf("@") == -1){
					Session.set(emailErrorKey, "This is not a valid email.")
				}else{
					Session.set(emailErrorKey, "")
				}
			}
		})
		
		// Validate password0.
		this.autorun(function(computation){
			if(Session.equals(password0Key, "")){
				Session.set(password0ErrorKey, "You can't have an empty password.")
			}else{
				var password0 = Session.get(password0Key)
				if(password0.length <= 5){
					Session.set(password0ErrorKey, "The password needs to be a bit longer.")
				}else{
					Session.set(password0ErrorKey, "")
				}
			}
		})
		
		// Validate password1.
		this.autorun(function(computation){
			var password0 = Session.get(password0Key)
			var password1 = Session.get(password1Key)
			if(password0 == password1){
				Session.set(password1ErrorKey, "")
			}else{
				Session.set(password1ErrorKey, "This password is not the same as the first.")
			}
		})
		
	}
	
	Template[templateName].helpers({
		username: function(){
			return Session.get(usernameKey)
		},
		usernameError: function(){
			return Session.get(usernameErrorKey)
		},
		email: function(){
			return Session.get(emailKey)
		},
		emailError: function(){
			return Session.get(emailErrorKey)
		},
		password0: function(){
			return Session.get(password0Key)
		},
		password0Error: function(){
			return Session.get(password0ErrorKey)
		},
		password1: function(){
			return Session.get(password1Key)
		},
		password1Error: function(){
			return Session.get(password1ErrorKey)
		},
		isUserAgrementAccepted: function(){
			return Session.equals(acceptsUserAgreementKey, true)
		},
		isAnythingWrong: function(){
			return !(Session.equals(usernameErrorKey , "") &&
						Session.equals(emailErrorKey    , "") &&
						Session.equals(password0ErrorKey, "") &&
						Session.equals(password1ErrorKey, "") &&
						Session.equals(acceptsUserAgreementKey, true))
		}
	})
	
	Template[templateName].events({
		
		'keyup #modal_signUp_username': function(event, template){
			var username = event.currentTarget.value
			Session.set(usernameKey, username)
		},
		
		'keyup #modal_signUp_email': function(event, template){
			var email = event.currentTarget.value
			Session.set(emailKey, email)
		},
		
		'keyup #modal_signUp_password0': function(event, template){
			var password0 = event.currentTarget.value
			Session.set(password0Key, password0)
		},
		
		'keyup #modal_signUp_password1': function(event, template){
			var password1 = event.currentTarget.value
			Session.set(password1Key, password1)
		},
		
		'change #modal_signUp_acceptsUserAgreement': function(event, template){
			var acceptsUserAgreement = event.currentTarget.checked
			Session.set(acceptsUserAgreementKey, acceptsUserAgreement)
		},
		
		'click .clickRoutesToUserAgreement': function(event, template){
			
			event.preventDefault()
			
			// Hide the modal...
			Modal.hide()
			
			// ...and go to the page with the user agreement.
			// (in this example, that does not exist).
			//Router.go('userAgreement')
			
		},
		
		'submit form': function(event, template){
			
			event.preventDefault()
			
			var username = Session.get(usernameKey)
			var email = Session.get(emailKey)
			var password0 = template.find('#modal_signUp_password0').value
			var password1 = template.find('#modal_signUp_password1').value
			
			var options = {
				username: username,
				email: email,
				password: password0
			}
			
			Accounts.createUser(options, function(error){
				if(error){
					switch(error.reason){
						case "Username already exists.":
							var occupiedUsernames = Session.get(occupiedUsernamesKey)
							occupiedUsernames.push(username)
							Session.set(occupiedUsernamesKey, occupiedUsernames)
						break
						case "Email already exists.":
							Session.set(emailErrorKey, "There is a user registered with this email.")
						break
						default:
							Session.set(usernameErrorKey, "Unknown error reason '"+error.reason+"'. This is a bug, please report it.")
					}
				}else{
					// Explicity remove the passwords, so no one can read them.
					Session.set(password0Key, "")
					Session.set(password1Key, "")
					Modal.hide()
				}
			})
		}
		
	})
	
}