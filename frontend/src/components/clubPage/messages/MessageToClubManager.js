import React, {useState} from 'react';
import {getUserId} from "../../../service/StorageService";
import ModalHint from "./ModalHint";
import '../../clubPage/sider/css/PageSider.css';
import classes from "./css/MessageToClubManager.module.css";
import TextArea from "antd/lib/input/TextArea";
import {Button, Col, Form, Modal, Row} from "antd";
import {createMessage} from "../../../service/MessageService";
import ContactsInfoUtil from "../../../util/ContactsInfoUtil";

const MessageToClubManager = ({isShowing, setShowing, club}) => {

    const [messageForm] = Form.useForm();
    const [admin, setAdmin] = useState({id: 1});

    const getRecipientId = () => {
        if (club.user) {
            return club.user.id;
        } else if (club.center && club.center.user) {
            return club.center.user.id;
        } else {
            return admin.id;
        }
    }

    const onFinish = (values) => {
        const data = {
            senderId: getUserId(),
            clubId: club.id,
            recipientId: getRecipientId(),
            text: values.text,
        };
        setShowing(false);
        createMessage(data).then(() => messageForm.resetFields())
    };

    return (
        !getUserId()
            ?
            <ModalHint visible={isShowing}
                       setVisible={setShowing}
            >
                Увійдіть або зареєструйтеся!!!
            </ModalHint>
            :
            <Modal
                className={classes.signUpForClubModal}
                centered
                width={521}
                open={isShowing}
                onOk={() => setShowing(false)}
                onCancel={() => setShowing(false)}
                footer={null}
            >
                <div className={classes.title}>
                    Написати менеджеру
                </div>

                <div className={classes.content}>

                    <div className={classes.clubName}>
                        {club.name}
                    </div>

                    <div className={classes.contacts}>
                        <ContactsInfoUtil className={classes.contacts} contacts={club.contacts}/>
                    </div>

                    <hr className={classes.hr}/>

                    <Form
                        className={classes.form}
                        name="message-from-club"
                        form={messageForm}
                        requiredMark={true}
                        onFinish={onFinish}
                    >
                        <div className={classes.formItem}>
                            <Form.Item
                                label="Написати організатору гуртка"
                                labelCol={{ span: 24, className: classes.labelBlock}}
                                name="text"
                                rules={[
                                    {
                                        required: true,
                                        message: "Додайте текст повідомлення",
                                    },
                                ]}
                                colon={false}
                                className={classes.formItem}
                            >
                                <Row justify="center">
                                    <Col span={30}>
                                        <TextArea
                                            className={classes.textArea}
                                            autoSize={{ minRows: 5, maxRows: 5 }}
                                            placeholder="Додайте опис"
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                        </div>

                        <div>
                            <Button
                                className={classes.formButton}
                                type="primary"
                                htmlType="submit"
                            >
                                Надіслати
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
    );
};

export default MessageToClubManager;
