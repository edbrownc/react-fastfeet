/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '~/services/history';
import {
  ButtonsContainer,
  HeaderContainer,
  Container,
} from '~/pages/_layouts/registration/styles';
import api from '~/services/api';
import { RowContainer, GridContainer } from './styles';

export default function EditRecipient({ location }) {
  const [recipient, setRecipient] = useState(null);
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  useEffect(() => {
    function loadInfo() {
      if (location.state) {
        const recipientProp = location.state.recipient;

        setRecipient(recipientProp);
        setName(recipientProp.name);
        setStreet(recipientProp.street);
        setNumber(recipientProp.number);
        setComplement(recipientProp.complement);
        setCity(recipientProp.city);
        setState(recipientProp.state);
        setZip(recipientProp.zip);
      }
    }

    loadInfo();
  }, [location]);

  function handleNameInputChange(e) {
    setName(e.target.value);
  }
  function handleStreetInputChange(e) {
    setStreet(e.target.value);
  }
  function handleNumberInputChange(e) {
    setNumber(e.target.value);
  }
  function handleComplementInputChange(e) {
    setComplement(e.target.value);
  }
  function handleCityInputChange(e) {
    setCity(e.target.value);
  }
  function handleStateInputChange(e) {
    setState(e.target.value);
  }
  function handleZipInputChange(e) {
    setZip(e.target.value);
  }

  async function handleSaveRecipient() {
    if (!name) {
      toast.error('Please enter a name.');
      return;
    }
    if (!street) {
      toast.error('Please enter a street.');
      return;
    }
    if (!number) {
      toast.error('Please enter a number.');
      return;
    }
    if (!city) {
      toast.error('Please enter a city.');
      return;
    }
    if (!state) {
      toast.error('Please enter a state.');
      return;
    }
    if (!zip) {
      toast.error('Please enter a zip.');
      return;
    }

    // If it has recipient prop then it is an edit else it is new recipient
    if (recipient) {
      await api
        .put(`/recipients/${recipient.id}`, {
          name,
          street,
          number,
          complement,
          city,
          state,
          zip,
        })
        .then(() => {
          toast.success('Recipient updated.');
          history.push('/recipients');
        })
        .catch(err => console.tron.log(err));
    } else {
      await api
        .post('/recipients', {
          name,
          street,
          number,
          complement,
          city,
          state,
          zip,
        })
        .then(() => {
          toast.success('Recipient created.');
          history.push('/recipients');
        });
    }
  }

  function handleBackBtn() {
    history.push('/recipients');
  }

  return (
    <Container>
      <HeaderContainer>
        <strong>Recipients management</strong>
        <ButtonsContainer>
          <button type="button" className="backBtn" onClick={handleBackBtn}>
            <MdKeyboardArrowLeft />
            BACK
          </button>
          <button
            type="button"
            className="saveBtn"
            onClick={handleSaveRecipient}
          >
            <MdDone />
            SAVE
          </button>
        </ButtonsContainer>
      </HeaderContainer>
      <GridContainer>
        <RowContainer columns={1}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleNameInputChange}
            />
          </div>
        </RowContainer>
        <RowContainer columns={4} spanColumn="1" spanSize="2">
          <div>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              placeholder="Street"
              value={street}
              onChange={handleStreetInputChange}
            />
          </div>
          <div>
            <label htmlFor="number">Number</label>
            <input
              type="text"
              id="number"
              name="number"
              placeholder="Number"
              value={number}
              onChange={handleNumberInputChange}
            />
          </div>
          <div>
            <label htmlFor="complement">Complement</label>
            <input
              type="text"
              id="complement"
              name="complement"
              placeholder="Complement"
              value={complement}
              onChange={handleComplementInputChange}
            />
          </div>
        </RowContainer>
        <RowContainer columns={3}>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={city}
              onChange={handleCityInputChange}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={state}
              onChange={handleStateInputChange}
            />
          </div>
          <div>
            <label htmlFor="zip">Zip</label>
            <input
              type="text"
              id="zip"
              name="zip"
              placeholder="Zip"
              value={zip}
              onChange={handleZipInputChange}
            />
          </div>
        </RowContainer>
      </GridContainer>
    </Container>
  );
}

EditRecipient.propTypes = {
  location: PropTypes.string.isRequired,
};
