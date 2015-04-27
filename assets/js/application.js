var ApplicationRouter = Backbone.Router.extend({  
    initialize: function (el) {
        this.el = el;

        // Single page template
        this.pageView = new view({template: '#page'});

        // 404 template
        this.notFoundView = new view({template: '#notfound'});
    },

    routes: {
        '': function () {
            this.switchView(this.pageView);
        },

        '*else': function () {
            this.switchView(this.notFoundView);
        }
    },

    // Switch out views
    switchView: function (view) {
        this.el.html(view.el);
        view.render();
    }
});

// Render views
var view = Backbone.View.extend({  
    initialize: function (options) {
        this.template = options.template;
    },

    render: function (data) {
        var content = _.template($(this.template).html());
        $(this.el).html(content);
    }
});

// Kick off router
var router = new ApplicationRouter($('#content'));

// Use history API
Backbone.history.start();  