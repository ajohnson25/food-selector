import React, { Component } from 'react';

class ButtonRow extends Component {
  render () {
    return <div className="row">
      <Button option={this.props.options[0]} onClick={this.props.onClick} />
      <Button option={this.props.options[1]} onClick={this.props.onClick}/>
      <Button option={this.props.options[2]} onClick={this.props.onClick}/>
    </div>;
  }
}

class Button extends Component {

  render () {
    return <button className="btn waves-effect waves-light col s4" id={this.props.option.shortText} onClick={this.props.onClick} value={this.props.option.text}>{this.props.option.text}</button>;
  }
}

export default ButtonRow;
