import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import * as ApiHelper from '../../ApiHelper';

export default class AddProductWithCustomBarcode extends Component {
	state = {
		barcode: '',
		productName: '',
		productShortName: '',
		size: '',
		validations: {},
	};

	componentDidMount() {
		ApiHelper.getNextCustomBarcode()
			.then((json) => {
				if (json.code === 'success') {
					this.setState({
						barcode: json.data.customBarcode,
					});
				} else {					
					this.setState({
						productName: '',
						productShortName: '',
					});

					alert(json.message);
				}
			})
	}

	handleAllChange = (value) => {
        this.setState(value);
        this.validate(value);
	};

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

	handleSaveProduct = () => {
		const { barcode, productName, productShortName, size } = this.state;

		this.props.addOrUpdateProduct({
			barcode,
			productName,
			productShortName,
			size,
		});
	}

	resetForm = () => {
		this.setState({
			productName: '',
			productShortName: '',
		});
	};

	render () {
		return (
			<div className="row">
                <div className="col-md-12 stretch-card">
                    <div className="card card-body-container card-body-style">
                        <p className="p info-text">Used to add a product which does not have an existing barcode on it. Here we create a custom barcode.</p>

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
								disabled={true}
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
								id="productDetails-basic"
								label="Product Short Name"
								variant="outlined"
								value={this.state.productShortName}
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
