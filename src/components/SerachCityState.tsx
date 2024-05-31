import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface CityState {
  totalRecord: string;
  city_id: string;
  city_name: string;
  city_state: string;
}

const SerachCityState = () => {
  const pageSize = 10;
  const [showTable, setShowTable] = useState(true);
  const [searchData, setSearchData] = useState({
    searchcolumn: "",
    searchtext: "",
    pageno: 1,
    pageSize: pageSize,
  });
  const [cityStates, setCityStates] = useState<CityState[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (data: { selected: number }) => {
    setSearchData({
      ...searchData,
      pageno: data.selected + 1,
    });
  };

  const schema = z.object({
    searchtext: z
      .string()
      .min(2, { message: "Searchtext should be atleast 2 character." })
      .max(50, { message: "Searchtext must contain at most 50 character" }),
    searchcolumn: z
      .string()
      .trim()
      .nonempty({ message: "Please select search column." }),
  });

  type SerchFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SerchFormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (searchData.searchcolumn && searchData.searchtext) {
      axios
        .get<CityState[]>(
          `http://localhost:5049/api/CityState?column=${searchData.searchcolumn}&searchtext=${searchData.searchtext}&pageno=${searchData.pageno}&pagesize=${pageSize}`
        )
        .then((res) => {
          setCityStates(res.data);
          if (res.data.length > 0) {
            setPageCount(Math.ceil(parseInt(res.data[0].totalRecord) / 10));
            console.log(parseInt(res.data[0].totalRecord) / 10);
          } else {
            setPageCount(0);
          }
        });
    }
  }, [searchData]);

  const OnSubmit = (data: SerchFormData) => {
    setSearchData({
      ...searchData,
      searchcolumn: data.searchcolumn,
      searchtext: data.searchtext,
    });
  };

  return (
    <>
      <main className="mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h4>Dashboard</h4>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="card">
                <div className="card-header">
                  <span>
                    <i className="bi bi-table me-2"></i>
                  </span>{" "}
                  Search City State
                </div>
                <div className="card-body">
                  <form
                    className="row g-3"
                    onSubmit={handleSubmit((data) => OnSubmit(data))}
                  >
                    <div className="col">
                      <label htmlFor="searchcolumn" className="form-label">
                        Select Column
                      </label>
                      <select
                        {...register("searchcolumn")}
                        id="searchcolumn"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        <option value="City">City</option>
                        <option value="State">State</option>
                      </select>
                      {errors.searchcolumn && (
                        <p className="text-danger">
                          {errors.searchcolumn.message}
                        </p>
                      )}
                    </div>
                    <div className="col">
                      <label htmlFor="searchtext" className="form-label">
                        Search Text
                      </label>
                      <input
                        {...register("searchtext")}
                        id="searchtext"
                        type="text"
                        className="form-control"
                        placeholder="search text"
                        aria-label="Last name"
                      />
                      {errors.searchtext && (
                        <p className="text-danger">
                          {errors.searchtext.message}
                        </p>
                      )}
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        Search
                      </button>
                    </div>
                  </form>
                  <div className="row mt-3">
                    {showTable && (
                      <React.Fragment>
                        <div className="col-12">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">City</th>
                                <th scope="col">State</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cityStates.length == 0 ? (
                                <tr>
                                  <td colSpan={3}>No Record Found</td>
                                </tr>
                              ) : null}
                              {cityStates &&
                                cityStates.map((data) => (
                                  <tr>
                                    <th scope="row">{data.city_id}</th>
                                    <td>{data.city_name}</td>
                                    <td>{data.city_state}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="col-12">
                          <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={2}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                            containerClassName={
                              "pagination justify-content-end"
                            }
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            activeClassName="active"
                          />
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SerachCityState;
