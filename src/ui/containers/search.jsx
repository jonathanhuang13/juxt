import React from 'react';
import { withRouter } from 'react-router';
import { Button, Form, FormGroup } from 'react-bootstrap/lib';
import ItemInput from './search/item_input';
import StoreInput from './search/store_input';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemNames: null, storeNames: null };
  }

  handleItemsUpdate(itemNames) {
    this.setState({ itemNames });
  }

  handleStoresUpdate(storeNames) {
    this.setState({ storeNames });
  }

  handleSubmit() {
    const { itemNames, storeNames } = this.state;
    const { handleSubmit, router }  = this.props;

    handleSubmit(itemNames, storeNames);
    router.push('/results');
  }

  renderSubmit() {
    const button = {
      bsStyle:  'danger',
      bsSize:   'large',
      type:     'submit',
      onClick:  this.handleSubmit.bind(this)
    }

    return <Button {...button}>Search</Button>;
  }

  renderItemInput() {
    const params = {
      onItemsUpdate: this.handleItemsUpdate.bind(this),
    }

    return <ItemInput {...params}/>;
  }

  renderStoreInput() {
    const params = {
      onStoresUpdate: this.handleStoresUpdate.bind(this),
    }

    return <StoreInput {...params}/>;
  }

  render() {
    return <Form inline className='search'>
      <FormGroup className='inputs'>
        { this.renderItemInput() }
        { this.renderStoreInput() }
      </FormGroup>
      <FormGroup>{ this.renderSubmit() }</FormGroup>
    </Form>;
  }
}

Search.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Search);
