import React, { useEffect, useState } from 'react';
import CaretRightOutlined from "@ant-design/icons/lib/icons/CaretRightOutlined";
import { Avatar, Collapse, Badge, Modal, Button, Input, Form } from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import { CheckCircleOutlined, ExclamationCircleOutlined, MessageOutlined } from "@ant-design/icons";
import { DeleteOutlined } from '@ant-design/icons';
import { getLogo } from '../messages/MessageUtil';
import { updateComplaintIsActiveById } from '../../../../service/ComplaintService';
import { getRole } from '../../../../service/StorageService';
import { useHistory } from 'react-router-dom';
import { updateComplaintAnswerById } from '../../../../service/ComplaintService';

const Complaint = ({ message, onDelete, userRole }) => {
  const { Panel } = Collapse;
  const [active, setActive] = useState(message.isActive);
  const [showModal, setShowModal] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState('');
  const [answer, setAnswer] = useState('');
  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      updateComplaintAnswerById(message.id, answer);
      setSubmittedAnswer(answer);
      setShowAnswerForm(false);
    }).catch(error => {
    });
  };

  useEffect(() => {
    if (!active && getRole() === 'ROLE_MANAGER') {
      updateComplaintIsActiveById(message.id, { isActive: false })
        .then(response => setActive(response.isActive));
    }
  }, [active]);

  const handleDelete = () => {
    onDelete(message.id);
  };

  const handleNameClick = () => {
    message.hasAnswer ? setShowModal(true) : setShowModal(false);
  };

  const showReadComplaint = (isActive) => {
    if (isActive) return <ExclamationCircleOutlined className="exclamation" />
    else return <CheckCircleOutlined className="checkCircle" />
  }

  const history = useHistory();

  const redirectToClubPage = () => {
    history.push(`/club/${message.club.id}`);
  };

  return (
    <>
      <Collapse
        onChange={() => {
          if (message.isActive) setActive(false);
        }}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <div className="userInfo">
          <Avatar size={36} src={getLogo(message.user.urlLogo)} icon={<UserOutlined />} />
          <div className="userName" style={{ cursor: 'pointer' }}>
            {`${message.user.firstName} ${message.user.lastName}`}
          </div>
        </div>
        <Panel
          key={message.id}
          header={
            <div>
              <div>
                {message.hasAnswer && userRole !== 'ROLE_MANAGER' ? (
                  <Badge dot onClick={handleNameClick}>{message.club.name}</Badge>
                ) : (
                  <Badge onClick={handleNameClick}>{message.club.name}</Badge>
                )}
              </div>
            </div>
          }
          extra={
            userRole === 'ROLE_MANAGER' && <div className="extra">
              {showReadComplaint(active)}
              <MessageOutlined className="answerButton" onClick={() => { setShowAnswerForm(true) }} />
              <DeleteOutlined className="deleteButton" onClick={handleDelete} />
            </div>
          }
        >
          <div>
            {message.text === null ? 'Немає відповіді' : message.text}
          </div>
        </Panel>
      </Collapse>

      <Modal
        open={showModal}
        onCancel={() => { setShowModal(false) }}
        footer={userRole !== 'ROLE_MANAGER' &&
          <Button key="submit" type="primary" onClick={() => redirectToClubPage()}>
            Написати нову скаргу
          </Button>}
        title={`${message.club.name} - Відповідь`}
      >
        <div>
          {submittedAnswer || message.answerText}
        </div>
      </Modal>
      <Modal
        open={showAnswerForm}
        title="Дати відповідь на скаргу"
        onCancel={() => { setShowAnswerForm(false) }}
        footer={[
          <Button key="cancel" onClick={() => { setShowAnswerForm(false) }}>
            Скасувати
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Відповісти
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            name="Відповідь"
            rules={[{ required: true, message: 'Будь ласка, введіть відповідь!' }]}
          >
            <Input.TextArea rows={4} onChange={handleInputChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Complaint;
