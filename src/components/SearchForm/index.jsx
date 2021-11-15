import React from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
const SearchForm = () => {
  const history = useHistory();
  const location = useLocation();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleOnSubmit = (data) => {
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(data),
    });
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <span className="header__iconSearch">
        <FaSearch />
      </span>
      <input
        {...register("search")}
        className="header__input"
        placeholder="Search for name"
        type="text"
        autoComplete="off"
      />
    </form>
  );
};

export default SearchForm;
