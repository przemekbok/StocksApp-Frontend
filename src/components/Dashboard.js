import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import MainScreen from './MainScreen';

class Dashboard extends Component {
  async componentDidMount() {
    this.props.getSecret();
  }

  render() {
    return (
      <MainScreen />
      // <div>
      //   This is a dashboard Our secret:
      //   <br /> <h3>{this.props.secret}</h3>
      // </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    secret: state.dash.secret,
  };
}

export default connect(mapStateToProps, actions)(Dashboard);