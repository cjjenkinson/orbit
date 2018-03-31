import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

import { ALERT_CONTANTS } from '../../constants';

/** Alert Reducer */

const initialState = Immutable({
  type: undefined,
  messageContent: undefined,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.ALERT_SUCCESS:
      return {
        type: ALERT_CONTANTS.success,
        messageContent: action.messageContent,
      };
    case types.ALERT_ERROR:
      return {
        type: ALERT_CONTANTS.error,
        messageContent: action.messageContent,
      };
    case types.ALERT_INFO:
      return {
        type: ALERT_CONTANTS.info,
        messageContent: action.messageContent,
      };
    case types.ALERT_WARNING:
      return {
        type: ALERT_CONTANTS.warning,
        messageContent: action.messageContent,
      };
    default:
      return state;
  }
}
