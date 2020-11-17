import React, {Component} from 'react';
import { TextField, Button } from '@material-ui/core';
import '../../inventory-ui/Inventory.css';
import MaterialTable, { MTableBody } from 'material-table';
import { tableIcons } from '../../components/common/materialTableIcons';
import ProductSearch from '../../components/common/ProductSearch';
import * as ApiHelper from '../../ApiHelper';
import * as utils from '../../utils/util';
import PrintBillView from './PrintBillView';

const commonCellStyle = { padding: '0 24px' };

class Billing extends Component {
    lastRow = null;

    state = {
        products: [],
        currentProductName: '',
        billedProducts: [],
        columns: [
            {
                title: 'Barcode',
                field: 'barcode',
				cellStyle: { padding: '0 24px', width: '360px' },
				editable: false,
            },
            {
                title: 'Product Name',
                field: 'productName',
                cellStyle: commonCellStyle,
                cellStyle: { padding: '0 24px', width: '300px' },
                editable: false,
			},
			{
                title: 'W/V/Q',
                field: 'size',
                cellStyle: commonCellStyle,
                cellStyle: { padding: '0 24px', width: '80px' },
                editable: false,
            },
            {
				title: 'MRP',
				field: 'mrp',
				type: 'numeric',
				cellStyle: { ...commonCellStyle, width: '80px' },
				editable: false,
			},
            {
				title: 'Price',
				field: 'sellingPrice',
				type: 'numeric',
				cellStyle: { ...commonCellStyle, width: '140px' },
				editable: false,
			},
            {
				title: 'Quantity',
				field: 'billedQuantity',
				type: 'numeric',
				cellStyle: { ...commonCellStyle, width: '100px' },
			},
        ],
		submitDisabled: false,
		barcode: '',
    }

    componentDidMount() {
		utils.fetchProductsAndPrices()
			.then(data => {
				this.setState({ products: data });
			});

		setTimeout(() => {
			this.billingTable && this.billingTable.setState({ showAddRow: true });
		}, 3000);
	}

    handleProductSelect = (value) => {
		if (value) {
			const { products } = this.state;
			const validProduct = products.find(p => p.barcode === value.barcode);

			if (validProduct) {
				this.addProductForBilling(validProduct);
			} else {
				alert('Invalid barcode');
			}
		}
	};
	
	addProductForBilling = (product) => {
		const { billedProducts } = this.state;

		const productAddedIndex = billedProducts.findIndex(bp => bp.barcode === product.barcode);
		const isProductAdded = productAddedIndex > -1;

		if (!product.quantity || (isProductAdded && product.quantity < (billedProducts[productAddedIndex].billedQuantity + 1))) {
			alert(`"${product.productName} ${product.size}" quantity available: ${product.quantity}`);
			return;
		}

		if (isProductAdded) { // update quantity if product already exists
			const currentQuantity = billedProducts[productAddedIndex].billedQuantity;
			const updatedRow = { ...product, billedQuantity: currentQuantity + 1 };

			const nBilledProducts = [ ...billedProducts ];
			nBilledProducts[productAddedIndex] = updatedRow;

			this.setState({ billedProducts: nBilledProducts });
		} else { // add product row
			this.setState(prevState => ({
				billedProducts: [ ...prevState.billedProducts, { ...product, billedQuantity: 1 } ],
			}));
		}
	}

	handleRowUpdate = (newData, oldData) => {
		const { products, billedProducts } = this.state;
		const product = products.find(p => p.barcode === newData.barcode);

		return new Promise((resolve, reject) => {
			if (newData.billedQuantity <= 0) {
				alert("Invalid quantity");
				reject();
				return;
			}

			if (newData.billedQuantity > product.quantity) {
				alert(`"${product.productName}" not in stock`);
				reject();
				return;
			}

			setTimeout(() => {
				const dataUpdate = [...billedProducts];
				const index = oldData.tableData.id;
				dataUpdate[index] = newData;
				
				this.setState({ billedProducts: dataUpdate });

				resolve();
			});
		});
	};

