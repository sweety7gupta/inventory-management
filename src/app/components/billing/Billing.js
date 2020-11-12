import React, {Component} from 'react';
import { TextField, Button } from '@material-ui/core';
import '../../inventory-ui/Inventory.css';
import MaterialTable, { MTableBody } from 'material-table';
import { tableIcons } from '../../components/common/materialTableIcons';
import ProductSearch from '../../components/common/ProductSearch';
import * as ApiHelper from '../../ApiHelper';
import * as utils from '../../utils/util';

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
				title: 'MRP',
				field: 'mrp',
				type: 'numeric',
				cellStyle: { ...commonCellStyle, maxWidth: '80px' },
				editable: false,
			},
            {
				title: 'Selling Price',
				field: 'sellingPrice',
				type: 'numeric',
				cellStyle: { ...commonCellStyle, maxWidth: '140px' },
				editable: false,
			},
            {
				title: 'Quantity',
				field: 'billedQuantity',
				type: 'numeric',
				cellStyle: { ...commonCellStyle, maxWidth: '100px' },
			},
        ],
        submitDisabled: false,
    }

    componentDidMount() {
		utils.fetchProductsAndPrices()
			.then(data => {
				this.setState({ products: data });
			});
	}

    handleProductSelect = (value) => {
		if (value) {
			const { billedProducts } = this.state;
			const productAddedIndex = billedProducts.findIndex(bp => bp.barcode === value.barcode);
			const isProductAdded = productAddedIndex > -1;

			if (isProductAdded) { // update quantity if product already exists
				const currentQuantity = billedProducts[productAddedIndex].billedQuantity;
				const updatedRow = { ...value, billedQuantity: currentQuantity + 1 };

				const nBilledProducts = [ ...billedProducts ];
				nBilledProducts[productAddedIndex] = updatedRow;

				this.setState({ billedProducts: nBilledProducts });
			} else { // add product row
				this.setState(prevState => ({
					billedProducts: [ ...prevState.billedProducts, { ...value, billedQuantity: 1 } ],
				}));
			}
		}
    };

    validateRow = (newData = {}) => {
        const { billedProducts, currentProductName } = this.state;

        if (!billedProducts.find(p => p.barcode === newData.barcode)) {
            return `"${currentProductName}" does not exist`;
        }

        if (!newData.barcode) {
            return 'Please select a product';
        }

        if (!newData.mrp || newData.mrp <= 0) {
            return 'Please enter valid MRP';
        }

        if (!newData.purchasePrice || newData.purchasePrice <= 0) {
            return 'Please enter valid purchase price';
        }

        if (!newData.sellingPrice || newData.sellingPrice <= 0) {
            return 'Please enter valid selling price';
        }

        if (newData.sellingPrice > newData.purchasePrice) {
            return 'Selling price is greater than your purchase price';
        }

        if (!newData.quantity || newData.quantity <= 0) {
            return 'Quantity should be greater than zero';
        }

        return '';
    };

    handleRowAdd = (newData) => {
        const { billedProducts, currentProductName } = this.state;

        return new Promise((resolve, reject) => {
            if (this.lastRow && this.lastRow.barcode === newData.barcode) {
                reject();
                return;
            }

            const message = this.validateRow(newData);

            if (message) {
                alert(message);
                reject();
                return;
            }
            
            const newRow = { ...newData, productName: currentProductName };
            this.lastRow = newRow;

            setTimeout(() => {
                this.setState(prevState => ({
                    billedProducts: [ ...prevState.billedProducts, newRow ],
                }));

                resolve();
            });
        });
	}

	handleRowUpdate = (newData, oldData) => {
		const { billedProducts } = this.state;

		return new Promise((resolve, reject) => {
			if (newData.billedQuantity <= 0) {
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

    render() {
        const { billedProducts, columns, submitDisabled } = this.state;

        return (
            <div style={{ background: 'white' }}>
                <div style={{ marginBottom: '0', overflow: 'hidden' }}>
                    <MaterialTable
						components={{
							Body: props => {
								return billedProducts.length > 0 ? <MTableBody {...props} /> : null
							}
						}}
                        title="New Billing"
                        columns={columns}
                        data={billedProducts}
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
                        }}
                        icons={tableIcons}
                    />
                </div>

				<div className="total-row">
					<div className="total-heading">Total</div>
					<div className="total-mrp">250</div>
					<div className="total-sale">200</div>
					<div className="total-quantity">20</div>
				</div>

                <br/>

				<div className="card-body" style={{ width: '360px' }}>
					<ProductSearch
                        products={this.state.products}
                        onProductSelect={this.handleProductSelect}
                    />
				</div>

                <br/>

                <div className="card-body text-right">
                    <Button variant="contained" color="primary" onClick={this.handleSaveProduct} disabled={submitDisabled || billedProducts.length === 0}>
                        Confirm Order
                    </Button>

                    <Button variant="contained" color="default" onClick={this.resetForm} style={{ marginLeft: 16 }}>
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }
}

export default Billing;
