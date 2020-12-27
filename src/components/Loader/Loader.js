import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

export default class LoaderImages extends React.Component {
  //other logic
  render() {
    return <Loader 
    type="ThreeDots" 
    color="#00BFFF" 
    height={80} 
    width={80} 
    />;
  }
}
