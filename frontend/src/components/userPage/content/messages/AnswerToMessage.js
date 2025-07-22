import React, {useState} from 'react';
import "../../../clubPage/sider/css/PageSider.css";
import TextArea from "antd/lib/input/TextArea";
import {Button, Col, Form, Modal, Row} from "antd";
import {createMessage, updateMessageIsAnsweredById} from "../../../../service/MessageService";
import {getUserId} from "../../../../service/StorageService";
import ModalHint from "../../../clubPage/messages/ModalHint";
import classes from "../../../clubPage/messages/css/MessageToClubManager.module.css";

const AnswerToMessage = ({isShowing, setShowing, message}) => {

    const [messageForm] = Form.useForm();
    const [answered, setAnswered] = useState(message.isAnswered);



    const getRecipientId = () => {
        console.log(message);
        return message.sender.id;
    }

    const onFinish = (values) => {
        const data = {
            senderId: getUserId(),
            clubId: message.club.id,
            recipientId: getRecipientId(),
            text: values.text,
        };
        setShowing(false);
        console.log(data);
        createMessage(data).then(() => messageForm.resetFields())
    };

function UpdateAnswered() {
    if (!answered) {
        updateMessageIsAnsweredById(message.id, {isAnswered: true})
            .then(response => setAnswered(response.isAnswered));
    }
}


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
                    Відповісти
                </div>

                <div className={classes.content}>

                    <Form
                        className={classes.form}
                        name="answer-to-message"
                        form={messageForm}
                        requiredMark={true}
                        onFinish={onFinish}
                    >
                        <div className={classes.formItem}>
                            <Form.Item
                                label="Напишіть відповідь"
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
                                onClick={()=> UpdateAnswered()}
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

export default AnswerToMessage;
