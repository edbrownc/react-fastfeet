import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { MdMoreHoriz } from 'react-icons/md';

import { Divider, Menu } from '@material-ui/core';
import {
  StyledAsyncSelect,
  SelectContainer,
  StyledMenuItem,
  BlueEditIcon,
  RedDeleteIcon,
  Pagination,
  StyledAvatar,
} from '~/pages/_layouts/default/styles';
import api from '~/services/api';

export default function Couriers() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [couriersState, setCouriersState] = useState([]);
  const [anchorActions, setAnchorActions] = useState(null);
  const [page, setPage] = useState(1);
  const open = Boolean(anchorActions);

  // Load all Couriers first time loading the page
  useEffect(() => {
    async function loadCouriers() {
      const couriers = await api.get('/couriers');

      setCouriersState(couriers.data);
    }

    loadCouriers();
  }, []);

  async function setCouriers(name) {
    const couriers = await api.get('/couriers', { params: { page, name } });

    setCouriersState(couriers.data);
  }

  // Select functions
  function loadOptions(input, callback) {
    setTimeout(() => {
      api.get('/couriers', { params: { page, name: inputValue } }).then(res => {
        const options = res.data.map(courier => ({
          label: `${courier.name}`,
          value: `${courier.name}`,
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
    setCouriers(option.value);
  }

  // Actions menu functions
  function handleClickActions(event) {
    setAnchorActions(event.currentTarget);
  }

  function handleCloseActions() {
    setAnchorActions(null);
  }
  useEffect(() => {
    setCouriers(inputValue);
  }, [inputValue, page, setCouriers]);

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
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {couriersState.map(courier => (
            <tr>
              <td>#{courier.id}</td>
              <td>
                <StyledAvatar>EB</StyledAvatar>
              </td>
              <td>{courier.name}</td>
              <td>{courier.email}</td>
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
          disabled={couriersState.length < 20}
        >
          Next
        </button>
      </Pagination>
    </>
  );
}
