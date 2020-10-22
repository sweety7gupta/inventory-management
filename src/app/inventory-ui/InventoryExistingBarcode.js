import React , { Component } from 'react';
import InventoryTabHeading from './InventoryTabHeading';
import ProductSearch from './ProductSearch';
import InventoryForm from './InventoryForm';

class InventoryExistingBarcode extends Component {
    render(){
        return(
            <div>
                 <div className="row">
                    <div className="col-md-8 grid-margin stretch-card">
                        <div className="card card-body-container">
                            <InventoryTabHeading headerName="Existing Barcode"/>                   
                       
                            <ProductSearch  ></ProductSearch>
                        
                            <InventoryForm/>
                        </div>
                    </div>
                </div>
                    
               
            </div>
        )
    }

}

export default InventoryExistingBarcode;