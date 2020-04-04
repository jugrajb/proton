import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextInput.css';

class TextInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    focussed: PropTypes.bool,
    value: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
    disableEnter: PropTypes.bool,
    locked: PropTypes.bool
  };

  static defaultProps = {
    focussed: false,
    value: '',
    label: '',
    type: "text",
    locked: false,
    onChange: () => '',
    disableEnter: false
  };

  constructor(props) {
    super(props);

    this.state = {
      focussed: props.focussed || false,
      value: props.value || '',
      label: props.label || ''
    }
  }

  handleChange(e) {
    const { id } = this.props
    const value = e.target.value;
    this.setState({ value });

    return this.props.onChange(id, value);
  }

  handleKey(e) {
    if(e.keyCode === 13 && !this.props.disableEnter) {
      this.setState({ value: "" });
    }
  }

  componentDidUpdate(props, prevProps) {
    if(props.label !== prevProps.label) {
      this.setState({label: props.label})
    }
  }

  render() {
    const { value } = this.state;
    const { id, type, label, locked } = this.props;

    return (
      <div style={this.props.style}>
        <input
          className="input"
          id={id}
          type={type}
          value={value}
          placeholder={label}
          onChange={e => this.handleChange(e)}
          onKeyDown={e => this.handleKey(e)}
          onFocus={() => this.setState({ focussed: true })}
          onBlur={() => this.setState({ focussed: false })}
          readOnly={locked}
        />
      </div>
    )
  }
}

export default TextInput