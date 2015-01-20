Package.describe({
	summary: "Simple usage of bootstrap 3 modals.",
	version: "1.0.2",
	name: "peppelg:bootstrap-3-modal",
	git: "https://github.com/PeppeL-G/bootstrap-3-modal.git"
})

Package.onUse(function(api){
	
	api.versionsFrom('METEOR@1.0.2')
	
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