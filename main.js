var $soloModal = null // Used when allowMultiple = false.

// The public API.
Modal = {

	allowMultiple: false,

	show: function(templateName, data, options){

		if($soloModal == null || this.allowMultiple){

			var parentNode = document.body

			var view = Blaze.renderWithData(Template[templateName], data, parentNode)

			var domRange = view._domrange // TODO: Don't violate against the public API.

			var $modal = domRange.$('.modal')

			$modal.on('shown.bs.modal', function(event){
				$modal.find('[autofocus]').focus()
			})

			$modal.on('hidden.bs.modal', function(event){
				Blaze.remove(view)
				$soloModal = null
			})

      if (options && options.events) {
        Object.keys(options.events).forEach(function(eventName) {
          $modal.on(eventName, options.events[eventName]);
        });
      }

			$soloModal = $modal

			$modal.modal(options)

		}

	},

	hide: function(/* optional */ template){

		if(template instanceof Blaze.TemplateInstance){

			template.$('.modal').modal('hide')

		}else if($soloModal != null){

			$soloModal.modal('hide')

		}

	}

}
