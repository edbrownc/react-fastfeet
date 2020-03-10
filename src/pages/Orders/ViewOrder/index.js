import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { utcToZonedTime, format } from 'date-fns-tz';
import {
  Background,
  Container,
  Content,
  SignatureContainer,
  DateItem,
} from './styles';

export default function ViewOrder({ order, handleClickBackground }) {
  const [pickupDate, setPickupDate] = useState(null);
  const [deliveredDate, setDeliveredDate] = useState(null);

  const { street, number, city, state, zip } = order.recipient;

  const { start_date, end_date, signature } = order;

  useEffect(() => {
    function formaTzDate() {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (start_date) {
        const formattedPickupDate = format(
          utcToZonedTime(start_date, timezone),
          'mm/dd/yyyy',
          { timezone }
        );

        setPickupDate(formattedPickupDate);
      }

      if (end_date) {
        const formattedDeliveredDate = format(
          utcToZonedTime(start_date, timezone),
          'mm/dd/yyyy',
          { timezone }
        );

        setDeliveredDate(formattedDeliveredDate);
      }
    }

    formaTzDate();
  }, [end_date, start_date]);

  function handleContainerClick(event) {
    event.stopPropagation();
  }

  return (
    <Background onClick={handleClickBackground}>
      <Container onClick={handleContainerClick}>
        <Content>
          <h1>Order Info</h1>
          <small>
            {number}, {street}
          </small>
          <small>
            {city} - {state}
          </small>
          <small>{zip}</small>
          <hr />
          <h1>Dates</h1>
          <DateItem>
            <h2>Picked up:</h2>
            <small>{pickupDate}</small>
          </DateItem>
          <DateItem>
            <h2>Delivered:</h2>
            <small>{deliveredDate}</small>
          </DateItem>
          <hr />
          <h1>Signature</h1>
          <SignatureContainer>
            {signature ? (
              <img
                src={signature.url}
                width={234}
                height={34}
                alt="Signature"
              />
            ) : (
              <small>No signature provided yet</small>
            )}
          </SignatureContainer>
        </Content>
      </Container>
    </Background>
  );
}

ViewOrder.propTypes = {
  order: PropTypes.string.isRequired,
  handleClickBackground: PropTypes.func.isRequired,
};
