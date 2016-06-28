import "../../css/dropDown.css";
import { sdBackend } from "../../ui-config";
import React from "react";
import	ReactSelectize from "react-selectize";
var	SimpleSelect = ReactSelectize.SimpleSelect;

var BusinessServiceComponent = React.createClass({
	namespaceEntityUrl: sdBackend+'/sd/businessservices',
	getInitialState: function(){
		return {
			businessService : [],
		}
	},
	componentDidMount: function(){
		var that = this;
		fetch(that.namespaceEntityUrl ,{
			method: 'GET'
		}).then(function(response) {
			response.json().then(function(data) {
				that.setState({
					businessService : data.businessServices
				});
	      	}) 
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		})
	},
    render: function(){
		var self = this, 
        	options = this.state.businessService.map(function(service){
            	return {label: service.name+' : '+service.version, ownerId: service.identity, 
            			name: service.name, version: service.version}
        });
        return <div className="spacer entityDD space-bottom">
        			<SimpleSelect 
        				options = {options} 
        				placeholder = "Select Business Service" 
        				onValueChange = {function(service){
        					self.props.onSelect(service);
                		}}>
                	</SimpleSelect> 
                </div>
    } 
});
export default BusinessServiceComponent;