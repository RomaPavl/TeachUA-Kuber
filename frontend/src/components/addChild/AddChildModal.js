import React from 'react';
import {Modal, Form, Input, Button, Radio, message} from 'antd';
import { postChild } from '../../service/ChildService.js';
import "./AddChildModal.css";

const AddChildModal = ({ isVisible, setIsVisible, onChildAdded }) => {
    const [formInstance] = Form.useForm();

    const onFinish = (values) => {
        postChild(values)
            .then(response => {
                onChildAdded(response);
                setIsVisible(false);
                formInstance.resetFields();
                message.success("Дитину було додано");
            })
            .catch(error => {
                message.error("Помилка при додавані дитини")
                console.error('There was an error!', error);
            });
    };

    const handleAgeChange = (e) => {
        let input = parseInt(e.target.value, 10);

        if (isNaN(input)) {
            input = '';
        } else if (input < 0) {
            input = 0;
        } else if (input > 18) {
            input = 18;
        }

        formInstance.setFieldsValue({ age: input });
        formInstance.validateFields(['age']);
    };

    return (
        <Modal
            className="add-child-modal"
            title="Додати дитину"
            centered
            width={300}
            open={isVisible}
            onCancel={() => setIsVisible(false)}
            footer={null}
        >
            <div className="content">
                <Form
                    form={formInstance}
                    name="add-child"
                    onFinish={onFinish}
                >
                    <Form.Item
                        className="custom-form-item"
                        label="Ім'я"
                        name="firstName"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Будь ласка, введіть ім\'я!' }]}
                    >
                        <Input
                            maxLength={20}
                        />
                    </Form.Item>

                    <Form.Item
                        className="custom-form-item"
                        label="Прізвище"
                        name="lastName"
                        maxLength={20}
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Будь ласка, введіть прізвище!' }]}
                    >
                        <Input
                            maxLength={20}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Вік"
                        name="age"
                        className="custom-form-item"
                        labelCol={{ span: 24 }}
                        rules={[
                            { required: true, message: 'Будь ласка, введіть вік!' },
                            { type: 'number', min: 2, max: 18, message: 'Вік має бути від 2 до 18 років' }
                        ]}
                    >
                        <Input type="number" min="0" max="18" onChange={handleAgeChange} />
                    </Form.Item>

                    <Form.Item
                        className="custom-form-item"
                        label="Стать"
                        name="gender"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Будь ласка, виберіть стать!' }]}
                    >
                        <Radio.Group>
                            <Radio value="MALE">Хлопчик</Radio>
                            <Radio value="FEMALE">Дівчинка</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button className="submit-button" type="primary" htmlType="submit">
                            Додати
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default AddChildModal;