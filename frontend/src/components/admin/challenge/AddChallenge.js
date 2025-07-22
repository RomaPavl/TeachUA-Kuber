import React, {useState} from 'react';
import './css/AddChallenge.css';
import {Typography, Form, Input, Button, message, Upload, InputNumber} from 'antd';
import {createChallenge} from "../../../service/ChallengeService";
import {useForm} from "antd/es/form/Form";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Editor from "../../../util/Editor";
import {Link} from "react-router-dom";
import {tokenToHeader} from "../../../service/UploadService";

const { Title } = Typography;

const AddChallenge = () => {
    const [challengeForm] = useForm();
    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [sortNumber, setSortNumber] = useState(1);
    const [picture, setPicture] = useState();
    const [challengeId, setChallengeId] = useState();

    const checkFormValidity = () => {
        if (name && sortNumber && title && description && picture){
            return !(challengeForm.getFieldValue('name').length >= 5 &&
                challengeForm.getFieldValue('name').length <= 30 &&
                challengeForm.getFieldValue('sortNumber') >= 0 &&
                challengeForm.getFieldValue('title').length >= 5 &&
                challengeForm.getFieldValue('title').length <= 100 &&
                challengeForm.getFieldValue('description').length >= 40 &&
                challengeForm.getFieldValue('description').length <= 25000
            )
        }
        else{
            return true;
        }
    };

    const handleNameChange = (value) => {
        setName(value);
    }
    const handleTitleChange = (value) => {
        setTitle(value);
    }
    const handleSortNumberChange = (value) => {
        setSortNumber(value);
    }
    const handlePictureChange = (value) => {
        setPicture(value);
    }

    const handleDescriptionChange = (value) => {
        setDescription(value);
    }
    const onFinish = (values) => {
        createChallenge(values)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                message.success("Челендж '" + response.name + "' успішно доданий!");
                setChallengeId(response.id)
            });
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="add-form">
            <Link
                to="/admin/challenges"
                className="back-btn"
            >
                <Button  className="flooded-button">
                    До списку челенджів
                </Button>
            </Link>
            <Link
                to={"/challenges/" + challengeId}
                className="back-btn"
            >
                <Button className="flooded-button" disabled={!challengeId}>
                    Переглянути челендж
                </Button>
            </Link>
            <Title>Додайте челендж</Title>
            <Form
                form={challengeForm}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
                autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                shouldUpdate={true}
            >
                <Form.Item
                    name="sortNumber"
                    label="Порядковий номер"
                    initialValue={sortNumber}
                    onChange={handleSortNumberChange}
                    rules={[
                        {
                            required: true,
                            validator: (_, value) => {
                                if (value && value.toString().length > 30) {
                                    return Promise.reject("Поле 'Порядковий номер' може містити мінімум 1 максимум 30 символів");
                                }
                                return Promise.resolve();
                            },
                        },
                        {
                            required: false,
                            pattern: /^[-0-9]*$/,
                            message: "Поле 'Порядковий номер' може містити тільки цифри",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "50%" }} />
                </Form.Item>
                <Form.Item
                    label="Назва"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    rules={[
                        {
                            required: true,
                            message: "Поле \"Назва\" не може бути пустим",
                        },
                        {
                            min: 5,
                            max: 30,
                            message: "Поле \"Назва\" може містити мінімум 5 максимум 30 символів"
                        },
                        {
                            required: false,
                            pattern: /^[^ЁёЪъЫыЭэ]+$/,
                            message: "Поле \"Назва\" може містити тільки українські та англійські літери, цифри та спеціальні символи",
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Заголовок"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    rules={[
                        {
                            required: true,
                            message: "Поле \"Заголовок\" не може бути пустим",
                        },
                        {
                            min: 5,
                            max: 100,
                            message: "Поле \"Заголовок\" може містити мінімум 5 максимум 100 символів"
                        },
                        {
                            required: false,
                            pattern: /^[^ЁёЪъЫыЭэ]+$/,
                            message: "Поле \"Заголовок\" може містити тільки українські та англійські літери, цифри та спеціальні символи",
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Опис"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Поле \"Опис\" не може бути пустим",
                        },
                        {
                            min: 40,
                            max: 25000,
                            message: "Поле \"Опис\" може містити мінімум 40 максимум 25000 символів"
                        },
                        {
                            required: false,
                            pattern: /^[^ЁёЪъЫыЭэ]+$/,
                            message: "Поле \"Опис\" може містити тільки українські та англійські літери, цифри та спеціальні символи",
                        }
                    ]}
                >
                    <Editor value={description} onChange={handleDescriptionChange}/>
                </Form.Item>
                <Form.Item
                    name="picture"
                    label="Фото"
                    value={picture}
                    onChange={handlePictureChange}
                    rules={[
                        {
                            required: true,
                            message: "Фото не може бути пустим",
                        }]}
                >
                    <Upload
                        name="image"
                        listType="picture-card"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        accept="image/*"
                        data={{folder:`challenges`}}
                        headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}>
                        <span className="upload-label"><UploadOutlined className="icon" />Завантажити</span>
                    </Upload>
                </Form.Item>
                <Form.Item
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="flooded-button add-contact-type-button"
                        disabled={checkFormValidity()}
                    >
                        Зберегти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddChallenge;