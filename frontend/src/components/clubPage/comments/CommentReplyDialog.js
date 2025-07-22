import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Tooltip} from 'antd';
import {PhoneOutlined, MailOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {getUserById} from "../../../service/UserService";
import './css/CommentEditComponent.less';

const CommentReplyDialog = ({visible, onSubmit, onCancel, comment}) => {
    const COMMENT_MIN_LENGTH = 10;
    const COMMENT_MAX_LENGTH = 1000;
    const [replyText, setReplyText] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUserById(localStorage.getItem('id'));
            setUser(fetchedUser);
        };

        fetchUser();
    }, [localStorage.getItem('id')]);


    const handleOk = () => {
        onSubmit(comment, replyText);
        setReplyText('');
    };

    const handleCancel = () => {
        onCancel();
        setReplyText('');
    };

    const getTooltipTitle = () => {
        if (replyText.length < COMMENT_MIN_LENGTH) return `Коментар повинен містити мінімум ${COMMENT_MIN_LENGTH} символів`;
        if (replyText.length > COMMENT_MAX_LENGTH) return `Коментар повинен містити максимум ${COMMENT_MAX_LENGTH} символів`;
        return '';
    };

    return (
        <Modal
            className="comment-modal"
            open={visible}
            centered
            onOk={handleOk}
            destroyOnClose={true}
            onCancel={handleCancel}
            width={521}
            footer={null}
        >
            <span className="comment-reply-title">Відповісти на коментар</span>
            {user ? (
                <>
            <Form onFinish={handleOk}>
                <div className="comment-fields">
                            <Form.Item
                                required={true}
                                label="Ім'я"
                                style={{marginBottom: 16}}
                            >
                                <Input
                                    className="comment-input-box"
                                    value={user.lastName + " " + user.firstName}
                                    readOnly={true}
                                />
                            </Form.Item>
                            <Form.Item
                                required={true}
                                label="Телефон"
                                labelAlign={"right"}
                                style={{marginBottom: 16}}
                            >
                                <Input
                                    className="comment-input-box"
                                    suffix={<PhoneOutlined className="phone-icon"/>}
                                    value={user.phone}
                                    readOnly={true}
                                />
                            </Form.Item>
                            <Form.Item
                                required={true}
                                label="Email"
                                style={{marginBottom: 16}}
                            >
                                <Input
                                    className="comment-input-box"
                                    suffix={<MailOutlined className="mail-icon"/>}
                                    value={user.email}
                                    readOnly={true}
                                />
                            </Form.Item>
                            <Form.Item
                                required={true}
                                label="Коментар"
                                name="commentText"
                                rules={[
                                    {
                                        min: COMMENT_MIN_LENGTH,
                                        max: COMMENT_MAX_LENGTH,
                                        message: `Коментар може містити від ${COMMENT_MIN_LENGTH} до ${COMMENT_MAX_LENGTH} символів.`
                                    },
                                    {
                                        required: false,
                                        pattern: /^[^ЁёЪъЫыЭэ]+$/,
                                        message: 'Коментар не може містити російські літери'
                                    }
                                ]}>
                                <TextArea
                                    autoSize={{minRows: 5, maxRows: 5}}
                                    placeholder="Додайте коментар"
                                    value={replyText}
                                    maxLength={COMMENT_MAX_LENGTH}
                                    onChange={e => setReplyText(e.target.value)}
                                />
                            </Form.Item>

                </div>
                <Form.Item>
                    <Tooltip title={getTooltipTitle()}>
                        <span>
                            <Button
                                className="do-comment-button"
                                type="primary"
                                htmlType="submit"
                                disabled={!replyText || replyText.length < COMMENT_MIN_LENGTH || replyText.length > COMMENT_MAX_LENGTH}
                            >
                                Надіслати
                            </Button>
                        </span>
                    </Tooltip>
                </Form.Item>
            </Form>
                </>
                ) : null}
        </Modal>
    );
};

export default CommentReplyDialog;