import React, { useState } from 'react';
import urlMetadata from 'url-metadata';

const Editor = () => {
  const [url, setUrl] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const onSubmit = async () => {
    if (url) {
      const result = await urlMetadata(url);
      console.log(result);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        <input onChange={onChange} />
      </label>
    </form>
  );
};

export default Editor;
