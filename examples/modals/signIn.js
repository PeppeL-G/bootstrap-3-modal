if(Meteor.isClient){
	
	var templateName = 'modal_signIn'
	
	// Store user input in the Session object so it survives code reloads.
	var usernameErrorKey = templateName+'_usernameError'
	var passwordErrorKey = templateName+'_passwordError'
	
	Template[templateName].created = function(){
		
		Session.set(usernameErrorKey, "")
		Session.set(passwordErrorKey, "")
		
	}
	
	Template[templateName].helpers({
		usernameError: function(){
			return Session.get(usernameErrorKey)
		},
		passwordError: function(){
			return Session.get(passwordErrorKey)
		}
	})
	
	Template[templateName].events({
		
		'submit form': function(event, template){
			
			event.preventDefault()
			
			Session.set(usernameErrorKey, "")
			Session.set(passwordErrorKey, "")
			
			var username = template.find('#modal_signIn_username').value
			var password = template.find('#modal_signIn_password').value
			
			if(username == ""){
				Session.set(usernameErrorKey, "The username can't be empty")
				return
			}
			
			var user = {
				username: username
			}
			
			Meteor.loginWithPassword(user, password, function(error){
				if(error){
					switch(error.reason){
						case "User not found":
							Session.set(usernameErrorKey, "There is no user with this username.")
						break
						case "Incorrect password":
							Session.set(passwordErrorKey, "Wrong password.")
						break
						default:
							Session.set(usernameErrorKey, "Unknown error reason '"+error.reason+"'. This is a bug, please report it.")
					}
				}else{
					
					// Successfully signed in, just close the modal.
					Modal.hide()
					
				}
			})
		}
		
	})
	
}