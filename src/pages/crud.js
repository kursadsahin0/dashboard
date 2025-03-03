import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Crud.module.css";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import {
  addUser,
  updateUser,
  deleteUser,
  setEditingUser,
  addQueuedUser,
  processQueuedUsers,
  reorderUsers,
  setDraggedIndex,
} from "../store/userSlice";

export default function CrudPage() {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const { users, editingUser, queuedUsers, draggedIndex } = useSelector((state) => state.users);

  const validationSchema = useMemo(() => Yup.object({
    name: Yup.string().min(2, "En az 2 karakter olmalı").required("Zorunlu alan"),
    email: Yup.string().email("Geçerli bir e-posta girin").required("Zorunlu alan"),
  }), []);

  const handleSubmit = useCallback((values, { resetForm }) => {
    if (editingUser) {
      dispatch(updateUser({ ...editingUser, name: values.name, email: values.email }));
      toast.success("Kullanıcı güncellendi!");
    } else {
      const newUser = {
        id: Date.now().toString(),
        name: values.name,
        email: values.email,
      };

      if (!navigator.onLine) {
        dispatch(addQueuedUser(newUser));
        toast.warning("İnternet yok! Kullanıcı kuyruğa eklendi.");
      } else {
        dispatch(addUser(newUser));
        toast.success("Yeni kullanıcı eklendi!");
      }
    }
    resetForm();
  }, [dispatch, editingUser]);

  const handleDeleteUser = useCallback((id) => {
    dispatch(deleteUser(id));
    toast.error("Kullanıcı silindi!");
  }, [dispatch]);

  const handleEditUser = useCallback((user) => {
    dispatch(setEditingUser(user));
    toast.warning("Kullanıcı düzenleme modunda!");
  }, [dispatch]);

  const handleDragStart = useCallback((index) => {
    dispatch(setDraggedIndex(index));
  }, [dispatch]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((dropIndex) => {
    if (draggedIndex === null) return;
    dispatch(reorderUsers({ draggedIndex, dropIndex }));
    dispatch(setDraggedIndex(null));
    toast.success("Sıralama değiştirildi!");
  }, [dispatch, draggedIndex]);

  const handleCancel = useCallback((resetForm) => {
    dispatch(setEditingUser(null));
    resetForm();
  }, [dispatch]);

  useEffect(() => {
    setMounted(true);
    const handleOnline = () => {
      if (queuedUsers.length > 0) {
        toast.info("İnternet geldi! Bekleyen kullanıcılar ekleniyor...");
        dispatch(processQueuedUsers());
      }
    };

    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [dispatch, queuedUsers.length]);

  const renderUserList = useCallback(() => (
    <ul className={styles.userList}>
      {users.map((user, index) => (
        <li
          key={user.id}
          className={styles.userItem}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
        >
          <div>
            <strong className={styles.userName}>{user.name}</strong> - {user.email}
          </div>
          <div className={styles.actions}>
            <button onClick={() => handleEditUser(user)} className={styles.actionButton}>
              <FaRegEdit className={styles.editIcon} />
            </button>
            <button onClick={() => handleDeleteUser(user.id)} className={styles.actionButton}>
              <MdDelete className={styles.deleteIcon} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  ), [users, handleDragStart, handleDragOver, handleDrop, handleEditUser, handleDeleteUser]);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <div className={styles.navbar}>
        <Link href="/" className={styles.backButton}>
          Dashboard
        </Link>
      </div>
      <div className={styles.crudContainer}>
        <h1 className={styles.formTitle}>Kullanıcı Yönetimi</h1>
        <Formik
          initialValues={{
            name: editingUser ? editingUser.name : "",
            email: editingUser ? editingUser.email : "",
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ resetForm }) => (
            <Form className={styles.userForm}>
              <div>
                <label className={styles.formLabel}>İsim:</label>
                <Field type="text" name="name" className={styles.inputField} />
                <ErrorMessage name="name" component="div" className={styles.errorMessage} />
              </div>

              <div>
                <label className={styles.formLabel}>E-Posta:</label>
                <Field type="email" name="email" className={styles.inputField} />
                <ErrorMessage name="email" component="div" className={styles.errorMessage} />
              </div>

              <button type="submit" className={styles.submitButton}>
                {editingUser ? "Güncelle" : "Ekle"}
              </button>

              {editingUser && (
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => handleCancel(resetForm)}
                >
                  İptal
                </button>
              )}
            </Form>
          )}
        </Formik>
        {renderUserList()}
      </div>
    </div>
  );
}
