import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { MdMoreHoriz } from 'react-icons/md';
import { Divider, Menu } from '@material-ui/core';
import history from '~/services/history';
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
import ViewOrder from './ViewOrder';

export default function Orders() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [orders, setOrders] = useState([]);
  const [anchorActions, setAnchorActions] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [viewOrder, setViewOrder] = useState(false);
  const open = Boolean(anchorActions);

  // Load all orders first time loading the page
  useEffect(() => {
    async function loadOrders() {
      const res = await api.get('/orders');

      setOrders(res.data);
    }

    loadOrders();
  }, []);

  // Select functions
  function loadOptions(input, callback) {
    setTimeout(() => {
      api.get('/orders', { params: { product: input } }).then(res => {
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

  function handleInputChange(newValue, params) {
    if (params.action === 'input-change') {
      const input = newValue.replace(/\W/g, ' ');

      setInputValue(input);
    }
  }

  function handleSelectChange(option) {
    setSelectedOption(option);
    setPage(1);
    setInputValue(option.value);
  }

  // Actions menu functions
  function handleClickActions(event, order) {
    setAnchorActions(event.currentTarget);
    setSelectedOrder(order);
  }

  function handleCloseActions() {
    setAnchorActions(null);
  }

  async function handleDeleteOrder() {
    setAnchorActions(null);

    const res = window.confirm('Are you sure you want to delete this order?');

    if (res === true) {
      await api.delete(`/orders/${selectedOrder.id}`);

      const orderDeletedArray = orders.filter(order => order !== selectedOrder);
      setOrders(orderDeletedArray);
    }
  }

  function handleViewOrder() {
    setAnchorActions(null);
    setViewOrder(true);
  }

  function handleEditOrder() {
    setAnchorActions(null);

    history.push('/editorder', { order: selectedOrder });
  }

  // Pagination functions
  useEffect(() => {
    async function updateOrdersPage() {
      const res = await api.get('/orders', {
        params: { page, product: inputValue },
      });

      setOrders(res.data);
    }

    updateOrdersPage();
  }, [inputValue, page]);

  function handlePagination(action) {
    setPage(action === 'next' ? page + 1 : page - 1);
  }

  // New Order function
  function handleNewOrder() {
    history.push('/editorder');
  }

  // View Order functions
  function handleClickBackground() {
    setViewOrder(false);
  }

  return (
    <>
      <header>
        <strong>Order management</strong>
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
        <button type="button" onClick={handleNewOrder}>
          NEW ORDER
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
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.recipient.name}</td>
              <td>
                <div>
                  <StyledAvatar>EB</StyledAvatar>
                  <span>{order.courier.name}</span>
                </div>
              </td>
              <td>{order.recipient.city}</td>
              <td>{order.recipient.state}</td>
              <td>{order.status}</td>
              <td>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={e => handleClickActions(e, order)}
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
            <StyledMenuItem key="view" onClick={handleViewOrder}>
              <PurpleViewIcon /> <span>View</span>
            </StyledMenuItem>
            <Divider variant="middle" />
            <StyledMenuItem key="edit" onClick={handleEditOrder}>
              <BlueEditIcon /> <span>Edit</span>
            </StyledMenuItem>
            <Divider variant="middle" />
            <StyledMenuItem key="delete" onClick={handleDeleteOrder}>
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
          disabled={orders.length < 20}
        >
          Next
        </button>
      </Pagination>
      {viewOrder ? (
        <ViewOrder
          order={selectedOrder}
          handleClickBackground={handleClickBackground}
        />
      ) : null}
    </>
  );
}
