import React,{ Component} from "react";
import "./Barcode.css";
import Barcode from 'react-barcode';
import {  Button } from '@material-ui/core';
import ProductSearch from '../components/common/ProductSearch';

class BarcodePrinting extends Component{
   
    state ={
        value : "",
    }

    triggerDownload = (imgURI) => {
        var evt = new MouseEvent('click', {
          view: window,
          bubbles: false,
          cancelable: true
        });
      
        var a = document.createElement('a');
        a.setAttribute('download', this.state.value + '.jpg');
        a.setAttribute('href', imgURI);
        a.setAttribute('target', '_blank');
      
        a.dispatchEvent(evt);
    }

    printBarcode = (event) =>{
        var divbarcode = document.getElementById('divBarcode');
        var svg = divbarcode.childNodes[0];

        // var canvas = document.getElementById('canvas');
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var data = (new XMLSerializer()).serializeToString(svg);
        var DOMURL = window.URL || window.webkitURL || window;

        var img = new Image();
        var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        var url = DOMURL.createObjectURL(svgBlob);

        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            DOMURL.revokeObjectURL(url);

            var imgURI = canvas
                .toDataURL('image/jpg')
                .replace('image/jpg', 'image/octet-stream');

            this.triggerDownload(imgURI);
        };

        img.src = url;
    };

    handleProductSelection = (barcodeValue) => {
        this.setState({ value: barcodeValue });
    };
    
    render () {
                
        return (         
            <div >
            <div className="col-lg-8 mx-auto">
            {/* <div className="col-md-3"> */}
                <div className="card card-body-container card-body-style ">
                    <div  className="text-field-container container-style">
                        <h4 className="card-title tab-heading">Barcode Printing</h4>
                    </div>

                    <ProductSearch onProductSelect={this.handleProductSelection} />

                    <div id="divBarcode" className="card-body text-field-container"  style={this.state.value ? {} : { display: 'none' }}>
                        <Barcode value={this.state.value}  />
                        {/* <img ref={this.state.value} /> */}
                        
                    </div>

                    <div className="card-body">
                        <Button variant="contained" color="primary" onClick={this.printBarcode}>
                            Download
                        </Button>
                    </div>  
                    
                </div>
            </div>
            </div>
            
        // </div>
        )
    }
}

export default BarcodePrinting;
