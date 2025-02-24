import React from "react";
import CalendarEvents from "../Dashboard/Components/CalendarEvents/CalendarEvents";
import "./Dashboard.css"


const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="DashboardContainer flex">
        <CalendarEvents/>
      </div>
    </div>
  );
};

export default Dashboard;
