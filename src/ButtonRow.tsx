import * as React from 'react';

interface ButtonRowProps {
  options: string[]
  onClick: any
}

interface ButtonProps {
  option: any
  onClick: any
}

class ButtonRow extends React.Component<ButtonRowProps> {
  render () {
    return <div className="row">
      <Button option={this.props.options[0]} onClick={this.props.onClick}/>
      <Button option={this.props.options[1]} onClick={this.props.onClick}/>
      <Button option={this.props.options[2]} onClick={this.props.onClick}/>
    </div>;
  }
}

class Button extends React.Component<ButtonProps> {
  render () {
    return <button className="btn waves-effect waves-light col s4" id={this.props.option.shortText} onClick={this.props.onClick} value={this.props.option.text}>{this.props.option.text}</button>;
  }
}

export default ButtonRow;
