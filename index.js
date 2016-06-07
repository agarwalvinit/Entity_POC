import EntitySelector from "./components/entitySelector/entitySelector";
import EntityGenerator from "./components/entityGenerator/entityGenerator";
import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import update from "react-addons-update"

var newState = [];
var Entity =  React.createClass({
	getInitialState: function(){
		return {
			selectedEntities: []
		}
	},
	addEntity: function(entity) {
		newState.push(entity);
		this.setState({
			selectedEntities: newState
		});
		console.log('Add Entities state: ',this.state.selectedEntities);
	},
	deleteEntity: function(index) {
		newState.splice(index, 1);
		this.setState({
			selectedEntities: newState
		}, console.log('deleteEntity: ', this.state.selectedEntities));
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
				<EntityGenerator key={index} entity={entity} updateEntity={this.updateEntity} deleteEntity={this.deleteEntity} index={index} />
			)
		}.bind(this));
		return html;
	},
	render: function(){
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
