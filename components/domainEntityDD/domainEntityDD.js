import "../../css/dropDown.css";
import { sdBackend } from "../../ui-config"
import React from "react";
import	ReactSelectize from "react-selectize";
var	SimpleSelect = ReactSelectize.SimpleSelect, 
	DomainEntityDD;

DomainEntityDD = React.createClass({
	namespaceEntityUrl: sdBackend+'/sd/namespaces/SAL',
	getInitialState: function(){
		return {
			domainEntity : []
		}
	},
	componentDidMount: function(){
		var that = this;
		fetch( that.namespaceEntityUrl ,{
			method: 'GET'
		}).then(function(response) {
			response.json().then(function(data) {
				that.setState({
					domainEntity : data.entities
				});
	      	}) 
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		})
	},
    render: function(){
			var self = this, 
            	options = this.state.domainEntity.map(function(entity){
                	return {label: entity.displayName, value: entity.type, type: entity.type, attributes: entity.attributes}
            });
        return <div className="spacer entityDD">
        			<SimpleSelect 
        				options = {options} 
        				placeholder = "Select an entity" 
        				defaultValue = {this.props.type ? {label: this.props.label, value: this.props.type} : ""} 
        				onValueChange = {function(entity){
        					self.props.onSelect(entity);
                		}}>
                	</SimpleSelect> 
                </div>
    } 
});
export default DomainEntityDD;