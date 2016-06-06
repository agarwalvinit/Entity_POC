// require("./style.css");
import EntitySelector from "./components/entitySelector/entitySelector";
import EntityGenerator from "./components/entityGenerator/entityGenerator";
var _ = require('lodash');
var React = require("react");
var ReactDOM = require("react-dom");
var update = require('react-addons-update');
var newState = [];

var Entity =  React.createClass({
	getInitialState: function(){
		return {
			selectedEntities: []
		}
	},

	addEntity: function(entity) {
		newState = newState.concat(entity);
		this.setState({
			selectedEntities: this.state.selectedEntities.concat(entity)
		});
		console.log('Add Entities state: ',this.state.selectedEntities);
	},
	updateEntity: function(objArray){
		_(objArray).forEach((obj) => {
			newState = update(newState, {
               		[obj.index]: {
               		[obj.key]: {$set: obj.value}
             	}
           	});
		});
		this.setState({
       		selectedEntities: newState
       	});
	},
	processRender: function(){
		console.log('initial state: ',this.state.selectedEntities);
		var html = this.state.selectedEntities.map(function(entity, index){
			return (
				<EntityGenerator key={index} entity={entity} updateEntity={this.updateEntity} index={index} />
			)
		}.bind(this));
		return html;
	},
	render: function(){
		//console.log('initial state', this.state.selectedEntities);
		var html = this.processRender();
		return (
			<div className="app-ctr">
				{html}
				<EntitySelector addEntity={this.addEntity}/>
			</div>
		)
	}
});
ReactDOM.render(<Entity/>, document.getElementById('main'));
