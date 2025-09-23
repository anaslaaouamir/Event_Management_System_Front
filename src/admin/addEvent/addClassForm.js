import { useState } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";

const AddClassForm =({event,token,events,setEvents,setAlert})=>{

    const[descriptionClass,setDescriptionClass]=useState('');
    const[className,setClassName]=useState('');
    const[capacity, setCapacity]=useState('');
    const[price,setPrice]=useState('');
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {

            const response = await axios.post(
                "http://localhost:8888/EVENT-SERVICE/classes",
                {
                     className,
                     description: descriptionClass,
                     capacity:capacity,
                     fullCapacity: capacity,
                     price,
                     event: { idEvent: event.idEvent }
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log("Class successful:", response.data);
            setEvents(events.map(ev =>
                ev.idEvent === event.idEvent ? response.data : ev
                )); 
            setCapacity('');setClassName('');setDescriptionClass('');
            setAlert({
              type: "success",
              message: "Class added successfully!",
              show: true,
            });

        } catch (err) {
            console.error("Event error:", err);
            setError("Event failed");
        }
    }

    return (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <span className="form-label">Class Name</span>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
        <div className="form-group form-group-inline">
        
          <div >
            <span className="form-label">Capacity</span>
            <input
              className="form-control small-input"
              type="number"
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          <div >
            <span className="form-label">Price</span>
            <input
              className="form-control small-input"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
      </div>

      <div className="form-group">
        <span className="form-label">Class Description</span>
        <textarea
          className="form-control"
          onChange={(e) => setDescriptionClass(e.target.value)}
        />
      </div>

      <div className="form-group form-group-inline">
      <button type="submit" className="submit-btn">
          Add class
        </button>
        <Link to={"/"}>
        <button className="submit-btn">
          Done
        </button></Link>
        </div>
    </form>
    );
}

export default AddClassForm;