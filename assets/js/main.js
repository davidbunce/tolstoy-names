jQuery( document ).ready(function($) {

   	// We want to capture the input on our search form and redirect it to /#search/query
   	$('form').submit(function(event) {
   		event.preventDefault();
   		console.log($('#search_name'));
   	});
});