var React = require('react');
var Link = require('react-router').Link;

var Home = React.createClass({
    render: function() {
        return (
            <div className="home">
                <h2>Home</h2>
                <ul>
                    <li><Link to="hello" params={{name: "world"}}>Hello World</Link></li>
                </ul>
            </div>
        );
    }
});

module.exports = Home;
