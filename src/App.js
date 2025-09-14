
import ResponsiveAppBar from "./nav/NavBar";
import Login from "./login/login"
import Home from "./event_list/Home";
import { DataProvider } from "./context/DataContext";
import EventDetails from "./event_details/EventDetails";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Reserver from "./reserver/reserver";
import ReservationListByEvent from "./admin/reservations/reservations_list";
import ReservationList from "./reservations/reservations_list";
import EditEvent from "./admin/editEvent/editEvent";
import AddEvent from "./admin/addEvent/addEvent";
import AddClass from "./admin/addEvent/addClasses";
import Profile from "./profile/profile";
import EventList from "./admin/reservations/events_list";


function App() {
  return (
   
    
   
     <>
     
     
     
     <BrowserRouter>
      <DataProvider>
      
      <ResponsiveAppBar/>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/reserver/:id" element={<Reserver />} />
          <Route path="/my_reservations" element={<ReservationList />} />
          <Route path="/edit_event/:id" element={<EditEvent/>}/>
          <Route path="/add_event" element={<AddEvent/>}/>
          <Route path="/add_class/:id" element={<AddClass/>}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/reservations" element={<EventList/>} />
          <Route path="/reservations/reservations_event/:id" element={<ReservationListByEvent/>}  />
        </Routes>
      </div>
      </DataProvider>
    </BrowserRouter>
     
     </>
  );
}

export default App;
