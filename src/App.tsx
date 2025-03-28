import "./App.css";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import DisplayAllEvents from "./components/DisplayAllEvents/DisplayAllEvents";
import SingleEvent from "./components/SingleEvent/SingleEvent";
import Login from "./components/Login/Login";
import AddEvent from "./components/AddEvent/AddEvent";
import AmendEvent from "./components/AmendEvent/AmendEvent";
import NotFound from "./components/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Navigation />
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<DisplayAllEvents />} />
          <Route path="/events/:category" element={<DisplayAllEvents />} />
          <Route path="/event/:event_id" element={<SingleEvent />} />
          <Route path="/amend-event/:event_id" element={<AmendEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
