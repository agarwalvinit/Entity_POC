import DomainEntityDD from "../domainEntityDD/domainEntityDD";
import React from "react"
import ReactDOM from "react-dom"
import _ from 'lodash'
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
	resetAttributes: function() {
		this.refs.entityKey.value = "";
		this.refs.updatable.checked = false;
		this.refs.optional.checked = false;
		this.setState({
			key: "",
			type: "",
			updatable: false,
			optional: false,
			attributes: {},
			label: ""
		})
	},
	addEntity: function(evt){
		var newEntity = new Object();
		newEntity.key = this.state.key;
		newEntity.type = this.state.type;
		newEntity.updatable = this.state.updatable;
		newEntity.optional = this.state.optional;
		newEntity.attributes = this.state.attributes;
		newEntity.isAttributeVisible = true;
		newEntity.label = this.state.label;
		this.props.addEntity(newEntity);
		this.resetAttributes();
	},
	render: function(){
		return(
			<div>
				<span className="spacer">
					<input onChange={this.setKey} ref="entityKey" type="text" placeholder="Enter key"/>
				</span>
				<DomainEntityDD onSelect={this.setTypeAndAttr} />
				<span className="check-box-cont spacer">
					<input type="checkbox" id="isUpdatable" onChange={this.setUpdatable} ref="updatable"/>
					<label htmlFor="isUpdatable">Is Updatable</label>
				</span>
				<span className="check-box-cont spacer">
					<input type="checkbox" id="isOptional" onChange={this.setOptional} ref="optional"/>
					<label htmlFor="isOptional">Is Optional</label>
				</span>
				<button onClick={this.addEntity} className={this.state.key && this.state.type ? 'btn btn-sm btn-success' : 'no-display spacer show-attribute'}>Add Entity</button>
			</div>
		)
	}
});

export default EntitySelector;
