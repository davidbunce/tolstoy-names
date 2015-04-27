<script id="search" type="text/template">
	<div class="top">
		Search for a name yo
		<form id="form" class="form" method="post" enctype="application/x-www-form-urlencoded" accept-charset="UTF-8" action="/#search/">
            <div class="field">
            	<input type="search" id="search_name" name="search_name">
            </div>
     
		</form>
	</div>
	<% _.each(data, function(result){ %>
	    <h2><%= result.title %></h2>

	    <%= result.content %>
 	<% }); %>
</script> 