var view
var $modal

// The public API.
Modal = {
	
	show: function(templateName, data){
		
		var template = Template.peppelg_modal
		var data = {
			templateName: templateName,
			data: data
		}
		var parentNode = document.body
		
		view = Blaze.renderWithData(template, data, parentNode)
		
	},
	
	hide: function(){
		$modal.modal('hide')
	}
	
}



// The modal template.
var templateName = 'peppelg_modal'

Template[templateName].rendered = function(){
	
	$modal = $(this.firstNode)
	
	$modal.modal()
	
	$modal.on('hidden.bs.modal', function(event){
		Blaze.remove(view)
		$modal = null
		view = null
	})
	
}