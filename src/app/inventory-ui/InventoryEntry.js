import React,{Component} from 'react';
import { TextField, Button } from '@material-ui/core';
import './inventory.css';
import InventoryTab from './InventoryTab';


class InventoryEntry extends Component {
   render() {
        return(
            <div>
                <InventoryTab/>
            </div>
        )
   }
}

export default InventoryEntry;