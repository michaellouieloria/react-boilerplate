var React = require('react');

var Hello = React.createClass({
    render: function() {
        return (
            <div className="hello">
                <h2>Hello {this.props.name}</h2>
            </div>
        );
    }
});

module.exports = Hello;
