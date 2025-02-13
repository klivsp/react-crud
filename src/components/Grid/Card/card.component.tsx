import React, { useState } from "react";
import DeleteIcon from "../../../assets/delete_icon.png";
import EditIcon from "../../../assets/edit_icon.png";
import Loader from "@/components/Loader/loader.component";
import "./card.style.css";
import { useDeleteUserMutation } from "@/redux/slices/users-api";

export interface Data {
  id: number;
  name: string;
  email: string;
  phone: number;
}

interface WideCardProps {
  data: Data[];
  onEdit: (item: any) => void;
  onDelete: (item: number) => void;
}

const Card = ({ data, onDelete, onEdit }: WideCardProps) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [deleteElement] = useDeleteUserMutation();

  const deleteUser = async (recordId: number) => {
    setLoadingId(recordId);
    try {
      await deleteElement(recordId).unwrap();
      setTimeout(() => {
        setLoadingId(null);
        onDelete(recordId);
      }, 2000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setLoadingId(null);
    }
  };

  const dataHeader = () => {
    return (
      <div className="card-header">
        <p>ID</p>
        <p>Name</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Actions</p>
      </div>
    );
  };

  return (
    <div className="card-wrapper">
      {dataHeader()}
      <div className="cards">
        {data &&
          data.map((item) => (
            <div key={item.id}>
              {loadingId === item.id ? (
                <Loader message="User is being deleted" />
              ) : (
                <div key={item.id} className="card-element">
                  <p>{item.id}</p>
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                  <p>{item.phone}</p>
                  <div className="wide-card-actions">
                    <img
                      src={EditIcon}
                      className="action-icon"
                      onClick={() => onEdit(item)}
                    />
                    <img
                      src={DeleteIcon}
                      className="action-icon"
                      onClick={() => deleteUser(item.id)} // Only calling deleteUser
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Card;
