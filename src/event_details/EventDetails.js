import { useContext } from "react";
import Description from "./Description";
import Head from "./Head";
import Summary from "./Summary";
import { useParams } from "react-router-dom";
import DataContext from "../context/DataContext";

const EventDetails = () => { 
  const { id } = useParams();
  const { events, isLoading, client } = useContext(DataContext);

  if (isLoading) return <h2>Loading...</h2>;

  const event = events.find((event) => event.idEvent == id);

  if (!event) return <h2>Error: Event not found</h2>;

  const classes = event.classes || [];



  return (
    <>
      <Head event={event} client = {client}/>
      <Description event={event} classes={classes}  />
      <Summary event={event} />
    </>
  );
};

export default EventDetails;
