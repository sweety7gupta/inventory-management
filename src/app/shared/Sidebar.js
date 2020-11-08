import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Username extends Component {
  state = {
    username: localStorage.getItem("username"),
  };

  render() {
    return (
      <span className="font-weight-bold mb-2">
        {/* <Trans>{this.state.username}</Trans> */}
        {this.state.username}
      </span>
    );
  }
}

class Sidebar extends Component {

  state = {

  };

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        //this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/inventory-ui', state: 'inventoryMenuOpen'},
       {path:'/barcode-ui', state: 'barcodeUiMenuOpen'},
      // {path:'/form-elements', state: 'formElementsMenuOpen'},
      // {path:'/tables', state: 'tablesMenuOpen'},
      // {path:'/maps', state: 'mapsMenuOpen'},
      // {path:'/icons', state: 'iconsMenuOpen'},
      // {path:'/charts', state: 'chartsMenuOpen'},
      // {path:'/user-pages', state: 'userPagesMenuOpen'},
      // {path:'/error-pages', state: 'errorPagesMenuOpen'},
      // {path:'/general-pages', state: 'generalPagesMenuOpen'},
      // {path:'/ecommerce', state: 'ecommercePagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="!#" className="nav-link" onClick={evt =>evt.preventDefault()}>
              <div className="nav-profile-image">
                <img src={ require("../../assets/images/faces/face1.jpg") } alt="profile" />
                <span className="login-status online"></span> {/* change to offline or busy as needed */}
              </div>
              <div className="nav-profile-text">
                <Username />                
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>
          <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title"><Trans>Dashboard</Trans></span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>

          <li className={ this.isPathActive('/inventory-ui') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/inventory-ui/inventoryEntry">
              <span className="menu-title"><Trans>Inventory</Trans></span>
              <i className="mdi mdi-database-plus menu-icon"></i>
            </Link>
          </li>

          

          <li className={ this.isPathActive('/barcode-ui') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/barcode-ui/barcodePrinting">
              <span className="menu-title"><Trans>Barcode</Trans></span>
              <i className="mdi mdi-barcode menu-icon"></i>
            </Link>
          </li>

          
          <li className={ this.isPathActive('/bill-ui') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/billing-ui/billing">
              <span className="menu-title"><Trans>Generate Bill</Trans></span>
              <i className="mdi mdi-barcode menu-icon"></i>
            </Link>
          </li>

          {/* <li className={ this.isPathActive('/barcode-ui') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.barcodeUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('barcodeUiMenuOpen') } data-toggle="collapse">
              <span className="menu-title"><Trans>Barcode</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-barcode menu-icon"></i>
            </div>
            <Collapse in={ this.state.barcodeUiMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/barcode-ui/barcodePrinting') ? 'nav-link active' : 'nav-link' } to="/barcode-ui/barcodePrinting"><Trans>Barcode Printing</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
           */}
         
         
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);