<script id="page" type="text/template">
	<div class="top">
		Search for a name
		<form id="search-form" class="form" method="post" enctype="application/x-www-form-urlencoded" accept-charset="UTF-8" action="/#search/">
            <div class="field">
            	<input type="search" id="search_name" name="search_name">
            </div>
     
		</form>
	</div>  
    <h2><%= data.title %></h2>

    <% if (data.featured_image) { %>
        <img src="<%= data.featured_image.guid %>" class="right">
    <% } %>

    <%= data.content %>
</script> 