import React, { Component } from 'react';

export default class PrintBillView extends Component {

	renderTotalRow = () => {
		const { billedProducts = [] } = this.props;
		let totalMRP = 0, totalPrice = 0, totalQuantity = 0;

		for (let i=0; i<billedProducts.length; i++) {
			const { mrp, sellingPrice, billedQuantity } = billedProducts[i];

			totalMRP += (mrp * billedQuantity);
			totalPrice += (sellingPrice * billedQuantity);
			totalQuantity += billedQuantity;
		}

		return (
			<tr className="product-row" style={{ fontWeight: 'bold' }}>
				<td className="col">Total</td>
				<td className="col">{totalQuantity}</td>
				<td className="col"></td>
				<td className="col">{totalPrice}</td>
			</tr>
		);
	};

	renderSavings = () => {
		const { billedProducts = [] } = this.props;
		let totalMRP = 0, totalPrice = 0;

		for (let i=0; i<billedProducts.length; i++) {
			const { mrp, sellingPrice, billedQuantity } = billedProducts[i];

			totalMRP += (mrp * billedQuantity);
			totalPrice += (sellingPrice * billedQuantity);
		}

		const savings = totalMRP - totalPrice;

		return (
			<div style={{ margin: '2rem 0.3rem', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>
				** You saved ₹{savings} on MRP **
			</div>
		)
	}

	render () {
		const { billedProducts = [] } = this.props;

		return (
			<div className="print" ref={this.props.printRef}>
				<div className="bill-receipt">
					<div className="heading">
						<div style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '28px' }}>Gupta Stores</div>
						<div style={{ lineHeight: '18px' }}>
							10D, Sura East Road, Beleghata,
							<br/>
							Near Jora Petrol Pump, Kolkata - 700010
						</div>
						<div style={{ lineHeight: '18px', marginTop: '4px' }}>(M): 89100794919</div>
						<hr className="solid-hr" />
					</div>

					<table width="100%">
						<thead>
							<tr className="product-heading product-row">
								<td className="col">Product</td>
								<td className="col">Qty</td>
								<td className="col">Rate</td>
								<td className="col">Value</td>
							</tr>
							<tr><td colSpan="4"><hr className="dashed-hr" /></td></tr>
						</thead>

						<tbody>
							{billedProducts.map((product) => (
								<tr className="product-row">
									<td className="col">{(product.productShortName || product.productName) + (product.size ? '-' + product.size: '')}</td>
									<td className="col">{product.billedQuantity}</td>
									<td className="col">{product.sellingPrice}</td>
									<td className="col">{product.sellingPrice * product.billedQuantity}</td>
								</tr>
							))}

							<tr><td colSpan="4"><hr className="dashed-hr" /></td></tr>

							{this.renderTotalRow()}

						</tbody>
					</table>

					<hr className="solid-hr" />

					{this.renderSavings()}
				</div>
			</div>
		);
	}
}
