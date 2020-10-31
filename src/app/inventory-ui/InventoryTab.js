import React ,{ Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import InventoryExistingBarcode from './InventoryExistingBarcode';
import InventoryCustomBarcode from './InventoryCustomBarcode';
import  './Inventory.css'

class InventoryTab extends Component {

    render (){
        return (
            <div >
                <Tabs > 
                    <TabList className=" row tab-container">
                        <div className="col-md-2"></div>
                        <Tab  className="col-md-4 card-tab-style" style={{ marginRight: '-9px', }}>Existing Barcode</Tab>
                        <Tab className="col-md-4 card-tab-style">Custom Barcode</Tab>
                        <div className="col-md-2"></div>
                    </TabList>
                
                    <TabPanel>                        
                        <InventoryExistingBarcode/>
                    </TabPanel>
                    <TabPanel>
                        <InventoryCustomBarcode/>
                        {/* <InventoryForm headerName={"Custom Barcode"}></InventoryForm> */}
                    </TabPanel>
                </Tabs>
           
        </div>
   
            
        )
    }
}
export default InventoryTab;