    handleRowDelete = oldData => {
        const { billedProducts } = this.state;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const dataDelete = [ ...billedProducts ];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                this.setState({
                    billedProducts: [ ...dataDelete ],
                });

                resolve();
            }, 1000)
        });
	}
	
	handleBarcodeInputChange = (event) => {
		const value = event.target.value;
		const { products } = this.state;

		const product = products.find(p => p.barcode === value);

		if (product) {
			this.addProductForBilling(product);
			setTimeout(() => {
				this.setState({ barcode: '' });
			}, 1000);
		} else {
			this.setState({ barcode: value });
		}
	};

    handleSaveProduct = () => {
        const { billedProducts, submitDisabled } = this.state;

        if (submitDisabled) {
            return;
        }

        this.setState({ submitDisabled: true });

        if (!billedProducts || billedProducts.length === 0) {
            alert('Please add a few products to inventory.');
            this.setState({ submitDisabled: false });
            return;
        }

        ApiHelper.addToInventory(billedProducts)
            .then((json) => {
                if (json.code === 'success') {
                    alert('Inventory added successfully!');
                    window.location.reload();
                } else {
                    alert(json.message || 'Something went wrong. Please try again!');
                    this.setState({ submitDisabled: false });
                }
            })
            .catch(() => {
                alert('Something went wrong. Please try again!');
                this.setState({ submitDisabled: false });
            });
    };

    resetForm = () => {
        if (window.confirm('Are you sure you want to discard?')) {
            window.location.reload();
        }
	};

	getBillingProductsData = () => {
		const { billedProducts } = this.state;
		let totalMRP = 0, totalPrice = 0, totalQuantity = 0;

		for (let i=0; i<billedProducts.length; i++) {
			const { mrp, sellingPrice, billedQuantity } = billedProducts[i];

			totalMRP += (mrp * billedQuantity);
			totalPrice += (sellingPrice * billedQuantity);
			totalQuantity += billedQuantity;
		}

		if (billedProducts.length > 0) {
			return [ ...billedProducts, { barcode: 'Total', mrp: totalMRP, sellingPrice: totalPrice, billedQuantity: totalQuantity } ];
		}

		return billedProducts;
	};

	handlePrintBill = () => {
		document.body.style.height = (this.printRef.clientHeight + 160) + 'px';
		window.print();
	};

    render() {
        const { billedProducts, columns, submitDisabled } = this.state;

        return (
			<React.Fragment>
				<div className="no-print" style={{ background: 'white' }}>
					<div style={{ marginBottom: '0', overflow: 'hidden', position: 'relative' }}>
						<MaterialTable
							components={{
								Body: props => {
									return billedProducts.length > 0 ? <MTableBody {...props} /> : null
								}
							}}
							title="New Billing"
							columns={columns}
							data={this.getBillingProductsData()}
							editable={{
								onRowUpdate: this.handleRowUpdate,
								onRowDelete: this.handleRowDelete,
							}}
							options={{
								search: false,
								paging: false,
								sorting: false,
								actionsColumnIndex: columns.length,
								headerStyle: { padding: '0 24px' },
								rowStyle: (rowData, index) => ({
									fontWeight: (index === billedProducts.length ? 'bold' : 'normal'),
									background: (index === billedProducts.length ? '#eaeaea' : 'white'),
								})
							}}
							icons={tableIcons}
							innerRef={ref => this.billingTable = ref}
						/>

						{billedProducts.length > 0 && (
							<div style={{ position: 'absolute', bottom: '1px', right: 0, background: '#eaeaea', width: 120, height: 48 }}></div>
						)}
					</div>

					<br/>

					<div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '24px' }}>
						<div className="card-body text-field-container" style={{ maxWidth: '300px' }}>
							<TextField
								autoFocus={true}
								id="barcode-basic"
								label="Barcode"
								variant="outlined"
								value={this.state.barcode}
								onChange={this.handleBarcodeInputChange}
								className="text-field"
								required
								inputProps={{ maxLength: 13 }}
								size= "small"
							/>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
							Manual Product Search:&nbsp;&nbsp;
							<div style={{ width: '360px' }}>
								<ProductSearch
									products={this.state.products}
									onProductSelect={this.handleProductSelect}
								/>
							</div>
						</div>
					</div>

					<br/>

					<div className="card-body" style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div className="print-bill">
							<Button variant="contained" color="primary" onClick={this.handlePrintBill} disabled={billedProducts.length === 0}>
								Print Bill
							</Button>
						</div>
						<div>
							<Button variant="contained" color="primary" onClick={this.handleSaveProduct} disabled={submitDisabled || billedProducts.length === 0}>
								Confirm Order
							</Button>

							<Button variant="contained" color="default" onClick={this.resetForm} style={{ marginLeft: 16 }}>
								Cancel
							</Button>
						</div>
					</div>
				</div>

				<PrintBillView billedProducts={billedProducts} printRef={ref => this.printRef = ref} />
			</React.Fragment>
        );
    }
}

export default Billing;
