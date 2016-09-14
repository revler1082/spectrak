import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
//import RefreshIndicator from 'material-ui/RefreshIndicator';
import LinearProgress from 'material-ui/LinearProgress';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';
import $ from 'jquery';

class SpecificationForm extends React.Component
{
  constructor(props) {
    super(props);
    this.initialState = {
      id: '',
      type: '',
      documentNumber: '',
      title: '',
      issueDate: null,
      sectionCode: '',
      dwg: false,
      citationNumber: '',
      regulatedBy: '',
      description: '',
      regulations: [{ id: 'test', name: 'test' }],
      availableRegulations: [],
      snackbarOpen: false,
      saving: false,
      disabled: false
    };

    this.state = $.extend({}, this.initialState);

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDocumentNumberChange = this.handleDocumentNumberChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleIssueDateChange = this.handleIssueDateChange.bind(this);
    this.handleSectionCodeChange = this.handleSectionCodeChange.bind(this);
    this.handleDwgToggle = this.handleDwgToggle.bind(this);
    this.handleCitationNumberChange = this.handleCitationNumberChange.bind(this);
    this.handleRegulatedByChange = this.handleRegulatedByChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAvailableRegulationsUpdate = this.handleAvailableRegulationsUpdate.bind(this);
    this.handleAvailableRegulationsNewRequest = this.handleAvailableRegulationsNewRequest.bind(this);
    this.handleRegulationRequestDelete = this.handleRegulationRequestDelete.bind(this);

    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
  }

  handleTypeChange(e, key, payload) {
    this.setState({ type: payload });
  };

  handleDocumentNumberChange(e) {
    this.setState({ documentNumber: e.target.value });
  };

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  };

  handleIssueDateChange(e, d) {
    this.setState({ issueDate: d });
  };

  handleSectionCodeChange(e) {
    this.setState({ sectionCode: e.target.value });
  };

  handleDwgToggle(e, v) {
    this.setState({ dwg: v });
  };

  handleCitationNumberChange(e) {
    this.setState({ citationNumber: e.target.value });
  };

  handleRegulatedByChange(e, key, payload) {
    this.setState({ regulatedBy: payload });
  };

  handleAvailableRegulationsUpdate(e, v) {
    this.setState({
      availableRegulations: [
          { id: e, name: e },
          { id: e+e, name: e+e },
          { id: e+e+e, name: e+e+e }
      ]
    });
  };

  handleAvailableRegulationsNewRequest(chosenRequest, index) {
    var updatedRegulations = this.state.regulations;
    if(index < 0) {
      updatedRegulations.push({name: chosenRequest });
    } else {
      updatedRegulations.push(chosenRequest);
    }

    this.setState({ regulations: updatedRegulations });
  };

  handleRegulationRequestDelete(key) {
    this.regulations = this.state.regulations;
    const regulationToDelete = this.regulations.map((reg) => reg.id).indexOf(key)
    this.regulations.splice(regulationToDelete, 1);
    this.setState({ regulation: this.regulations });
  };

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  };

  handleSaveButtonClick(e) {
    e.preventDefault();
    this.setState({saving: true});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      //type: this.state.id === '' ? 'POST' : 'PUT',
      type: 'POST',
      data: {
        id: this.state.id,
        type: this.state.type,
        documentNumber: this.state.documentNumber,
        title: this.state.title,
        issueDate: this.state.issueDate,
        sectionCode: this.state.sectionCode,
        hasDwg: this.state.hasDwg,
        citationNumber: this.state.citationNumber,
        regulatedBy: this.state.regulatedBy,
        description: this.state.description
      },
      success: function(data) {
        this.setState({
          saving: false
        });

        if(!data.errors) {
          this.state = $.extend({}, this.initialState);
          this.setState({ snackbarOpen: true });
        } else {
          var errMsg = '';
          data.errors.forEach(function(e) {
            errMsg += e.path + ' - ' + e.message + '\n';
          });
          alert(errMsg);
          this.setState({processing:false});
        }
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ saving: false });
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }

  handleSnackbarRequestClose(e) {
    this.setState({snackbarOpen: false});
  }

  render() {

    const availableRegulationsDataSourceConfig = { text: 'name', value: 'id' };

    return (
      <Card style={this.props.style}>
        <CardHeader title="Specification Form" showExpandableButton={false} />
        <Divider />
        <CardText>
          Fill out the fields below carefully, and click the save button upon completion to store your entry.
          <form>
            <SelectField value={this.state.type} onChange={this.handleTypeChange} floatingLabelText="Type">
              <MenuItem value="EO" primaryText="EO" />
              <MenuItem value="EOP" primaryText="EOP" />
              <MenuItem value="B" primaryText="B" />
            </SelectField>
            <TextField id="documentNumber" hintText="10359" floatingLabelText="Document Number" onChange={ this.handleDocumentNumberChange } value={this.state.documentNumber} />
            <TextField id="title" hintText="10359" floatingLabelText="Title" onChange={ this.handleTitleChange } value={this.state.title} />
            <DatePicker id="issueDate" hintText="Issue Date" floatingLabelText="Issue Date" value={this.state.issueDate} onChange={ this.handleIssueDateChange } autoOk={true} />
            <TextField id="sectionCode" hintText="123" floatingLabelText="Section Code" value={this.state.sectionCode} onChange={this.handleSectionCodeChange } />
            <Toggle id="dwg" label="DWG?" value={this.state.dwg} onToggle={this.handleDwgToggle} style={{marginTop:16}} />
            <TextField id="citationNumber" hintText="04-M-0159" floatingLabelText="Citation Number" value={this.state.citationNumber} onChange={this.handleCitationNumberChange } />
            <SelectField value={this.state.regulatedBy} onChange={this.handleRegulatedByChange} floatingLabelText="Regulated By">
              <MenuItem value="PSC" primaryText="PSC" />
              <MenuItem value="NESC" primaryText="NESC" />
            </SelectField>
            <TextField hintText="A short description of what the regulation is about" floatingLabelText="Description" multiLine={true} rows={2} value={this.state.description} onChange={this.handleDescriptionChange} />
            <AutoComplete hintText="reg name" dataSource={this.state.availableRegulations} onUpdateInput={this.handleAvailableRegulationsUpdate} onNewRequest={this.handleAvailableRegulationsNewRequest} floatingLabelText="Add Associated Regulation" dataSourceConfig={availableRegulationsDataSourceConfig} />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {
              this.state.regulations.map(function(currentValue, index) {
                return(
                  <Chip key={currentValue.id} style={{ margin: 4 }} onRequestDelete={  () => this.handleRegulationRequestDelete(currentValue.id) }>
                    {currentValue.name}
                  </Chip>)
              }, this)
            }
            </div>
            <RaisedButton label="Save" primary={true} fullWidth={true} style={ {marginTop:'2em'} } onTouchTap={this.handleSaveButtonClick} disabled={this.state.saving} />
            <LinearProgress mode="indeterminate" style={{display: this.state.saving ? 'block' : 'none' }} />
            <Snackbar open={this.state.snackbarOpen} message="Specification saved" autoHideDuration={4000} onRequestClose={this.handleSnackbarRequestClose} />
          </form>
        </CardText>
      </Card>
    );

  }
}

export default SpecificationForm;
