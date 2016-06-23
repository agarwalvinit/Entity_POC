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
      modalIsOpen: false
    };
  },
  componentWillReceiveProps: function(props){
    this.setState({
      attributes: props.attributes,        
      modalIsOpen: props.isOpen
    });
  },
  closeModal: function() {
    let attr = _.cloneDeep(this.state);
    this.props.closeModal(attr);
  },
  updateRefAttributes: function(attr){
        this.setState({
          attributes: attr
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
            attributes={this.state.attributes} 
            updateRefAttributes={this.updateRefAttributes} />
        </Modal>
      </div>
    );
  }
});

export default ReferenceGenerator;
