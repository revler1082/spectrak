import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
//import RefreshIndicator from 'material-ui/RefreshIndicator';
import LinearProgress from 'material-ui/LinearProgress';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';
import $ from 'jquery';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

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
      regulations: [],
      availableRegulations: [],
      snackbarOpen: false,
      saving: false,
      disabled: false,
      regulationSearchXhr: null,
      associatedSpecifications: [],
      availableSpecifications: [],
      specificationsSearchXhr: null,
      finished: false,
      stepIndex: 0
    };

    // for debug only..
    /*
    this.initialState = {
      type: 'EO',
      documentNumber: '10359',
      title: 'Dion Title',
      issueDate: new Date(),
      sectionCode: '123',
      dwg: true,
      citationNumber: 'Citation Num',
      regulatedBy: 'PSC',
      description: 'Some Description',
      regulations: [{ id: 1, name: 'Regulation 4' }, { id: 2, name: 'Regulation 1' }],
      availableRegulations: []
    };
    */
    this.state = $.extend({ }, this.initialState, { id: this.props.id });

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
    this.handleAvailableSpecificationsUpdate = this.handleAvailableSpecificationsUpdate.bind(this);
    this.handleAvailableSpecificationsNewRequest = this.handleAvailableSpecificationsNewRequest.bind(this);
    this.handleAssociatedSpecificationRequestDelete = this.handleAssociatedSpecificationRequestDelete.bind(this);
    this.getStepContent = this.getStepContent.bind(this);

    //this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);        
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);

    if(this.state.id) {
      this.handleIdChange(this.state.id);
    }
  }

  handleIdChange(newId) {
    $.ajax({
      //+ '/' + this.state.type + '-' + this.state.documentNumber
      url: this.props.getUrl,
      dataType: 'json',
      type: 'GET',
      data: {
        id: this.state.id,
        include_regs: true,
        include_assoc_specs: true,
        _random: Math.random()
      },
      success: function(data) {
        if(!data.errors) {
          if(data.rows[0].issueDate) data.rows[0].issueDate = new Date(data.rows[0].issueDate);
          this.setState(data.rows[0]);
        } else {
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleTypeChange(e, key, payload) {
    this.setState({ type: payload });
  };

  handleDocumentNumberChange(e) {
    this.setState({ documentNumber: e.target.value });
    /*
    $.ajax({
      url: this.props.getUrl + '/' + this.state.type + '-' + this.state.documentNumber,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState(data);
      }
    });
    */
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

  handleAvailableRegulationsUpdate(e) {
    if(this.state.regulationSearchXhr) this.state.regulationSearchXhr.abort();

    if(e.length >= 3) {
      var xhr = $.ajax({
        url: this.props.regulationsUrl,
        context: this,
        data: { contains: e },
        dataType: 'json',
        type: 'GET',
        success: function(data) {
          this.setState({availableRegulations: data});
        }
      });

      this.setState({regulationSearchXhr: xhr});
    } else {
      this.setState({ availableRegulations: [] });
    }
  };

  handleAvailableRegulationsNewRequest(chosenRequest, index) {
    var updatedRegulations = this.state.regulations;
    if(index < 0) {
      index = this.state.availableRegulations.findIndex(x=>x.name.toLowerCase() == chosenRequest.toLowerCase());
      if(index >= 0) {
        updatedRegulations.push(this.state.availableRegulations[index])
        this.setState({ regulations: updatedRegulations });
      } else {
        updatedRegulations.push({ id: -1, name: chosenRequest });
        this.setState({ regulations: updatedRegulations }); 
      }
    } else {
      updatedRegulations.push(chosenRequest);
      this.setState({ regulations: updatedRegulations });
    }
  };

  handleRegulationRequestDelete(key) {
    this.regulations = this.state.regulations;
    const regulationToDelete = this.regulations.map((reg) => reg.id).indexOf(key)
    this.regulations.splice(regulationToDelete, 1);
    this.setState({ regulations: this.regulations });
  };

  handleAvailableSpecificationsUpdate(e) {
    if(this.state.specificationsSearchXhr) this.state.specificationsSearchXhr.abort();

    if(e.length >= 3) {
      var xhr = $.ajax({
        url: this.props.getUrl,
        context: this,
        data: { q: e },
        dataType: 'json',
        type: 'GET',
        success: function(data) {
          var rows = data.rows;
          rows.map(function(currentValue, index) {
              rows[index].name = rows[index].type + '-' + rows[index].documentNumber;
          });

          this.setState({ availableSpecifications: data.rows });
        }
      });

      this.setState({specificationsSearchXhr: xhr});
    } else {
      this.setState({ availableSpecifications: [] });
    }
  };

  handleAvailableSpecificationsNewRequest(chosenRequest, index) {
    var updatedAssociatedSpecifications = this.state.associatedSpecifications;
    if(index < 0) {
      index = this.state.availableSpecifications.findIndex(x=>x.type + '-' + x.documentNumber.toLowerCase() == chosenRequest.toLowerCase());
      if(index >= 0) {
        updatedAssociatedSpecifications.push(this.state.availableSpecifications[index])
        this.setState({ associatedSpecifications: updatedAssociatedSpecifications });
      } else {
        alert('You can\'t associate this specification to a specification that doesn\'t exist in our database')
      }
    } else {
      updatedAssociatedSpecifications.push(chosenRequest);
      this.setState({ associatedSpecifications: updatedAssociatedSpecifications });
    }
  };

  handleAssociatedSpecificationRequestDelete(key) {
    this.associatedSpecifications = this.state.associatedSpecifications;
    const associatedSpecificationsToDelete = this.associatedSpecifications.map((spec) => spec.id).indexOf(key)
    this.associatedSpecifications.splice(associatedSpecificationsToDelete, 1);
    this.setState({ associatedSpecifications: this.associatedSpecifications });
  };

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  };
  
  handlePrev(e) {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleNext(e) {
    
    const {stepIndex} = this.state;
    
    if(stepIndex == 2) {
      e.preventDefault();
      this.setState({saving: true});

      $.ajax({
        url: this.props.postUrl,
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
          description: this.state.description,
          regulations: this.state.regulations,
          associatedSpecifications: this.state.associatedSpecifications
        },
        success: function(data) {
          this.setState({
            saving: false
          });

          if(!data.errors) {
            var state = $.extend({}, this.initialState);
            state.snackbarOpen = true;
            state.stepIndex = stepIndex + 1;
            state.finished = stepIndex >= 2;
            this.setState(state);
            if(this.props.onSave) {
              this.props.onSave(data);
            }
          } else {
            var errMsg = '';
            data.errors.forEach(function(e) {
              errMsg += e.path + ' - ' + e.message + '\n';
            });
            alert(errMsg);
            this.setState({
              processing:false,
              stepIndex: stepIndex + 1,
              finished: stepIndex >= 2
            });
          }
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({ saving: false });
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    } else {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2
      });      
    }
  }
  
  getStepContent(stepIndex) {
    const availableRegulationsDataSourceConfig = { text: 'name', value: 'id' };
    const availableSpecificationsDataSourceConfig = { text: 'name', value: 'id' };
    var result = null;
    switch (stepIndex) {
      case 0:
        result = (
          <div>
            <div>
              <SelectField value={this.state.type} onChange={this.handleTypeChange} floatingLabelText="Type">
                <MenuItem value="EO" primaryText="EO" />
                <MenuItem value="EOP" primaryText="EOP" />
                <MenuItem value="B" primaryText="B" />
              </SelectField>
            </div>
            <div>
              <TextField id="documentNumber" hintText="10359" floatingLabelText="Document Number" onChange={ this.handleDocumentNumberChange } value={this.state.documentNumber} />
            </div>
            <div>
              <TextField id="title" hintText="10359" floatingLabelText="Title" onChange={ this.handleTitleChange } value={this.state.title} />
            </div>
            <div>
              <DatePicker id="issueDate" hintText="Issue Date" floatingLabelText="Issue Date" value={this.state.issueDate} onChange={ this.handleIssueDateChange } autoOk={true} />
            </div>
            <div>
              <TextField id="sectionCode" hintText="123" floatingLabelText="Section Code" value={this.state.sectionCode} onChange={this.handleSectionCodeChange } />
            </div>
            <div>
              <Toggle id="dwg" label="DWG?" value={this.state.dwg} onToggle={this.handleDwgToggle} style={{marginTop:16}} />
            </div>
          </div>
        );
        break;
      case 1:
        result = (
          <div>
            <div>
              <TextField id="citationNumber" hintText="04-M-0159" floatingLabelText="Citation Number" value={this.state.citationNumber} onChange={this.handleCitationNumberChange } />
            </div>
            <div>
              <SelectField value={this.state.regulatedBy} onChange={this.handleRegulatedByChange} floatingLabelText="Regulated By">
                <MenuItem value="PSC" primaryText="PSC" />
                <MenuItem value="NESC" primaryText="NESC" />
              </SelectField>
            </div>
            <div>
              <TextField hintText="A short description of what the regulation is about" floatingLabelText="Description" multiLine={true} rows={2} value={this.state.description} onChange={this.handleDescriptionChange} />                
            </div>
            <div>
              <AutoComplete hintText="reg name" dataSource={this.state.availableRegulations} onUpdateInput={this.handleAvailableRegulationsUpdate} onNewRequest={this.handleAvailableRegulationsNewRequest} floatingLabelText="Add Associated Regulation" dataSourceConfig={availableRegulationsDataSourceConfig} filter={AutoComplete.caseInsensitiveFilter} />
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
            </div>
          </div>
        );
        break;
      case 2:
        result = (
          <div>
            <div>
              <AutoComplete hintText="Document # (ie 103)" dataSource={this.state.availableSpecifications} onUpdateInput={this.handleAvailableSpecificationsUpdate} onNewRequest={this.handleAvailableSpecificationsNewRequest} floatingLabelText="Add Associated Specifications" dataSourceConfig={availableSpecificationsDataSourceConfig} filter={AutoComplete.caseInsensitiveFilter} />
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {
                this.state.associatedSpecifications.map(function(currentValue, index) {
                  return(
                    <Chip key={currentValue.id} style={{ margin: 4 }} onRequestDelete={  () => this.handleAssociatedSpecificationRequestDelete(currentValue.id) }>
                      {currentValue.type + '-' + currentValue.documentNumber}
                    </Chip>)
                }, this)
              }
              </div>
            </div>
          </div>
        );
        break;
    }
    
    return result;
  }  

  handleSnackbarRequestClose(e) {
    this.setState({snackbarOpen: false});
  }

  render() {

    //<RaisedButton label="Save" primary={true} fullWidth={true} style={ {marginTop:'2em'} } onTouchTap={this.handleSaveButtonClick}  />
    //<Card style={this.props.style}>
    //  <CardHeader title="Specification Form" showExpandableButton={false} />
    //  <Divider />
    //  <CardText>
    //    Fill out the fields below carefully, and click the save button upon completion to store your entry.
    //  </CardText>
    //</Card>  
        
    const {finished, stepIndex} = this.state;    

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto', boxShadow: '0 2em 4em 0 rgba(0, 0, 0, 0.2), 0 4em 8em 0 rgba(0, 0, 0, 0.19)', background:'white', padding: '1.4em'}}>
        <form>
          <Stepper activeStep={stepIndex}>
            <Step><StepLabel>Specification Information</StepLabel></Step>
            <Step><StepLabel>Associated Regulations</StepLabel></Step>
            <Step><StepLabel>Referenced Specifications</StepLabel></Step>
          </Stepper>
          {this.getStepContent(stepIndex)}
          <Divider style={{marginTop: '2em', marginBottom:'2em'}} />
          <FlatButton label="Back" disabled={stepIndex === 0} onTouchTap={this.handlePrev} style={{marginRight: 12}} />
          <RaisedButton label={stepIndex === 2 ? 'Finish' : 'Next'} primary={true} onTouchTap={this.handleNext} disabled={this.state.saving} />
          
          <LinearProgress mode="indeterminate" style={{display: this.state.saving ? 'block' : 'none', marginTop:'2em' }} />
          <Snackbar open={this.state.snackbarOpen} message="Specification saved" autoHideDuration={4000} onRequestClose={this.handleSnackbarRequestClose} />
        </form>
      </div>
    );

  }
}

SpecificationForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SpecificationForm;
