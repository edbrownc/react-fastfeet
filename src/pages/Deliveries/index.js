import React, { useState } from 'react';

import {
  StyledAsyncSelect,
  SelectContainer,
} from '~/pages/_layouts/default/styles';

// import { Container } from './styles';

export default function Deliveries() {
  const [inputValue, setInputValue] = useState('');

  async function loadOptions(callback) {
    setTimeout(() => {
      console.tron.log(callback);
    }, 1000);
  }

  function handleInputChange(newValue) {
    setInputValue(newValue.replace(/\W/g, ''));
    return inputValue;
  }

  return (
    <>
      <header>
        <strong>Delivery management</strong>
      </header>

      <SelectContainer>
        <StyledAsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          onInputChange={handleInputChange}
        />
        <button type="button">NEW DELIVERY</button>
      </SelectContainer>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Recipient</th>
            <th>Courier</th>
            <th>City</th>
            <th>State</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#02</td>
            <td>Wolfgang Amadeus</td>
            <td>John Doe</td>
            <td>Vancouver</td>
            <td>BC</td>
            <td>Delivered</td>
            <td>...</td>
          </tr>
          <tr>
            <td>#03</td>
            <td>Whatever Whatever</td>
            <td>John Doe</td>
            <td>Vancouver</td>
            <td>BC</td>
            <td>Delivered</td>
            <td>...</td>
          </tr>
          <tr>
            <td>#04</td>
            <td>Ludwig van Beethoven</td>
            <td>John Doe</td>
            <td>Vancouver</td>
            <td>BC</td>
            <td>Delivered</td>
            <td>...</td>
          </tr>
          <tr>
            <td>#05</td>
            <td>Ludwig van Beethoven</td>
            <td>John Doe</td>
            <td>Vancouver</td>
            <td>BC</td>
            <td>Delivered</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
