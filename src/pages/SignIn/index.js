/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import logo from '~/assets/logo.svg';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email.'),
  password: Yup.string().required('Please enter your password'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="FastFeet" />
        <label htmlFor="email">E-MAIL</label>
        <Input name="email" type="email" placeholder="example@email.com" />
        <label htmlFor="password">PASSWORD</label>
        <Input name="password" type="password" placeholder="*************" />

        <button type="submit">{loading ? 'Loading...' : 'Sign in'}</button>
      </Form>
    </>
  );
}
