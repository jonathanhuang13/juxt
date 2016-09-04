import React from 'react';
import { Button, ButtonToolbar, Modal, ControlLabel, FormControl, FormGroup } from 'react-bootstrap/lib';

export default class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: null, brand: null, price: null, amount: null, units: null, storeId: null };
  }

  handleTitleUpdate(e){
    this.setState({ title: e.target.value });
  }

  handleBrandUpdate(e) {
    this.setState({ brand: e.target.value });
  }

  handlePriceUpdate(e) {
    this.setState({ price: e.target.value });
  }

  handleAmountUpdate(e) {
    this.setState({ amount: e.target.value });
  }

  handleUnitsUpdate(e) {
    this.setState({ units: e.target.value });
  }

  handleStoreIdUpdate(e) {
    this.setState({ storeId: e.target.value });
  }

  renderHeader() {
    return <Modal.Header closeButton>
      <Modal.Title>Add Item</Modal.Title>
    </Modal.Header>
  }

  renderBody() {
    const inputs = [ 'Title', 'Brand', 'Price', 'Amount', 'Units', 'StoreId' ]  ;

    return <Modal.Body>
      <form>
        { inputs.map(this.renderInput.bind(this)) }
      </form>
    </Modal.Body>
  }

  renderInput(input, i) {
    // TODO: this is kind of a hack to get the handle*Update functions
    const updateFun = 'handle' + input + 'Update';
    var placeholder = 'i.e. ';

    switch (input) {
      case 'Title':
        placeholder += 'Chicken breast, required';
        break;
      case 'Brand':
        placeholder += 'Tyson\'s';
        break;
      case 'Price':
        placeholder += '7.99';
        break;
      case 'Amount':
        placeholder += '4';
        break;
      case 'Units':
        placeholder += 'breasts';
        break;
      case 'StoreId':
        placeholder += 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, uuid obtained from server';
        break;
      default:
        placeholder = '';
    }

    return <FormGroup key={i}>
      <ControlLabel>{input}</ControlLabel>
      <FormControl placeholder={placeholder} onChange={this[updateFun].bind(this)}></FormControl>
    </FormGroup> 
  }

  renderFooter() {
    const { title, brand, price, amount, units, storeId } = this.state;
    const info = { title, brand, price, amount, units, storeId };

    return <Modal.Footer>
      <ButtonToolbar className='button-footer'>
        <Button onClick={this.props.onClose}>Close</Button>
        { this.renderSubmitButton(info) }
      </ButtonToolbar>
    </Modal.Footer> 
  }

  renderSubmitButton(info) {
    const params = {
      bsStyle:   'primary',
      onClick:   this.props.onSubmit.bind(null, info),
      disabled:  this.props.loading
    }

    const value = this.props.loading ? 'Loading' : 'Submit';
      
    return <Button {...params}>{value}</Button>
  }

  render() {
    const { showItemForm, onClose } = this.props;

    const params = {
      show:    showItemForm,
      onHide:  onClose
    }

    return <Modal {...params}>
      { this.renderHeader() }
      { this.renderBody() }
      { this.renderFooter() }     
    </Modal>
  }
}
