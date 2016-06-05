require("./attributesSelector.scss");
import ReferenceGenerator from "../referenceGenerator/referenceGenerator"
var React = require("react");
var _ = require('lodash');
var ReactDOM = require("react-dom");
var update = require('react-addons-update');
var AttributesSelector = React.createClass({
	getInitialState: function(){
		return{
			attributes: this.props.attributes,
			modalIsOpen: false,
			refAttributes: null
		}
	},
	componentWillReceiveProps: function(props){
		this.setState({
			attributes: props.attributes
		});
	},
	componentDidUpdate: function(prevProps,prevState){
		//console.log(this.state.attributes);
		if(!(_.isEqual(prevState, this.state))){
			this.props.updateAttributes(this.state.attributes);
		}
	},
	updateAttributes: function(evt){
		var obj = {},
			newAttributes;
		obj.key = evt.target.id.split("_")[0];
		obj.index = evt.target.id.split("_")[2];
		obj.value = evt.target.checked;
		//this.props.updateAttributes(obj);

		newAttributes = update(this.state.attributes, {
           		[obj.index]: {
           		[obj.key]: {$set: obj.value}
         	}
       	});
       	this.setState({
       		attributes: newAttributes
       	});
	},
	showModal: function(attr){
		var newAttributes = processAttribues(attr.referenceType.attributes);
		this.setState({
			refAttributes: newAttributes,
			modalIsOpen: true
		}, function() {
			console.log(this.state);
		}.bind(this));
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
	},
	updateAttributesInModal: function(refAttributes){
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
},
	getAttributesList: function(){
		var html = this.state.attributes.map(function(attribute, index){
			return (
				<tr className="attribute-list" key={index}>
					<td className="spacer">
						<span>{attribute.key || attribute.name}</span>
					</td>
					{attribute.referenceType === null ? <td className="spacer"><span>{attribute.type}</span></td> : <td className="spacer">
					<button onClick={() => this.showModal(attribute)} id={"compositeAttr_"+index}>view more</button></td>}
					<td className="check-box-cont spacer">
						<input type="checkbox" id={"updatable_"+this.props.parentIndex+"_"+index} 
						onClick={this.updateAttributes} ref="updatable"/>
						<label htmlFor={"updatable_"+this.props.parentIndex+"_"+index}>Is Updatable</label>
					</td>
					<td className="check-box-cont spacer">
						<input type="checkbox" id={"optional_"+this.props.parentIndex+"_"+index} 
						onChange={this.updateAttributes} ref="optional"/>
						<label htmlFor={"optional_"+this.props.parentIndex+"_"+index}>Is Optional</label>
					</td>
					{/*attribute.type === "REF" ? <span className="spacer"><span>Show Attribute</span></span> : ""*/}
				</tr>
			)
		}.bind(this));
		return html;
	},
	render: function(){
		var attributesHtml = this.getAttributesList();
		return (
			<div className={"attribute-cont "+this.props.isAttributeVisible}>
				<table className="table table-sm table-hover">
					<thead>
						<tr>
							<th>Attribute Name</th>
							<th>Attribute Type</th>
							<th>Is Updatable</th>
							<th>Is Optional</th>
						</tr>
					</thead>
					<tbody>
						{attributesHtml}
					</tbody>
				</table>
				{/*<ReferenceGenerator isOpen={this.state.modalIsOpen} attributes={this.state.refAttributes} 
				updateAttributes={this.props.updateAttributes}/>*/}
				<ReferenceGenerator isOpen={this.state.modalIsOpen} attributes={this.state.refAttributes} updateAttributes={this.updateAttributesInModal}/>
			</div>
		)
	}
});
export default AttributesSelector;
