import "./create.css";
import React, { useState, useEffect } from "react";
import { Dialog, Slide, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { get, post } from "../../httpHelper";
import Paginations from "../Users/Pagination/Pagination";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Index = () => {
  const [username, setUsername] = useState("");
  const [asset, setAsset] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  const [note, setNote] = useState("");
  const [isOpenUserDialog, setIsOpenUserDialog] = useState(false);
  const [isOpenAssetDialog, setIsOpenAssetDialog] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [usernameSearch, setUsernameSearch] = useState("");
  const [staffCodeSearch, setStaffCodeSearch] = useState("");
  const [sort, setSort] = useState("staffCode");
  const [users, setUsers] = useState([]);
  const [boxusersearch, setBoxUserSearch] = useState();
  const [isStaffCodeASC, setIsStaffCodeASC] = useState(true);
  const [isFullNameCodeASC, setIsFullNameCodeASC] = useState(true);
  const [isTypeASC, setIsTypeASC] = useState(true);
  const [staffCodeSelected, setStaffCodeSelected] = useState("");
  const [NameSelected, setNamelected] = useState("");
  const [staffCode, setStaffCode] = useState("");
  const [assetCode, setAssetCode] = useState("");
  const [assetCodeSelected, setAssetCodeSelected] = useState("");
  const [assetNameSelected, setAssetNamelected] = useState("");

  const handleSelectUser = () => {
    setUsername(NameSelected);
    setIsOpenUserDialog(false);
    setStaffCode(staffCodeSelected);
  };
  const handleSortByStaffCode = () => {
    if (isStaffCodeASC) {
      setSort("staffCodeASC");
      setIsStaffCodeASC(!isStaffCodeASC);
    } else {
      setSort("staffCodeDES");
      setIsStaffCodeASC(!isStaffCodeASC);
    }
  };
  const handleSortByFullName = () => {
    if (isFullNameCodeASC) {
      setSort("lastNameASC");
      setIsFullNameCodeASC(!isFullNameCodeASC);
    } else {
      setSort("lastNameDES");
      setIsFullNameCodeASC(!isFullNameCodeASC);
    }
  };
  const handleSortType = () => {
    if (isTypeASC) {
      setSort("roleASC");
      setIsTypeASC(!isTypeASC);
    } else {
      setSort("roleDES");
      setIsTypeASC(!isTypeASC);
    }
  };
  const [isAssetCodeASC, setIsAssetCodeASC] = useState(false);
  const handleSortByAssetCode = () => {
    if (isAssetCodeASC) {
      setAssetSort("assetCodeASC");
      setIsAssetCodeASC(!isAssetCodeASC);
    } else {
      setAssetSort("assetCodeDES");
      setIsAssetCodeASC(!isAssetCodeASC);
    }
  };
  const [isAssetNameASC, setIsAssetNameASC] = useState(false);
  const handleSortByAssetName = () => {
    if (isAssetNameASC) {
      setAssetSort("assetNameASC");
      setIsAssetNameASC(!isAssetNameASC);
    } else {
      setAssetSort("assetNameDES");
      setIsAssetNameASC(!isAssetNameASC);
    }
  };
  const [isCategoryASC, setIsCategoryASC] = useState(false);
  const handleSortByCategory = () => {
    if (isCategoryASC) {
      setAssetSort("categoryASC");
      setIsCategoryASC(!isCategoryASC);
    } else {
      setAssetSort("categoryDES");
      setIsCategoryASC(!isCategoryASC);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const url = `user/assignment?page=${currentPage}&size=16&sort=${sort}&search=isDeleted:false,staffCode:${staffCodeSearch},username:${usernameSearch},location:${localStorage.getItem(
        "locationId"
      )}`;
      const response = await get(url);
      setUsers(response.data.data.data);
      setTotalPage(response.data.data.totalPages);
    };
    fetchUsers();
  }, [usernameSearch, staffCodeSearch, currentPage, sort]);

  const [currentAssetPage, setCurrentAssetPage] = useState(0);
  const [assetSort, setAssetSort] = useState("assetNameASC");
  const [nameAssetSearch, setNameAssetSearch] = useState("");
  const [assetCodeSearch, setAssetCodeSearch] = useState("");
  const [assets, setAssets] = useState([]);
  const [totalAssetPage, setTotalAssetPage] = useState(0);
  useEffect(() => {
    const fetchAsset = async () => {
      const url = `asset/assetInAssignment?page=${currentAssetPage}&size=10&sort=${assetSort}&search=isDeleted:false,state:1,assetName:${nameAssetSearch},assetCode:${assetCodeSearch},location:${localStorage.getItem(
        "locationId"
      )}`;
      const response = await get(url);
      setAssets(response.data.data.data);
      setTotalAssetPage(response.data.data.totalPages);
    };
    fetchAsset();
  }, [currentAssetPage, assetSort, nameAssetSearch, assetCodeSearch]);
  const handleUserSearch = (e) => {
    e.preventDefault();
    if (boxusersearch.toUpperCase().startsWith("SD")) {
      setStaffCodeSearch(boxusersearch);
      setUsernameSearch("");
    } else {
      setUsernameSearch(boxusersearch);
      setStaffCodeSearch("");
    }
  };

  const [assetSearch, setAssetSearch] = useState("");
  return (
    <div id="Form_es">
      <Dialog
        id="user_dialog"
        open={isOpenUserDialog}
        TransitionComponent={Transition}
        keepMounted
        disableEscapeKeyDown
        disableBackdropClick
        onClose={() => setIsOpenUserDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div id="dialog-title">
          <div id="name-dialog">
            <b>Select User</b>
          </div>
          <div className="field">
            <input
              className="search_user"
              onChange={(e) => setBoxUserSearch(e.target.value)}
            />
            <SearchIcon id="search_user_icon" onClick={handleUserSearch} />
          </div>
        </div>
        <div>
          <table id="users-table">
            <thead>
              <tr>
                <th></th>
                <th onClick={handleSortByStaffCode}>
                  Staff Code
                  {isStaffCodeASC ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                </th>
                <th onClick={handleSortByFullName}>
                  Full Name
                  {isFullNameCodeASC ? (
                    <ArrowDropDownIcon />
                  ) : (
                    <ArrowDropUpIcon />
                  )}
                </th>
                <th onClick={handleSortType}>
                  Type
                  {isTypeASC ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr>
                    <input
                      type="radio"
                      name="user"
                      onChange={() => {
                        setStaffCodeSelected(user.staffCode);
                        setNamelected(user.fullName);
                      }}
                    />
                    <td>{user.staffCode}</td>
                    <td>{user.fullName}</td>
                    <td>{user.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Paginations
          totalPages={totalPage}
          setCurrentPage={(currentPage) => {
            setCurrentPage(currentPage);
          }}
          className="pagination"
        />
        <div id="button-zone1">
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            id="bt_save"
            onClick={handleSelectUser}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={() => setIsOpenUserDialog(false)}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
      <Dialog
        id="asset_dialog"
        open={isOpenAssetDialog}
        TransitionComponent={Transition}
        keepMounted
        disableEscapeKeyDown
        disableBackdropClick
        onClose={() => setIsOpenAssetDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div id="dialog-title">
          <div id="name-dialog">
            <b>Select Asset</b>
          </div>
          <div className="field">
            <input
              className="search_user"
              onChange={(e) => setAssetSearch(e.target.value)}
            />
            <SearchIcon
              id="search_user_icon"
              onClick={() => {
                if (!isNaN(assetSearch[2])) {
                  setAssetCodeSearch(assetSearch);
                  setNameAssetSearch("");
                } else {
                  setNameAssetSearch(assetSearch);
                  setAssetCodeSearch("");
                }
              }}
            />
          </div>
        </div>
        <table id="users-table">
          <thead>
            <tr>
              <th></th>
              <th onClick={handleSortByAssetCode}>
                Asset Code
                {isAssetCodeASC ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
              </th>
              <th onClick={handleSortByAssetName}>
                Asset Name
                {isAssetNameASC ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
              </th>
              <th onClick={handleSortByCategory}>
                Category
                {isCategoryASC ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
              </th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => {
              return (
                <tr>
                  <input
                    type="radio"
                    name="asset"
                    onChange={() => {
                      setAssetCodeSelected(asset.code);
                      setAssetNamelected(asset.name);
                    }}
                  />
                  <td>{asset.code}</td>
                  <td>{asset.name}</td>
                  <td>{asset.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Paginations
          totalPages={totalAssetPage}
          setCurrentPage={(currentPage) => {
            setTotalAssetPage(currentPage);
          }}
          className="pagination"
        />

        <div id="button-zone2">
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            id="bt_save"
            onClick={() => {
              setIsOpenAssetDialog(false);
              setAsset(assetNameSelected);
              setAssetCode(setAssetCodeSelected);
            }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={() => setIsOpenAssetDialog(false)}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
      <h5 id="title_form">
        <b>Create New Assignment</b>
      </h5>
      <div id="form">
        <div className="field">
          <label>User</label>
          <input disabled value={username} className="input_field" />
          <SearchIcon
            id="search_icon"
            onClick={() => setIsOpenUserDialog(true)}
          />
        </div>
        <div className="field">
          <label>Asset</label>
          <input value={asset} className="input_field" disabled />
          <SearchIcon
            id="search_icon"
            onClick={() => setIsOpenAssetDialog(true)}
          />
        </div>
        <div className="field">
          <label>Asigned Date</label>
          <input
            type="date"
            min="2021-05-11"
            className="input_field"
            onChange={(e) => {
              setAssignedDate(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label>Note</label>
          <input
            id="note"
            className="input_field"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
      <div id="button-zone">
        {username === "" || asset === "" || note === "" ? (
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            id="bt_save"
            disabled
          >
            Save
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            id="bt_save"
            onClick={() => {
              const url = "assignment";
            }}
          >
            Save
          </Button>
        )}

        <Button variant="outlined" color="secondary" size="medium">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Index;