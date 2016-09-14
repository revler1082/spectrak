import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SpecTrakDrawer from './SpecTrakDrawer'; // Our custom react component
import SpecificationForm from './SpecificationForm'; // Our custom react component
import config from '../../server/config';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
//<SpecTrakDrawer />
//<div style={ { paddingTop: '64px', minHeight: '400px', paddingLeft: '256px' } }>
//  <div style={ { margin: '48px 72px' } }>
//    <SpecificationForm />
//  </div>
//</div>
render(
  <MuiThemeProvider muiTheme={getMuiTheme({})}>
    <div style={ { marginLeft:'auto', marginRight:'auto', width: '40em', marginTop:'4em', marginBottom: '4em', boxShadow: '0 2em 4em 0 rgba(0, 0, 0, 0.2), 0 4em 8em 0 rgba(0, 0, 0, 0.19)' } }>
      <SpecificationForm url={config.siteRoot + "api/1/specifications"} />
    </div>
  </MuiThemeProvider>,
  document.getElementById('app')
);
