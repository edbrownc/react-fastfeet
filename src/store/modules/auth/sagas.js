import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    if (!user.isAdmin) {
      toast.error('User not an admin');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/deliveries');
  } catch (error) {
    toast.error('Authentication failed, please check your credentials');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
