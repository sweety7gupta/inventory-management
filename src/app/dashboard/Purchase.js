import React , {Component} from 'react';
//import PropTypes from 'prop-types';
//import './react-webcam.css';
import BarcodeReader from 'react-barcode-reader'
import {Tabs,AppBar,Tab} from '@material-ui/core';
import {TabPanel} from '@material-ui/lab';
export class Purchase extends Component {
  
  state = {
    value: "",
  }

  
    constructor(props){
        super(props)
        this.state = {
          result: 'No result', 
        }

        this.handleScan = this.handleScan.bind(this)
      }
      handleScan(data){
        this.setState({
          result: data,
        })
      }
      handleError(err){
        console.error(err)
      }

      handleChange = (event, newValue) => {
        this.setState({ value: newValue });
      };

      render(){
        const { value } = this.state;

        return(
          <div>
            {/* <BarcodeReader
              onError={this.handleError}
              onScan={this.handleScan}
              />
            <p>{this.state.result}</p> */}

<AppBar position="static">
  <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example">
    <Tab label="Item One" />
    <Tab label="Item Two" />
    <Tab label="Item Three" />
  </Tabs>
</AppBar>
<TabPanel value={value} index={0}>
  Item One
</TabPanel>
<TabPanel value={value} index={1}>
  Item Two
</TabPanel>
<TabPanel value={value} index={2}>
  Item Three
</TabPanel>
          </div>
          
        )
      }
    }
 export default Purchase;