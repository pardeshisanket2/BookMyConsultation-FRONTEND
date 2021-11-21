import React, {
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "react-modal";

const modalStyles = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "transparent",
  },
};

const DoctorDetailsModal = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const modalRef = React.createRef();

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

  if (!showModal && !selectedDoctor) {
    return null;
  }

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      style={modalStyles}
      ref={modalRef}
    >
      <div className="doctor-details-modal">
        <div className="doctor-modal-header">
          Doctor Details
          <CloseIcon className="close-icon" onClick={onClose} />
        </div>
        <div className="doctor-details-modal-content">
          Dr: {selectedDoctor.firstName} {selectedDoctor.lastName}
          <br />
          Total Experience: {selectedDoctor.totalYearsOfExp}
          <br />
          Speciality: {selectedDoctor.speciality}
          <br />
          Date of Birth: {selectedDoctor.dob}
          <br />
          {/*City: {selectedDoctor.address.city}*/}
          <br />
          Email: {selectedDoctor.emailId}
          <br />
          Mobile: {selectedDoctor.mobile}
          <br />
          Rating: {selectedDoctor.rating}
        </div>
      </div>
    </Modal>
  );
});

export default DoctorDetailsModal;
