import DomainEntityDD from "../domainEntityDD/domainEntityDD";
import AttributesSelector from "../attributesSelector/attributesSelector";
import React from "react"
import ReactDOM from "react-dom"
var EntityGenerator = React.createClass({
	getInitialState: function(){
		return {
			key: this.props.entity.key,
			type: this.props.entity.type,
			updatable: this.props.entity.updatable,
			optional: this.props.entity.optional,
			isAttributeVisible: this.props.entity.isAttributeVisible,
			attributes: this.props.entity.attributes,
			label: this.props.entity.label
		}
	},
	componentWillReceiveProps: function(props){
		console.log("hello componentWillReceiveProps");
		this.setState({
			key: props.entity.key,
			type: props.entity.type,
			updatable: props.entity.updatable,
			optional: props.entity.optional,
			isAttributeVisible: props.entity.isAttributeVisible,
			attributes: props.entity.attributes,
			label: props.entity.label
		});
	},
	componentDidUpdate: function(prevProp,prevState){
		if(prevState.key !== this.state.key){
			this.props.updateEntity([{"key":"key", "value":this.state.key, "index":this.props.index}]);
		}
		else if(prevState.optional !== this.state.optional){
			this.props.updateEntity([{"key":"optional", "value":this.state.optional, "index":this.props.index}]);
		}
		else if(prevState.updatable !== this.state.updatable){
			this.props.updateEntity([{"key":"updatable", "value":this.state.updatable, "index":this.props.index}]);
		}
		else if(prevState.label !== this.state.label){
			this.updateAttributes();
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
	setValidateEntity: function(selectedEntity, e){
		if(selectedEntity) {
			var newSelectedEntity = this.getObject(selectedEntity);
			this.setState({
				type: newSelectedEntity.type,
				attributes: newSelectedEntity.attributes,
				label: selectedEntity.label
			});
		}
	},
	setValidateName: function(name, e){
		this.setState({
			key: ReactDOM.findDOMNode(this.refs.key).value
		});
	},	
	setUpdatable: function(e){
		this.setState({
			updatable: ReactDOM.findDOMNode(this.refs.updatable).checked
		});
	},
	setOptional: function(){
		this.setState({
			optional: ReactDOM.findDOMNode(this.refs.optional).checked
		});
	},
	updateAttributes: function(stateObj){
		var labelObj = new Object(),
			attributesObj = new Object(),
			typeObj = new Object(),
			objArray = [];
		var attributes = stateObj.attributes;
		labelObj.key = "label";
		labelObj.value = this.state.label;
		labelObj.index = this.props.index;
		attributesObj.key = "attributes";
		attributesObj.value = attributes ? attributes : this.state.attributes;
		attributesObj.index = this.props.index;
		typeObj.key = "type";
		typeObj.value = this.state.type;
		typeObj.index = this.props.index;
		objArray = objArray.concat(labelObj,attributesObj,typeObj);
		this.props.updateEntity(objArray);
	},
	updateAttributesClose: function(stateObj, index, attrs){
		var labelObj = new Object(),
			attributesObj = new Object(),
			typeObj = new Object(),
			objArray = [];
		var attributes = stateObj.attributes;
		attributes[index].referenceType = attrs;
		labelObj.key = "label";
		labelObj.value = this.state.label;
		labelObj.index = this.props.index;
		attributesObj.key = "attributes";
		attributesObj.value = attributes ? attributes : this.state.attributes;
		attributesObj.index = this.props.index;
		typeObj.key = "type";
		typeObj.value = this.state.type;
		typeObj.index = this.props.index;
		objArray = objArray.concat(labelObj,attributesObj,typeObj);
		this.props.updateEntity(objArray);
	},
	deleteEntity: function() {
		console.log(this.props);
		this.props.deleteEntity(this.props.index);
	},
	render: function(){
		return(
			<div>
				<span className="spacer">
					<input onChange={this.setValidateName} ref="key" type="text" placeholder="Enter key" value={this.state.key}/>
				</span>			
				<DomainEntityDD ref="entityType" onSelect={this.setValidateEntity} 
				type={this.state.type} label={this.state.label}/>
				<span className="check-box-cont spacer">
					<input type="checkbox" id={"updatableEntity_"+this.props.index} 
					onChange={this.setUpdatable} ref="updatable" checked={this.state.updatable}/>
					<label htmlFor={"updatableEntity_"+this.props.index}>Is Updatable</label>
				</span>
				<span className="check-box-cont spacer">
					<input type="checkbox" id={"optionalEntity_"+this.props.index} 
					onChange={this.setOptional} ref="optional" checked={this.state.optional}/>
					<label htmlFor={"optionalEntity_"+this.props.index}>Is Optional</label>
				</span>
				<button onClick={this.deleteEntity} className="btn btn-sm btn-danger">Delete Entity</button>
				<AttributesSelector isAttributeVisible={this.state.isAttributeVisible} 
				attributes={this.state.attributes} updateAttributes={this.updateAttributes} 
				updateAttributesClose={this.updateAttributesClose} parentIndex={this.props.index}/>
			</div>
		)
	}
});

export default EntityGenerator;
