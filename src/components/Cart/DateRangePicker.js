import React, { useState } from "react";

const DateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    onDateRangeChange({ startDate: newStartDate, endDate });
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    onDateRangeChange({ startDate, endDate: newEndDate });
  };

  return (
    <div className="d-flex gap-3">
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          className="form-control"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          className="form-control"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
