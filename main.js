var view = null
var $modal = null

// The public API.
Modal = {
	
	show: function(templateName, data){
		
		// Only show the modal if no modal is shown at the moment.
		// See issue #2.
		if($modal == null){
			
			var template = Template.peppelg_modal
			var data = {
				templateName: templateName,
				data: data
			}
			var parentNode = document.body
			
			view = Blaze.renderWithData(template, data, parentNode)
			
		}
		
	},
	
	hide: function(){
		$modal.modal('hide')
	}
	
}



// The modal template.
var templateName = 'peppelg_modal'

Template[templateName].rendered = function(){
	
	var template = this
	
	$modal = $('.modal')
	
	$modal.modal()
	
	$modal.on('shown.bs.modal', function(event){
		template.$('[autofocus]').focus()
	})
	
	$modal.on('hidden.bs.modal', function(event){
		Blaze.remove(view)
		$modal = null
		view = null
	})
	
}