import React,{Component} from 'react';
import { TextField, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import './inventory.css';

class InventoryEntry extends Component {
    state = {
        value: "",
        barcode: "",
        productName: "",
        productDtls: "",
        sellerName: "",
        purchasePrice: "",
        mrpPrice:"",
        sellingPrice: "",
        noOfPack: "",

        validations: {},
    }

    validate = (value) => {
        const keys = Object.keys(value);
        const currentKey = keys[0];

        let validations = { ...this.state.validations };

        if (currentKey === 'barcode') {
            if (value.barcode.startsWith('0')) {
                validations.barcode = 'Barcode should not start with 0';
            }
            else if (value.barcode.length < 13 || value.barcode.length > 13 ) {
                validations.barcode = 'Invalid Barcode!!!';
            }  else {
                validations.barcode = '';
            }
        } else if (currentKey === 'productName') {
            if (value.productName.length <= 2) {
                validations.productName = 'Product name should be minimum of two chars'
            } else {
                validations.productName = '';
            }
        }

        this.setState({ validations });
    };
    
    handleAllChange = (value) => {
        this.setState(value);
        this.validate(value);
    }

   
    addInventory = (event) => {
        const requestObject = {
            barcode: this.state.barcode,
            productName: this.state.productName,
            productDtls: this.state.productDtls,
            mfgDate: this.state.mfgDate,
            purchasePrice: this.state.purchasePrice,
            mrpPrice: this.state.mrpPrice,
            sellingPrice: this.state.sellingPrice,
            noOfPack: this.state.noOfPack,
            sellerName: this.state.sellerName
        };

        console.log(requestObject);
    }

    render() {
        return (
            
            <div>
                
                <div className="row">
                    <div className="col-md-8 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Inventory Entry</h4>
                            </div>
                            <div className="card-body text-field-container">                        
                                <TextField
                                    id="barcode-basic"
                                    label="Barcode"
                                    variant="outlined"
                                    error={!!this.state.validations.barcode}
                                    helperText={this.state.validations.barcode}
                                    value={this.state.barcode}
                                    onChange={(event) => this.handleAllChange({ barcode: event.target.value })}
                                    className="text-field"
                                    required
                                    inputProps={{ maxLength: 13 }}
                                 />
                             </div>
                             <div className="card-body text-field-container">  
                                <TextField
                                    id="productName-basic"
                                    label="Product Name"
                                    variant="outlined"
                                    error={!!this.state.validations.productName}
                                    helperText={this.state.validations.productName}
                                    value={this.state.productName}
                                    onChange={(event) => this.handleAllChange({ productName: event.target.value })}                                    
                                    className="text-field"
                                />
                             </div>    
                             <div className="card-body text-field-container">  
                                <TextField
                                    id="productDetails-basic"
                                    label="Product Details"
                                    variant="outlined"
                                    value={this.state.productDtls}
                                    onChange={(event) => this.handleAllChange({ productDtls: event.target.value })}
                                    className="text-field"
                                />
                            </div>    
                            <div className="card-body text-field-container">  
                                <TextField
                                    id="mfgDate-basic"
                                    label="Manufaturing Date"
                                    variant="outlined"
                                    type="date"
                                    defaultValue={new Date()}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    className="text-field"
                                />
                            </div> 
                            <div className="card-body text-field-container">  
                                <TextField
                                    id="expDate-basic"
                                    label="Expiry Date"
                                    variant="outlined"
                                    type="date"
                                    defaultValue={new Date()}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    className="text-field"
                                />
                            </div> 
                            <div className="card-body text-field-container">                        
                                <TextField
                                    id="purchase-basic"
                                    label="Purchase Price"
                                    variant="outlined"
                                    type="number"
                                    error={false}
                                    helperText={''}
                                    value={this.state.purchasePrice}
                                    onChange={(event) => this.handleAllChange({ purchasePrice: event.target.value }) }
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                    className="text-field"
                                />
                            </div>
                            <div className="card-body text-field-container">                        
                                <TextField
                                    id="mrp-basic"
                                    label="MRP Price"
                                    variant="outlined"
                                    type="number"
                                    error={false}
                                    helperText={''}
                                    value={this.state.mrpPrice}
                                    onChange={(event) => this.handleAllChange({ mrpPrice: event.target.value })}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                     }}
                                     className="text-field"
                                />
                            </div>
                            <div className="card-body text-field-container">  
                                <TextField
                                    id="selling-basic"
                                    label="Selling Price"
                                    variant="outlined"
                                    type="number"
                                    error={false}
                                    helperText={''}
                                    value={this.state.sellingPrice}
                                    onChange={(event) => this.handleAllChange({ sellingPrice : event.target.value })}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                    className="text-field"
                                />
                            </div>    
                            <div className="card-body text-field-container">  
                                <TextField
                                    id="packing-basic"
                                    label="No Of Pack"
                                    variant="outlined"
                                    type="number"
                                    error={false}
                                    helperText={''}
                                    value={this.state.noOfPack}
                                    onChange={(event) => this.handleAllChange({ noOfPack : event.target.value })}
                                    className="text-field"
                                />
                            </div>    
                            <div className="card-body">
                                <Button variant="contained" color="primary" onClick={this.addInventory}>
                                    Submit
                                </Button>
                            </div>   
                
                        </div>  
                    </div>  
                </div>
            </div>
   
        )
    }
}

export default InventoryEntry;