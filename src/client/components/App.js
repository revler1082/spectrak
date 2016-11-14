import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SpecTrakDrawer from './SpecTrakDrawer'; // Our custom react component
import SpecificationForm from './SpecificationForm'; // Our custom react component
import SpecificationsTable from './SpecificationsTable';
import configs from '../../server/config';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

var config = configs["development"];

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component
{
  constructor(props) {
    super(props);
    this.initialState = { };
    this.state = $.extend({}, this.initialState);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme({})}>
        <div>
          <AppBar title="SpecTrak - SPEAR" titleStyle={ { cursor: 'pointer' } } iconStyleLeft={ { display: 'none' } } onTitleTouchTap={ () => browserHistory.push(config.express.siteRoot) } />
          <hr style={{ color: '#cccccc' }} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }

};

/**

*/
class SpecificationFormWrapper extends SpecificationForm
{
  constructor(props) {
    super(props);
    
    this.onSave = this.onSave.bind(this);
  }
  
  onSave(e) {
    this.props.history.push(config.express.siteRoot);
  }

  //<div style={ { marginLeft:'auto', marginRight:'auto', width: '40em', marginTop:'4em', marginBottom: '4em', boxShadow: '0 2em 4em 0 rgba(0, 0, 0, 0.2), 0 4em 8em 0 rgba(0, 0, 0, 0.19)' } }>
  //  <Link to={ config.express.siteRoot }><RaisedButton label="Back to Specifications" fullWidth={true} secondary={true} /></Link>
  //</div>
  render() {
    return (
      <SpecificationForm id={this.props.params.id} getUrl={config.express.siteRoot + "api/1/specifications"} postUrl={config.express.siteRoot + "api/1/specifications"} regulationsUrl={config.express.siteRoot + 'api/1/regulations'} onSave={this.onSave}  />
    );
  }
};

/**
  main()
*/
render(
  <Router history={browserHistory}>
    <Route path={ config.express.siteRoot + "" } component={App}>
      <IndexRoute component={SpecificationsTable} />
      <Route path={ config.express.siteRoot + "specifications/new"} component={SpecificationFormWrapper} />
      <Route path={ config.express.siteRoot + "specifications/:id/update"} component={SpecificationFormWrapper} />
    </Route>
  </Router>,
  //<App />,
  document.getElementById('app')
);
