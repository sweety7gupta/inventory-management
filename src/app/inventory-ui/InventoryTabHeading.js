import React , {Component} from 'react';
import './Inventory.css';

class InventoryTabHeading extends Component {
    state = {
        tabHeader: this.props.headerName
    }

    render (){
        return (
            <div>
                 <h4 className="card-title tab-heading">{this.state.tabHeader}</h4>
            </div>
        )
    }
}

export default InventoryTabHeading;