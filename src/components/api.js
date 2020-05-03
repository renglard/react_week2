import React from "react";
import axios from "axios";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formName: "", formAvatar: "", userId: "", users: [] };
    this.id = 7;
  }

  componentDidMount() {
    this.loadUsers();
  }

  async loadUsers() {
    const response = await axios.get(
      `https://5dd14f8d15bbc2001448d07d.mockapi.io/products/${this.id}`
    );
    console.log(response.data);
    this.setState({ users: response.data });
  }

  async addUser(formName, formAvatar) {
    const response = await axios.post(
      "https://5dd14f8d15bbc2001448d07d.mockapi.io/products/",
      {
        name: formName,
        avatar: formAvatar,
      }
    );
    this.loadUsers();
  }

  async deleteUser(userId) {
    const response = await axios.delete(
      `https://5dd14f8d15bbc2001448d07d.mockapi.io/products/${userId}`
    );
    this.loadUsers();
  }

  async handleOnSubmit(event) {
    event.preventDefault();
    const { formName, formAvatar, userId } = this.state;

    // console.log(response.data);
    if (formName && formAvatar) {
      this.addUser(formName, formAvatar);
    } else if (userId) {
      this.deleteUser(userId);
    } else {
      this.loadUsers();
    }
  }

  render() {
    const { formName, formAvatar, userId, users } = this.state;
    return (
      <>
        <form
          onSubmit={(event) => {
            this.handleOnSubmit(event);
          }}
        >
          <input
            type="text"
            name="name"
            value={formName}
            id="name"
            placeholder="name"
            onChange={(event) =>
              this.setState({ formName: event.target.value })
            }
          ></input>
          <input
            type="text"
            name="avatar"
            value={formAvatar}
            id="avatar"
            placeholder="avatar"
            onChange={(event) =>
              this.setState({ formAvatar: event.target.value })
            }
          ></input>
          <button type="submit">New User</button>
          <input
            type="text"
            name="id"
            value={userId}
            id="id"
            placeholder="id"
            onChange={(event) => this.setState({ userId: event.target.value })}
          ></input>
          <button type="submit">Delete</button>
        </form>
        <div>{users && <h3>Product ID: {users.id}</h3>}</div>
      </>
    );
  }
}
export default Api;
