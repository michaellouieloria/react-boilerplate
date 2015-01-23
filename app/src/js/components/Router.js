var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
Backbone.$ = $;

var Home = require('./Home');

var AppRouter = React.createClass({
    componentWillMount: function() {
        var Router = Backbone.Router.extend({
            routes: {
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
    routeHome: function() {
        this.setState({ page: <Home /> });
    }
});

module.exports = AppRouter;
