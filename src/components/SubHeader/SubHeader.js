import React from 'react';
import PropTypes from 'prop-types';

import './SubHeader.css';

const SubHeader = ({ name }) => (
  <div className="clearfix subheader-container">
    <div className="col col-2 subheader-title-container">
      <p className="h5 breadcrumb">Workspaces</p>
      <p className="h5">{name}</p>
    </div>
  </div>
);

SubHeader.propTypes = {
  name: PropTypes.string,
};

export default SubHeader;
