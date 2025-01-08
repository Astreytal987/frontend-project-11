import React, { useState, useContext } from "react";
import * as yup from "yup";
// import { useTranslation } from 'react-i18next';
import ThemeContext from '../context/index';

const validateUrl = (url) => {
  return new Promise((resolve, reject) => {
    const schema = yup
      .string()
      .url("Ссылка должна быть валидным URL")
      .required("URL is required");
    schema
      .validate(url)
      .then(() => resolve(null))
      .catch((error) => reject(error.message));
  });
};

const fetchData = (url) => {
  return fetch(
    `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`
  ).then((response) => {
    if (response.ok) return response.json();
    throw new Error("Network response was not ok.");
  });
};

const handleParseData = (data, setItems, fids, setFids) => {
  const parser = new DOMParser();
  const DomTree = parser.parseFromString(data.contents, "text/html");
  const title = DomTree.querySelector('title').textContent.replace('<![CDATA[', '').replace(']]>', '');
  const hasTitle = fids.some(item => item.title === title); 
  if (hasTitle) {
    console.log("это копия")
    throw new Error("RSS уже существует"); 
  }
  try {
  const description = DomTree.querySelector("channel description").innerHTML
  setFids(prevFids => [...prevFids, {
    title: title,
    description: description.replace('\x3C!--[CDATA[', '').replace(']]-->', ''),
  }])
  const rawItems = DomTree.querySelectorAll("item");
  const parsedItems = Array.from(rawItems).map((item) => {
    const title = item.querySelector('title').innerText;
    const link = item.querySelector('guid').innerHTML;
    return {
      title: title.replace('<![CDATA[', '').replace(']]>', ''),
      href: link,
    };
  });
  setItems(prevItems => [...prevItems, ...parsedItems]);
} catch (error) {
  throw new Error("Ресурс не содержит валидный RSS");
}
};

const FormRss = () => {
  const [url, setUrl] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { items, setItems, fids, setFids } = useContext(ThemeContext);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setError("");
  };

  const handleFormSubmit = (e) => {
    setSuccess(false);
    e.preventDefault();
    validateUrl(url)
      .then(() => fetchData(url))
      .then((data) => handleParseData(data, setItems, fids, setFids))
      .then(() => { // Добавляем .then для успешного выполнения
        setSuccess(true);
      })
      .catch((error) => setError(error.message));
  };

  // const { t, i18n } = useTranslation();
  return (
    <section className="container-fluid bg-dark p-5">
      {/* <h1>{t('Welcome to React')}</h1> */}
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
          {error && (
            <p className="feedback m-0 position-absolute small text-danger">
              {error}
            </p>
          )}
          {
            success && <p className="feedback m-0 position-absolute small text-success">RSS успешно загружен</p>
          }
        </div>
      </div>
    </section>
  );
};

export default FormRss;

