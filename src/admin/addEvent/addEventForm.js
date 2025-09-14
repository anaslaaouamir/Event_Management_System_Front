import { useState } from "react";
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';



const AddEventForm = ({events,setEvents,token}) =>{

    const navigate = useNavigate();

    const[title, setTitle]=useState('');
    const[location, setLocation]=useState('');
    const[description,setDescription]=useState('');
    const[eventDateTime,setEventDateTime]=useState('');
    const[salleImage,setSalleImage]=useState('');
    const[eventImage,setEventImage]=useState('');
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {

            const response = await axios.post(
                "http://localhost:9092/events",
                {
                     title,
                     location,
                     description,
                     eventDateTime,
                     imagePath: eventImage,
                     salleImagePath : salleImage

                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log("Event successful:", response.data);
            setEvents([...events,response.data]);
            navigate(`/add_class/${response.data.idEvent}`);

        } catch (err) {
            console.error("Event error:", err);
            setError("Event failed");
        }
    }

    return (

        <form onSubmit={handleSubmit}>

      <div className="form-group">
        <span className="form-label">Title</span>
        <input
          className="form-control"
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <span className="form-label">Location</span>
        <input
          className="form-control"
          type="text"
          required
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="form-group">
        <span className="form-label">Date and time</span>
        <input
          className="form-control"
          type="datetime-local"
          onChange={(e) => setEventDateTime(e.target.value)}
        />
      </div>

      <div className="form-group">
        <span className="form-label">Description</span>
        <textarea
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      

        {/* Event Image Upload */}
        <div className="form-group">
          <span className="form-label">Change Event Image</span>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                const file = e.target.files[0];
                setEventImage(`images/events/${file.name}`);
              }
            }}
          />
        </div>

        {/* Salle Image Upload */}
        <div className="form-group">
          <span className="form-label">Change Salle Image</span>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                const file = e.target.files[0];
                setSalleImage(`images/salles/${file.name}`);
              }
            }}
          />
        </div>


            {/* <br/><center><h2 style={{color:'#ffc001'}}>Classes Informations</h2></center> */}

        

      <div className="form-btn">
        <button type="submit" className="submit-btn">
          Add Classes
        </button>
      </div>
    </form>

    );
}

export default AddEventForm;