import React from 'react';
import Header from '../../components/header/Header';
import './Admin.css';
import Card from '../../components/card/Card';
import TextInput from '../../components/text-input/TextInput';
import { del, deleteID, post } from '../../service/api';
import { get } from '../../service/api';


class Admin extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      ao_delete_oid: 0,
      ao_delete_info: {},
      user_fields: {
        'uid': false,
        'email': false, 
        'password': false, 
        'username': false
      },
      user_response: []
    }
    // delete ao
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDeleteAO = this.handleDeleteAO.bind(this);
    // search user filter
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSearchUsers = this.handleSearchUsers.bind(this);
  }

  componentDidMount() {
  }


  // Delete Award Organization

  handleInputChange(event) {
    const target = event.target;
    const value = target.value >= 0 ? target.value : 0;
    this.setState({ao_delete_oid: value});
  }

  handleDeleteAO(event) {
    event.preventDefault();
    let num_tuples = {};
    // get requests for affected relations - to see #tuples deleted
    let ao_get = get('award-organization/');
    let vga_get = get('video-game-award/');
    let awarded_get = get('awarded/');
    // delete request
    const ao_del = deleteID('award-organization/', this.state.ao_delete_oid.toString());

    Promise.all([ao_get, vga_get, awarded_get])
    .then((res) => {
      // save sizes of relations before deletion
      num_tuples['award-organization'] = res[0].data.length;
      num_tuples['video-game-award'] = res[1].data.length;
      num_tuples['awarded'] = res[2].data.length;
      // perform delete
      return ao_del;
    })
    .then((res) => {
      // redo get requests
      ao_get = get('award-organization/');
      vga_get = get('video-game-award/');
      awarded_get = get('awarded/');
      return Promise.all([ao_get, vga_get, awarded_get]);
    })
    .then((res) => {
      // find sizes of relations after deletion, save difference
      num_tuples['award-organization'] -= res[0].data.length;
      num_tuples['video-game-award'] -= res[1].data.length;
      num_tuples['awarded'] -= res[2].data.length;

      console.log('SUCCESS');
      // save key-value pairs of tuples deleted in state
      this.setState({ao_delete_info : num_tuples})
    })
    .catch((err) => {
      console.log(err);
    });
  }

  renderDeleteTable() {
    const rows = this.state.ao_delete_info;
    return (
      <table>
        <thead>
          <tr>
            <th>Relation</th><th>Number of Tuples Removed</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rows).map((key) => (
            <tr key={key}><td>{key}</td><td>{rows[key]}</td></tr>
          ))}
        </tbody>
      </table>
    );
  }

  deleteAwardOrganization() {
    return (
    <div className="tool">
      <div className="title-text">Delete an Award Organization</div>
      <div className="tool-content">
        <form onSubmit={this.handleDeleteAO}>
          <label>
            Organization ID: 
            <input 
            type="number" 
            name="id" 
            placeholder="id"
            value={this.state.ao_delete_oid}
            onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="DELETE" />
        </form>
      </div>
      <div className="tool-content">
        {this.renderDeleteTable()}
      </div>
    </div>
    );
  }

  // User Filter 

  handleCheckboxChange(event) {
    const target = event.target;
    this.state.user_fields[target.name] = target.checked;
    this.setState(this.state);
  }

  handleSearchUsers(event){
    event.preventDefault();
    // get selected columns and send POST request
    const columns = [];
    Object.keys(this.state.user_fields).forEach((key, i) => {
      if (this.state.user_fields[key]) {
        columns.push(key);
      }
    });
    const data = {columns : columns}
    post('user-filter/', data)
    .then((res) => {
      this.setState({user_response : res.data});
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // renders an html table from a list of json key-value pairs
  renderUsersTable(rowsObj) {
    let keys = [];
    if (rowsObj.length > 0) {
      keys = Object.keys(rowsObj[0]);
    }
    return(
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.state.user_response.map((user) => (
            <tr>
              {keys.map((key) => (
                <td key={key}>{user[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  searchUsersFilter() {
    const fields = ['uid', 'email', 'password', 'username']
    return (
      <div className="tool">
        <div className="title-text">Search User Information</div>
        <div className="tool-content">
        <form onSubmit={this.handleSearchUsers}>
          {fields.map((field, i) => {
            return (
              <label key = {field}>
                <input
                  type='checkbox'
                  name={field}
                  onChange={this.handleCheckboxChange}
                  value={this.state.user_fields[field]}
                />
                {field}
              </label>
            )
          })}
          <input type="submit" value="SEARCH" />
        </form>
        </div>
        <div className="tool-content">
          {this.renderUsersTable(this.state.user_response)}
        </div>
      </div>
    )
  }


  render() {
    return [
      <Header key="header" {...this.props} />,
      <div key="page" className="page">
        <div className="banner">
        </div>
        <div className="content">
          <div className="tool-container">
            <div className="tool-rows">
              {this.deleteAwardOrganization()}
              {this.searchUsersFilter()}
              <div className="tool"></div>
            </div>
          </div>
        </div>
      </div>
    ]
  }
}

export default Admin;