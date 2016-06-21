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
		return obj
	},
	componentWillReceiveProps: function(props){
		let obj = {
			attributes: props.attributes
		};
		this.setState(obj);
	},
	componentDidUpdate: function(prevProps,prevState){
		if(!(_.isEqual(prevState, this.state))){
			console.log("Updated")
			this.props.updateAttributes(this.state.attributes, this.props.parentIndex);
		}
	},
	componentDidMount: function() {
    	this.setState({
    		attributes: this.state.attributes
    	})
	},
	updateAndOptional: function(evt){
		console.log('update and optional', this.state);
		var obj = {},
			newAttributes;
		obj.key = evt.target.id.split("_")[0];
		obj.index = evt.target.id.split("_")[2];

		newAttributes = _.cloneDeep(this.state.attributes);
		newAttributes[obj.index][obj.key] = newAttributes[obj.index][obj.key] ? false : true;

		this.setState({
			attributes: newAttributes
		});
	},
	setAttributes: function (attrs, index) {
		var theObject = _.cloneDeep(this.state.attributes)
		console.log("my index", index, theObject)
		theObject[index].referenceType.attributes = attrs;
		return theObject;
	},
	showModal: function(attr,index){
		refComponent = true;
		var attrKey = attr.key;
		let processedAttr = [];
		let newObj = _.cloneDeep(this.state.attributes[index]);
		processedAttr = newObj.referenceType.attributes;

		let updatedAttr = this.setAttributes(processedAttr, index);
		console.log('processedAttr: ', processedAttr)
		this.setState({
			attributes : updatedAttr,
			modalAttributes: {
				attributes: _.cloneDeep(processedAttr),
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
		this.props.updateAttributes(this.state.attributes, this.state.modalAttributes.index, attrs);
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
						<button 
							className={attribute.updatable ? 'btn btn-sm btn-success no-outline' : 'btn btn-sm btn-not-selected no-outline'}
							id={"updatable_"+(this.props.parentIndex)+"_"+index}
							onClick={this.updateAndOptional}>
							isUpdatable
						</button>
					</td>
					<td className="check-box-cont spacer">
						<button 
							className={attribute.optional ? 'btn btn-sm btn-success no-outline' : 'btn btn-sm btn-not-selected no-outline'}
							id={"optional_"+(this.props.parentIndex)+"_"+index}
							onClick={this.updateAndOptional}>
							isOptional
						</button>
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
				{refComponent === true ?  <ReferenceGenerator 
					parentIndex={this.state.modalAttributes.index} 
				 	closeModal={this.closeModal} 
				 	isOpen={this.state.modalAttributes.modalIsOpen} 
					attributes={this.state.modalAttributes.attributes} /> : <br />}
			</div>
		)
	}
});
export default AttributesSelector;