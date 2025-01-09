import React, { useState, useContext, useEffect, useRef } from "react";
import * as yup from "yup";
// import { useTranslation } from 'react-i18next';
import ThemeContext from "../context/index";

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
    `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`
  ).then((response) => {
    if (response.ok) return response.json();
    throw new Error("Network response was not ok.");
  });
};

const handleParseData = (data, setItems, fids, setFids) => {
  const parser = new DOMParser();
  const DomTree = parser.parseFromString(data.contents, "text/html");
  const title = DomTree.querySelector("title")
    .textContent.replace("<![CDATA[", "")
    .replace("]]>", "");
  const hasTitle = fids.some((item) => item.title === title);
  if (hasTitle) {
    throw new Error("RSS уже существует");
  }
  try {
    const description = DomTree.querySelector("channel description").innerHTML;
    setFids((prevFids) => [
      ...prevFids,
      {
        url: data.status.url,
        title: title,
        description: description
          .replace("\x3C!--[CDATA[", "")
          .replace("]]-->", ""),
      },
    ]);
    const rawItems = DomTree.querySelectorAll("item");
    const parsedItems = Array.from(rawItems).map((item) => {
      const title = item.querySelector("title").innerText;
      const link = item.querySelector("guid").innerHTML;
      const description = DomTree.querySelector("description").innerHTML;
      return {
        title: title.replace("<![CDATA[", "").replace("]]>", ""),
        description: description.replace("\x3C!--[CDATA[", "").replace("]]-->", ""),
        href: link,
      };
    });
    console.log(parsedItems)
    setItems((prevItems) => [...parsedItems, ...prevItems]);
  } catch (error) {
    throw new Error("Ресурс не содержит валидный RSS");
  }
};

const updateItems = (items, setItems, fids) => {
  const promises = fids.map(feed => {
    return fetchData(feed.url)
      .then(data => {
        const parser = new DOMParser();
        const DomTree = parser.parseFromString(data.contents, "text/html");
        const rawItems = DomTree.querySelectorAll("item");
        return Array.from(rawItems).reduce((acc, item) => {
          const title = item.querySelector("title").textContent.replace("<![CDATA[", "").replace("]]>", "");
          const link = item.querySelector("guid").textContent;
          if (!items.some(existingItem => existingItem.title === title)) {
            acc.push({
              title,
              href: link
            });
          }
           return acc;
          }, []);
        })
        .catch((error) => {
          console.error("Failed to fetch or parse data:", error);
          return []; 
        });
      });
      
      Promise.all(promises)
      .then(results => {
      const newItems = results.flat();
      if(newItems.length > 0) {
        setItems(prevItems => {
          const combinedItems = [...newItems, ...prevItems];
           const uniqueItems = Array.from(new Map(combinedItems.map(item => [item.href, item])).values());
           return uniqueItems;
        });
      }
    })
    .catch(error => {
      console.error("Failed to process all items:", error);
    });
};

const FormRss = () => {
  const [url, setUrl] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { items, setItems, fids, setFids } = useContext(ThemeContext);
  const timeoutRef = useRef(null);

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
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => setError(error.message));
  };

  const update = () => {
    if (fids.length > 0) {
      updateItems(items, setItems, fids);
      timeoutRef.current = setTimeout(update, 5000);
    }
  };

  useEffect(() => {
    update();
    console.log("обнова")
    return () => clearTimeout(timeoutRef.current);
  }, [fids]);

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
          {success && (
            <p className="feedback m-0 position-absolute small text-success">
              RSS успешно загружен
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FormRss;
