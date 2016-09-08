import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class SpecTrakDrawer extends React.Component
{
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  render() {
    return (
      <Drawer open={this.state.open}>
        <MenuItem>Specifications</MenuItem>
        <MenuItem>Orders</MenuItem>
      </Drawer>
    );
  }
}

export default SpecTrakDrawer;
