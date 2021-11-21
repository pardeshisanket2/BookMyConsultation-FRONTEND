import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  useCallback,
} from "react";

import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const modalStyles = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "transparent",
  },
};

const BookAppointmentModal = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const bookRef = React.createRef();

  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      doctorName: `${selectedDoctor?.firstName || ""} ${
        selectedDoctor?.lastName || ""
      }`,
      appointmentDate: new Date().toISOString(),
      timeSlot: "",
      medicalHistory: "",
      symptoms: "",
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      onOpen: (doctor) => {
        setShowModal(true);
        setSelectedDoctor(doctor);
      },
    }),
    []
  );

  const onClose = useCallback(() => {
    setShowModal(false);
    setSelectedDoctor(null);
  }, []);

  const onSubmit = (values) => {
    console.log("form values", {
      ...values,
      appointmentDate: new Date(values.appointmentDate).toISOString(),
    });
  };

  useEffect(() => {
    if (selectedDoctor) {
      setValue(
        "doctorName",
        `${selectedDoctor?.firstName || ""} ${selectedDoctor?.lastName || ""}`
      );
    }
  }, [selectedDoctor, setValue]);

  if (!showModal && !selectedDoctor) {
    return null;
  }

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      style={modalStyles}
      ref={bookRef}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="doctor-appointment-modal">
          <div className="doctor-modal-header">
            Book an Appointment
            <CloseIcon className="close-icon" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="doctor-appointment-modal-content">
              <Controller
                name="doctorName"
                control={control}
                render={() => (
                  <TextField
                    label="Doctor Name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    disabled={true}
                    value={`${selectedDoctor?.firstName || ""} ${
                      selectedDoctor?.lastName || ""
                    }`}
                    style={{
                      maxWidth: 300,
                    }}
                  />
                )}
              />
              <Controller
                name="appointmentDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    label="Appointment Date"
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} />}
                    style={{
                      marginTop: 10,
                      maxWidth: 300,
                    }}
                  />
                )}
              />
              <FormControl
                style={{
                  marginTop: 10,
                  maxWidth: 300,
                }}
              >
                <InputLabel>Time Slot</InputLabel>
                <Controller
                  name="timeSlot"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select value={value} onChange={onChange}>
                      <MenuItem value={10}>10-11</MenuItem>
                      <MenuItem value={20}>11-12</MenuItem>
                      <MenuItem value={30}>12-01</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              <Controller
                name="medicalHistory"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label="Medical History"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    style={{
                      maxWidth: 300,
                      marginTop: 10,
                    }}
                    InputProps={{
                      style: {
                        minHeight: 50,
                      },
                    }}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="symptoms"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label="Symptoms"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    style={{
                      maxWidth: 300,
                      marginTop: 10,
                    }}
                    InputProps={{
                      style: {
                        minHeight: 50,
                      },
                    }}
                    placeholder="ex:Cold, Swelling, etc"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                style={{ width: "40%", marginTop: 15 }}
                size="small"
                color="primary"
              >
                Book Appointment
              </Button>
            </div>
          </form>
        </div>
      </MuiPickersUtilsProvider>
    </Modal>
  );
});

export default BookAppointmentModal;
