

import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  data: [], 
  filteredData: [], 
  selectedDate: '', 
  selectedTime: '', 
};


export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Tüm veriyi güncelle
    setData: (state, action) => {
      state.data = action.payload;
      // Veri güncellendiğinde filtrelemeyi tekrar uygula
      if (state.selectedDate || state.selectedTime) {
        state.filteredData = filterDataByDateTime(
          state.data,
          state.selectedDate,
          state.selectedTime
        );
      } else {
        state.filteredData = action.payload;
      }
    },

    // Seçili tarihi güncelle
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },

    // Seçili saati güncelle
    setSelectedTime: (state, action) => {
      state.selectedTime = action.payload;
    },

    // Verileri filtrele
    filterData: (state) => {
      state.filteredData = filterDataByDateTime(
        state.data,
        state.selectedDate,
        state.selectedTime
      );
    },
  },
});


const filterDataByDateTime = (data, selectedDate, selectedTime) => {
  return data.filter(item => {
    const itemDate = new Date(item.timestamp);
    const formattedDate = itemDate.toISOString().split('T')[0];
    const formattedTime = itemDate.toTimeString().slice(0, 5);

    if (selectedDate && selectedTime) {
      return formattedDate === selectedDate && formattedTime === selectedTime;
    } else if (selectedDate) {
      return formattedDate === selectedDate;
    } else if (selectedTime) {
      return formattedTime === selectedTime;
    }
    return true;
  });
};

// Action creator'ları export et
export const { setData, setSelectedDate, setSelectedTime, filterData } = dashboardSlice.actions;

// Reducer'ı export et
export default dashboardSlice.reducer; 