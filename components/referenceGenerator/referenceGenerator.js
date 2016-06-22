import "./referenceGenerator.scss"
import AttributesSelector from "../attributesSelector/attributesSelector";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
var customStyles = { };
var ReferenceGenerator = React.createClass({
  getInitialState: function() {
    return { 
      attributes: _.cloneDeep(this.props.attributes),
      key: this.props.keys,
      type: this.props.type,
      optional: this.props.optional,
      updatable: this.props.updatable,
      modalIsOpen: false
    };
  },
  componentWillReceiveProps: function(props){
    this.setState({
      attributes: props.attributes,   
      key: props.keys,
      type: props.type,
      optional: props.optional,
      updatable: props.updatable,         
      modalIsOpen: props.isOpen
    });
  },
  closeModal: function() {
    let attr = _.cloneDeep(this.state);
    this.props.closeModal(attr);
  },
  updateAttributes: function(stateObj){
        this.setState({
          attributes: stateObj.attributes,
          key: stateObj.key,
          type: stateObj.type,
          optional: stateObj.optional,
          updatable: stateObj.updatable
        })
    },
  render: function() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <button onClick={this.closeModal}>close</button>
          <AttributesSelector 
            parentIndex={this.props.parentIndex} 
            keys={this.state.key} 
            type={this.state.type} 
            optional={this.state.optional} 
            updatable={this.state.updatable} 
            attributes={this.state.attributes} 
            updateAttributes={this.updateAttributes} />
        </Modal>
      </div>
    );
  }
});

export default ReferenceGenerator;
