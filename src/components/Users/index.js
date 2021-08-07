import React, { useState, useEffect } from "react";
import "./Users.css";
import User from "./User";
import userApi from "../../axios/userApi";
import roleApi from "../../axios/roleApi";
import searchIcon from "../../images/search.png";
import Paginations from "./Pagination/Pagination";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(5);
  const [size, setSize] = useState(15);
  const [sort, setSort] = useState("staffCode");
  const [search, setSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [roleSearch, setRoleSearch] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await roleApi.getRoles();
      const rolesData = response.data.data;
      setRoles(rolesData);
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await userApi.getUsers(currentPage, size, sort, search);
      const usersData = response.data.data;
      setTotalPage(usersData.totalPages);
      setUsers(usersData.data);
    };
    fetchUsers();
  }, [currentPage, size, sort, search]);

  const handleOnClickSearchButton = (e) => {
    e.preventDefault();
    if (nameSearch.toUpperCase().startsWith("SD")) {
      setSearch(
        `staffCode:${nameSearch},username:,role:${roleSearch},location:`
      );
    } else {
      setSearch(
        `staffCode:,username:${nameSearch},role:${roleSearch},location:`
      );
    }
  };

  return (
    <div className="users">
      <div id="Search_bar">
        <select className="roles">
          <option>All</option>
          {roles.map((role) => {
            return <option>{role.name.replace("ROLE_", "")}</option>;
          })}
        </select>
        <div id="right_search_bar">
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setNameSearch(e.target.value)}
          />
          <button onClick={handleOnClickSearchButton}>
            <img src={searchIcon} height="35px" />
          </button>
          <button id="create_button">Create new user</button>
        </div>
      </div>

      <table>
        <tr className="header">
          <th className="row">Staff Code</th>
          <th className="row">Full Name</th>
          <th className="row">Username</th>
          <th className="row">Joined Date</th>
          <th className="row">Type</th>
        </tr>
        {users.map((user) => {
          return <User user={user} />;
        })}
      </table>

      <Paginations
        totalPages={totalPage}
        setCurrentPage={(current) => setCurrentPage(current)}
        className="pagination"
      />
    </div>
  );
};

export default Index;
