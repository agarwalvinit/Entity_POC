import "./attributesSelector.scss"
import ReferenceGenerator from "../referenceGenerator/referenceGenerator"
import React from "react"
import _ from 'lodash'
import ReactDOM from "react-dom"
import update from "react-addons-update"
var refComponent = false;
var AttributesSelector = React.createClass({
	getInitialState: function(){
		return{
			attributes: _.cloneDeep(this.props.attributes),
			modalAttributes: {
				modalIsOpen: false
			}
		}
	},
	componentWillReceiveProps: function(props){
		this.setState({
			attributes: props.attributes
		});
	},
	componentDidUpdate: function(prevProps,prevState){
		if(!(_.isEqual(prevState, this.state))){
			console.log("Updated")
			this.props.updateAttributes(this.state.attributes, this.props.parentIdex);
		}
	},
	updateAttributes: function(evt){
		var obj = {},
			newAttributes;
		obj.key = evt.target.id.split("_")[0];
		obj.index = evt.target.id.split("_")[2];
		obj.value = evt.target.checked;

		newAttributes = _.cloneDeep(this.state.attributes);
		newAttributes[obj.index][obj.key] = obj.value;

		this.setState({
			attributes: newAttributes
		});
	},
	setAttributes: function (attrs, index) {
		var theObject = _.cloneDeep(this.state.attributes)
		console.log("my index", index, theObject)
		theObject[index].attributes = attrs;
		return theObject;
	},
	processAttribues: function (attributes){
		let newAttributes = [];
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
	},
	showModal: function(attr,index){
		refComponent = true;
		var attrKey = attr.key;
		let processedAttr = [];

		if(this.state.attributes[index].attributes) {
			let newObj = _.cloneDeep(this.state.attributes[index]);
			processedAttr = newObj.attributes;
		} else {
			processedAttr = this.processAttribues(attr.referenceType.attributes);
		}

		let updatedAttr = this.setAttributes(processedAttr, index);

		this.setState({
			attributes : updatedAttr,
			modalAttributes: {
				attributes: processedAttr,
				index: index,
				modalIsOpen: true
			}
		});
	},
	closeModal: function (attrs){
		this.setState({
			modalAttributes: {
				modalIsOpen: false
			}
		});
		this.props.updateAttributes(this.state.attributes, attrs, this.state.modalAttributes.index);
	},
	getAttributesList: function(){
		console.log('getAttributesList: ',this.state.attributes);
		var html = this.state.attributes.map(function(attribute, index){
			return (
				<tr className="attribute-list" key={index}>
					<td className="spacer">
						<span>{attribute.key || attribute.name}</span>
					</td>
					{attribute.referenceType === null ? <td className="spacer"><span>{attribute.type}</span></td> : <td className="spacer">
						<button onClick={this.showModal.bind(this, attribute, index)} id={"compositeAttr_"+index}>view more</button></td>}
					<td className="check-box-cont spacer">
						<input type="checkbox" id={"updatable_"+this.props.parentIndex+"_"+index}
							   onChange={this.updateAttributes} ref="updatable" checked={attribute.updatable}/>
						<label htmlFor={"updatable_"+this.props.parentIndex+"_"+index}>Is Updatable</label>
					</td>
					<td className="check-box-cont spacer">
						<input type="checkbox" id={"optional_"+this.props.parentIndex+"_"+index}
							   onChange={this.updateAttributes} ref="optional" checked={attribute.optional}/>
						<label htmlFor={"optional_"+this.props.parentIndex+"_"+index}>Is Optional</label>
					</td>
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
				{refComponent === true ?  <ReferenceGenerator parentIndex={this.state.modalAttributes.index} closeModal={this.closeModal} 
				 isOpen={this.state.modalAttributes.modalIsOpen} attributes={this.state.modalAttributes.attributes} /> : <br />}
			</div>
		)
	}
});
export default AttributesSelector;
	