import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

export default (OriginalComponent) => {
  class MixedComponent extends Component {
    async getCredentials() {
      await this.props.getCredentials().then(() => {
        return <OriginalComponent {...this.props} />;
      });
    }
    // componentWillMount() {
    //   this.getCredentials();
    // }
    // componentWillUpdate() {
    //   this.getCredentials();
    // }

    render() {
      return <React.Fragment>{this.getCredentials()}</React.Fragment>;
    }
  }

  return connect(null, actions)(MixedComponent);
};
