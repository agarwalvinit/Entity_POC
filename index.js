import "./css/main.css";
import './node_modules/react-selectize/themes/index.css';
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
	saveEntity: function() {
		console.log('save: ', this.state.selectedEntities);
		var dataEntity = JSON.stringify(this.state.selectedEntities);
		fetch(url, {  
		    method: 'post',  
		    headers: {  
		      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
		    },  
		    body: dataEntity
		  })
		  .then(json)  
		  .then(function (data) {  
		    console.log('Request succeeded with JSON response', data);  
		  })  
		  .catch(function (error) {  
		    console.log('Request failed', error);  
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
				{!(_.isEmpty(this.state.selectedEntities)) ? <button className="btn btn-sm btn-primary pull-right" onClick={this.saveEntity}>Save Entity</button> : ""}
				{html}
				<EntitySelector addEntity={this.addEntity}/>
				{!(_.isEmpty(this.state.selectedEntities)) ? <button className="btn btn-sm btn-primary pull-right" onClick={this.saveEntity}>Save Entity</button> : ""}
			</div>
		)
	}
});
ReactDOM.render(<Entity/>, document.getElementById('main'));
