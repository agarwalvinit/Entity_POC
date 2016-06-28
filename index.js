import "./css/main.css";
import './node_modules/react-selectize/themes/index.css';
import EntitySelector from "./components/entitySelector/entitySelector";
import EntityGenerator from "./components/entityGenerator/entityGenerator";
import BusinessServiceComponent from "./components/businessServiceDD/businessServiceDD";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import update from "react-addons-update";
import { sdBackend } from "./ui-config";

var newState = [];
var Entity =  React.createClass({
	getInitialState: function(){
		return {
			ownerId: null,
			version: null,
			name: null,
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
	setBusinessService: function(businessService){
		if(businessService) {
			this.setState({
				ownerId: businessService.ownerId,
				version: businessService.version,
				name: businessService.name
			})
		}
	},
	saveEntity: function() {
		console.log('save: ', this.state.selectedEntities);
		var dataEntity = {
				"ownerId": this.state.ownerId,
				"ownerType": 'BUSINESS_SERVICE',
				"entities": this.state.selectedEntities
		}
		console.log(dataEntity);
		dataEntity = JSON.stringify(dataEntity);
		fetch( sdBackend+'/sd/businessservices/'+this.state.name+'/version/'+this.state.version+'/schema',  {  
		    method: 'PUT',  
		    headers: {  
		    	'Content-Type': 'application/json'  
		    },  
		    body: dataEntity
		  })
		  .then(function (data) {  
		  	if(data.status === 200) {
			    console.log('Request succeeded with JSON response', data);
		  	} else {
		  		data.json().then(function(error) {
		  			alert(error.message);  
		  		})
		  	}
		  })  
		  .catch(function (error) {  
		    console.log('Request failed', error);  
		});
	},
	processRender: function(){
		console.log('initial state: ',this.state.selectedEntities);
		var html = this.state.selectedEntities.map(function(entity, index){
			return (
				<EntityGenerator key={index} entity={entity} updateEntity={this.updateEntity} 
					deleteEntity={this.deleteEntity} index={index} />
			)
		}.bind(this));
		return html;
	},
	render: function(){
		var html = this.processRender();
		return (
			<div className="app-ctr">
				<BusinessServiceComponent onSelect={this.setBusinessService} />
				{ (this.state.name && this.state.ownerId) ? <div>
						{!(_.isEmpty(this.state.selectedEntities)) ? <button className="btn btn-sm btn-primary pull-right" 
							onClick={this.saveEntity}>Save Entity</button> : null}
						{html}
						<EntitySelector addEntity={this.addEntity}/>
						{!(_.isEmpty(this.state.selectedEntities)) ? <button className="btn btn-sm btn-primary pull-right" 
							onClick={this.saveEntity}>Save Entity</button> : null}
				</div> : null}
			</div>
		)
	}
});
ReactDOM.render(<Entity/>, document.getElementById('main'));
