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
	getObject: function(theObject) {
	    var self = this;
	    var result = {
	        "key": theObject.name,
	        "type": theObject.type,
	        "updatable": false,
	        "optional": false
	    };
	    if(theObject.attributes instanceof Array) {
	        result.attributes = self.processAttribues(theObject.attributes); 
	    }
	    return result;
	},
	processAttribues: function(attributes){
		var self = this;
	    var newAttributes = [];
	    _(attributes).forEach(function(attribute){
	        var obj = {
	            "key": attribute.name,
	            "type": attribute.type,
	            "optional": false,
	            "updatable": false
	        }
	        if(attribute.referenceType){
	            obj.referenceType = self.getObject(attribute.referenceType)
	        } else {
	        	obj.referenceType = null;
	        }
	        newAttributes.push(obj);
	    });
	    return newAttributes;
	},
	setTypeAndAttr: function(selectedEntity){
		if(selectedEntity) {
			var newSelectedEntity = this.getObject(selectedEntity);
			this.setState({
				type: newSelectedEntity.type,
				attributes: newSelectedEntity.attributes,
				label: selectedEntity.label,
				key: newSelectedEntity.key
			});
		}
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
