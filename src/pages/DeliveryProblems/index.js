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
import ViewProblem from './ViewProblem';

export default function DeliveryProblems() {
  const [problems, setProblems] = useState([]);
  const [anchorActions, setAnchorActions] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedProblem, setSelectedProblem] = useState('');
  const [viewProblem, setViewProblem] = useState(false);
  const open = Boolean(anchorActions);

  // Load all problems first time loading the page
  useEffect(() => {
    async function loadProblems() {
      const res = await api.get('/orders/issues');

      setProblems(res.data);
    }

    loadProblems();
  }, []);

  // Actions menu functions
  function handleClickActions(event, problem) {
    setAnchorActions(event.currentTarget);
    setSelectedProblem(problem);
  }

  function handleCloseActions() {
    setAnchorActions(null);
  }

  async function handleCancelProblem() {
    setAnchorActions(null);

    const res = window.confirm('Are you sure you want cancel this order?');

    if (res === true) {
      try {
        await api.delete(`/orders/${selectedProblem.order_id}/cancel-delivery`);

        const problemCanceledArray = problems.filter(
          problem => problem !== selectedProblem
        );

        setProblems(problemCanceledArray);

        toast.success('Delivery canceled successfuly.');
      } catch (error) {
        toast.error(
          'There was an error canceling the delivery. Please try again.'
        );
      }
    }
  }

  function handleViewProblem() {
    setAnchorActions(null);
    setViewProblem(true);
  }

  // Pagination functions
  useEffect(() => {
    async function updateProblemsPage() {
      const res = await api.get('/orders/issues');

      setProblems(res.data);
    }

    updateProblemsPage();
  }, [page]);

  function handlePagination(action) {
    setPage(action === 'next' ? page + 1 : page - 1);
  }

  // View Problem functions
  function handleClickBackground() {
    setViewProblem(false);
  }

  return (
    <>
      <header>
        <strong>Delivery problems</strong>
      </header>

      <StyledTable>
        <thead>
          <tr>
            <th>Delivery ID</th>
            <th>Problem description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(problem => (
            <tr key={problem.id}>
              <td>#{problem.order_id}</td>
              <td>{problem.description}</td>
              <td>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={e => handleClickActions(e, problem)}
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
            <StyledMenuItem key="view" onClick={handleViewProblem}>
              <PurpleViewIcon /> <span>View</span>
            </StyledMenuItem>
            <Divider variant="middle" />
            <StyledMenuItem key="cancel" onClick={handleCancelProblem}>
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
          disabled={problems.length < 20}
        >
          Next
        </button>
      </Pagination>
      {viewProblem ? (
        <ViewProblem
          problem={selectedProblem}
          handleClickBackground={handleClickBackground}
        />
      ) : null}
    </>
  );
}
