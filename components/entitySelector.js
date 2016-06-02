var React = require('react'),
	ReactSelectize = require("react-selectize"),
	SimpleSelect = ReactSelectize.SimpleSelect,
	EntitySelector;

EntitySelector = React.createClass({
	getInitialState: function(){
		return {
			domainEntity : []
		}
	},
	componentDidMount: function(){
		var that = this;
		fetch('data/entities.json',{
			method: 'get'
		}).then(function(response) {
			response.json().then(function(data) {
				that.setState({
					domainEntity : data
				})
	        	console.log(data);
	      	})
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		})
	},
    render: function(){
        var self = this,
            options = this.state.domainEntity.map(function(entity){
                return {label: entity.name, value: entity.name}
            });
        return (
        	<span className="spacer">
        		<SimpleSelect className="test-select"
            	options = {options}
            	placeholder = "Select an entity"
            	theme = "material"
            	transitionEnter = {true} />
            </span>
        )
    }
});


function logChange(val) {
    console.log("Selected: " + val);
}
var EntitySelector1 = React.createClass({
	getInitialState: function(){
		return {
			domainEntity : {},
			options : [
			    { value: 'one', label: 'One', clearableValue: false },
			    { value: 'two', label: 'Two', clearableValue: false }
			]
		}
	},
	componentDidMount: function(){
		var that = this;
		/*fetch('data/entities.json',{
			method: 'get'
		}).then(function(response) {
			response.json().then(function(data) {
				that.setState({
					domainEntity : data
				})
	        	console.log(data);
	      	})
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		})*/
	},
	render: function(){
		return (
			<div>
				<div>Hi There. MOit</div>
			</div>
		)
	}
});
module.exports = EntitySelector;
