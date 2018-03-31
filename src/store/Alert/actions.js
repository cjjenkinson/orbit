import * as types from './actionTypes';

/*
Rendering an alert from state is executed as a seperate dispatch
function which is assed the type and message content at dispatch.

This will pass on the props required to render the Alert component from the
alert reducer. If you need to render an alert from a component then
use the actions below.
*/

export const showSuccessAlert = messageContent => ({ type: types.ALERT_SUCCESS, messageContent });
export const showErrorAlert = messageContent => ({ type: types.ALERT_ERROR, messageContent });
export const showInfoAlert = messageContent => ({ type: types.ALERT_INFO, messageContent });
export const showWarningAlert = messageContent => ({ type: types.ALERT_WARNING, messageContent });
