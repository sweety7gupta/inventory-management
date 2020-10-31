import React , { Component } from 'react';
import InventoryTabHeading from './InventoryTabHeading';
import InventoryForm from './InventoryForm';
import  './Inventory.css'

class InventoryCustomBarcode extends Component{
    render (){
        return (
            // <div>
                <div className="row">
                    <div className="col-md-8 grid-margin stretch-card">
                        <div className="card card-body-container card-body-style">
                            <InventoryTabHeading headerName="Custom Barcode"/>       

                            <InventoryForm/>
                        </div>
                    </div>
                 </div>
            //  </div>
   
        )
    }
}

export default InventoryCustomBarcode;