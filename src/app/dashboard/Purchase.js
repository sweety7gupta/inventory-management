import React , {Component} from 'react';

export class Purchase extends Component {
    state = {
        totalBillsGenerated: this.props.totalBillCount
    };

    handlePurchaseClick = () => {
        this.setState({
            totalBillsGenerated: this.state.totalBillsGenerated + 1
        });
    };

    render(){
        return(
            <div>
                <button onClick={this.handlePurchaseClick}>Purchase</button>
                <span>Total bills generated: {this.state.totalBillsGenerated}</span>
            </div>
        );
    }
}
