import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, Button, FormControl } from 'react-bootstrap/lib';
import ItemForm from '../form/item-form';

import * as itemFormActions from '../../actions/item-form';

export default class ItemInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemNames: null, showDropdown: false, showItemForm: false };
  }

  handleItemsUpdate(event) {
    const itemValue = event.target.value;

    this.setState({ itemNames: itemValue });
    this.props.onItemsUpdate(itemValue);
  }

  handleShowDropdown() {
    this.setState({ showDropdown: true });
  }

  handleHideDropdown() {
    this.setState({ showDropdown: false });
  }

  handleShowForm() {
    this.props.onShowForm();
  }

  handleCloseForm() {
    this.props.onCloseForm();
  }

  handleFormSubmit(info) {
    this.props.onSubmitForm(info);
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
      onClick:  this.handleShowForm.bind(this)
    }

    return <div className='add-remove-group'>
        <Button {...addButton}>
          {this.renderAddSpan() }
          <span> </span>Add Item
        </Button>
        { this.renderRemove() }
    </div>
  }

  renderAddSpan() {
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

  renderItemForm() {
    const params = {
      showItemForm:  this.props.showItemForm,
      loading:       this.props.loading,
      onClose:       this.handleCloseForm.bind(this),
      onSubmit:      this.handleFormSubmit.bind(this)
    }

    return <ItemForm {...params} />
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
      { this.renderItemForm() }
    </div>;
  }
} 
