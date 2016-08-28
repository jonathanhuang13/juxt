import React from 'react';
import produceImage from '../assets/images/produce.png';
import { Button } from './common_components';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { itemsName: null, storesName: null };
  }

  handleItemsUpdate(event) {
    this.setState({ itemsName: event.target.value });
  }

  handleStoresUpdate(event) {
    this.setState({ storesName: event.target.value });
  }

  handleSubmit() {
    console.log(this.state);
  }

  renderTitle() {
    return <div>
      <h1 className='title'>Cheaper groceries, tastier meals</h1>
      <br />
      <h3 className='subtitle'>Compare grocery prices across your favorite stores</h3>
      <br />
    </div>;
  }

  renderForm() {
    return <div className='form-group'>
      { this.renderInputs() }
      { this.renderButton() }
    </div>;
  }

  renderButton() {
    return <Button className='btn btn-danger btn-lg' onClick={this.handleSubmit.bind(this)}>Search</Button>;
  }

  renderInputs() {
    const inputs = [ 'items', 'stores' ];

    return <div className='inputs'>
        { inputs.map(this.renderInput.bind(this)) }
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
    const imageStyle = {
      backgroundImage: 'url(' + produceImage + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };

    return <div className='home' style={ imageStyle }>
      { this.renderTitle() }
      { this.renderForm() }
    </div>
  }
}
