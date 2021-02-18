import axios from 'axios';
import React, { Component } from 'react';
import Modal from 'react-modal';
import uniqueId from 'uniqid';
import './Modal.scss';

Modal.setAppElement('#root');
class ModalComponent extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  async componentDidMount() {
    const result = await axios.get('/users/get-users');
    this.setState({ users: result.data.users });
  }

  render() {
    const { isModalOpen, closeModal, onUserClick, selectedUser } = this.props;

    return (
      <Modal onRequestClose={closeModal} isOpen={isModalOpen}>
        <div className="modal-header">
          <h2>Tag People</h2>
          <button onClick={closeModal}>close</button>
        </div>

        <div className="modal-users">
          {this.state.users.map((ele) => {
            return (
              <div
                style={
                  selectedUser.includes(ele._id)
                    ? { border: '3px solid var(--color-primary)' }
                    : null
                }
                key={uniqueId()}
                onClick={() => onUserClick(ele._id)}
                className="modal-users__single"
              >
                <img src={ele.profileImage} />
                <div>{ele.name}</div>
              </div>
            );
          })}
        </div>
      </Modal>
    );
  }
}

export default ModalComponent;
