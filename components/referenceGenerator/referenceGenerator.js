require("./referenceGenerator.scss")
import AttributesSelector from "../attributesSelector/attributesSelector";
var _ = require('lodash');
var React = require("react");
var ReactDOM = require("react-dom");
var Modal = require("react-modal");
var customStyles = {
  
}

var ReferenceGenerator = React.createClass({
  getInitialState: function() {
    return { 
      modalIsOpen: false, 
      /*attributes: this.props.attributes*/
    };
  },
  componentWillReceiveProps: function(props){
    this.setState({
      modalIsOpen: props.isOpen
    });
  },
    componentDidUpdate: function(prevProps,prevState){
      console.log(this.state);
  },

  closeModal: function() {
    this.props.closeModal();
  },
  updateAttributes: function(attributes){
    this.props.updateAttributes(attributes, this.props.parentIndex);
    //this.props.updateAttributes({"key":"attributes", "value":attribute, "index":this.props.index});
    /*console.log('this state in ref', this.state)
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
    //this.props.updateEntity(objArray);*/
  },
  render: function() {
    //console.log("Modal state", this.state)
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <button onClick={this.closeModal}>close</button>
          <AttributesSelector parentIndex={this.props.parentIndex} attributes={this.props.attributes} updateAttributes={this.props.updateAttributes}/>
        </Modal>
      </div>
    );
  }
});

export default ReferenceGenerator;
