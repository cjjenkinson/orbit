import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message } from 'antd';

import * as alertSelectors from '../../store/Alert/selectors';
import { ALERT_CONTANTS } from '../../constants';

const Alert = ({ type, messageContent }) => {
  switch (type) {
    case ALERT_CONTANTS.success:
      return message.success(messageContent);
    case ALERT_CONTANTS.error:
      return message.error(messageContent);
    case ALERT_CONTANTS.info:
      return message.info(messageContent);
    case ALERT_CONTANTS.warning:
      return message.warning(messageContent);
    default:
      return null;
  }
};

const mapStateToProps = (state) => {
  const type = alertSelectors.getAlertType(state);
  const messageContent = alertSelectors.getAlertMessageContent(state);

  return {
    type,
    messageContent,
  };
};

Alert.propTypes = {
  type: PropTypes.string,
  messageContent: PropTypes.string,
};

export default connect(mapStateToProps, null)(Alert);
