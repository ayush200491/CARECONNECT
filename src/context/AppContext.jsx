import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { doctors } from "../assets/assets";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  // =========================
  // STATES
  // =========================

  const [appointments, setAppointments] = useState([]);

  const currencySymbol = "$";

  // =========================
  // AXIOS INSTANCE
  // =========================

  const api = axios.create({
    baseURL: "http://localhost:5001/api",
  });

  // =========================
  // TOKEN
  // =========================

  const getToken = () => {
    try {
      const savedAuth = JSON.parse(localStorage.getItem("cc_auth") || "{}");
      return savedAuth.token || null;
    } catch (error) {
      return null;
    }
  };

  // =========================
  // FETCH MY APPOINTMENTS
  // =========================

  const fetchMyAppointments = async () => {
    try {

      const token = getToken();
      if (!token) return;

      const response = await api.get("/appointments/my-appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(response.data.appointments);

    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch appointments");
    }
  };

  // =========================
  // BOOK APPOINTMENT
  // =========================

  const bookAppointment = async (appointmentData) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Missing login session. Please log in again.");
      }

      const response = await api.post(
        "/appointments/book",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      await fetchMyAppointments();

      return response.data;

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Booking failed"
      );
    }
  };

  // =========================
  // CANCEL APPOINTMENT
  // =========================

  const cancelAppointment = async (id) => {
  try {

    const token = getToken();

    if (!token) {
      throw new Error("Missing login session. Please log in again.");
    }

    const response = await api.delete(
      `/appointments/cancel/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(response.data.message);

    // Refresh Appointments
    await fetchMyAppointments();

    return response.data;

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message || "Cancellation failed"
    );

  }
};

// =========================
// EDIT APPOINTMENT
// =========================

const editAppointment = async (id, data) => {
  try {

    const token = getToken();

    if (!token) {
      throw new Error("Missing login session. Please log in again.");
    }

    const response = await api.put(
      `/appointments/edit/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(response.data.message);

    // Refresh Updated Appointments
    await fetchMyAppointments();

    return response.data;

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message || "Failed to update appointment"
    );

  }
};

  // =========================
  // LOAD APPOINTMENTS
  // =========================

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  // =========================
  // CONTEXT VALUE
  // =========================

const value = {
  doctors,
  currencySymbol,
  appointments,
  bookAppointment,
  cancelAppointment,
  editAppointment,
  fetchMyAppointments,
};

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;