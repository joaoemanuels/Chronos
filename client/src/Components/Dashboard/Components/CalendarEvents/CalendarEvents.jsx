import React, { useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import "./CalendarEvents.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [showAddForm, setShowAddForm] = useState(false);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Reunião de Equipe",
      details: "Planejamento semanal",
      date: "2025-07-22",
      endDate: "2025-07-22",
      time: "15:00",
      color: "#ff0000",
    },
    {
      id: 2,
      title: "Apresentação do Projeto",
      details: "Apresentação para clientes",
      date: "2025-07-23",
      endDate: "2025-07-23",
      time: "15:00",
      color: "#00ff00",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newColor, setNewColor] = useState("#ffffff");

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startOfCalendar = startOfMonth.startOf("week");
  const endOfCalendar = endOfMonth.endOf("week");

  // Gera todos os dias entre startOfCalendar e endOfCalendar
  const calendarDays = [];
  let day = startOfCalendar.clone();
  while (
    day.isBefore(endOfCalendar, "day") ||
    day.isSame(endOfCalendar, "day")
  ) {
    calendarDays.push(day);
    day = day.add(1, "day");
  }

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newTitle || !newDate || !newTime || !newEndDate) return;

    const newEvent = {
      id: Date.now(),
      title: newTitle,
      details: newDetails,
      date: newDate,
      endDate: newEndDate,
      time: newTime,
      color: newColor,
    };
    setEvents([...events, newEvent]);

    setNewTitle("");
    setNewDetails("");
    setNewDate("");
    setNewEndDate("");
    setNewTime("");
    setNewColor("#ffffff");
    setShowAddForm(false);
  };

  const handleRemoveEvent = (id) => {
    const filtered = events.filter((ev) => ev.id !== id);
    setEvents(filtered);
  };

  return (
    <div className="calendarContainer">
      <div className="formToggleContainer">
        <div>
          <button
            className="addButton"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            =
          </button>
        </div>

        <div className="FormTitle">
          <p>Chronos</p>
        </div>
        <button
          className="addButton"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          +
        </button>
      </div>

      <div className="header">
        <button onClick={handlePrevMonth} className="navButton">
          {"<"}
        </button>
        <h2 className="monthTitle">{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={handleNextMonth} className="navButton">
          {">"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddEvent} className="addForm">
          <input
            className="input"
            type="text"
            placeholder="Título do evento"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Detalhes do evento"
            value={newDetails}
            onChange={(e) => setNewDetails(e.target.value)}
          />
          <div className="inputContainer">
            <label htmlFor="startDate">Data de Início</label>
            <input
              className="input"
              type="date"
              id="startDate"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="endDate">Data de Fim</label>
            <input
              className="input"
              type="date"
              id="endDate"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="time">Horário</label>
            <input
              className="input"
              type="time"
              id="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </div>

          <div className="colorPicker">
            <label>Escolha a cor: </label>
            <input
              className="input"
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />
          </div>
          <button className="submitButton" type="submit">
            Salvar
          </button>
        </form>
      )}

      <div className="weekDaysRow">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((weekday) => (
          <div key={weekday} className="weekDay">
            {weekday}
          </div>
        ))}
      </div>

      {weeks.map((week, wIndex) => (
        <div key={wIndex} className="weekRow">
          {week.map((date) => {
            const isCurrentMonth = date.isSame(currentDate, "month");
            const isToday = date.isSame(dayjs(), "day");
            let dayCellClass = "dayCell ";
            dayCellClass += isCurrentMonth ? "currentMonth" : "notCurrentMonth";
            if (isToday) dayCellClass += " today";

            const dayEvents = events.filter((ev) =>
              dayjs(date).isBetween(ev.date, ev.endDate, null, "[]")
            );

            return (
              <div key={date.format("DD-MM-YYYY")} className={dayCellClass}>
                {date.format("D")}

                {dayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    style={{
                      marginTop: "4px",
                      backgroundColor: ev.color,
                      color: "#fff",
                      padding: "2px 4px",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    {ev.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}

      <div className="upcomingEvents">
        <h3>Em breve</h3>
        {events.map((event) => (
          <div key={event.id} className="card">
            <div className="cardInfo">
              <strong>{event.title}</strong>
              <p>{event.details}</p>
              <div className="cardDate">
                {dayjs(event.date).format("DD/MM")} -{" "}
                {dayjs(event.endDate).format("DD/MM")}{" "}
              </div>
            </div>
            <div className="cardInfo-btn">
              <span
                style={{
                  backgroundColor: event.color,
                  padding: "0.2rem",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                {event.time}
              </span>
              <button
                className="removeButton"
                onClick={() => handleRemoveEvent(event.id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
