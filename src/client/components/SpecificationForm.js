import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

class SpecificationForm extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastRevisedDate: null
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLastRevisedDateChange = this.handleLastRevisedDateChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  };

  handleLastRevisedDateChange(e, d) {
    this.setState({lastRevisedDate: d})
  };

  render() {
    return (
      <Card style={this.props.style}>
        <CardHeader title="Specification Form" showExpandableButton={false} />
        <Divider />
        <CardText>
          Fill out the fields below carefully, and click the save button upon completion to store your entry.
          <form>
            <TextField hintText="EO-10359" floatingLabelText="Name" onChange={ this.handleNameChange } value={this.state.name} />
            <DatePicker hintText="Last Revised" floatingLabelText="Last Revised" value={this.state.lastRevisedDate} onChange={ this.handleLastRevisedDateChange } autoOk={true} />
            <RaisedButton label="Save" primary={true} fullWidth={true} style={ {marginTop:'2em'} } />
          </form>
        </CardText>
      </Card>
    );

    //<CardActions>
    //      <FlatButton label="Action1" />
    //      <FlatButton label="Action2" />
    //    </CardActions>
  }
}

export default SpecificationForm;
