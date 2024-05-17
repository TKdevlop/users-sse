import React, { useState } from "react";
import { Button, Checkbox, Col, Input, Modal, Row, Select } from "antd";
import { Steps } from "antd";

const UserAddEditStepperModal: React.FC = ({
  user,
  setSelectedUser,
  addUser,
  editUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (currentStep === 1) {
      if (user.edit) {
        editUser();
      } else {
        addUser();
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCancel = () => {
    setSelectedUser({});
    setCurrentStep(0);
  };
  const handleChange = (key: string) => (e) => {
    setSelectedUser((user) => ({ ...user, [key]: e.target.value }));
  };
  return (
    <>
      <Modal
        style={{ width: "100%", resize: "none" }}
        afterOpenChange={() => setCurrentStep(0)}
        title="User Modal"
        open={user.showModal}
        onOk={handleOk}
        okText={currentStep === 1 ? "Done" : "Next"}
        onCancel={handleCancel}
      >
        <Steps
          style={{ margin: "20px 10px 20px 10px" }}
          current={currentStep}
          onChange={(step) => setCurrentStep(step)}
          items={[
            {
              title: "Basic Details",
            },
            {
              title: "Password",
            },
          ]}
        />

        {currentStep === 0 && (
          <>
            <Row gutter={[32, 32]} style={{ margin: 20 }}>
              <Col md={12}>
                <Input
                  value={user.firstName}
                  placeholder="First Name"
                  onChange={handleChange("firstName")}
                />
              </Col>
              <Col md={12}>
                <Input
                  value={user.lastName}
                  placeholder="Last Name"
                  onChange={handleChange("lastName")}
                />
              </Col>
            </Row>
            <Row gutter={[32, 32]} style={{ margin: 20 }}>
              <Col md={12}>
                <Input
                  value={user.email}
                  placeholder="Email"
                  onChange={handleChange("email")}
                />
              </Col>
              <Col md={12}>
                <Input
                  placeholder="Phone Number"
                  value={user.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                />
              </Col>
            </Row>
            <Row gutter={[32, 32]} style={{ margin: 20 }}>
              <Col md={24}>
                <Input
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange("password")}
                />
              </Col>
            </Row>
          </>
        )}
        {currentStep === 1 && (
          <>
            <Row gutter={[32, 32]} style={{ margin: 20 }}>
              <Col md={24}>
                <Select
                  value={user.role}
                  style={{ width: "100%" }}
                  options={[
                    { label: "administrator", value: "administrator" },
                    { label: "user", value: "user" },
                  ]}
                  placeholder="Roles"
                  onChange={(e) =>
                    setSelectedUser({
                      ...user,
                      role: e,
                    })
                  }
                />
              </Col>
              <Col md={24}>
                <Checkbox
                  checked={user.receiveEmails}
                  onChange={(e) =>
                    setSelectedUser({
                      ...user,
                      receiveEmails: e.target.checked,
                    })
                  }
                >
                  Would you like to receive emails?
                </Checkbox>
              </Col>
              <Col md={24}>
                <Checkbox
                  checked={user.receiveNotifications}
                  onChange={(e) =>
                    setSelectedUser({
                      ...user,
                      receiveNotifications: e.target.checked,
                    })
                  }
                >
                  Would you like to receive eNotifications?
                </Checkbox>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </>
  );
};

export default UserAddEditStepperModal;
