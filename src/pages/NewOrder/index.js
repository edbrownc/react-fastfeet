import React, { useState } from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
// import { Container } from './styles';
import AsyncSelect from 'react-select/async';

import { toast } from 'react-toastify';
import history from '~/services/history';
import {
  ButtonsContainer,
  HeaderContainer,
  Container,
  RegContainer,
} from '~/pages/_layouts/registration/styles';
import api from '~/services/api';

export default function NewOrder() {
  const [recInputValue, setRecInputValue] = useState('');
  const [courierInputValue, setCourierInputValue] = useState('');

  const [recSelectedOption, setRecSelectedOption] = useState('');
  const [courierSelectedOption, setCourierSelectedOption] = useState('');

  const [productInput, setProductInput] = useState('');

  // Recipient select functions
  function loadRecipientOptions(input, callback) {
    setTimeout(() => {
      api.get('/recipients', { params: { name: recInputValue } }).then(res => {
        // Turns array into options for the dropdown menu
        const options = res.data.map(recipient => ({
          label: `${recipient.name}`,
          value: `${recipient.id}`,
        }));

        console.tron.log(res.data);

        callback(options);
      });
    }, 1000);
  }

  function handleRecInputChange(newValue) {
    const input = newValue.replace(/\W/g, ' ');

    setRecInputValue(input);

    return input;
  }

  async function handleRecSelectChange(option) {
    setRecSelectedOption(option);
    setRecInputValue(option.value);
  }

  // Courier select functions
  function loadCourierOptions(input, callback) {
    setTimeout(() => {
      api
        .get('/couriers', { params: { name: courierInputValue } })
        .then(res => {
          // Turns array into options for the dropdown menu
          const options = res.data.map(courier => ({
            label: `${courier.name}`,
            value: `${courier.id}`,
          }));

          console.tron.log(res.data);

          callback(options);
        });
    }, 1000);
  }

  function handleCourierInputChange(newValue) {
    const input = newValue.replace(/\W/g, ' ');

    setCourierInputValue(input);

    return input;
  }

  async function handleCourierSelectChange(option) {
    setCourierSelectedOption(option);
    setCourierInputValue(option.value);
  }

  function handleProdInputChange(e) {
    setProductInput(e.target.value);
  }

  async function handleSaveOrder() {
    const recipientId = recSelectedOption.value;
    const courierId = courierSelectedOption.value;
    const product = productInput;

    if (!recipientId) {
      toast.error('Please select a recipient.');
      return;
    }

    if (!courierId) {
      toast.error('Please select a courier.');
      return;
    }

    if (!product) {
      toast.error('Please enter a product.');
      return;
    }

    await api
      .post('/orders', {
        recipient_id: recipientId,
        courier_id: courierId,
        product,
      })
      .then(() => {
        toast.success('Order created.');
        history.push('/orders');
      });
  }

  function handleBackBtn() {
    history.push('/orders');
  }

  return (
    <Container>
      <HeaderContainer>
        <strong>Orders management</strong>
        <ButtonsContainer>
          <button type="button" className="backBtn" onClick={handleBackBtn}>
            <MdKeyboardArrowLeft />
            BACK
          </button>
          <button type="button" className="saveBtn" onClick={handleSaveOrder}>
            <MdDone />
            SAVE
          </button>
        </ButtonsContainer>
      </HeaderContainer>
      <RegContainer>
        <div>
          <strong>Recipient</strong>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadRecipientOptions}
            onInputChange={handleRecInputChange}
            onChange={handleRecSelectChange}
            placeholder="Recipient"
            value={recSelectedOption}
          />
        </div>
        <div>
          <strong>Courier</strong>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadCourierOptions}
            onInputChange={handleCourierInputChange}
            onChange={handleCourierSelectChange}
            placeholder="Courier"
            value={courierSelectedOption}
          />
        </div>
        <div>
          <strong>Product</strong>
          <input
            type="text"
            id="product"
            name="product"
            placeholder="Product"
            onChange={handleProdInputChange}
          />
        </div>
      </RegContainer>
    </Container>
  );
}
