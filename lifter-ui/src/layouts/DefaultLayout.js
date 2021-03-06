/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var PageStore = require('../stores/PageStore');
var Link = require('../components/Link');
var Navbar = require('../components/Navbar');


/**
 * Retrieve the current page metadata from the PageStore.
 * @returns {{title: string}}
 */
function getState() {
  return {
    title: PageStore.getCurrentPage().title
  };
}

var DefaultLayout = React.createClass({

  getInitialState() {
    return getState();
  },

  componentDidMount() {
    PageStore.addEventListener(this._onChange);
    this._onChange();
  },

  componentWillUnmount() {
    PageStore.removeEventListener(this._onChange);
  },

  render() {
    var header = this.props.children.type.breadcrumb ? (
      <div className="container">
        <h2>{this.state.title}</h2>
        {this.props.children.type.breadcrumb}
      </div>
    ) : (
      <div className="jumbotron">
        <div className="container text-center">
          <h1>Lifter UI</h1>
          <p>Monitor your Docker containers</p>
        </div>
      </div>
    );

    return (
      <div>
        <Navbar />
        {header}
        {this.props.children}
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the PageStore
   */
  _onChange() {
    this.setState(getState());
  }
});

module.exports = DefaultLayout;
