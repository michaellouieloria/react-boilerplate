var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
Backbone.$ = $;

var Home = require('./Home');
var Hello = require('./Hello');

var AppRouter = React.createClass({
    componentWillMount: function() {
        var Router = Backbone.Router.extend({
            routes: {
                'hello/:name': this.routeHello,
                '': this.routeHome
            }
        });
        new Router();
        Backbone.history.start();
    },
    getInitialState: function() {
        return { page: <Home /> }
    },
    render: function() {
        return (
            <div className="container">
                <h1>Welcome</h1>
                {this.state.page}
            </div>
        );
    },
    routeHello: function(name) {
        this.setState({ page: <Hello name={name} /> });
    },
    routeHome: function() {
        this.setState({ page: <Home /> });
    }
});

module.exports = AppRouter;
