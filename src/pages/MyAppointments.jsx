import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {

  const {
    appointments,
    cancelAppointment,
    fetchMyAppointments,
    editAppointment,
  } = useContext(AppContext);

  // =========================
  // EDIT STATES
  // =========================

  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    date: "",
    time: "",
  });

  // =========================
  // LOAD APPOINTMENTS
  // =========================

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  // =========================
  // START EDIT
  // =========================

  const startEditing = (appointment) => {

    setEditingId(appointment._id);

    setEditData({
      date: appointment.date,
      time: appointment.time,
    });

  };

  // =========================
  // SAVE EDIT
  // =========================

  const handleSaveEdit = async (id) => {

    await editAppointment(id, editData);

    setEditingId(null);

  };

  return (
    <div className="px-8 pt-8 transition-all delay-700 duration-700 ease-in-out">

      <h2 className="text-2xl font-medium text-gray-500 mb-6">
        My appointments
      </h2>

      {appointments.length > 0 ? (

        appointments.map((p) => (

          <div
            key={p._id}
            className="flex flex-col md:flex-row items-center md:items-start border-b border-gray-200 pb-6 mb-6 md:space-x-4"
          >

            {/* Doctor Image */}
            <img
              src={p.doctorImage}
              className="md:w-36 md:h-36 rounded-md object-cover bg-blue-100 mb-4 md:mb-0"
              alt={`${p.doctorName}'s profile`}
            />

            {/* Doctor Details */}
            <div className="flex-1 text-center md:text-left">

              <h3 className="text-lg font-semibold">
                {p.doctorName}
              </h3>

              <p className="text-sm text-gray-600">
                {p.speciality}
              </p>

              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold">Address: </span>
                {p.address?.line1}
              </p>

              {/* =========================
                  EDIT MODE
              ========================= */}

              {editingId === p._id ? (

                <div className="mt-4 flex flex-col gap-3">

                  {/* Date Picker */}
                  <input
                    type="date"
                    value={editData.date}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        date: e.target.value,
                      })
                    }
                    className="border p-2 rounded-md"
                  />

                  {/* Time Selector */}
                  <select
                    value={editData.time}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        time: e.target.value,
                      })
                    }
                    className="border p-2 rounded-md"
                  >
                    <option value="">Select Time</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>

                  {/* Edit Buttons */}
                  <div className="flex gap-2">

                    <button
                      onClick={() => handleSaveEdit(p._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-gray-400 text-white rounded-md"
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              ) : (

                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">
                    Date & Time:
                  </span>{" "}
                  {p.date} | {p.time}
                </p>

              )}

            </div>

            {/* Action Buttons */}
            <div className="flex md:flex-col gap-2 mt-4 md:mt-0">

              <button className="px-1 py-2 md:w-52 w-44 border rounded-md text-gray-600 border-gray-300 hover:bg-gray-100">
                Pay Online
              </button>

              <button
                onClick={() => cancelAppointment(p._id)}
                className="px-1 py-2 md:w-52 w-44 border rounded-md text-red-500 border-red-300 hover:bg-red-50"
              >
                Cancel appointment
              </button>

              <button
                onClick={() => startEditing(p)}
                className="px-1 py-2 md:w-52 w-44 border rounded-md text-blue-500 border-blue-300 hover:bg-blue-50"
              >
                Edit appointment
              </button>

            </div>

          </div>

        ))

      ) : (

        <p>No appointments to show</p>

      )}

    </div>
  );
};

export default MyAppointments;