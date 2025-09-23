import { useContext } from 'react';
import './profile/profile.css'
import DataContext from './context/DataContext';

const Popup = ({ alert, setAlert }) => {

  const{confirm,setConfirm} = useContext(DataContext);

  if (!alert || !alert.show) return null;

  const alertClasses = {
    success: "alert alert-success alert-dismissable",
    error: "alert alert-danger alert-dismissable",
    warning: "alert alert-warning alert-dismissable",
    info: "alert alert-info alert-dismissable",
  };


  const close = () => {
    setAlert({ type: null, message: null, show: false });
  };

  const handleConfirm=()=>{
    setConfirm(true);
  }

  return (
    <div className="popup-container">
    <div className={alertClasses[alert.type] || "alert alert-info alert-dismissable"}>
      {/* Close button */}
      <button
        className="panel-close close"
        style={{ marginRight: "10px" }}
        onClick={close}
      >
        ×
      </button>

      {alert.type == 'info' &&
      <button
        className="panel-close close"
        style={{ marginRight: "10px" }}
        onClick={handleConfirm}
      >
        ✔
      </button>
    }
      <i className="fa fa-coffee ms-2"></i> {alert.message}
    </div>
    </div>
  );
};


export default Popup;
