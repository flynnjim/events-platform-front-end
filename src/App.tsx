import "./App.css";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import DisplayAllEvents from "./components/DisplayAllEvents/DisplayAllEvents";
import SingleEvent from "./components/SingleEvent/SingleEvent";
import FullMap from "./components/FullMap/FullMap";
import Login from "./components/Login/Login";
import AddEvent from "./components/AddEvent/AddEvent";

import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <div>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<DisplayAllEvents />} />
          <Route path="/events/:category" element={<DisplayAllEvents />} />
          <Route path="/event/:event_id" element={<SingleEvent />} />
          <Route path="/map" element={<FullMap />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-event" element={<AddEvent />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
