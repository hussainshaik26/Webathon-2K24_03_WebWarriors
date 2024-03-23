import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./Main.css";

function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterTag, setFilterTag] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event) => {
    setFilterGenre(event.target.value);
  };

  const handleTagChange = (event) => {
    setFilterTag(event.target.value);
  };

  let [search, setSearch] = useState("");
  let [products, setProducts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log("error in fetching the data", err));
  }, []);

  function handleDetails(itemId) {
    let product = products.find((prod) => prod.id === itemId);
    console.log(product);
    navigate("/article", { state: product });
  }

  function handleSearch(searchEvent) {
    setSearch(searchEvent.target.value);
  }

  return (
    <div>
      <Nav />
      <div className="row">
        <div className="col-9">
          <div className="bcg pt-0 p-3">
            <div className="app-div pt-0">
              {search === "" ? (
                <div className="">
                  {products.map((item) => (
                    <div className="p-3 bg-white p-3 shadow row rounded m-2 mt-3">
                      {/* <div className="col-2">
                        <img
                          src={item.image}
                          className="mx-auto p-2 w-100"
                          alt={item.title}
                        />
                      </div> */}
                      <div className="col-10">
                        <div className="text-center">
                          <p className="card-title fs-5 fw-bold">
                            {item.title}
                          </p>
                          <p className="fs-5 fw-semibold">{item.category}</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div
                          className="btn btn-light details fw-semibold"
                          onClick={() => handleDetails(item.id)}
                        >
                          Details
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row">
                  {products.map(
                    (item) =>
                      item.title
                        .toLowerCase()
                        .includes(search.toLowerCase()) && (
                        <div
                          key={item.id}
                          className="col-md-12 mb-4 d-grid justify-content-space-around"
                          style={{ minHeight: "50vh" }}
                        >
                          <div className="card Card bg-white p-3 shadow">
                            <img
                              src={item.image}
                              className="card-img w-50 mx-auto h-50 mb-5 p-2"
                              alt={item.title}
                            />
                            <div className="card-body text-center">
                              <h5 className="card-title fs-4 fw-bold">
                                {item.title}
                              </h5>
                            </div>
                            <div
                              className="btn btn-light details mx-auto fw-semibold fs-4 mb-3"
                              onClick={() => handleDetails(item.id)}
                            >
                              Details
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-2">
          <h3 className="pt-5">Filter</h3>
          <>
            {/* <div className="form-group pt-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-bar form-contr rounded"
              />
            </div> */}

            <div className="form-group pt-5">
              <select
                value={filterGenre}
                onChange={handleGenreChange}
                className="filter-select form-contr rounded"
              >
                <option value="">All Genres</option>
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option value="comedy">Comedy</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="form-group pt-5 pb-5">
              <select
                value={filterTag}
                onChange={handleTagChange}
                className="filter-select form-contr rounded"
              >
                <option value="">All Tags</option>
                <option value="science-fiction">Science Fiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="drama">Drama</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default Main;