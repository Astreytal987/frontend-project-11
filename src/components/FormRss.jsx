import React, { useState } from 'react';
import * as yup from 'yup';

const validateUrl = (url) => {
  return new Promise((resolve, reject) => {
    const schema = yup.string().url('Ссылка должна быть валидным URL').required('URL is required');
    schema.validate(url)
      .then(() => resolve(null))
      .catch((error) => reject(error.message));
  });
};

const FormRss = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setError('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    validateUrl(url)
        .then(() => {
        })
        .catch((error) => {
            setError(error);
        });
  };

  return (
    <section className="container-fluid bg-dark p-5">
      <div className="row">
        <div className="col-md-10 col-lg-8 mx-auto text-white">
          <h1 className="display-3 mb-0">RSS агрегатор</h1>
          <p className="lead">
            Начните читать RSS сегодня! Это легко, это красиво.
          </p>
          <form className="rss-form text-body" onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col">
                <div className="form-floating">
                  <input
                    id="url-input"
                    autoFocus
                    required
                    name="url"
                    aria-label="url"
                    className="form-control w-100"
                    placeholder="ссылка RSS"
                    autoComplete="off"
                    value={url}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="url-input">Ссылка RSS</label>
                </div>
              </div>
              <div className="col-auto">
                <button
                  type="submit"
                  aria-label="add"
                  className="h-100 btn btn-lg btn-primary px-sm-5"
                >
                  Добавить
                </button>
              </div>
            </div>
          </form>
          <p className="mt-2 mb-0 text-muted">
            Пример: https://lorem-rss.hexlet.app/feed
          </p>
            {error && <p className="feedback m-0 position-absolute small text-danger">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default FormRss;