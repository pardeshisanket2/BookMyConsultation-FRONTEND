import React, { useEffect, useState } from "react";
import { FormControl, TextField } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import "../../common/common.css";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RateAppointment from "./RateAppointment";
import { FormHelperText } from "@material-ui/core";
import { getLoggedInUserDetails } from "../../services/localStorageService";
import { getAppointmentList, postRating } from "../../services/doctorService";
 
const useStyles = makeStyles({
  root: {
    maxWidth: "99%",
    margin: "30px 10px",
  },
  actionBtn: {
    padding: 16,
  },
  media: {
    height: 140,
  },
  fontStyle: {
    fontSize: 10,
  },
  loggedInTextFormat: {
    textAlign: "center",
    margin: "30px",
    fontWeight: "500",
  },
});
const Appointment = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [record, setRecord] = useState({});
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ comments: "", rating: "" });
  const [appointment, setappointment] = useState([]);
 
  const handleSubmmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const ratingData = {
        id: record.id,
        appointmentId: record.appointmentId,
        doctorId: record.doctorId,
        comments: values.comments,
        rating: values.rating,
      };
      setOpenPopup(false);
      postRating(ratingData).then((data) => {
        
        if (data.status === 200) {
          setOpenPopup(false);
          setRecord({});
        }
      });
    }
  };
 
  const handleInputChange = (e) => {
    setValues({ comments: e.target.value, rating: values.rating });
  };
  const handleRatingChange = (e) => {
    setValues({ comments: values.comments, rating: e.target.value });
  };
 
 const handleRatingAppoinment = (e, data) => {
    setRecord(data);
    setOpenPopup(true);
  };
 
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("rating" in fieldValues)
      temp.rating = fieldValues.rating ? "" : "Select a rating";
    setErrors({
      ...temp,
    });
 
    return Object.values(temp).every((x) => x == "");
  };
 
  useEffect(() => {
    const user = getLoggedInUserDetails();
    if (user !== null) {
      getAppointmentList(user.email).then((data) => setappointment(data));
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
    setappointment(appointment);
  }, []);
 
  const classes = useStyles();
 
  return (
    <div>
      {!loggedIn ? (
        <div className={classes.loggedInTextFormat}>
          Login to see appointments
        </div>
      ) : (
        <div>
          {appointment.map((data) => {
            return (
              <Card key={data.appointmentId} className={classes.root}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="p">
                      {data.doctorName}
                    </Typography>
                    <Typography gutterBottom variant="p" component="p">
                      Date: {data.appointmentDate}
                    </Typography>
                    <Typography gutterBottom variant="p" component="p">
                      Symptoms: {data.symptoms}
                    </Typography>
                    <Typography gutterBottom variant="p" component="p">
                      preMedicalHistory:{data.priorMedicalHistory}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.actionBtn}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => {handleRatingAppoinment(e, data)}}
                    >
                      RATE APPOINTMENT
                    </Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
      )}
 
      <RateAppointment
        title={"Rate an appointment"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <form onSubmit={handleSubmmit}>
          <div>
            <FormControl style={{ marginBottom: "20px" }} variant="outlined">
              <TextField
                label="Comments"
                multiline
                rows={4}
                name="comments"
                variant="standard"
                onChange={handleInputChange}
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <Typography gutterBottom variant="p" component="p">
                Rating :
                <Rating name="rating" onChange={handleRatingChange} />
                {errors.rating && (
                  <FormHelperText style={{ color : "red",  marginLeft: "0" }}>
                    {errors.rating}
                  </FormHelperText>
                )}
              </Typography>
            </FormControl>
          </div>
          <div style={{ marginTop: "25px" }}>
            <Button variant="contained" color="primary" type="submit">
              RATE APPOINTMENT
            </Button>
          </div>
        </form>
      </RateAppointment>
    </div>
  );
};
 
export default Appointment;
