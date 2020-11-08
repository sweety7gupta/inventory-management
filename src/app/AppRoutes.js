import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

//const Login = lazy(() => import('./login-ui/Login'));

const Purchase = lazy(() => import('./dashboard/Purchase'));

const InventoryEntry = lazy(() => import('./inventory-ui/InventoryEntry'));

const BarcodePrinting = lazy(() => import('./barcode-ui/BarcodePrinting'));

const BillGenerate = lazy(() => import('./billing-ui/GenerateBill'));

const Billing = lazy(() => import('./billing-ui/Billing'));


const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));


const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));



const Mdi = lazy(() => import('./icons/Mdi'));


const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));
const Lockscreen = lazy(() => import('./user-pages/Lockscreen'));

const BlankPage = lazy(() => import('./general-pages/BlankPage'));




class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />
          {/* <Route exact path="/login-ui" component={ Login } /> */}

          <Route exact path="/purchase" component={ Purchase } />
          <Route path="/inventory-ui/inventoryEntry" component={ InventoryEntry } />

          <Route path="/barcode-ui/barcodePrinting" component={ BarcodePrinting } />

          <Route path="/billing-ui/generateBill" component={ BillGenerate } />
          <Route path="/billing-ui/billing" component={ Billing } />
          
          <Route path="/basic-ui/buttons" component={ Buttons } />
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />
          <Route path="/basic-ui/typography" component={ Typography } />


          <Route path="/form-Elements/basic-elements" component={ BasicElements } />

          <Route path="/tables/basic-table" component={ BasicTable } />


          <Route path="/icons/mdi" component={ Mdi } />


          <Route path="/charts/chart-js" component={ ChartJs } />


          <Route path="/user-pages/login-1" component={ Login } />
          <Route path="/user-pages/register-1" component={ Register1 } />
          <Route path="/user-pages/lockscreen" component={ Lockscreen } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />

          <Route path="/general-pages/blank-page" component={ BlankPage } />


          {/* <Redirect to="/dashboard" /> */}
          <Redirect to="/user-pages/login-1" />

          
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;