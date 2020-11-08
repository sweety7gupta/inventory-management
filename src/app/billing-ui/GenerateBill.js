import React,{ Component} from "react";
import { TextField, Button } from '@material-ui/core';
import ProductSearch from '../inventory-ui/ProductSearch';
import InputAdornment from '@material-ui/core/InputAdornment';
import './GenerateBill.css'

class GenerateBill extends Component{
   
    state ={
        value : "",
        barcode: "",
        productName: "",
        productDtls: "",
        mrpPrice:"",
        sellingPrice: "",
        noOfPack: "",
        validations: {},
        barcodeVisible: 'none',
    }

    handleAllChange = (value) => {
        this.setState(value);
        this.validate(value);
    }

    handleBillGenerate = (event) =>{
       
    };
    
    render () {
                
        return (         
            <div >
            <div className="col-lg-8 mx-auto">
            {/* <div className="col-md-3"> */}
                <div className="card card-body-container">
                    <div  className="text-field-container container-style">
                        <h4 className="card-title tab-heading">Generate Bill</h4>
                    </div>

                    <ProductSearch onProductSelect={this.handleProductSelection} />
            
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
                            size= "small"
                            fullWidth
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
                            size= "small"
                            fullWidth
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
                            size= "small"
                            fullWidth
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
                            size= "small"
                            fullWidth
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
                            size= "small"
                            fullWidth
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
                            size= "small"
                            fullWidth
                        />
                    </div>    
                                               
                    <div className="card-body">
                        <Button variant="contained" color="primary" onClick={this.handleBillGenerate}>
                            Add
                        </Button>
                        
                        <Button variant="contained" color="primary" onClick={this.handleBillGenerate}>
                            Generate
                        </Button>
                    </div>  
                    
                </div>
            </div>
        </div>
            
        // </div>
        )
    }
}

export default GenerateBill;
