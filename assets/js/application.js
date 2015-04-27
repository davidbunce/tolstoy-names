var ApplicationRouter = Backbone.Router.extend({  
    initialize: function (el) {
        this.el = el;

        // Single page template
        this.pageView = new view({template: '#page'});

        // 404 template
        this.notFoundView = new view({template: '#notfound'});

        console.log(el);
    },

    routes: {
        '': function () {
            this.getPageContent(2, this.pageView);
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
        console.log(data);
        // this.currentView = view;
    },

    // Fetch the actual content from WP API
    getPageContent: function (pageID, view) {
        var self = this;

        page.fetch({
            data: jQuery.param({ type: 'page', 'filter[page_id]': pageID }),
            processData: true,
            success: function (result) {
                var page = result.toJSON();
                self.switchView(view, page[0]);
            }
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

// Kick off router
var router = new ApplicationRouter(jQuery('#content'));
var data = '';

// Pages collection
var pageCollection = Backbone.Collection.extend({  
    url: '/wp-json/pages'
});

var page = new pageCollection();

// Pages collection
var postCollection = Backbone.Collection.extend({  
    url: '/wp-json/posts'
});

var post = new postCollection();

// Use history API
Backbone.history.start(); 
