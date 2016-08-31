import React from 'react';
import { ButtonToolbar, Button, FormControl } from 'react-bootstrap/lib';
import ItemModal from '../add/item_modal';

export default class ItemInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemNames: null, showDropdown: false, showItemModal: false };
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

  handleShowModal() {
    this.setState({ showItemModal: true });
  }

  handleCloseModal() {
    this.setState({ showItemModal: false });
  }

  handleModalSubmit(info) {
    console.log(info);
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
      onClick:  this.handleShowModal.bind(this)
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

  renderItemModal() {
    const params = {
      showItemModal:  this.state.showItemModal,
      onClose:        this.handleCloseModal.bind(this),
      onSubmit:       this.handleModalSubmit
    }

    return <ItemModal {...params} />
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
      { this.renderItemModal() }
    </div>;
  }
} 
