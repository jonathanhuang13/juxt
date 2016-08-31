import React from 'react';
import { FormControl } from 'react-bootstrap/lib';

export default class StoreInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { storeNames: null };
  }

  handleStoresUpdate(event) {
    const { onStoresUpdate } = this.props;
    const storeValue         = event.target.value;

    this.setState({ storeNames: storeValue });
    onStoresUpdate(storeValue);
  }

  render() {
    const params = {
      type:         'text',
      className:    'form-control input-lg',
      placeholder:  'Enter store here',
      onChange:     this.handleStoresUpdate.bind(this)
    }

    return <div className='storeInput'>
      <FormControl {...params} />
    </div>;
  }
} 

