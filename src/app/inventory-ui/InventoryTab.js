import React ,{ Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


class InventoryTab extends Component {

    render (){
        return (
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
export default InventoryTab;