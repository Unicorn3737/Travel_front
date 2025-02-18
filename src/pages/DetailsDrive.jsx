import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editImage from "../images/dino.jpg";
import { API_URL } from "../config/config";
export const DetailsDrive = () => {
  const [drive, setDrive] = useState({});
  const { driveId } = useParams();

  const nav = useNavigate();

  useEffect(() => {
    async function getOneDetail() {
      try {
        const { data } = await axios.get(`${API_URL}drive/details/${driveId}`);
        console.log("here is the one drive on the front", data);
        setDrive(data);
      } catch (error) {
        console.log(error);
      }
    }
    getOneDetail();
  }, [driveId]);

  return (
    <div>
      <h1>
        Title:
        {drive.title}
      </h1>
      <h1>
        Date:
        {drive.date}
      </h1>
      <h1>Location:{drive.location}</h1>
      <h1>Days:{drive.days}</h1>
      <h1>Transport:{drive.transport}</h1>
      <h1>Phone:{drive.phone}</h1>
      <h1>Owner:{drive.owner?.username}</h1>
      {/*<h1>{drive.travelers}</h1>*/}
    </div>
  );
};
