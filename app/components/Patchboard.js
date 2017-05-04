// @flow
// import React, { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import stateReturn from '../store/state-return.js';
import PatchPreview from './PatchPreview.js';
import newPatch from '../actions/new-patch.js';

// import { Route, Link, NavLink } from 'react-router-dom';
// import container from '../../containers/all.js';

class Patchboard extends React.Component {
  constructor(props) {
    super(props);
    this.openPatchEdit = this.openPatchEdit.bind(this);
    this.handleNewPatch = this.handleNewPatch.bind(this);
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'SHOWING_PATCHBOARD',
      onNewPatchShortcut: this.handleNewPatch
    });
  }

  handleNewPatch() {
    this.props.dispatch(newPatch());
    if (this.props.history.location.pathname.includes('patch-edit')) {
      this.props.history.push(
        `/patch-edit/${this.props.bramble.patches[this.props.bramble.patches.length - 1].patchId}`
      );
    }
  }

  handleDeletePatch(patchId) {
    this.props.dispatch({ type: 'DELETE_PATCH', patchId: patchId });
  }

  openPatchEdit(patchId) {
    this.props.history.push(`/patch-edit/${patchId}`);
  }

  render() {
    return (
      <div className="patchboard-wrapper">
        <div className="header-controls">
          <button type="button" onClick={this.handleNewPatch} tabIndex="1">
            + new patch
          </button>
        </div>
        <section className="patchboard">
          {this.props.bramble.patches.map((patch, index) => {
            return (
              <PatchPreview
                key={patch.patchId}
                name={patch.name}
                patchId={patch.patchId}
                body={patch.body}
                openPatchEdit={() => this.openPatchEdit(patch.patchId)}
                deletePatch={() => this.handleDeletePatch(patch.patchId)}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default connect(stateReturn.allState)(Patchboard);
