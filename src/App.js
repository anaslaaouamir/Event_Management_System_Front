
import ResponsiveAppBar from "./nav/NavBar";
import Login from "./login/login"
import Home from "./event_list/Home";
import { DataProvider } from "./context/DataContext";
import EventDetails from "./event_details/EventDetails";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Reserver from "./reserver/reserver";
import ReservationList from "./reservations/reservations_list";


function App() {
  return (
   
    
   
     <>
     
     
     
     <BrowserRouter>
      <DataProvider>
      <div className="app-container">
      <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/reserver/:id" element={<Reserver />} />
          <Route path="/my_reservations" element={<ReservationList />} />
        </Routes>
      </div>
      </DataProvider>
    </BrowserRouter>
     
     </>
  );
}

export default App;
