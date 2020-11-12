import React, {Component} from 'react';
import { TextField, Button } from '@material-ui/core';
import './Inventory.css';
import MaterialTable, { MTableEditField } from 'material-table';
import { tableIcons } from '../components/common/materialTableIcons';
import ProductSearch from '../components/common/ProductSearch';
import * as ApiHelper from '../ApiHelper';
import * as utils from '../utils/util';

const commonCellStyle = { padding: '0 24px' };

class InventoryEntry extends Component {
    lastRow = null;

    state = {
        products: [],
        currentBarcode: '',
        currentProductName: '',
        inventoryProducts: [],
        columns: [
            {
                title: 'Barcode',
                field: 'barcode',
                cellStyle: { padding: '0 24px', width: '360px' },
                editComponent: props => (
                    <ProductSearch
                        products={this.state.products}
                        onProductSelect={(value) => this.handleProductSelect(props, value)}
                    />
                ),
            },
            {
                title: 'Product Name',
                field: 'productName',
                cellStyle: commonCellStyle,
                editable: false,
                cellStyle: { padding: '0 24px', width: '300px' },
            },
            {
                title: 'W/V/Q',
                field: 'size',
                cellStyle: commonCellStyle,
            },
            { title: 'MRP', field: 'mrp', type: 'numeric', cellStyle: commonCellStyle },
            { title: 'Purchase Price', field: 'purchasePrice', type: 'numeric', cellStyle: commonCellStyle },
            { title: 'Selling Price', field: 'sellingPrice', type: 'numeric', cellStyle: commonCellStyle },
            { title: 'Quantity', field: 'quantity', type: 'numeric', cellStyle: commonCellStyle },
        ],
        submitDisabled: false,
    }

    componentDidMount() {
        utils.fetchProductsAndPrices()
            .then((data) => {
                this.setState({ products: data });
            });
	}

    handleProductSelect = (props, value) => {
        const { barcode, productName } = value || {};
        props.onChange(barcode);
        props.onRowDataChange(value);
        this.setState({
            currentBarcode: barcode,
            currentProductName: productName,
        });
    };

    validateRow = (newData = {}) => {
        const { inventoryProducts, currentProductName } = this.state;

        if (inventoryProducts.find(p => p.barcode === newData.barcode)) {
            return `"${currentProductName}" already added!`;
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

        if (newData.sellingPrice < newData.purchasePrice) {
            return 'Selling price is less than your purchase price';
        }

        if (!newData.quantity || newData.quantity <= 0) {
            return 'Quantity should be greater than zero';
        }

        return '';
    };

    handleRowAdd = (newData) => {
        const { inventoryProducts, currentProductName } = this.state;

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
                    inventoryProducts: [ ...prevState.inventoryProducts, newRow ],
                }));

                resolve();
            });
        });
    }

    handleRowDelete = oldData => {
        const { inventoryProducts } = this.state;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const dataDelete = [ ...inventoryProducts ];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                this.setState({
                    inventoryProducts: [ ...dataDelete ],
                });

                resolve();
            }, 1000)
        });
    }

    handleSaveProduct = () => {
        const { inventoryProducts, submitDisabled } = this.state;

        if (submitDisabled) {
            return;
        }

        this.setState({ submitDisabled: true });

        if (!inventoryProducts || inventoryProducts.length === 0) {
            alert('Please add a few products to inventory.');
            this.setState({ submitDisabled: false });
            return;
        }

        ApiHelper.addToInventory(inventoryProducts)
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
    }

    render() {
        const { inventoryProducts, columns, submitDisabled } = this.state;

        return (
            <div style={{ background: 'white' }}>
                <div style={{ marginBottom: '0', overflow: 'hidden' }}>
                    <MaterialTable
                        title="Add to Inventory"
                        columns={columns}
                        data={inventoryProducts}
                        editable={{
                            onRowAdd: (newData) => this.handleRowAdd(newData),
                            onRowDelete: this.handleRowDelete,
                        }}
                        options={{
                            search: false,
                            paging: false,
                            sorting: false,
                            actionsColumnIndex: columns.length,
                            headerStyle: { textAlign: 'left', padding: '0 24px' },
                        }}
                        icons={tableIcons}
                    />
                </div>

                <br/>

                <div className="card-body text-right">
                    <Button variant="contained" color="primary" onClick={this.handleSaveProduct} disabled={submitDisabled || inventoryProducts.length === 0}>
                        Save Inventory
                    </Button>

                    <Button variant="contained" color="default" onClick={this.resetForm} style={{ marginLeft: 16 }}>
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }
}

export default InventoryEntry;
