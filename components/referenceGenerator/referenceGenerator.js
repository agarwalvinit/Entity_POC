import "./referenceGenerator.scss"
import AttributesSelector from "../attributesSelector/attributesSelector";
import _ from "lodash";
import React from "react";
import Modal from "react-modal";
const customStyles = {
  overlay: {
    backgroundColor   : 'rgba(0, 0, 0, 0.5)'
  },
  content : {
    'left': '10%',
    'right': '10%',
    'bottom': '100px',
    'paddingTop': '65px'
  }
};
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
    let attr = _.cloneDeep(this.state.attributes);
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
          <button className="closeModal" onClick={this.closeModal}></button>
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
