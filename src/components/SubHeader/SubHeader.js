import React from 'react';
import PropTypes from 'prop-types';

import './SubHeader.css';

const SubHeader = ({ subHeaderComponent }) => (
  <div className="subheader-container">
    <div className="subheader-content">
      {subHeaderComponent}
    </div>
  </div>
);

SubHeader.propTypes = {
  subHeaderComponent: PropTypes.node,
};

export default SubHeader;
