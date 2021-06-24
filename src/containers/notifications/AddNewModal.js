import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import IntlMessages from "../../helpers/IntlMessages";

const AddNewModal = ({ modalOpen, toggleModal, notificationType }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="notification.add-new" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="notification.title" />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="notification.type" />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={notificationType}
        />
        <Label className="mt-4">
          <IntlMessages id="notification.message" />
        </Label>
        <Input type="textarea" name="text" id="exampleText" />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="common.cancel" />
        </Button>
        <Button color="primary" onClick={toggleModal}>
          <IntlMessages id="common.submit" />
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
