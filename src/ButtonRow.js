import React, { Component } from 'react';

class ButtonRow extends Component {
  handleClick (e) {
    e.preventDefault();
    console.log('click');
  }

  render () {
    return <div className="row">
      <Button id={this.props.optionId[0]} Text={this.props.optionText[0]} onClick={this.props.onClick} />
      <Button id={this.props.optionId[1]} Text={this.props.optionText[1]} onClick={this.props.onClick}/>
      <Button id={this.props.optionId[2]} Text={this.props.optionText[2]} onClick={this.props.onClick}/>
    </div>;
  }
}

function Button(props) {
  return (<button className="btn waves-effect waves-light col s4" id={props.id} onClick={props.onClick}>{props.Text}</button>);
}

export default ButtonRow;
