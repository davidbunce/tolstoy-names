var ApplicationRouter = Backbone.Router.extend({  
    initialize: function (el) {
        this.el = el;

        // Single page template
        this.pageView = new view({template: '#page'});

        // Single page template
        this.searchView = new view({template: '#search'});

        // 404 template
        this.notFoundView = new view({template: '#notfound'});
    },

    routes: {
        '': function () {
            this.getPageContent(2, this.pageView);
        },

        'search': function () {
        	
        },

        'search/:search_term': function (search_term) {
            this.getSearch(search_term, this.searchView);
        },

        '*else': function () {
            this.switchView(this.notFoundView);
        }
    },

    // Switch out views
    switchView: function (view, data) {
        if (this.currentView) {
            this.currentView.remove();
        }

        this.el.html(view.el);
        view.render(data);
        console.log('switch');
        
        // We need to re-initialise our form listener each time, because we are rerendering to the screen
		// and that is causing us to lose the current DOM.
		new FormView({template: this.searchView});
        // this.currentView = view;
    },

    // Fetch the actual content from WP API.
    getPageContent: function (pageID, view) {
        var self = this;
        
        page.fetch({
            data: jQuery.param({ type: 'page', 'filter[page_id]': pageID }),
            processData: true,
            success: function (result) {
                var page = result.toJSON();
                console.log(page);
                self.switchView(view, page[0]);
            }
        });
    },

    // Fetch the actual content from WP API.
    getSearch: function (pageID, view) {
        var self = this;
        
        post.fetch({
            data: jQuery.param({ type: 'post', 'filter[s]': pageID }),
            processData: true,
            success: function (result) {
                var search_result = result.toJSON();
                self.switchView(view, search_result);
            }
        });
    },

    // A nice way of packaging up the router.navigate function so we can use it
    // elsewhere in our app.
    navigateToAndTrigger: function(url) {
        this.navigate(url, {
            trigger: true
        });
    }
});

// Render views
var view = Backbone.View.extend({  
    initialize: function (options) {
        this.template = options.template;
    },

    render: function (data) {
        var content = _.template(jQuery(this.template).html(), {}),
	        	vars = {data: data},
	        	html = content(vars);

        jQuery(this.el).html(html);
    }
});



var FormView = Backbone.View.extend({
    el: '#search-form',

    events: {
        "submit": "submit",
    },

    initialize: function (options) {
        console.log("initialize");
        console.log(this.el);
        this.template = options.template;
    },

    submit: function (e) {
        e.preventDefault();
        var new_location = '/#search/' + jQuery('#search_name').val();
        console.log(new_location);
        router.getSearch(jQuery('#search_name').val(), this.template);
        //router.navigate('/#search/', true);
    }
});


// Kick off router
var router = new ApplicationRouter(jQuery('#content'));
var data = '';

// Pages collection
var pageCollection = Backbone.Collection.extend({  
    url: '/wp-json/pages'
});

var page = new pageCollection();


// initialize everything, and tie it all together
// with the event aggregator object: vent
var vent = _.extend({}, Backbone.Events);

// Posts collection
var postCollection = Backbone.Collection.extend({  
    url: '/wp-json/posts'
});

// var post = new postCollection();

// Use history API
Backbone.history.start(); 

// Basically, we want to create a post model which represents a Wordpress Post object.
var PostModel = Backbone.Model.extend({
	// the default Wordpress RESTful route for posts.
	url: '/wp-json/posts'
});
var post = new PostModel();
