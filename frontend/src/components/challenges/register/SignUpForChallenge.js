import React, {useEffect, useState} from 'react';
import {getUserId} from "../../../service/StorageService";
import ModalHint from "../../clubPage/register/ModalHint";
import {Button, Form, Modal, Input, Checkbox, Tooltip, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import AddChildModal from "../../addChild/AddChildModal";
import {
    postChildrenChallengeRegistration,
    postUserChallengeRegistration,
    getChildrenForCurrentUserByChallengeId, checkUserAlreadyRegistered
} from "../../../service/ChallengeRegistrationService";
import './css/SignUpForChallenge.css';
import classes from "./css/SignUpForChallenge.module.css";

const SignUpForChallenge = ({isShowing, setShowing, challenge}) => {

    const [registrationToChallengeForm] = Form.useForm();
    const [children, setChildren] = useState([]);
    const [isAddChildModalVisible, setIsAddChildModalVisible] = useState(false);
    const [selectedChildrenIds, setSelectedChildrenIds] = useState([]);
    const [selectedUser, setSelectedUser] = useState(false);
    const boyIcon = `${process.env.PUBLIC_URL}/static/images/children/boy-icon.png`;
    const girlIcon = `${process.env.PUBLIC_URL}/static/images/children/girl-icon.png`;
    const [userRegistered, setUserRegistered] = useState(false);

    const onCheckboxChangeChildren = checkedValues => {
        setSelectedChildrenIds(checkedValues);
    };
    const onCheckboxChangeUser = checkedValue => {
        setSelectedUser(checkedValue);
    };
    const handleChildAdded = (newChild) => {
        console.log("Child added:", newChild);
        setChildren(prevChildren => [...prevChildren, newChild]);
    };


    useEffect(() => {
        if (isShowing) {
            getChildrenForCurrentUserByChallengeId(challenge.id)
                .then(data => {
                    setChildren(data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
            checkUserAlreadyRegistered(challenge.id, getUserId())
                .then(data => {
                    setUserRegistered(data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
        setSelectedChildrenIds([]);
        setSelectedUser(false);
    }, [isShowing]);

    const onFinish = (values) => {
        const comment = values.comment || ' ';
        if (selectedChildrenIds.length > 0) {
            const childrenChallengeRegistrationRequest = {
                childIds: selectedChildrenIds,
                challengeId: challenge.id,
                comment: comment
            };
            postChildrenChallengeRegistration(childrenChallengeRegistrationRequest)
                .then(() => {
                    setShowing(false);
                    setSelectedChildrenIds([]);
                    message.success("Запит на реєстрацію на челендж надіслано");
                })
                .catch((error) => {
                    message.error("Помилка при запиті на реєстрацію на челедж")
                    console.error('postChildrenChallengeRegistration: There was an error!', error);
                });
        }

        if (selectedUser) {
            const userChallengeRegistrationRequest = {
                userId: getUserId(),
                challengeId: challenge.id,
                comment: comment
            };
            postUserChallengeRegistration(userChallengeRegistrationRequest)
                .then(() => {
                    setShowing(false);
                    setSelectedUser(false);
                    message.success("Запит на реєстрацію на челендж надіслано");
                })
                .catch((error) => {
                    message.error("Помилка при запиті на реєстрацію на челедж")
                    console.error('postUserChallengeRegistration: There was an error!', error);
                });
        }
        registrationToChallengeForm.resetFields();
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
                className={classes.signUpForChallengeModal}
                centered
                title="Записати на челендж"
                width={420}
                open={isShowing}
                onOk={() => setShowing(false)}
                onCancel={() => setShowing(false)}
                footer={null}
            >
                <div className={classes.content}>

                    <div className={classes.challengeName}>
                        {challenge.name}
                    </div>

                    <Form
                        className={classes.form}
                        name="registration-to-challenge"
                        form={registrationToChallengeForm}
                        requiredMark={true}
                        onFinish={onFinish}
                    >
                        <div className={classes.label}>
                            Кого записуємо?
                        </div>

                        <Checkbox.Group className={classes.checkboxGroup} value={selectedChildrenIds}
                                        onChange={onCheckboxChangeChildren}>
                            {children.map((child) => (
                                <div key={child.id} className={classes.customCheckbox}>
                                    <Tooltip
                                        title={child.disabled ? "Дитина вже зареєстрована у челенджі" : ""}
                                        color={"#FFA940"}>
                                            <span>
                                                <Checkbox value={child.id} disabled={child.disabled}>
                                                    <div className={classes.label}>
                                                        <img
                                                            src={child.gender === 'MALE' ? boyIcon : girlIcon}
                                                            alt={child.gender === 'MALE' ? 'Boy Icon' : 'Girl Icon'}
                                                            className={classes.childIcon}
                                                        />
                                                        {child.firstName} {child.lastName}, {child.age}
                                                    </div>
                                                </Checkbox>
                                            </span>
                                    </Tooltip>
                                </div>
                            ))
                            }
                        </Checkbox.Group>
                        <Tooltip
                            title={userRegistered ? "Ви вже зареєстровані у челенджі" : ""}
                            color={"#FFA940"}>
                                            <span>
                                                <Checkbox className={classes.customCheckbox}
                                                          onChange={onCheckboxChangeUser}
                                                          checked={selectedUser}
                                                          disabled={userRegistered}>
                                                    Записати мене на челендж
                                                </Checkbox>
                                            </span>
                        </Tooltip>

                        <div>
                            <Button className="add-children-btn" onClick={() => setIsAddChildModalVisible(true)}>
                                <PlusOutlined/>
                                Додати дитину
                            </Button>
                        </div>

                        <AddChildModal isVisible={isAddChildModalVisible} setIsVisible={setIsAddChildModalVisible}
                                       onChildAdded={handleChildAdded}/>

                        <Form.Item name="comment" className={classes.commentInput}>
                            <Input.TextArea
                                className={classes.textArea}
                                placeholder="Додати коментар"
                                autoSize={{minRows: 1, maxRows: 4}}
                                maxLength={300}
                                style={{width: '100%'}}
                            />
                        </Form.Item>

                        <div className={classes.buttonWrapper}>
                            <Button
                                className={classes.formButton}
                                type="primary"
                                htmlType="submit"
                            >
                                Записати
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
    );
};

export default SignUpForChallenge;
