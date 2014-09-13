Package.describe({
	summary: "Simple usage of bootstrap 3 modals.",
	version: "1.0.0",
	name: "peppelg:bootstrap-3-modal",
	git: "https://github.com/PeppeL-G/bootstrap-3-modal.git"
})

Package.onUse(function(api){
	
	api.versionsFrom('METEOR@0.9.1.1')
	
	api.use([
		'templating',
		'jquery'
	], 'client')
	
	api.addFiles([
		'main.html',
		'main.js'
	], 'client')
	
	api.export('Modal', 'client')
	
})