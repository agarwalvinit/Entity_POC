//var DomainEntityDD = require("../domainEntityDD/DomainEntityDD.js");
import DomainEntityDD from "../domainEntityDD/domainEntityDD";
var React = require("react");
var ReactDOM = require("react-dom");
var _ = require('lodash');
var EntitySelector = React.createClass({
	getInitialState: function(){
		return {
			key: "",
			type: "",
			updatable: false,
			optional: false,
			attributes: {},
			label: ""
		}
	},
	setKey: function(){
		this.setState({
			key: ReactDOM.findDOMNode(this.refs.entityKey).value
		});
	},
	setTypeAndAttr: function(selectedEntity){
		if(selectedEntity) {
			var newAttributes = this.processAttribues(selectedEntity.attributes);
			this.setState({
			type: selectedEntity.type,
			attributes: newAttributes,
			label: selectedEntity.label
		});
		}
	},
	processAttribues: function(attributes){
		var newAttributes = [];
		_(attributes).forEach(function(attribute){
			newAttributes.push({
				"key": attribute.name,
				"type": attribute.type,
				"optional": false,
				"updatable": false,
				"referenceType": attribute.referenceType
			})
		});
		return newAttributes;
	},
	setUpdatable: function(){
		this.setState({
			updatable: ReactDOM.findDOMNode(this.refs.updatable).checked
		});
	},
	setOptional: function(){
		this.setState({
			optional: ReactDOM.findDOMNode(this.refs.optional).checked
		});	
	},
	addEntity: function(evt){
		//console.log(this.state.entityType);
		var newEntity = new Object();
		newEntity.key = this.state.key;
		newEntity.type = this.state.type;
		newEntity.updatable = this.state.updatable;
		newEntity.optional = this.state.optional;
		newEntity.attributes = this.state.attributes;
		newEntity.isAttributeVisible = true;
		newEntity.label = this.state.label;

		this.props.addEntity(newEntity);
	},
	render: function(){
		return(
			<div>
				<span className="spacer">
					<input onChange={this.setKey} ref="entityKey" type="text" placeholder="Enter key"/>
				</span>
				<DomainEntityDD ref="entityType" onSelect={this.setTypeAndAttr}/>
				<span className="check-box-cont spacer">
					<input type="checkbox" id="isUpdatable" onChange={this.setUpdatable} ref="updatable"/>
					<label htmlFor="isUpdatable">Is Updatable</label>
				</span>
				<span className="check-box-cont spacer">
					<input type="checkbox" id="isOptional" onChange={this.setOptional} ref="optional"/>
					<label htmlFor="isOptional">Is Optional</label>
				</span>
				<span onClick={this.addEntity} className={this.state.key && this.state.type ? 'spacer show-attribute' : 'no-display spacer show-attribute'}>Show Attribute</span>
			</div>
		)
	}
});

//module.exports = EntitySelector;
export default EntitySelector;
