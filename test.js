var React = require("react");
var ReactDOM = require("react-dom");
var SimpleSelect = require("react-selectize").SimpleSelect

var Form = React.createClass({
    
    // render :: a -> ReactElement
    render: function(){
        var self = this, 
            options = ["apple", "mango", "grapes", "melon", "strawberry","asd","wer","234","dfg","3424","xvckjhdjkf"].map(function(fruit){
                return {label: fruit, value: fruit}
            });
        return <SimpleSelect options = {options} placeholder = "Select a fruit"></SimpleSelect>
    }
    
});

//ReactDOM.render(React.createElement(Form, null), document.getElementById("main"));
ReactDOM.render(<Form />, document.getElementById("main"));