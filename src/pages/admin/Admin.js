import React from 'react';
import Header from '../../components/header/Header';
import './Admin.css';
import { deleteID, post } from '../../service/api';
import { get } from '../../service/api';

class Admin extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      ao_delete_oid: 0,
      ao_delete_info: [],
      user_fields: {
        'uid': false,
        'email': false, 
        'password': false, 
        'username': false
      },
      join_relation_1: "",
      join_relation_2: "",
      user_filter_response: [],
      best_users_response: [],
      password_changes_response: [],
      natural_join_response: [],
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDeleteAO = this.handleDeleteAO.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSearchUsers = this.handleSearchUsers.bind(this);
    this.handleBestUsers = this.handleBestUsers.bind(this);
    this.handlePasswordChanges = this.handlePasswordChanges.bind(this);
    this.handlePersonNaturalJoin = this.handlePersonNaturalJoin.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  componentDidMount() {
  }

  // renders an html table from a list of json key-value pairs
  renderTable(rowsObj) {
    // find keys to use as headers
    let keys = [];
    if (rowsObj.length > 0) {
      keys = Object.keys(rowsObj[0]);
    }
    // generate table
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
          {rowsObj.map((user, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key}>{user[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
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

      let ao_delete_info = []

      Object.keys(num_tuples).forEach((key, index) => {
        ao_delete_info.push({
          'Relation' : key,
          'Number of Tuples Removed' : num_tuples[key]
        });
      });

      // save key-value pairs of tuples deleted in state
      this.setState({ao_delete_info : ao_delete_info})
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // Delete AO - main tool element
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
          <input 
          className='delete-button'
          type="submit" 
          value="DELETE" />
        </form>
      </div>
      <div className="tool-content">
        {this.renderTable(this.state.ao_delete_info)}
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
      this.setState({user_filter_response : res.data});
    })
    .catch((err) => {
      console.log(err);
    })
  }


  // Search users filter - main tool element
  searchUsersFilter() {
    const fields = ['uid', 'email', 'password', 'username']
    return (
      <div className="tool">
        <div className="title-text">Search User Information</div>
        <div className="tool-content">
        <form onSubmit={this.handleSearchUsers}>
          {fields.map((field, i) => {
            return (
              <label 
                key={field}
                style={{'margin-right':'10px'}}
              >
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
          <input 
          className='search-button'
          type="submit" 
          value="SEARCH" />
        </form>
        </div>
        <div className="tool-content">
          {this.renderTable(this.state.user_filter_response)}
        </div>
      </div>
    )
  }

  // Get best users

  handleBestUsers(event) {
    event.preventDefault();
    get('best-users/').then((res) => {
      this.setState({best_users_response : res.data});
    }).catch((err) => {
      console.log(err);
    })
  }

  getBestReviewers() {
    return (
      <div className='tool'>
        <div className="title-text">Get Best Reviewers</div>
        <div className="tool-content">
        <input 
          className='search-button'
          type="submit" 
          value="SEARCH"
          onClick={this.handleBestUsers}
          />
        </div>
        <div className="tool-content">
          {this.renderTable(this.state.best_users_response)}
        </div>
      </div>
    )
  }

  // Password Changes log

  handlePasswordChanges(event) {
    event.preventDefault();
    get('password-change/').then((res) => {
      this.setState({password_changes_response : res.data});
    }).catch((err) => {
      console.log(err);
    })
  }

  getPasswordChanges() {
    return (
      <div className='tool'>
        <div className="title-text">Password Change Log</div>
        <div className="tool-content">
        <input 
          className='search-button'
          type="submit" 
          value="SEARCH"
          onClick={this.handlePasswordChanges}
          />
        </div>
        <div className="tool-content">
          {this.renderTable(this.state.password_changes_response)}
        </div>
      </div>
    )
  }

  // Natural join on person tables

  handlePersonNaturalJoin(event) {
    event.preventDefault();
    const r1 = this.state.join_relation_1;
    const r2 = this.state.join_relation_2;
    if (r1 && r2) {
      get(['natural-join', r1, r2].join('/'))
      .then((res) => {
        if (res.data) {
          this.setState({natural_join_response : res.data});
        } else {
          this.setState({natural_join_response : []});
        }
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      this.setState({natural_join_response : []});
    }
  }

  handleFormChange(event) {
    let stateObj = {}
    stateObj[event.target.id] = event.target.value;
    this.setState(stateObj);
  }


  getPersonNaturalJoin() {
    return (
      <div className="tool">
        <div className="title-text">Person Table Joins</div>
        <div className="tool-content">
          <form onSubmit={this.handlePersonNaturalJoin}
          >
            <select 
              id="join_relation_1"
              value={this.join_relation_1} 
              onChange={this.handleFormChange}
            >
              <option value=""></option>
              <option value="VideoGamePerson">VideoGamePerson</option>
              <option value="VoiceActor">VoiceActor</option>
              <option value="Director">Director</option>
              <option value="WorkedOn">WorkedOn</option>
            </select>
            <label class="label-join">Natural Join</label>
            <select 
              id="join_relation_2"
              value={this.join_relation_1} 
              onChange={this.handleFormChange}
              style={{'margin-right':'10px'}}
            >
              <option value=""></option>
              <option value="VideoGamePerson">VideoGamePerson</option>
              <option value="VoiceActor">VoiceActor</option>
              <option value="Director">Director</option>
              <option value="WorkedOn">WorkedOn</option>
            </select>
            <input 
              className='search-button'
              type="submit" 
              value="SEARCH"
            />
          </form>
        </div>
        <div className="tool-content">
          {this.renderTable(this.state.natural_join_response)}
        </div>
      </div>
    );
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
              {this.getBestReviewers()}
              {this.getPasswordChanges()}
              {this.getPersonNaturalJoin()}
            </div>
          </div>
        </div>
      </div>
    ]
  }
}

export default Admin;