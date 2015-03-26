module SiteHelpers

	def page_title
		title = "Armada.nu"
		if data.page.title
			title << " | " + data.page.title
		end
		title
	end
	
	def page_description
		if data.page.description
			description = data.page.description
		else
			description = "Ar du Armadas nasta superhjalte? Sok till gruppledare innan den 19:e april"
		end
		description
	end

end