import React, { Component } from "react";

export default class Search extends Component {
  state = { value: '' };
  onUserInput = ({ target: { value } }) => this.setState({ value });
  onKeyPress = e => e.key === "Enter" ? this.props.onSubmit(this.state.value) : null;
  render() {
    return (
      <div className="search">
        <input
          type="text"
          onChange={this.onUserInput}
          value={this.state.value}
          onKeyPress={this.onKeyPress}
        />
        <button onClick={() => this.props.onSubmit(this.state.value)}>Search</button>
      </div>
    );
  }
}
