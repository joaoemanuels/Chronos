import React, { useState } from "react";
import dayjs from "dayjs";
import "./CalendarEvents.css";

function Calendar() {
  // Estado que armazena a data atual do calendário
  const [currentDate, setCurrentDate] = useState(dayjs());
  // Estado para controlar se o formulário de novo evento está visível
  const [showAddForm, setShowAddForm] = useState(false);

  // Lista de eventos (você pode buscar de uma API ou usar um Context)
  const [events, setEvents] = useState([
    { id: 1, title: "Reunião de Equipe", date: "2025-07-22", time: "15:00" },
    {
      id: 2,
      title: "Apresentação do Projeto",
      date: "2025-07-23",
      time: "15:00",
    },
  ]);

  // Estados para controlar os campos do formulário
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // Navegação entre meses
  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };
  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  // Cálculo dos dias do calendário
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startOfCalendar = startOfMonth.startOf("week");
  const endOfCalendar = endOfMonth.endOf("week");

  const calendarDays = [];
  let day = startOfCalendar.clone();

  while (
    day.isBefore(endOfCalendar, "day") ||
    day.isSame(endOfCalendar, "day")
  ) {
    calendarDays.push(day);
    day = day.add(1, "day");
  }

  // Dividindo em semanas (arrays de 7 dias)
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  // Função para adicionar um novo evento
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newTitle || !newDate || !newTime) return;

    const newEvent = {
      id: Date.now(), // ou use um uuid
      title: newTitle,
      date: newDate,
      time: newTime,
    };
    setEvents([...events, newEvent]);

    // Limpar campos e fechar form
    setNewTitle("");
    setNewDate("");
    setNewTime("");
    setShowAddForm(false);
  };

  // Função para remover um evento
  const handleRemoveEvent = (id) => {
    const filtered = events.filter((ev) => ev.id !== id);
    setEvents(filtered);
  };

  return (
    <div className="calendarContainer">
      {/* Botão para mostrar formulário de adicionar evento */}
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

      {/* Header com setas e nome do mês */}
      <div className="header">
        <button onClick={handlePrevMonth} className="navButton">
          {"<"}
        </button>
        <h2 className="monthTitle">{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={handleNextMonth} className="navButton">
          {">"}
        </button>
      </div>

      {/* Formulário de adicionar evento */}
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
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <input
            className="input"
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
          <button className="submitButton" type="submit">
            Salvar
          </button>
        </form>
      )}

      {/* Dias da semana */}
      <div className="weekDaysRow">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((weekday) => (
          <div key={weekday} className="weekDay">
            {weekday}
          </div>
        ))}
      </div>

      {/* Grade do calendário */}
      {weeks.map((week, wIndex) => (
        <div key={wIndex} className="weekRow">
          {week.map((date) => {
            const isCurrentMonth = date.isSame(currentDate, "month");
            const isToday = date.isSame(dayjs(), "day");
            let dayCellClass = "dayCell ";
            dayCellClass += isCurrentMonth ? "currentMonth" : "notCurrentMonth";
            if (isToday) dayCellClass += " today";
            return (
              <div key={date.format("DD-MM-YYYY")} className={dayCellClass}>
                {date.format("D")}
              </div>
            );
          })}
        </div>
      ))}

      {/* Lista de eventos (cards) */}
      <div className="upcomingEvents">
        <h3>Em breve</h3>
        {events.map((event) => (
          <div key={event.id} className="card">
            <div className="cardInfo">
              <strong>{event.title}</strong>
              <div className="cardDate">
                {dayjs(event.date).format("DD/MM")} - {event.time}
              </div>
            </div>
            <button
              className="removeButton"
              onClick={() => handleRemoveEvent(event.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
