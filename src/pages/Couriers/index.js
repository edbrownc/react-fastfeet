import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { MdMoreHoriz } from 'react-icons/md';
import { Divider, Menu } from '@material-ui/core';
import history from '~/services/history';
import {
  StyledTable,
  StyledAsyncSelect,
  SelectContainer,
  StyledMenuItem,
  BlueEditIcon,
  RedDeleteIcon,
  Pagination,
  Avatar,
} from '~/pages/_layouts/default/styles';
import api from '~/services/api';

export default function Couriers() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [couriers, setCouriers] = useState([]);
  const [anchorActions, setAnchorActions] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState('');
  const [page, setPage] = useState(1);
  const open = Boolean(anchorActions);

  // Load all Couriers first time loading the page
  useEffect(() => {
    async function loadCouriers() {
      const res = await api.get('/couriers');

      setCouriers(res.data);
    }

    loadCouriers();
  }, []);

  // Select functions
  function loadOptions(input, callback) {
    setTimeout(() => {
      api.get('/couriers', { params: { page, name: inputValue } }).then(res => {
        const options = res.data.map(courier => ({
          label: `${courier.name}`,
          value: `${courier.name}`,
        }));

        // Add empty option
        options.unshift({
          label: ``,
          value: ``,
        });

        callback(options);
      });
    }, 1000);
  }

  function handleInputChange(newValue, params) {
    if (params.action === 'input-change') {
      const input = newValue.replace(/\W/g, ' ');

      setInputValue(input);
    }
  }

  async function handleSelectChange(option) {
    setSelectedOption(option);
    setPage(1);
    setInputValue(option.value);
  }

  // Actions menu functions
  function handleClickActions(event, courier) {
    setAnchorActions(event.currentTarget);
    setSelectedCourier(courier);
  }

  function handleCloseActions() {
    setAnchorActions(null);
  }

  useEffect(() => {
    async function updateCouriersPage() {
      const res = await api.get('/couriers', {
        params: { page, name: inputValue },
      });

      setCouriers(res.data);
    }

    updateCouriersPage();
  }, [inputValue, page]);

  // Pagination functions
  function handlePagination(action) {
    setPage(action === 'next' ? page + 1 : page - 1);
  }

  // New Courier function
  function handleNewCourier() {
    history.push('/editcourier');
  }

  // Actions menu functions
  async function handleDeleteCourier() {
    setAnchorActions(null);

    const res = window.confirm('Are you sure you want to remove this courier?');

    if (res === true) {
      await api.delete(`/couriers/${selectedCourier.id}`);

      const courierDeletedArray = couriers.filter(
        courier => courier !== selectedCourier
      );
      setCouriers(courierDeletedArray);
    }
  }

  function handleEditCourier() {
    setAnchorActions(null);

    history.push('/editcourier', { courier: selectedCourier });
  }

  return (
    <>
      <header>
        <strong>Couriers management</strong>
      </header>

      <SelectContainer>
        <StyledAsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          onChange={handleSelectChange}
          value={selectedOption}
          placeholder="Search by name"
        />
        <button type="button" onClick={handleNewCourier}>
          NEW COURIER
        </button>
      </SelectContainer>

      <StyledTable>
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
          {couriers.map(courier => (
            <tr>
              <td>#{courier.id}</td>
              <td>
                <Avatar
                  src={
                    courier.avatar
                      ? courier.avatar.url
                      : `https://api.adorable.io/avatar/35/${courier.name}`
                  }
                />
              </td>
              <td>{courier.name}</td>
              <td>{courier.email}</td>
              <td>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={e => handleClickActions(e, courier)}
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
            <StyledMenuItem key="edit" onClick={handleEditCourier}>
              <BlueEditIcon /> <span>Edit</span>
            </StyledMenuItem>
            <Divider variant="middle" />
            <StyledMenuItem key="delete" onClick={handleDeleteCourier}>
              <RedDeleteIcon /> <span>Delete</span>
            </StyledMenuItem>
          </Menu>
        </tbody>
      </StyledTable>

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
          disabled={couriers.length < 20}
        >
          Next
        </button>
      </Pagination>
    </>
  );
}
