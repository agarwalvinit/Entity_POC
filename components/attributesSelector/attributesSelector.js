import "./attributesSelector.scss"
import ReferenceGenerator from "../referenceGenerator/referenceGenerator"
import React from "react"
import _ from 'lodash'
import ReactDOM from "react-dom"
import update from "react-addons-update"
var refComponent = false;
var AttributesSelector = React.createClass({
	getInitialState: function(){
		let obj = {
			attributes: _.cloneDeep(this.props.attributes),
			modalAttributes: {
				modalIsOpen: false
			}
		};
		if(this.props.keys) {
			obj["key"] = this.props.keys;
			obj["type"] = this.props.type;
			obj["updatable"] = this.props.updatable;
			obj["optional"] = this.props.optional;
		}
		return obj
	},
	componentWillReceiveProps: function(props){
		let obj = {
			attributes: props.attributes
		};
		if(props.keys) {
			obj["key"] = props.keys;
			obj["type"] = props.type;
			obj["updatable"] = props.updatable;
			obj["optional"] = props.optional;
		}
		this.setState(obj);
	},
	componentDidUpdate: function(prevProps,prevState){
		if(!(_.isEqual(prevState, this.state))){
			console.log("Updated")
			let thisObj = _.cloneDeep(this.state)
			this.props.updateAttributes(thisObj, this.props.parentIdex);
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
		theObject[index].referenceType = {
			"attributes": attrs,
			"key": theObject[index].referenceType.key || theObject[index].referenceType.name,
			"optional": theObject[index].referenceType.optional || false,
			"updatable": theObject[index].referenceType.updatable || false,
			"type": theObject[index].referenceType.type
		};
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

		if(this.state.attributes[index].referenceType.attributes && this.state.attributes[index].referenceType.attributes[0].key) {
			let newObj = _.cloneDeep(this.state.attributes[index]);
			processedAttr = newObj.referenceType.attributes;
		} else {
			processedAttr = this.processAttribues(attr.referenceType.attributes);
		}

		let updatedAttr = this.setAttributes(processedAttr, index);

		this.setState({
			attributes : updatedAttr,
			modalAttributes: {
				attributes: processedAttr,
				key: attr.referenceType.key || attr.referenceType.name,
				type: attr.referenceType.type,
				optional: attr.referenceType.optional || false,
				updatable: attr.referenceType.updatable || false,
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
	setUpdatable: function(){
		console.log('attribute generator updatable');
		this.setState({
			updatable: ReactDOM.findDOMNode(this.refs.refUpdatable).checked
		});
	},
	setOptional: function(){
		console.log('attribute generator optional');
		this.setState({
			optional: ReactDOM.findDOMNode(this.refs.refOptional).checked
		});
	},
	getAttributesList: function(){
		let html = this.state.attributes.map(function(attribute, index){
			return (
				<tr className="attribute-list" key={index}>
					<td className="spacer">
						<span>{attribute.key || attribute.name}</span>
					</td>
					{attribute.referenceType === null ? <td className="spacer"><span>{attribute.type}</span></td> : <td className="spacer">
						<button onClick={this.showModal.bind(this, attribute, index)} id={"compositeAttr_"+index}>view more</button></td>}
					<td className="check-box-cont spacer">
						<input 
							type="checkbox" 
							id={"updatable_"+this.props.parentIndex+"_"+index}
							onChange={this.updateAttributes}
							checked={attribute.updatable} />
						<label htmlFor={"updatable_"+this.props.parentIndex+"_"+index}>Is Updatable</label>
					</td>
					<td className="check-box-cont spacer">
						<input 
							type="checkbox" 
							id={"optional_"+this.props.parentIndex+"_"+index}
							onChange={this.updateAttributes}
							checked={attribute.optional}/>
						<label htmlFor={"optional_"+this.props.parentIndex+"_"+index}>Is Optional</label>
					</td>
				</tr>
			)
		}.bind(this));
		return html;
	},
	getReferenceHTML: function() {
		console.log('getReferenceHTML: ',this.state);
		return (
			<div>
				<span className="spacer">
					<span>{this.state.key}</span>
				</span>
				<span className="spacer">
					<span>{this.state.type}</span>
				</span>
				<span className="check-box-cont spacer">
					<input 
						type="checkbox" 
						id="isRefUpdatable"
						onChange={this.setUpdatable} 
						ref="refUpdatable"
						checked={this.state.updatable} />
					<label htmlFor={"isRefUpdatable"}>Is Updatable</label>	
				</span>
				<span className="check-box-cont spacer">
					<input 
						type="checkbox"
						id={"isRefOptional"}
						onChange={this.setOptional}
						ref="refOptional" 
						checked={this.state.optional} />
					<label htmlFor={"isRefOptional"}>Is Optional</label>
				</span>
			</div>
		)
	},
	render: function(){
		var referenceHTML = null;
		if(this.props.keys) {
			referenceHTML = this.getReferenceHTML();
		}
		var attributesHtml = this.getAttributesList();
		return (
			<div>
				{referenceHTML}
				<table className="table table-sm table-hover attribute-cont" >
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
				{refComponent === true ?  <ReferenceGenerator 
					parentIndex={this.state.modalAttributes.index} 
				 	closeModal={this.closeModal} 
				 	isOpen={this.state.modalAttributes.modalIsOpen} 
				 	keys={this.state.modalAttributes.key} 
				 	type={this.state.modalAttributes.type} 
				 	optional={this.state.modalAttributes.optional} 
				 	updatable={this.state.modalAttributes.updatable} 
					attributes={this.state.modalAttributes.attributes} /> : <br />}
			</div>
		)
	}
});
export default AttributesSelector;
	