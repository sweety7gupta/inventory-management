import React, { Component } from 'react';
import ProductSearch from '../common/ProductSearch';
import { TextField, Button } from '@material-ui/core';

const formInitialState = {
	barcode: '',
	productName: '',
	productShortName: '',
	sie: '',
	searchValue: '',
	validations: {},
};

export default class AddProductWithExistingBarcode extends Component {
	state = formInitialState;

	handleProductSelect = (value) => {
		if (value) {
			this.setState({
				barcode: value.barcode,
				productName: value.productName,
				productShortName: value.productShortName,
				size: value.size,
			});
		} else {
			this.resetForm();
		}
	};

	handleAllChange = (value) => {
		this.setState(value);
		this.validate(value);
	};

	handleSaveProduct = () => {
		const { barcode, productName, productShortName, size } = this.state;

		this.props.addOrUpdateProduct({
			barcode,
			productName,
			productShortName,
			size,
		});
	}

	validate = (value) => {
        const keys = Object.keys(value);
        const currentKey = keys[0];

        let validations = { ...this.state.validations };

        if (currentKey === 'barcode') {
            if (value.barcode.startsWith('0')) {
                validations.barcode = 'Barcode should not start with 0';
            }
            else if (value.barcode.length < 6 ) {
                validations.barcode = 'Invalid Barcode.';
            }  else {
                validations.barcode = '';
            }
        } else if (currentKey === 'productName') {
            if (value.productName.length <= 2) {
                validations.productName = 'Product name should be minimum of two chars'
            } else {
                validations.productName = '';
            }
		} else if (currentKey === 'size') {
            if (value.size.length <= 1) {
                validations.size = 'Enter valid weight / volumne / quantity';
            } else {
                validations.size = '';
            }
        }
		

        this.setState({ validations });
	};
	
	resetForm = () => {
		this.setState(formInitialState);
	};

	render () {
		return (
			<div className="row">
                <div className="col-md-12 stretch-card">
                    <div className="card card-body-container card-body-style">
                        <p className="p info-text">Used to add a product which has an existing barcode on it.</p>
                    
                        <ProductSearch
							products={this.props.products}
							onProductSelect={this.handleProductSelect}
						/>

						<hr style={{ margin: '1rem 1.5rem'}} />

						<div className="card-body text-field-container">
							<TextField
								autoFocus
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
							/>
						</div>

						<div className="card-body text-field-container">  
							<TextField
								id="productShortName-basic"
								label="Product Short Name"
								variant="outlined"
								value={this.state.productShortName}
								error={!!this.state.validations.productShortName}
								helperText={this.state.validations.productShortName}
								onChange={(event) => this.handleAllChange({ productShortName: event.target.value })}
								className="text-field"
								size= "small"
							/>
						</div>

						<div className="card-body text-field-container">
							<TextField
								id="size-basic"
								label="Weight / Volume / Quantity"
								variant="outlined"
								value={this.state.size}
								error={!!this.state.validations.size}
								helperText={this.state.validations.size}
								onChange={(event) => this.handleAllChange({ size: event.target.value })}
								className="text-field"
								size= "small"
							/>
						</div>

						<div className="card-body text-right">
							<Button variant="contained" color="primary" onClick={this.handleSaveProduct}>
								Save Product
							</Button>

							<Button variant="contained" color="default" onClick={this.resetForm} style={{ marginLeft: 16 }}>
								Cancel
							</Button>
						</div>
                    </div>
                </div>
            </div>
		)
	}
}
