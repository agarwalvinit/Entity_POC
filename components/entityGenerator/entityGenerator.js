//var DomainEntityDD = require("../domainEntityDD/DomainEntityDD.js");
import DomainEntityDD from "../domainEntityDD/domainEntityDD";
import AttributesSelector from "../attributesSelector/attributesSelector";
var React = require("react");
var ReactDOM = require("react-dom");
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
	setValidateName: function(name, e){
		this.setState({
			key: ReactDOM.findDOMNode(this.refs.key).value
		});
	},
	setValidateEntity: function(selectedEntity, e){
		var newAttributes = processAttribues(selectedEntity.attributes);
		this.setState({
			label: selectedEntity.label,
			type: selectedEntity.type,
			attributes: newAttributes
		});
		function processAttribues(attributes){
			var newAttributes = [];
			_(attributes).forEach(function(attribute){
				newAttributes.push({
					"key": attribute.name,
					"type": attribute.type,
					"optional": false,
					"updatable": false,
					"referenceType": attribute.referenceType
				});
			});
			return newAttributes;
		}
		//console.log(this.state.attributes);
		//this.props.updateEntity("entityType", this.state.entityType, this.props.index);
		//this.props.updateEntity({"key":"type", "value":selectedEntity.type, "index":this.props.index});
		//this.props.updateEntity({"key":"attributes", "value":newAttributes, "index":this.props.index});
	},
	setUpdatable: function(e){
		this.setState({
			updatable: ReactDOM.findDOMNode(this.refs.updatable).checked
		});
		//this.props.updateEntity("isUpdatable", this.state.isUpdatable, this.props.index);
		//this.props.updateEntity({"key":"updatable", "value":ReactDOM.findDOMNode(this.refs.updatable).checked, "index":this.props.index});
	},
	setOptional: function(){
		this.setState({
			optional: ReactDOM.findDOMNode(this.refs.optional).checked
		});
		//this.props.updateEntity({"key":"optional", "value":ReactDOM.findDOMNode(this.refs.optional).checked, "index":this.props.index});
	},
	showAttr: function(evt){
		this.setState({
			isAttributeVisible: !this.state.isAttributeVisible
		}, function(){console.log(this.state)});
		console.log(this.state);
	},
	updateAttributes: function(attributes){
		//this.props.updateAttributes({"key":"attributes", "value":attribute, "index":this.props.index});
		var labelObj = new Object(),
			attributesObj = new Object(),
			typeObj = new Object(),
			objArray = [];
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
				<span onClick={this.showAttr} className={this.state.key && this.state.type ? 
					'spacer show-attribute' : 'no-display spacer show-attribute'}>Show Attribute</span>
				<AttributesSelector isAttributeVisible={this.state.isAttributeVisible} 
				attributes={this.state.attributes} updateAttributes={this.updateAttributes} parentIndex={this.props.index}/>
			</div>
		)
	}
});

//module.exports = EntitySelector;
export default EntityGenerator;
