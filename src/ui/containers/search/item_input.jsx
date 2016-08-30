import React from 'react';

export default class ItemInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemNames: null };
  }

  handleItemsUpdate(event) {
    const { onItemsUpdate } = this.props;
    const itemValue         = event.target.value;

    this.setState({ itemNames: itemValue });
    onItemsUpdate(itemValue);
  }

  render() {
    const params = {
      type:         'text',
      className:    'form-control input-lg',
      placeholder:  'Enter item here'
    }

    return <div className='itemInput'>
      <input onChange={this.handleItemsUpdate.bind(this)} {...params} />
    </div>;
  }
} 
