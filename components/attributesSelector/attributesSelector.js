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
			if(this.props.updateAttributes) {
				this.props.updateAttributes(_.cloneDeep(this.state));
			} else {
				this.props.updateRefAttributes(_.cloneDeep(this.state.attributes));
			}
			
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
	showModal: function(attr,index){
		refComponent = true;
		this.setState({
			modalAttributes: {
				attributes: _.cloneDeep(attr.referenceType.attributes),
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
		delete attrs.modalIsOpen;
		console.log(attrs);
		if(!this.props.updateAttributesClose) {
			let attr = _.cloneDeep(this.state.attributes);
			let index = this.state.modalAttributes.index;
			attr[index].referenceType = attrs;
			this.setState({
				attributes: attr
			})
		} else {
			this.props.updateAttributesClose(_.cloneDeep(this.state), this.state.modalAttributes.index, attrs);
		}
	},
	getAttributesList: function(){
		let html = this.state.attributes.map(function(attribute, index){
			return (
				<tr className="attribute-list" key={index}>
					<td className="spacer">
						<span>{attribute.key}</span>
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
			<div>
				<table className="table table-sm table-hover attribute-cont">
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
					attributes={this.state.modalAttributes.attributes} /> : null}
			</div>
		)
	}
});
export default AttributesSelector;