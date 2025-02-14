import Button from "./components/Button/button.component";
import Card from "./components/Grid/Card/card.component";
import {
  useAddUserMutation,
  useGetAllUsersQuery,
} from "./redux/slices/users-api";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import Modal from "./components/Modal/modal.component";
import { RegistrationForm } from "./components/Form/form.component";

const formButtons: Array<any> = [
  {
    name: "Save",
    text: "save",
    type: "submit",
  },
];

const App = () => {
  const [persons, setPersons] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const formRef = useRef<any>(null);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    formRef.current?.resetForm();
    console.log();
  };

  const { data: usersData, isLoading } = useGetAllUsersQuery();
  const [addUser] = useAddUserMutation();

  useEffect(() => {
    setPersons(usersData);
  }, [usersData]);

  const deleteItem = (id: number) => {
    if (id) {
      setPersons((prevPersons: any) =>
        prevPersons.filter((item: any) => item.id !== id)
      );
    }
  };

  const addUsers = (user: any) => {
    setSelectedUser(null);
    setPersons((prevPersons: any) => [
      ...prevPersons,
      { ...user, id: prevPersons.length + 1 },
    ]);
    setIsModalOpen(false);
    console.log(user, "user");

    addUser(user)
      .unwrap()
      .then(() => {
        user;
        console.log("User has ben created");
      })
      .catch(() => console.error("Error creating user"));
  };

  const getUserToEdit = (user: any) => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };

  const editUser = (id: number, updatedUser: any) => {
    setPersons((prevPersons: any) =>
      prevPersons.map((person: any) =>
        person.id === id ? { ...person, ...updatedUser } : person
      )
    );
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="home-page">
      {isLoading ? (
        <div className="loader">
          <span className="spinner"></span>
          <h1>Loading Data</h1>
        </div>
      ) : (
        <>
          <Button
            placeholder={"Create New User"}
            iconName={"add"}
            className="button"
            onClick={openModal}
            type="button"
          />
          <Card data={persons} onDelete={deleteItem} onEdit={getUserToEdit} />
        </>
      )}
      <Modal isOpen={isModalOpen} closeModal={closeModal} title="New User Info">
        <RegistrationForm
          key={selectedUser ? selectedUser.id : "new-user"}
          buttons={formButtons}
          addUsers={addUsers}
          user={selectedUser}
          editUser={editUser}
        />
      </Modal>
    </div>
  );
};

export default App;
