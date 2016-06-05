require("./referenceGenerator.scss")
import AttributesSelector from "../attributesSelector/attributesSelector";
var React = require("react");
var ReactDOM = require("react-dom");
var Modal = require("react-modal");
var customStyles = {
  
}
var ReferenceGenerator = React.createClass({
  getInitialState: function() {
    return { modalIsOpen: false };
  },
  componentWillReceiveProps: function(props){
    this.setState({
      modalIsOpen: props.isOpen
    });
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  // afterOpenModal: function() {
  //   // references are now sync'd and can be accessed.
  //   this.refs.subtitle.style.color = '#f00';
  // },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function() {
    console.log("Modal state", this.state)
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <button onClick={this.closeModal}>close</button>
          {/*<AttributesSelector isAttributeVisible={this.state.isAttributeVisible} 
              attributes={this.state.attributes} updateAttributes={this.props.updateAttributes} parentIndex={this.props.index}/>*/}
          <AttributesSelector attributes={this.props.attributes} updateAttributes={this.props.updateAttributes}/>
        </Modal>
      </div>
    );
  }
});

export default ReferenceGenerator;
