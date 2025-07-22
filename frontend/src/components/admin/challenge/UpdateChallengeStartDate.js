import React, { useEffect, useState} from "react";
import {useHistory, useParams, Link} from "react-router-dom";

import {Button, DatePicker, Form, message, Typography} from "antd";

import {useForm} from "antd/es/form/Form";
import {updateChallengeStartDate, getChallengeById} from "../../../service/ChallengeService";
import dayjs from 'dayjs';

const {Title} = Typography;

const UpdateChallengeStartDate = () => {

    const [challengeForm] = useForm()
    const [startDate, setStartDate] = useState({
        updatedDate: ""
    });
    const dateFormat = 'YYYY-MM-DD';
    const challengeId = useParams();

    const [challenge, setChallenge] = useState([{
        id: 0,
        name: "",
        title: "",
        description: "",
        picture: "",
        sortNumber: 0,
        isActive: "",
        tasks: []
    }]);
    const [challengeNotFound, setChallengeNotFound] = useState(false);

    const history = useHistory();

    const getData = () => {
        getChallengeById(challengeId.id).then(response => {
            setChallenge(response);
        }).catch(response => {
            if (response.status === 404) {
                setChallengeNotFound(true);
            }
        });
        console.log(challenge);
    };

    const onDateChange = (date, dateString) => {
        console.log(dateString);
        setStartDate({...startDate, updatedDate: dayjs(date).format("YYYY-MM-DD")});
        console.log(startDate);
    }

    const saveForm = (values) => {
        const formValues = {...values, startDate: startDate.updatedDate}
        updateChallengeStartDate(formValues, challengeId.id).then(response => {
            console.log(response);
            if (response.status) {
                message.warning(response.message);
                return;
            }
            message.success(`Дату старту челенджа ${challenge.name} успішно оновлено`);
            history.push("/admin/challenge/" + challengeId.id);
        });
        setStartDate(formValues);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="push-down">
            <Button className="flooded-button add-btn">
                <Link to="/admin/addChallenge">
                    Додати челендж
                </Link>
            </Button>
            <Link
                to="/admin/challenges"
                className="back-btn">
                <Button className="flooded-button">
                    До списку челенджів
                </Button>
            </Link>
            <Title level={3}>Змінити дату старту челенджу {challenge.name}</Title>
            <Form
                form={challengeForm}
                onFinish={saveForm}
                autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
            >
                <Form.Item
                    label="Нова дата початку"
                    name="date"
                >
                    <DatePicker
                        onChange={onDateChange}
                        format={dateFormat}
                        name="startDate"
                        value={dayjs(startDate.updatedDate,"YYYY-MM-DD")}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="flooded-button add-contact-type-button"
                    >
                        Зберегти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateChallengeStartDate;