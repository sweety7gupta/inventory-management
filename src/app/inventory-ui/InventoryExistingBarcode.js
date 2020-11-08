import React , { Component } from 'react';
import InventoryTabHeading from './InventoryTabHeading';
import ProductSearch from './ProductSearch';
import InventoryForm from './InventoryForm';
import  './Inventory.css'

class InventoryExistingBarcode extends Component {
    handleProductSelect = (barcode)=>{

    }
    render(){
        return(
            <div className="row">
                <div className="col-md-8 grid-margin stretch-card">
                    <div className="card card-body-container card-body-style">
                        <InventoryTabHeading headerName="Existing Barcode"/>                   
                    
                        <ProductSearch onProductSelect={this.handleProductSelect} />
                    
                        <InventoryForm />
                    </div>
                </div>
            </div>
        )
    }

}

export default InventoryExistingBarcode;