import React from 'react';
import { Button } from './common_components';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemNames: null, storeNames: null };
  }

  handleItemsUpdate(event) {
    this.setState({ itemNames: event.target.value });
  }

  handleStoresUpdate(event) {
    this.setState({ storeNames: event.target.value });
  }

  handleSubmit() {
    const { itemNames, storeNames } = this.state;
    this.props.handleSubmit(itemNames, storeNames);
  }

  renderSubmit() {
    return <Button className='btn btn-danger btn-lg' onClick={this.handleSubmit.bind(this)}>Search</Button>;
  }

  renderInputs() {
    return <div className='inputs'>
        { this.props.inputs.map(this.renderInput.bind(this)) }
    </div>;
  }

  renderInput(input, i) {
    const onChange = input === 'items' ? this.handleItemsUpdate.bind(this) : this.handleStoresUpdate.bind(this);

    const params = {
      type: 'text',
      className: 'form-control input-lg',
      placeholder: 'Enter ' + input + ' here',
      onChange
    }

    return <input key={i} {...params}/>;
  }

  render() {
    return <div className={this.props.className}>
      { this.renderInputs() }
      { this.renderSubmit() }
    </div>;
  }
}
