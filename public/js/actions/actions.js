import axios from 'axios';
import debounce from 'lodash.debounce';
import { ActionTypes as types } from '../constants';

export function changeOriginAmount(newAmount) {
  return {
    type: types.CHANGE_ORIGIN_AMOUNT,
    data: { newAmount: newAmount }
  }
}

export function changeOriginCurrency(newCurrency) {
  return {
    type: types.CHANGE_ORIGIN_CURRENCY,
    data: { newCurrency: newCurrency }
  }
}

export function changeDestinationCurrency(newCurrency) {
  return {
    type: types.CHANGE_DESTINATION_CURRENCY,
    data: { newCurrency: newCurrency }
  }
}

export function fetchConversionRate(payload) {
  return (dispatch) => {
    makeConvertionAjaxCall(payload, dispatch)
  }
}

function _makeConvertionAjaxCall(payload, dispatch) {
  dispatch({
    type: types.REQUEST_CONVERSION_RATE,
    data: payload
  });

  // ajax call for destination amount
  // originCurrency, destCurrency, originAmount
  axios.get('/api/conversion', {
    params: payload
  })
    .then((resp) => {
      dispatch({
        type: types.RECEIVED_CONVERSION_RATE_SUCCESS,
        data: resp.data
      });
    })
    .catch((err) => {
      dispatch({
        type: types.RECEIVED_CONVERSION_RATE_FAILURE,
        data: err
      });
    });
}

var makeConvertionAjaxCall = debounce(_makeConvertionAjaxCall, 300);

export function fetchFees(payload) {
  return (dispatch) => {
    makeFeeAjaxCall(payload, dispatch)
  }
}

function _makeFeeAjaxCall(payload, dispatch) {
  dispatch({
    type: types.REQUEST_FEES,
    data: payload
  });

  // ajax call for destination amount
  // originCurrency, destCurrency, originAmount
  axios.get('/api/fees', {
    params: payload
  })
    .then((resp) => {
      dispatch({
        type: types.RECEIVED_FEES_SUCCESS,
        data: resp.data
      });
    })
    .catch((err) => {
      dispatch({
        type: types.RECEIVED_FEES_FAILURE,
        data: err
      });
    });
}

var makeFeeAjaxCall = debounce(_makeFeeAjaxCall, 300);
