import React , {Component} from 'react';

class InventoryTabHeading extends Component {
    state = {
        tabHeader: this.props.headerName
    }

    render (){
        return (
            <div>
                 <h4 className="card-title">{this.state.tabHeader}</h4>
            </div>
        )
    }
}

export default InventoryTabHeading;