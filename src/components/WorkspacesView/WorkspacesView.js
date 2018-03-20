import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SubHeader from '../../components/SubHeader';
import SideBar from '../../components/SideBar';
import Loader from '../../components/Loader';

class WorkspacesView extends Component {
  componentWillMount() {
    // const { id } = this.props.match.params;
  }

  renderLoading = () => <Loader />;

  render() {
    return (
      <div>
        <SubHeader name="January Batch" />
        <div className="flex">
          <div className="flex-initial">
            <SideBar />
          </div>
          <div className="flex-item">
            <div className="container">
              <div className="panel">
                <p>Workspace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {

// }

WorkspacesView.propTypes = {
  match: PropTypes.object,
  id: PropTypes.string,
};

export default WorkspacesView;
