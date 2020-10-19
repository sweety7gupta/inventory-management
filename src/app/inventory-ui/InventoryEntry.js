import React,{Component} from 'react';
import { TextField, Button } from '@material-ui/core';
import './inventory.css';
import InventoryTab from './InventoryTab';


class InventoryEntry extends Component {
   render() {
        return(
            <div>
                <Tabs className="col-md-12">
                    <TabList>
                        <Tab>Exsisting Barcode</Tab>
                        <Tab>Custom Barcode</Tab>
                    </TabList>
                
                    <TabPanel>                        
                        <InventoryForm headerName={" "}></InventoryForm>
                    </TabPanel>
                    <TabPanel>
                        <InventoryForm headerName={"Custom Barcode"}></InventoryForm>
                    </TabPanel>
                </Tabs>
               
            </div>
        )
   }
}

export default InventoryEntry;