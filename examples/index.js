if(Meteor.isClient){

	var templateName = 'index'

	Template[templateName].events({
		'click button': function(event, template){
			
			var button = event.currentTarget
			
			var modalName = 'modal_'+button.getAttribute('data-modal')
			
			Modal.show(modalName)
			
		}
	})
	
}