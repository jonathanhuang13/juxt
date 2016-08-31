import React from 'react';
import { Button, FormControl } from 'react-bootstrap/lib';

export default class ItemInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemNames: null, focus: false };
  }

  handleItemsUpdate(event) {
    const { onItemsUpdate } = this.props;
    const itemValue         = event.target.value;

    this.setState({ itemNames: itemValue });
    onItemsUpdate(itemValue);
  }

  handleFocus() {
    this.setState({ focus: true });
  }

  handleBlur() {
    this.setState({ focus: false });
  }

  handleAdd() {
    console.log('here');
  }

  renderDropdown() {
    if (!this.state.focus) return null;

    const button = {
      bsStyle: 'default',
      onClick: this.handleAdd.bind(this),
    }

    return <ul className='dropdown-menu'>
      <li><Button {...button}>
        <span className='glyphicon glyphicon-plus'></span>Add</Button>
      </li> 
    </ul>
  }

  render() {
    const params = {
      type:         'text',
      className:    'form-control input-lg dropdown-toggle',
      placeholder:  'Enter item here',
      onChange:     this.handleItemsUpdate.bind(this),
      onFocus:      this.handleFocus.bind(this),
      onBlur:       this.handleBlur.bind(this)
    }

    return <div className='itemInput dropdown'>
      <FormControl {...params} />
      { this.renderDropdown() }
    </div>;
  }
} 
