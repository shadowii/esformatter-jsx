var React = require('react');

var Hello = React.createClass({
  render: function() {
    return <div>
             <h2 className="hello-div">{this.props.message}{this.props.anotherPartOfCode}</h2>
           </div>;
  }
});

React.render(<Hello message="world" />, document.body);