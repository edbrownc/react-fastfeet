import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { MdMoreHoriz } from 'react-icons/md';
import { Divider, Menu } from '@material-ui/core';
import { toast } from 'react-toastify';
import {
  StyledTable,
  StyledMenuItem,
  PurpleViewIcon,
  RedDeleteIcon,
  Pagination,
} from '~/pages/_layouts/default/styles';
import api from '~/services/api';
import ViewIssue from './ViewIssue';

export default function DeliveryIssues() {
  const [issues, setIssues] = useState([]);
  const [anchorActions, setAnchorActions] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [viewIssue, setViewIssue] = useState(false);
  const open = Boolean(anchorActions);

  // Load all issues first time loading the page
  useEffect(() => {
    async function loadIssues() {
      const res = await api.get('/orders/issues');

      setIssues(res.data);
    }

    loadIssues();
  }, []);

  // Actions menu functions
  function handleClickActions(event, Issue) {
    setAnchorActions(event.currentTarget);
    setSelectedIssue(Issue);
  }

  function handleCloseActions() {
    setAnchorActions(null);
  }

  async function handleCancelIssue() {
    setAnchorActions(null);

    const res = window.confirm('Are you sure you want cancel this order?');

    if (res === true) {
      try {
        await api.delete(`/orders/${selectedIssue.order_id}/cancel-delivery`);

        const issueCanceledArray = issues.filter(
          Issue => Issue !== selectedIssue
        );

        setIssues(issueCanceledArray);

        toast.success('Delivery canceled successfuly.');
      } catch (error) {
        toast.error(
          'There was an error canceling the delivery. Please try again.'
        );
      }
    }
  }

  function handleViewIssue() {
    setAnchorActions(null);
    setViewIssue(true);
  }

  // Pagination functions
  useEffect(() => {
    async function updateIssuesPage() {
      const res = await api.get('/orders/issues');

      setIssues(res.data);
    }

    updateIssuesPage();
  }, [page]);

  function handlePagination(action) {
    setPage(action === 'next' ? page + 1 : page - 1);
  }

  // View Issue functions
  function handleClickBackground() {
    setViewIssue(false);
  }

  return (
    <>
      <header>
        <strong>Delivery issues</strong>
      </header>

      <StyledTable>
        <thead>
          <tr>
            <th>Delivery ID</th>
            <th>Issue description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(Issue => (
            <tr key={Issue.id}>
              <td>#{Issue.order_id}</td>
              <td>{Issue.description}</td>
              <td>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={e => handleClickActions(e, Issue)}
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
            <StyledMenuItem key="view" onClick={handleViewIssue}>
              <PurpleViewIcon /> <span>View</span>
            </StyledMenuItem>
            <Divider variant="middle" />
            <StyledMenuItem key="cancel" onClick={handleCancelIssue}>
              <RedDeleteIcon /> <span>Cancel order</span>
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
          disabled={issues.length < 20}
        >
          Next
        </button>
      </Pagination>
      {viewIssue ? (
        <ViewIssue
          Issue={selectedIssue}
          handleClickBackground={handleClickBackground}
        />
      ) : null}
    </>
  );
}
