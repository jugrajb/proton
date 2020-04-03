import React from 'react';
import Header from '../../components/header/Header';
import './Admin.css';
import Card from '../../components/card/Card';
import TextInput from '../../components/text-input/TextInput';
import { del, deleteID } from '../../service/api';
import { get } from '../../service/api';


class Admin extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      ao_delete_oid: 0,
      ao_delete_info: {},
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.value >= 0 ? target.value : 0;
    this.setState({ao_delete_oid: value});
  }

  handleDelete(event) {
    event.preventDefault();
    let num_tuples = {};

    let ao_get = get('award-organization/');
    let vga_get = get('video-game-award/');
    let awarded_get = get('awarded/');

    const ao_del = deleteID('award-organization/', this.state.ao_delete_oid.toString());

    Promise.all([ao_get, vga_get, awarded_get])
    .then((res) => {
      num_tuples['award-organization'] = res[0].data.length;
      num_tuples['video-game-award'] = res[1].data.length;
      num_tuples['awarded'] = res[2].data.length;
      return ao_del;
    })
    .then((res) => {
      ao_get = get('award-organization/');
      vga_get = get('video-game-award/');
      awarded_get = get('awarded/');
      return Promise.all([ao_get, vga_get, awarded_get]);
    })
    .then((res) => {
      num_tuples['award-organization'] -= res[0].data.length;
      num_tuples['video-game-award'] -= res[1].data.length;
      num_tuples['awarded'] -= res[2].data.length;

      console.log('SUCCESS');
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
        <form onSubmit={this.handleDelete}>
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
              <div className="tool"></div>
              <div className="tool"></div>
            </div>
          </div>
        </div>
      </div>
    ]
  }
}

export default Admin;