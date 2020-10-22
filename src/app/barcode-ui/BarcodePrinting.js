import React,{ Component} from "react";
import "./Barcode.css";

import Barcode from 'react-barcode';

class BarcodePrinting extends Component{
    render () {
        // const { inputRef } = useBarcode({
        //     value: '1234567890123',
        //     options: {
        //       background: '#ccffff',
        //     }
        //   });
          
        return (
            <div className="App">
                <h1>react-barcodes</h1>
                {/* <svg ref={inputRef} /> */}
                <Barcode value="01232346782364" displayValue={false} />
            </div>

        )
    }
}

export default BarcodePrinting;

