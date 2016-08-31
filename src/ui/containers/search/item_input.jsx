import React from 'react';
import { ButtonToolbar, Button, FormControl } from 'react-bootstrap/lib';

export default class ItemInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemNames: null, showDropdown: false };
  }

  handleItemsUpdate(event) {
    const { onItemsUpdate } = this.props;
    const itemValue         = event.target.value;

    this.setState({ itemNames: itemValue });
    onItemsUpdate(itemValue);
  }

  handleShowDropdown() {
    this.setState({ showDropdown: true });
  }

  handleHideDropdown() {
    this.setState({ showDropdown: false });
  }

  handleAdd() {
    console.log('here');
  }

  renderDropdown() {
    if (!this.state.showDropdown) return null;

    return <div className='dropdown-menu'>
      <div className='list'>
        { this.renderButtons() }
      </div> 
    </div>
  }

  renderButtons() {
    const addButton = {
      className: 'add-button',
      bsStyle:  'default',
      onClick:  this.handleAdd.bind(this)
    }

    return <div className='add-remove-group'>
        <Button {...addButton}>
          {this.renderAdd() }
          <span> </span>Add Item
        </Button>
        { this.renderRemove() }
    </div>
  }

  renderAdd() {
    const addButton = {
      className: 'glyphicon glyphicon-plus',
      style:     { color: 'green' },
    }

    return <span {...addButton}></span>
  }

  renderRemove() {
    const removeButton = {
      className:  'glyphicon glyphicon-remove',
      style:      { position: 'absolute', right: '5px', top: '3px', color: '#c9302c' },
      onClick:    this.handleHideDropdown.bind(this),
    }

    return <span {...removeButton}></span>
  }

  render() {
    const formControl = {
      type:         'text',
      className:    'form-control input-lg dropdown-toggle',
      placeholder:  'Enter item here',
      onChange:     this.handleItemsUpdate.bind(this),
      onFocus:      this.handleShowDropdown.bind(this),
    }

    return <div className='itemInput dropdown'>
      <FormControl {...formControl} />
      { this.renderDropdown() }
    </div>;
  }
} 
