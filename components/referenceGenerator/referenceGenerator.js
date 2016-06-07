import "./referenceGenerator.scss"
import AttributesSelector from "../attributesSelector/attributesSelector";
var _ = require('lodash');
var React = require("react");
var ReactDOM = require("react-dom");
var Modal = require("react-modal");
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
    let attr = _.cloneDeep(this.state.attributes);
    this.props.closeModal(attr);
  },
  updateAttributes: function(attributes, attrs, index){
    if(!attrs) {
      this.setState({
      attributes: attributes
      })
    } else {
      let newAttributes = attributes[index].attributes = attrs;
      this.setState({
        attributes: newAttributes
      })
    }
  },
  render: function() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <button onClick={this.closeModal}>close</button>
          <AttributesSelector parentIndex={this.props.parentIndex} attributes={this.state.attributes} 
           updateAttributes={this.updateAttributes}/>
        </Modal>
      </div>
    );
  }
});

export default ReferenceGenerator;
