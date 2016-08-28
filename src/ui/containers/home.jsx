import React from 'react';
import produceImage from '../assets/images/produce.png';
import { Button } from './common_components';

export default class Home extends React.Component {
  renderTitle() {
    return (
      <div>
        <h1 className='title'>Cheaper groceries, tastier meals</h1>
        <br />
        <h3 className='subtitle'>Compare grocery prices across your favorite stores</h3>
        <br />
      </div>);
  }

  renderForm() {
    return (
      <div className='form-group'>
        { this.renderInputs() }
        <Button className='btn btn-danger btn-lg'>Search</Button>
      </div>);
  }

  renderInputs() {
    return (
      <div className='inputs'>
          <input type='text' className='form-control input-lg' placeholder='Item'/>
          <input type='text' className='form-control input-lg' placeholder='Store'/>
      </div>);
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
