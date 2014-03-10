var abNinja = [];
$(document).ready(function() {
	var abNinjaInputs = $('input[data-ab-ninja="true"]') || [];
	if(abNinjaInputs.length) {
		abNinjaInputs.each(function() {
			var curInput = $(this),
				group = curInput.data("ab-ninja-group") || "",
				item = curInput.data("ab-ninja-item") || "",
				variation = curInput.data("ab-ninja-variation-name") || "",
				target = curInput.data("ab-ninja-target") || "",
				abNinjaRow = {
					"abNinjaGroup": group,
					"abNinjaItem": item,
					"abNinjaVariation": variation,
					"abNinjaTarget": target,
					"type": "abNinjaClick"
				};
			abNinja.push(abNinjaRow);

			// Remove the hidden input from the DOM
			$(this).remove();

			// Add class to target
			$('a' + target).addClass('ab-ninja-link-true');
		});
		// console.log(abNinja);		
		$('a.ab-ninja-link-true').on('click', function(e) {
			console.log('here');
			if(!$(this).hasClass('go')) {
				console.log('in');
				e.preventDefault();
				var elm = $(this),
					elmId = typeof elm.attr('id') != "undefined" ? "#" + elm.attr('id') : "",
					elmClasses = typeof elm.attr('class') != "undefined" ? elm.attr('class') : "",
					href = elm.attr('href'),
					found = false;
				for(var i = 0; i < abNinja.length; i++) {
					var abNinjaRow = abNinja[i],
						abNinjaTarget = abNinjaRow["abNinjaTarget"];

					if(is_target(abNinjaTarget, elmId, elmClasses)) {
						found = true;

						$.post("", abNinjaRow, function(data) {
							if(elm.hasClass('FancyIframe')) {
								elm.off("click");
								elm[0].click();
							} else {
								window.location = href;
							}
							
							//elm.off("click");
							//elm[0].click();
							//console.log(data);
							//elm.addClass('go');
							//alert(4);
							//elm.trigger('click');
							//elm[0].click();

							// if(elm.attr('target') == '_blank') {
							// 	window.open(href, '_blank');
							// } else {
							// 	window.location = href;
							// }
							
						});
					} 
				}

				if(!found) {
					window.location = href;
				}	
			} else {
				console.log('out');
				return true;
			}
		});	
	}
});

function is_target(abNinjaTarget, elmId, elmClasses) {
	if(abNinjaTarget == elmId) {
		return true;
	}
	
	var classList = elmClasses.split(" ");

	for(var i = 0; i < classList.length; i++) {
		//Remove leading dots
		var curClass = classList[i].replace(".",""),
			target = abNinjaTarget.replace(".","");
		
		if(curClass == target) {
			return true;
		}
	}	
	


	return false;
}