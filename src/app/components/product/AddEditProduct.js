import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AddProductWithExistingBarcode from './AddProductWithExistingBarcode';
import AddProductWithCustomBarcode from './AddProductWithCustomBarcode';
import  '../product.css';
import * as ApiHelper from '../../ApiHelper';

export default class AddEditProduct extends Component {

	state = {
		products: [],
	}

	componentDidMount() {
		ApiHelper.fetchProducts()
			.then((json) => {
				if (json.code === 'success') {
					this.setState({
						products: json.data
					});
				} else {
					alert('Failed to load products. Refresh page.');
				}
			});
	}

	addOrUpdateProduct = ({ barcode, productName, productShortName }) => {
		ApiHelper.saveProduct({ barcode, productName, productShortName })
			.then((json) => {
				if (json.code === 'success') {
					alert('Product saved successfully!');
					window.location.reload();
				} else {
					alert(json.message);
				}
			});
	};

	render() {
		return (
			<div className="row">
				<div className="col-md-3"></div>
				<div className="col-md-6">
					<Tabs>
						<TabList className="row tab-container">
							<Tab className="col-md-6 card-tab-style">Existing Barcode</Tab>
							<Tab className="col-md-6 card-tab-style">Custom Barcode</Tab>
						</TabList>

						<TabPanel>                        
							<AddProductWithExistingBarcode
								products={this.state.products}
								addOrUpdateProduct={this.addOrUpdateProduct}
							/>
						</TabPanel>
						<TabPanel>
							<AddProductWithCustomBarcode addOrUpdateProduct={this.addOrUpdateProduct} />
						</TabPanel>
					</Tabs>
				</div>
				<div className="col-md-3"></div>
			</div>
		);
	}
}
