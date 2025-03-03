import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database, ref, onValue } from "../lib/firebase";
import { addFakeData } from "../lib/generateFakeData";
import ChartComponent from "../components/Chart";
import { FaUsers } from 'react-icons/fa';
import Link from "next/link";
import {
  setData,
  setSelectedDate,
  setSelectedTime,
  filterData
} from "../store/dashboardSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { filteredData, selectedDate, selectedTime } = useSelector((state) => state.dashboard);

  // Event handler'ları useCallback ile optimize ediyoruz
  const handleDateChange = useCallback((e) => {
    dispatch(setSelectedDate(e.target.value));
  }, [dispatch]);

  const handleTimeChange = useCallback((e) => {
    dispatch(setSelectedTime(e.target.value));
  }, [dispatch]);

  useEffect(() => {
    const dataRef = ref(database, "dashboard-data");

    onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        const dataList = Object.values(fetchedData);
        dispatch(setData(dataList));
      }
    });
    // Her 5 saniyede bir sahte veri eklemek için interval başlat
    const interval = setInterval(() => {
      addFakeData();
    }, 5000);

    return () => clearInterval(interval); // Bileşen kaldırıldığında interval'i temizle
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterData());
  }, [dispatch, selectedDate, selectedTime]);

  // UI elementlerini useMemo ile optimize ediyoruz
  const filterSection = useMemo(() => (
    <div className="filter">
      <div className="filterGroup">
        <label className="filterLabel" htmlFor="dateFilter">Tarih Seç</label>
        <input
          id="dateFilter"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="filterInput"
        />
      </div>

      <div className="filterGroup">
        <label className="filterLabel" htmlFor="timeFilter">Saat Seç</label>
        <input
          id="timeFilter"
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="filterInput"
        />
      </div>
    </div>
  ), [selectedDate, selectedTime, handleDateChange, handleTimeChange]);

  const chartSection = useMemo(() => (
    <div className="chartContainer">
      {filteredData.length > 0 ? (
        <ChartComponent data={filteredData} />
      ) : (
        <div className="loading">Veriler yükleniyor...</div>
      )}
    </div>
  ), [filteredData]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboardTitle">Dashboard</h1>
      {filterSection}
      {chartSection}

      {/* Kullanıcı Yönetimi sayfasına yönlendirme */}
      <Link href="/crud">
        <button className="crud-button">
          <FaUsers className="icon" />
          <span>Kullanıcı Yönetimi</span>
        </button>
      </Link>
    </div>
  );
}
