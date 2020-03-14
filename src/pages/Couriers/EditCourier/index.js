/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import history from '~/services/history';
import {
  ButtonsContainer,
  HeaderContainer,
  Container,
  RegFormContainer,
} from '~/pages/_layouts/registration/styles';
import api from '~/services/api';
import AvatarInput from './AvatarInput';

const schema = Yup.object().shape({
  name: Yup.string().required('Please enter a name.'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter an email.'),
});

export default function EditCourier({ location }) {
  const [courier, setCourier] = useState(null);

  useEffect(() => {
    function loadInfo() {
      if (location.state) {
        setCourier(location.state.courier);
      }
    }

    loadInfo();
  }, [location]);

  function handleSubmit(data) {
    const { name, email, avatar_id } = data;

    schema
      .validate({ name, email })
      .then(async () => {
        if (courier) {
          await api
            .put(`/couriers/${courier.id}`, {
              name,
              email,
              avatar_id,
            })
            .then(() => {
              toast.success('Courier updated.');
              history.push('/couriers');
            });
        } else {
          await api
            .post('/couriers', {
              name,
              email,
              avatar_id,
            })
            .then(() => {
              toast.success('Courier created.');
              history.push('/couriers');
            });
        }
      })
      .catch(err => {
        toast.error(err.errors[0]);
      });
  }

  function handleBackBtn() {
    history.push('/couriers');
  }

  return (
    <Container>
      <HeaderContainer>
        <strong>Couriers management</strong>
        <ButtonsContainer>
          <button type="button" className="backBtn" onClick={handleBackBtn}>
            <MdKeyboardArrowLeft />
            BACK
          </button>
          <button type="submit" form="updateCourierForm" className="saveBtn">
            <MdDone />
            SAVE
          </button>
        </ButtonsContainer>
      </HeaderContainer>
      <RegFormContainer>
        <Form
          initialData={courier}
          id="updateCourierForm"
          onSubmit={handleSubmit}
        >
          <AvatarInput
            name="avatar_id"
            avatar={courier ? courier.avatar : null}
          />
          <label htmlFor="name">Name</label>
          <Input name="name" placeholder="Full name" />
          <label htmlFor="email">Email</label>
          <Input name="email" placeholder="Email address" />
        </Form>
      </RegFormContainer>
    </Container>
  );
}

EditCourier.propTypes = {
  location: PropTypes.string.isRequired,
};
