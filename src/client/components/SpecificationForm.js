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
import LinearProgress from 'material-ui/LinearProgress';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';
import $ from 'jquery';
import { Step, Stepper, StepLabel, StepButton, StepContent } from 'material-ui/Stepper';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

/**

*/
class SpecificationForm extends React.Component
{
  /**
  
  */
  constructor(props) {
    super(props);
    
    this.initialState = {
      id: '',
      
      // spec data 1
      type: '',
      documentNumber: '',
      title: '',
      issueDate: null,
      sectionCode: '',
      subSectionCode: '',
      hasDwg: false,
      
      // spec data 2
      author: '',
      reviewedBy: '',
      tlcCourse: '',
      ceRequirements: '',
      whoNeedsToComply: '',
      parentSpecification: '',
      comments: '',
      
      citationNumber: '',
      regulatedBy: '',
      description: '',
      AssociatedRegulations: [],
      snackbarOpen: false,
      saving: false,
      disabled: false,
      //regulationSearchXhr: null,
      associatedSpecifications: [],
      availableSpecifications: [],
      specificationsSearchXhr: null,
      finished: false,
      specInfoStepIndex: 0,
      stepIndex: 0 // overall form
    };
    
    this.state = $.extend({ }, this.initialState, { id: this.props.id });

    // basic specification data handlers..
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDocumentNumberChange = this.handleDocumentNumberChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleIssueDateChange = this.handleIssueDateChange.bind(this);
    this.handleSectionCodeChange = this.handleSectionCodeChange.bind(this);
    this.handleSubSectionCodeChange = this.handleSubSectionCodeChange.bind(this);    
    this.handleDwgToggle = this.handleDwgToggle.bind(this);
    
    // regulation data handlers ...
    this.handleCitationNumberChange = this.handleCitationNumberChange.bind(this);
    this.handleRegulatedByChange = this.handleRegulatedByChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    //this.handleAvailableRegulationsUpdate = this.handleAvailableRegulationsUpdate.bind(this);
    //this.handleAvailableRegulationsNewRequest = this.handleAvailableRegulationsNewRequest.bind(this);
    //this.handleRegulationRequestDelete = this.handleRegulationRequestDelete.bind(this);
    
    this.handleAvailableSpecificationsUpdate = this.handleAvailableSpecificationsUpdate.bind(this);
    this.handleAvailableSpecificationsNewRequest = this.handleAvailableSpecificationsNewRequest.bind(this);
    this.handleAssociatedSpecificationRequestDelete = this.handleAssociatedSpecificationRequestDelete.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleAddAssociatedRegulationClick = this.handleAddAssociatedRegulationClick.bind(this);
    this.handleRemoveAssociatedRegulationClick = this.handleRemoveAssociatedRegulationClick.bind(this);
    this.handleAddAssociatedRegulationPartClick = this.handleAddAssociatedRegulationPartClick.bind(this);
    this.handleRemoveAssociatedRegulationPartClick = this.handleRemoveAssociatedRegulationPartClick.bind(this);    

    this.handleAssociatedRegulationPartSectionChange = this.handleAssociatedRegulationPartSectionChange.bind(this);
    this.handleAssociatedRegulationPartDescriptionChange = this.handleAssociatedRegulationPartDescriptionChange.bind(this);

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
        ias: true,
        iar: true,
        iarp: true,
        _random: Math.random()
      },
      success: function(data) {
        if(!data.errors) {
          var record = data.rows[0];
          //if(data.rows[0].issueDate) data.rows[0].issueDate = new Date(data.rows[0].issueDate);
          //this.setState(data.rows[0]);
          this.setState({
            type: record.type,
            documentNumber: record.documentNumber,
            title: record.title || '',
            issueDate: new Date(record.issueDate) || '',
            sectionCode: record.sectionCode || '',
            subSectionCode: record.subSectionCode || '',
            hasDwg: record.hasDwg || '',
            author: record.author || '',
            reviewedBy: record.reviewedBy || '',
            tlcCourse: record.tlcCourse || '',
            ceRequirements: record.ceRequirements || '',
            whoNeedsToComply: record.whoNeedsToComply || '',
            parentSpecification: record.parentSpecification || '',
            comments: record.comments || '',
            AssociatedRegulations: record.AssociatedRegulations === null ? [] : record.AssociatedRegulations,
            associatedSpecifications: record.associatedSpecifications === null ? [] : record.associatedSpecifications          
          });
        } else {
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  /**
  
  */
  handleTypeChange(e, key, payload) {
    this.setState({ type: payload });
  };

  /**
  
  */
  handleDocumentNumberChange(e) {
    this.setState({ documentNumber: e.target.value });
  };
  
  /**
  
  */
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  };
  
  /**
  
  */
  handleIssueDateChange(e, d) {
    this.setState({ issueDate: d });
  };

  /**
  
  */
  handleSectionCodeChange(e) {
    this.setState({ sectionCode: e.target.value });
  };
  
  /**
  
  */
  handleSubSectionCodeChange(e) {
    this.setState({ subSectionCode: e.target.value });
  };  

  /**
  
  */
  handleDwgToggle(e, v) {
    this.setState({ hasDwg: v });
  };

  handleCitationNumberChange(e, arIdx) {
    var ar = this.state.AssociatedRegulations;    
    var arv = ar[arIdx];
    arv.citationNumber = e.target.value;
    this.setState({ associatedRegulations: ar });
  };

  handleRegulatedByChange(e, key, payload, arIdx) {
    var ar = this.state.AssociatedRegulations;
    var arv = ar[arIdx];
    arv.regulatedBy = payload;
    this.setState({ associatedRegulations: ar });
  };

  /**
  
  */
  handleAvailableSpecificationsUpdate(e) {
    if(this.state.specificationsSearchXhr) 
      this.state.specificationsSearchXhr.abort();

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

  /**
  
  */
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

  /**
  
  */
  handleAssociatedSpecificationRequestDelete(key) {
    this.associatedSpecifications = this.state.associatedSpecifications;
    const associatedSpecificationsToDelete = this.associatedSpecifications.map((spec) => spec.id).indexOf(key)
    this.associatedSpecifications.splice(associatedSpecificationsToDelete, 1);
    this.setState({ associatedSpecifications: this.associatedSpecifications });
  };

  handleDescriptionChange(e, arIdx) {
    var ar = this.state.AssociatedRegulations;    
    var arv = ar[arIdx];
    arv.description = e.target.value;
    this.setState({ associatedRegulations: ar });
  };
  
  handleAssociatedRegulationPartSectionChange(e, arIdx, arpIdx) {
    var ar = this.state.AssociatedRegulations;    
    var arv = ar[arIdx];
    arv.AssociatedRegulationParts[arpIdx].section = e.target.value;
    this.setState({ associatedRegulations: ar });
  };  
  
  handleAssociatedRegulationPartDescriptionChange(e, arIdx, arpIdx) {
    var ar = this.state.AssociatedRegulations;    
    var arv = ar[arIdx];
    arv.AssociatedRegulationParts[arpIdx].description = e.target.value;
    this.setState({ associatedRegulations: ar });
  };    
  
  handleAddAssociatedRegulationClick(e) {
    var associatedRegulations = this.state.AssociatedRegulations;
    //var arCount = associatedRegulations.length;
    //if(arCount == 0 || associatedRegulations[arCount - 1])
    associatedRegulations.push({
      "citationNumber": "",
      "name": "",
      "regulatedBy": "",
      "description": "",
      "AssociatedRegulationParts": []
    });

    this.setState({ AssociatedRegulations: associatedRegulations });
  }
  
  handleRemoveAssociatedRegulationClick(arIdx) {
    if(arIdx > -1) {
      var associatedRegulations = this.state.AssociatedRegulations;      
      associatedRegulations.splice(arIdx, 1);
      this.setState({ AssociatedRegulations: associatedRegulations });
    }
  }

  handleAddAssociatedRegulationPartClick(arIdx) {
    var associatedRegulations = this.state.AssociatedRegulations;

    if(arIdx < associatedRegulations.length) {
      associatedRegulations[arIdx].AssociatedRegulationParts.push({
        "section": "",
        "description": ""
      });
    
      this.setState({ AssociatedRegulations: associatedRegulations });
    }
  }
  
  handleRemoveAssociatedRegulationPartClick(arIdx, arpIdx) {
    if(arIdx > -1 && arpIdx > -1) {
      var associatedRegulations = this.state.AssociatedRegulations;
      associatedRegulations[arIdx].AssociatedRegulationParts.splice(arpIdx, 1);
      this.setState({ AssociatedRegulations: associatedRegulations });
    }
  }
    
  handlePrev(e) {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleNext(e) {
    
    const { stepIndex } = this.state;
    
    if(stepIndex == 2) {
      e.preventDefault();
      this.setState({saving: true});

      $.ajax({
        url: this.props.postUrl,
        dataType: 'json',
        type: 'POST',
        data: {
          id: this.state.id,
          type: this.state.type,
          documentNumber: this.state.documentNumber,
          title: this.state.title,
          issueDate: this.state.issueDate,
          sectionCode: this.state.sectionCode,
          hasDwg: this.state.hasDwg,
          author: this.state.author,
          reviewedBy: this.state.reviewedBy,
          tlcCourse: this.state.tlcCourse,
          ceRequirements: this.state.ceRequirements,
          whoNeedsToComply: this.state.whoNeedsToComply,
          parentSpecification: this.state.parentSpecification,
          comments: this.state.comments,
          //citationNumber: this.state.citationNumber,
          //regulatedBy: this.state.regulatedBy,
          //description: this.state.description,
          associatedRegulations: this.state.AssociatedRegulations,
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
              processing:false
              //stepIndex: stepIndex + 1,
              //finished: stepIndex >= 2
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
  
  /**
  
  */
  getStepContent(stepIndex) {
    const availableRegulationsDataSourceConfig = { text: 'name', value: 'id' };
    const availableSpecificationsDataSourceConfig = { text: 'name', value: 'id' };
    var result = null;
    switch (stepIndex) {
      case 0:
        result = (
          <div>
            <Paper style={{ width: '48%', float: 'left', padding: '1em' }} zDepth={3}>
              <div>
                <SelectField value={this.state.type} onChange={this.handleTypeChange} floatingLabelText="Type">
                  <MenuItem value="EO" primaryText="EO" />
                  <MenuItem value="EOP" primaryText="EOP" />
                  <MenuItem value="B" primaryText="B" />
                </SelectField>
              </div>
              <div>
                <TextField id="documentNumber" hintText="10359" floatingLabelText="Document Number" onChange={ this.handleDocumentNumberChange } value={this.state.documentNumber} maxLength="16" />
              </div>
              <div>
                <TextField id="title" hintText="10359" floatingLabelText="Title" onChange={ this.handleTitleChange } value={this.state.title} maxLength="256" />
              </div>
              <div>
                <DatePicker id="issueDate" hintText="Issue Date" floatingLabelText="Issue Date" value={this.state.issueDate} onChange={ this.handleIssueDateChange } autoOk={true} />
              </div>
              <div>
                <TextField id="sectionCode" hintText="123" floatingLabelText="Section Code" value={this.state.sectionCode} onChange={this.handleSectionCodeChange } maxLength="4" />
              </div>
              <div>
                <TextField id="sub_section_code" hintText="456" floatingLabelText="Sub-Section Code" value={this.state.subSectionCode} onChange={this.handleSubSectionCodeChange } maxLength="4" />
              </div>                  
              <div>
                <Toggle id="dwg" label="Has Drawing?" value={this.state.hasDwg} onToggle={this.handleDwgToggle} style={{marginTop:16}} />
              </div>
              </Paper>np
            <Paper style={{width:'48%', marginLeft:'52%', padding: '1em'}} zDepth={3}>
              <div>
                <TextField id="author" hintText="Dion Ahmetaj" floatingLabelText="Author" onChange={ (e) => this.setState({ author: e.target.value }) } value={this.state.author} maxLength="128" />
              </div>
              <div>
                <TextField id="reviewed_by" hintText="Dion Ahmetaj" floatingLabelText="Reviewed By" onChange={ (e) => this.setState({ reviewedBy: e.target.value }) } value={this.state.reviewedBy} maxLength="128" />
              </div>
              <div>
                <TextField id="tlc_course" hintText="ABC123" floatingLabelText="TLC Course" onChange={ (e) => this.setState({ tlcCourse: e.target.value }) } value={this.state.tlcCourse} maxLength="16" />
              </div>
              <div>
                <TextField id="ce_requirements" hintText="Statement of CE requirements" floatingLabelText="CE Requirements" multiLine={true} rows={2} onChange={ (e) => this.setState({ ceRequirements: e.target.value }) } value={this.state.ceRequirements} maxLength="1024" />
              </div>
              <div>
                <TextField id="who_needs_to_comply" hintText="Who needs to comply?" floatingLabelText="Compliance People" multiLine={true} rows={2} onChange={ (e) => this.setState({ whoNeedsToComply: e.target.value }) } value={this.state.whoNeedsToComply} maxLength="256" />
              </div>
              <div>
                <TextField id="parent_spec" hintText="EO10359" floatingLabelText="Parent Specification" onChange={ (e) => this.setState({ parentSpecification: e.target.value }) } value={this.state.parentSpecification} maxLength="16" />
              </div>
              <div>
                <TextField id="spec_comments" hintText="" floatingLabelText="Comments" multiLine={true} rows={2} onChange={ (e) => this.setState({ comments: e.target.value }) } value={this.state.comments} maxLength="1024" />
              </div>              
            </Paper>
          </div>
        );
        break;
      case 1:
        //<div style={{ display: 'flex', flexWrap: 'wrap' }}>
        result = (
          <div>
            <RaisedButton key={ 'ar_add' } label={ 'Add New Associated Regulation' } primary={true} fullWidth={true} onTouchTap={ this.handleAddAssociatedRegulationClick } />                          
            <Tabs>
            {
              this.state.AssociatedRegulations.map(function(ar, arIdx) {
                return(
                  <Tab key={ arIdx + '_ar_tab' } label={ ar.citationNumber.length > 0 ? ar.citationNumber : 'Regulation ' + (arIdx + 1) } style={{paddingLeft:'1em',paddingRight:'1em'}}>
                    <RaisedButton key={ arIdx + '_ar_del' } label={ 'Delete ' + (ar.citationNumber.length > 0 ? ar.citationNumber : 'Regulation ' + (arIdx + 1)) } secondary={true} fullWidth={true} onTouchTap={ () => this.handleRemoveAssociatedRegulationClick(arIdx) } style={{marginTop:'1em'}} />
                    <div>
                      <TextField key={arIdx + '_ar_citation_number'} hintText="04-M-0159" floatingLabelText="Citation Number" value={ar.citationNumber} onChange={ (e) => this.handleCitationNumberChange(e, arIdx) } maxLength="16" />
                    </div>
                    <div>
                      <SelectField key={arIdx + '_ar_regulated_by'} value={ar.regulatedBy} onChange={ (e, key, payload) => this.handleRegulatedByChange(e, key, payload, arIdx) } floatingLabelText="Regulated By">
                        <MenuItem value="PSC" primaryText="PSC" />
                        <MenuItem value="NESC" primaryText="NESC" />
                      </SelectField>
                    </div>
                    <div>
                      <TextField key={arIdx + '_ar_name'} hintText="Regulation Name" floatingLabelText="Name" value={ar.name} onChange={ (e) => { this.state.AssociatedRegulations[arIdx].name = e.target.value; this.setState({ AssociatedRegulations: this.state.AssociatedRegulations }); }  } maxLength="32" />
                    </div>
                    <div>
                      <TextField key={arIdx + '_ar_description'} hintText="A short description of what the regulation is about" floatingLabelText="Description" multiLine={true} rows={2} value={ar.description} onChange={ (e) => this.handleDescriptionChange(e, arIdx) } maxLength="1024" />
                    </div>
                    <div>
                      <Toggle key={arIdx + '_ar_is_training_req'} label="Is Training Required?" value={ar.isTrainingRequired} onToggle={ (e, v) => { this.state.AssociatedRegulations[arIdx].isTrainingRequired = v; this.setState({ AssociatedRegulations: this.state.AssociatedRegulations })} } style={{marginTop:16}} style={{width:''}} />
                    </div>
                    <div>
                      <TextField key={arIdx + '_ar_order_text'} hintText="Regulatory or Order Text" floatingLabelText="Order Text" multiLine={true} rows={2} value={ar.orderText} onChange={ (e) => { this.state.AssociatedRegulations[arIdx].orderText = e.target.value; this.setState({ AssociatedRegulations: this.state.AssociatedRegulations }); } } maxLength="256" />
                    </div>
                    <div>
                      <TextField key={arIdx + '_ar_activity_description'} hintText="Description of required/prohibited activity?" floatingLabelText="Activty Description" multiLine={true} rows={2} value={ar.activityDescription} onChange={ (e) => { this.state.AssociatedRegulations[arIdx].activityDescription = e.target.value; this.setState({ AssociatedRegulations: this.state.AssociatedRegulations }); } } maxLength="256" />
                    </div>
                    <div>
                      <TextField key={arIdx + '_ar_compliance_action'} hintText="How might compliance action/problem occur?" floatingLabelText="Compliance Action" multiLine={true} rows={2} value={ar.complianceAction} onChange={ (e) => { this.state.AssociatedRegulations[arIdx].complianceAction = e.target.value; this.setState({ AssociatedRegulations: this.state.AssociatedRegulations }); } } maxLength="256" />
                    </div>                                                            
                    <div style={{marginTop:'1em'}}>
                      <Paper zDepth={4} style={{width:'90%', marginLeft:'auto', marginRight:'auto'}}>
                      <RaisedButton key={ arIdx + '_ar_part_add' } label={ 'Add Regulation Part' } primary={true} fullWidth={true} onTouchTap={ () => this.handleAddAssociatedRegulationPartClick(arIdx) }/>
                      <Tabs style={{paddingLeft:'1em', marginTop:'1em', paddingRight:'1em'}}>
                      {
                          ar.AssociatedRegulationParts.map(function(arp, arpIdx) {
                            return(                                                  
                              <Tab key={arIdx + '_ar_' + arpIdx + '_arp_tab'} label = {arp.section.length > 0 ? arp.section : 'Part ' + (arpIdx + 1)} style={{paddingLeft:'1em', paddingRight:'1em', backgroundColor:'orange'}}>
                                <RaisedButton label={ 'Delete ' + (arp.section.length > 0 ? arp.section : 'Part ' + (arpIdx + 1)) } secondary={true} fullWidth={true} onTouchTap={ () => this.handleRemoveAssociatedRegulationPartClick(arIdx, arpIdx) } style={{marginTop:'1em'}} />
                                <div>
                                  <TextField key={arIdx + '_ar_' + arpIdx + '_arp_section'} hintText="4.1" floatingLabelText="Section" value={arp.section} onChange={ (e) => this.handleAssociatedRegulationPartSectionChange(e, arIdx, arpIdx) } />
                                </div>
                                <div>
                                  <TextField key={arIdx + '_ar_' + arpIdx + '_arp_description'} hintText="Lorem Ipsum" floatingLabelText="Description" value={arp.description} onChange={ (e) => this.handleAssociatedRegulationPartDescriptionChange(e, arIdx, arpIdx) }  />
                                </div>
                              </Tab>
                            )
                          }, this)
                      }
                      </Tabs>
                      </Paper>
                    </div>
                  </Tab>
                )
              }, this)
            }
            </Tabs>
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
