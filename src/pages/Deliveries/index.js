import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { MdMoreHoriz } from 'react-icons/md';

import { Divider, Menu } from '@material-ui/core';
import {
  StyledAsyncSelect,
  SelectContainer,
  StyledMenuItem,
  PurpleViewIcon,
  BlueEditIcon,
  RedDeleteIcon,
  Pagination,
  StyledAvatar,
} from '~/pages/_layouts/default/styles';
import api from '~/services/api';

export default function Deliveries() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [deliveries, setDeliveries] = useState([]);
  const [anchorActions, setAnchorActions] = useState(null);
  const [page, setPage] = useState(1);
  const open = Boolean(anchorActions);

  // Load all deliveries first time loading the page
  useEffect(() => {
    async function loadDeliveries() {
      const orders = await api.get('/orders');

      setDeliveries(orders.data);
    }

    loadDeliveries();
  }, []);

  async function setOrders(product) {
    const orders = await api.get('/orders', { params: { page, product } });

    setDeliveries(orders.data);
  }

  // Select functions
  function loadOptions(input, callback) {
    setTimeout(() => {
      api
        .get('/orders', { params: { page, product: inputValue } })
        .then(res => {
          // Gets distinct products into new array
          const distinctProducts = Array.from(
            new Set(res.data.map(order => order.product))
          );

          // Turns array into options for the dropdown menu
          const options = distinctProducts.map(product => ({
            label: `${product}`,
            value: `${product}`,
          }));

          callback(options);
        });
    }, 1000);
  }

  function handleInputChange(newValue) {
    const input = newValue.replace(/\W/g, ' ');

    setInputValue(input);

    return input;
  }

  async function handleSelectChange(option) {
    setSelectedOption(option);
    setInputValue(option.value);

    setOrders(option.value);
  }

  // Actions menu functions
  function handleClickActions(event) {
    setAnchorActions(event.currentTarget);
  }

  function handleCloseActions() {
    setAnchorActions(null);
  }
  useEffect(() => {
    setOrders(inputValue);
  }, [inputValue, page, setOrders]);

  // Pagination functions
  function handlePagination(action) {
    setPage(action === 'next' ? page + 1 : page - 1);
  }

  // New Delivery function
  function handleNewDelivery() {}

  return (
    <>
      <header>
        <strong>Delivery management</strong>
      </header>

      <SelectContainer>
        <StyledAsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          onChange={handleSelectChange}
          placeholder="Search by product"
          value={selectedOption}
        />
        <button type="button" onClick={handleNewDelivery}>
          NEW DELIVERY
        </button>
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
          {deliveries.map(delivery => (
            <tr>
              <td>#{delivery.id}</td>
              <td>{delivery.recipient.name}</td>
              <td>
                <div>
                  <StyledAvatar>EB</StyledAvatar>
                  <span>{delivery.courier.name}</span>
                </div>
              </td>
              <td>{delivery.recipient.city}</td>
              <td>{delivery.recipient.state}</td>
              <td>{delivery.status}</td>
              <td>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClickActions}
                >
                  <MdMoreHoriz />
                </IconButton>
              </td>
            </tr>
          ))}
          <Menu
            id="simple-menu"
            anchorEl={anchorActions}
            keepMounted
            open={open}
            onClose={handleCloseActions}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <StyledMenuItem key="view" onClick={handleCloseActions}>
              <PurpleViewIcon /> <span>View</span>
            </StyledMenuItem>
            <Divider variant="middle" />
            <StyledMenuItem key="view" onClick={handleCloseActions}>
              <BlueEditIcon /> <span>Edit</span>
            </StyledMenuItem>
            <Divider variant="middle" />
            <StyledMenuItem key="view" onClick={handleCloseActions}>
              <RedDeleteIcon /> <span>Delete</span>
            </StyledMenuItem>
          </Menu>
        </tbody>
      </table>

      <Pagination>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => handlePagination('prev')}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          type="button"
          onClick={() => handlePagination('next')}
          disabled={deliveries.length < 20}
        >
          Next
        </button>
      </Pagination>
    </>
  );
}
