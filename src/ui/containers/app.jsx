import React from 'react';
import Header from './header';
import Footer from './footer';

export default class App extends React.Component {
  render() {
    return <div className='container'>
      <Header />
      { this.props.children }
      <Footer />
    </div>;
  }
}
