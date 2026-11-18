"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAppointments = localStorage.getItem(
      "medslotAppointments"
    );

    if (savedAppointments) {
      try {
        setAppointments(JSON.parse(savedAppointments));
      } catch {
        localStorage.removeItem("medslotAppointments");
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        "medslotAppointments",
        JSON.stringify(appointments)
      );
    }
  }, [appointments, loading]);

  const addAppointment = (appointment) => {
    setAppointments((previous) => [
      ...previous,
      appointment,
    ]);
  };

  const updateAppointment = (id, updatedData) => {
    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === id
          ? { ...appointment, ...updatedData }
          : appointment
      )
    );
  };

  const deleteAppointment = (id) => {
    setAppointments((previous) =>
      previous.filter(
        (appointment) => appointment.id !== id
      )
    );
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        addAppointment,
        updateAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);

  if (!context) {
    throw new Error(
      "useAppointments must be used inside AppointmentProvider"
    );
  }

  return context;
}