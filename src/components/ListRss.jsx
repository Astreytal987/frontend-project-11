import React, { useContext } from "react";
import ThemeContext from "../context/index";

const ListRss = () => {
  const { items, fids } = useContext(ThemeContext);
  console.log(items, fids);
  console.log(items.length !== 0 && fids.length !== 0);
  return (
    <section className="container-fluid container-xxl p-5">
      <div className="row">
        <div className="col-md-10 col-lg-8 order-1 mx-auto posts">
          {items.length !== 0 && (
            <div className="card border-0">
              <div className="card-body">
                <h2 className="card-title h4">Посты</h2>
              </div>
              <ul className="list-group border-0 rounded-0">
                {items.map((item) => (
                  <React.Fragment key={item.id}>
                    <li className="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
                      <a
                        href={item.href}
                        className="fw-bold"
                        data-id={item.id}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </a>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        data-id={item.id}
                        data-bs-toggle="modal"
                        data-bs-target="#modal"
                      >
                        Просмотр
                      </button>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds">
          {fids.length !== 0 && (
            <div className="card border-0">
              <div className="card-body">
                <h2 className="card-title h4">Фиды</h2>
              </div>
              <ul className="list-group border-0 rounded-0">
                {fids.map((item) => (
                  <React.Fragment key={item.id}>
                    <li className="list-group-item border-0 border-end-0">
                      <h3 className="h6 m-0">{item.title}</h3>
                      <p className="m-0 small text-black-50">
                        {item.description}
                      </p>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListRss;
