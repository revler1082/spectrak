import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import $ from 'jquery';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

import configs from '../../server/config';
var config = configs["development"];

class SpecificationsTable extends React.Component
{
  constructor(props, context) {
    super(props);
    this.initialState = {
      rows: [],
      searchTerm: '',
      searchXhr: null,
      processing: true,
      disabled: false,
      pageSize: 8,
      currentPage: 0,
      totalCount: null
    };

    this.state = $.extend({}, this.initialState);

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);

    //setTimeout(function() { this.fetch(); }.bind(this), 2000);
    //this.fetch();
  }

  componentDidMount() {
    this.fetch();
  }

  handleSearchTermChange(e) {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearchButtonClick(e) {
    this.setState({ currentPage: 0 });
    this.fetch();
  }

  handlePreviousClick() {
    this.setState({
      currentPage: Math.max(0, this.state.currentPage - 1)
    });

    this.fetch();
  }

  handleNextClick() {
    this.setState({
      currentPage: Math.min(Math.ceil(this.state.totalCount / this.state.pageSize), this.state.currentPage + 1)
    });

    this.fetch();
  }

  fetch() {
    this.setState({processing: true, rows: []});

    if(this.state.searchXhr) this.state.searchXhr.abort();

    setTimeout(function() {
      this.state.searchXhr = $.ajax({
        url: '/spectrak/api/1/specifications/',
        dataType: 'json',
        type: 'GET',
        data: {
          _random: Math.random(),
          limit: this.state.pageSize,
          offset: this.state.currentPage * this.state.pageSize,
          q: this.state.searchTerm
        },
        success: function(data) {

          if(!data.errors) {

            this.setState({rows: data.rows, totalCount: data.count, processing: false});

          } else {

            var errMsg = '';
            data.errors.forEach(function(e) {
              errMsg += e.path + ' - ' + e.message + '\n';
            });

            alert(errMsg);
            this.setState({ processing: false });

          }

        }.bind(this),
        error: function(xhr, status, err) {
          //this.setState({ processing: false });
          console.error(xhr, status, err.toString());
        }.bind(this)
      })
    }.bind(this), 1600);

  };

  /**

  */
  handleCreateNewClick() {
    //this.context.router.push
    //{config.express.siteRoot + 'specifications/new'}
  }

  isPreviousButtonDisabled() {
    return this.state.processing || this.state.currentPage === 0;
  }

  isNextButtonDisabled() {
    return this.state.processing || Math.ceil(this.state.totalCount / this.state.pageSize) === this.state.currentPage + 1;
  }

  render() {

    const totalPages = Math.ceil(this.state.totalCount / this.state.pageSize);

      return (
        <Paper zDepth={2}>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <TextField hintText="Document # or Section Code" style={{marginLeft:'1em'}} value={this.state.searchTerm} onChange={this.handleSearchTermChange} />
              <RaisedButton label="Search" onTouchTap={this.handleSearchButtonClick} />
            </ToolbarGroup>
            <ToolbarGroup lastChild={true}>
              <ToolbarTitle text="" />
              <ToolbarSeparator style={{display:'none'}}/>
              <Link to={ config.express.siteRoot + "specifications/new" }>
                <FloatingActionButton style={{margin:'2em'}}>
                  <ContentAdd />
                </FloatingActionButton>
              </Link>
            </ToolbarGroup>
          </Toolbar>
          <Table fixedHeader={true} fixedFooter={true} selectable={false} height="32em">
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Type</TableHeaderColumn>
                <TableHeaderColumn>Document #</TableHeaderColumn>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Issue Date</TableHeaderColumn>
                <TableHeaderColumn>Section Code</TableHeaderColumn>
                <TableHeaderColumn>Has DWG?</TableHeaderColumn>
                <TableHeaderColumn>Last Updated By</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
            {
              this.state.rows.map(function(currentValue, index) {
                return (
                  <TableRow key={currentValue.id}>
                    <TableRowColumn>{currentValue.type}</TableRowColumn>
                    <TableRowColumn>{currentValue.documentNumber}</TableRowColumn>
                    <TableRowColumn>{currentValue.title != null ? currentValue.title : ""}</TableRowColumn>
                    <TableRowColumn>{currentValue.issueDate != null ? currentValue.issueDate.toString() : ""}</TableRowColumn>
                    <TableRowColumn>{currentValue.sectionCode != null ? currentValue.sectionCode : ""}</TableRowColumn>
                    <TableRowColumn>{currentValue.hasDwg != null ? currentValue.hasDwg.toString() : ""}</TableRowColumn>
                    <TableRowColumn>{currentValue.createdBy != null ? currentValue.createdBy : ""}</TableRowColumn>

                    <TableRowColumn>
                      <Link to={"/spectrak/specifications/" + currentValue.id + '/update'}>
                        <RaisedButton label={ "Edit" } style={{ }} />
                      </Link>
                    </TableRowColumn>
                  </TableRow>
                );
              }, this)
            }
              <TableRow key={'loading_indicator'} selectable={false} style={{display: this.state.processing ? 'block' : 'none'}}>
                <TableRowColumn colSpan={7} style={{textAlign:"center", display:'block', marginTop:'4em',height:'16em'}}>
                  <CircularProgress size={2} />
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <div style={{textAlign:'center', paddingTop:'2em', paddingBottom:'2em'}}>
            <RaisedButton label={ "Previous" } secondary={true} style={{ position:'absolute', left:0, marginLeft:'1em' }} onTouchTap={ this.handlePreviousClick } disabled={this.isPreviousButtonDisabled()} />
            <span>Page { this.state.currentPage + 1 } of { totalPages }</span>
            <RaisedButton label={ "Next    " } secondary={true} style={{ position:'absolute', right:0, marginRight:'1em' }} onTouchTap={this.handleNextClick} disabled={this.isNextButtonDisabled()} />
          </div>
        </Paper>
      );
    //}

  }
}

SpecificationsTable.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SpecificationsTable;
