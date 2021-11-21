import React, {useCallback, useEffect, useState} from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import '../../common/common.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getDoctorsList } from '../../services/doctorsService';
import DoctorDetailsModal from './DoctorDetails';
import BookAppointmentModal from './BookAppointment';

const useStyles = makeStyles({
  root: {
    maxWidth: "40%",
    width: "40%",
    margin : 4
  },
  media: {
    height: 140,
  },
  fontStyle:{
    fontSize:10
  }
});
const DoctorsList = () => {
  // all states
  const [doctorsList,setDoctorsList] = useState([]);
  const [speciality, setSpeciality] = useState('');
  const [filteredList,setFilteredList] = useState([]);

  const changeHandler = (event) => {
    let value = event.target.value;
    setSpeciality(value);
    if(value !== 'all'){
      let filteredList = doctorsList.filter( a => a.speciality === value);
      setFilteredList(filteredList);
    }else {
      setFilteredList(doctorsList);
    }
  };
  const getDoctors = () => {
    getDoctorsList()
    .then((response) => {
      setDoctorsList(response);
      setFilteredList(response);
    }, () => {
      console.log('Get doctors list error');
      
    })
  }
  useEffect(() => {
    getDoctors();
  }, [])


  const [specialityList,setSpecialityList] = useState([
      "CARDIOLOGIST",
      "GENERAL_PHYSICIAN",
      "DENTIST",
      "PULMONOLOGIST",
      "ENT",
      "GASTRO"  
])

  const classes = useStyles();

  const modalRef = React.useRef();
  const ref = React.useRef();

  const openDetailsModalHandler = () => {
    modalRef.current.onOpen(doctorsList.filter(a => a.doctorName));
  }

  const openBookModalHandler = () => {
    ref.current.onOpen(doctorsList.filter(a => a.doctorName));
  }

  return (
    <div className="doctors-list-container">
      <div className ='card-containers-doctors'>
        <InputLabel id="demo-simple-select-standard-label">
          Select Speciality
        </InputLabel>
        <FormControl variant="filled">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={speciality}
            onChange={changeHandler}
            label="Speciality"
            style={{minWidth:"200px",marginBottom:"10px"}}
          >
            <MenuItem value="all">All</MenuItem>
            {specialityList.map((el,id) => {
              return (
                <MenuItem key = {id} value={el}>{el}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        {filteredList.map((el,index) => {
          return (
            <Card className={classes.root}>
              <CardContent>
                <Typography gutterBottom variant="body1" component="p">
                  Doctor Name:&nbsp;{el.firstName + " " + el.lastName}
                </Typography>
                <Typography gutterBottom variant="p"  component="p">
                  Speciality:&nbsp;{el.speciality}
                </Typography>
                <Typography gutterBottom variant="p" component="p">
                  <span className = 'rating-container-style'>
                    Rating:&nbsp;<Rating name="read-only" value={el.rating} readOnly />
                  </span>
                </Typography>
              </CardContent>
              <CardActions>
                <div className = 'doctors-card-buttons'>
                  <Button onClick={openBookModalHandler} variant="contained" style={{width:"40%"}} size='small' color="primary">
                    BOOK APPOINTMENT
                  </Button>
                  <BookAppointmentModal ref={ref}/>

                  <Button onClick={openDetailsModalHandler} variant="contained" style={{width:"40%",backgroundColor:"#2e7d32",color:"#FFF"}} size='small' color="success">
                    VIEW DETAILS
                  </Button>
                  <DoctorDetailsModal ref={modalRef}/>
                </div>
              </CardActions>
          </Card>
          )
        })}
      </div>
    </div>
  );
};

export default DoctorsList;
