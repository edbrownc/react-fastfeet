import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { MdMoreHoriz } from 'react-icons/md';
import { Divider, Menu } from '@material-ui/core';
import history from '~/services/history';
import {
  StyledAsyncSelect,
  SelectContainer,
  StyledMenuItem,
  BlueEditIcon,
  RedDeleteIcon,
  Pagination,
} from '~/pages/_layouts/default/styles';
import api from '~/services/api';

export default function Recipients() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [anchorActions, setAnchorActions] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [page, setPage] = useState(1);
  const open = Boolean(anchorActions);

  // Load all Recipients first time loading the page
  useEffect(() => {
    async function loadRecipients() {
      const res = await api.get('/recipients');

      setRecipients(res.data);
    }

    loadRecipients();
  }, []);

  // Select functions
  function loadOptions(input, callback) {
    setTimeout(() => {
      api
        .get('/recipients', { params: { page, name: inputValue } })
        .then(res => {
          const options = res.data.map(recipient => ({
            label: `${recipient.name}`,
            value: `${recipient.name}`,
          }));

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
  function handleClickActions(event, recipient) {
    setAnchorActions(event.currentTarget);
    setSelectedRecipient(recipient);
  }

  function handleCloseActions() {
    setAnchorActions(null);
  }

  useEffect(() => {
    async function updateRecipientsPage() {
      const res = await api.get('/recipients', {
        params: { page, name: inputValue },
      });

      setRecipients(res.data);
    }

    updateRecipientsPage();
  }, [inputValue, page]);

  // Pagination functions
  function handlePagination(action) {
    setPage(action === 'next' ? page + 1 : page - 1);
  }

  // New Recipient function
  function handleNewRecipient() {
    history.push('/editrecipient');
  }

  // Actions menu functions
  async function handleDeleteRecipient() {
    setAnchorActions(null);

    const res = window.confirm(
      'Are you sure you want to remove this recipient?'
    );

    if (res === true) {
      await api.delete(`/recipients/${selectedRecipient.id}`);

      const recipientDeletedArray = recipients.filter(
        recipient => recipient !== selectedRecipient
      );
      setRecipients(recipientDeletedArray);
    }
  }

  function handleEditRecipient() {
    setAnchorActions(null);

    history.push('/editrecipient', { recipient: selectedRecipient });
  }

  return (
    <>
      <header>
        <strong>Recipients management</strong>
      </header>

      <SelectContainer>
        <StyledAsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          onChange={handleSelectChange}
          value={selectedOption}
          placeholder="Search by product"
        />
        <button type="button" onClick={handleNewRecipient}>
          NEW RECIPIENT
        </button>
      </SelectContainer>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map(recipient => (
            <tr>
              <td>#{recipient.id}</td>
              <td>{recipient.name}</td>
              <td>
                {recipient.number},{recipient.street},{recipient.city} -{' '}
                {recipient.state}
              </td>
              <td>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={e => handleClickActions(e, recipient)}
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
            <StyledMenuItem key="edit" onClick={handleEditRecipient}>
              <BlueEditIcon /> <span>Edit</span>
            </StyledMenuItem>
            <Divider variant="middle" />
            <StyledMenuItem key="delete" onClick={handleDeleteRecipient}>
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
          disabled={recipients.length < 20}
        >
          Next
        </button>
      </Pagination>
    </>
  );
}
