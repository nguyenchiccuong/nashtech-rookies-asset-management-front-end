import React, { Component } from "react";
import "./FirstLogin.css";
import { Button, Form, FormGroup, Label, Input, 
  Alert } from "reactstrap";
import { withRouter } from "react-router-dom";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { put } from "../../httpHelper";

class index extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      password: "",
      isFailed: false,
      messageFail: "",
      user: this.props.cookies.get("user") || "",
    };
  }

  changePassword(e) {
    e.preventDefault();
    if (this.state.user.role === "ROLE_ADMIN") {
      let url = "admin/password/first";
      let body = {
        staffCode: `${this.state.user.staffCode}`,
        newPassword: e.target.password.value,
      };
      put(url, body)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.successCode === "CHANGE_PASSWORD_SUCCESS") {
              this.props.cookies.set("user", JSON.stringify(response.data.data), { path: "/" });
              this.props.history.push("/admin");
              this.props.reload();
            }
          }
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.data.errorCode) {
              case "USER_NOT_FOUND":
                this.setState({ messageFail: "User not found." });
                break;
              case "USER_IS_DISABLED":
                this.setState({ messageFail: "User is disabled." });
                break;
              case "PASSWORD_IS_EMPTY":
                this.setState({ messageFail: "Password is empty." });
                break;
              case "SAME_PASSWORD":
                this.setState({ messageFail: "New password must be different the old one." });
                break;
              default:
                this.setState({ messageFail: "Error to change password." });
            }
          } else {
            this.setState({ messageFail: "Fail to change password." });
          }
          this.setState({ isFailed: true });
        });
    } else if (this.state.user.role === "ROLE_USER") {
      let url = "user/password/first";
      let body = {
        staffCode: `${this.state.user.staffCode}`,
        newPassword: e.target.password.value,
      };
      put(url, body)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.successCode === "CHANGE_PASSWORD_SUCCESS") {
              this.props.cookies.set("user", JSON.stringify(response.data.data), { path: "/" });
              this.props.history.push("/user");
              this.props.reload();
            }
          }
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.data.errorCode) {
              case "USER_NOT_FOUND":
                this.setState({ messageFail: "User not found." });
                break;
              case "USER_IS_DISABLED":
                this.setState({ messageFail: "User is disabled." });
                break;
              case "PASSWORD_IS_EMPTY":
                this.setState({ messageFail: "Password is empty." });
                break;
              case "SAME_PASSWORD":
                this.setState({ messageFail: "New password must be different the old one." });
                break;
              default:
                this.setState({ messageFail: "Error to change password." });
            }
          } else {
            this.setState({ messageFail: "Fail to change password." });
          }
          this.setState({ isFailed: true });
        });
    }
  }

  handleChange(e, key) {
    this.setState({ [key]: e.target.value }, () => {
      if (this.state.password.trim().length > 0) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  render() {
    return (
      <div className="first-login">
        <div className="text">
          <p>This is the first time you logged in.</p>
          <p>You have to change your password to continue.</p>
        </div>
        <div className="input">
          <Form inline onSubmit={(e) => this.changePassword(e)}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="password" className="mr-sm-2">New password</Label>
              <Input type="password" name="password" id="password" onChange={(e) => this.handleChange(e, "password")}/>
            </FormGroup>
            <Button color="danger" disabled={this.state.isDisabled}>
              Save
            </Button>
          </Form>
        </div>
        {
          this.state.isFailed &&
          <div style={{marginTop: '20px'}}>
            <Alert color="danger">
              {this.state.messageFail}
            </Alert>
        </div>
        }
      </div>
    );
  }
}

export default withCookies(withRouter(index));
