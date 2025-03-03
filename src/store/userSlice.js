import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  editingUser: null,
  draggedIndex: null,
  queuedUsers: [],
};

const loadFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const storedUsers = localStorage.getItem("users");
      return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (error) {
      return [];
    }
  }
  return [];
};

const saveToLocalStorage = (users) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("users", JSON.stringify(users));
  }
};

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    ...initialState,
    users: typeof window !== 'undefined' ? loadFromLocalStorage() : [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      saveToLocalStorage(state.users);
    },
    updateUser: (state, action) => {
      state.users = state.users.map(user =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
      saveToLocalStorage(state.users);
      state.editingUser = null;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      saveToLocalStorage(state.users);
    },
    setEditingUser: (state, action) => {
      state.editingUser = action.payload;
    },
    addQueuedUser: (state, action) => {
      state.queuedUsers.push(action.payload);
    },
    processQueuedUsers: (state) => {
      state.users = [...state.users, ...state.queuedUsers];
      saveToLocalStorage(state.users);
      state.queuedUsers = [];
    },
    reorderUsers: (state, action) => {
      const { draggedIndex, dropIndex } = action.payload;
      const draggedUser = state.users[draggedIndex];
      state.users.splice(draggedIndex, 1);
      state.users.splice(dropIndex, 0, draggedUser);
      saveToLocalStorage(state.users);
    },
    setDraggedIndex: (state, action) => {
      state.draggedIndex = action.payload;
    },
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  setEditingUser,
  addQueuedUser,
  processQueuedUsers,
  reorderUsers,
  setDraggedIndex,
} = userSlice.actions;

export default userSlice.reducer; 