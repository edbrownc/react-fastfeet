import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';
import api from '~/services/api';
import { Container } from './styles';

export default function AvatarInput({ avatar }) {
  const { registerField } = useField('avatar');

  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  useEffect(() => {
    if (avatar) {
      const { id, url } = avatar;

      setFile(id);
      setPreview(url);
    }
  }, [avatar]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);
    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt=""
        />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
AvatarInput.propTypes = {
  avatar: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
