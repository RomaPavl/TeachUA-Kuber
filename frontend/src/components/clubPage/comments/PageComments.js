import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';
import './css/PageComments.css';
import {Button, List, message, Rate} from "antd";
import { Comment } from '@ant-design/compatible';
import {Content} from "antd/es/layout/layout";
import CommentEditComponent from "./CommentEditComponent";
import {EnterOutlined} from "@ant-design/icons";
import CommentReplies from "./CommentReplies";
import {createReply, getFeedbackListByClubId} from "../../../service/FeedbackService";
import {getUserId} from "../../../service/StorageService";
import CommentReplyDialog from './CommentReplyDialog';
import ArrowDownOutlined from "@ant-design/icons/lib/icons/ArrowDownOutlined";
import ConditionalTooltip from "../../ConditionalTooltip";

const PageComments = ({club}) => {
    const [comments, setComments] = useState([]);
    const [commentEditVisible, setCommentEditVisible] = useState(false);
    const [replyDialogVisible, setReplyDialogVisible] = useState(false);
    const [replyTargetComment, setReplyTargetComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(true);
    const userId = useMemo(() => getUserId(), []);
    const isUserClubOwner = useMemo(() => {
        return club.user && userId ? userId.toString() === club.user.id.toString() : false;
    }, [club, userId]);

    const openReplyDialog = (item) => {
        setReplyTargetComment(item);
        setReplyDialogVisible(true);
    };

    const handleReplySubmit = (item, replyText) => {
        handleReply(item, replyText);
        setReplyDialogVisible(false);
    };

    const handleReplyDialogCancel = () => {
        setReplyDialogVisible(false);
    };

    const handleReply = async (item, replyText) => {
        const newReply = await createReply(replyText, item.id, userId);
        const updatedComments = comments.map(comment =>
            comment.id === item.id
                ? {...comment, replies: [...comment.replies, newReply]}
                : comment
        );
        setComments(updatedComments);
    }

    const handleAddComment = async (newFeedback) => {
        setComments(prevComments => [newFeedback, ...prevComments]);
    };

    const handleShowMore = () => {
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        setLoading(true);
        getFeedbackListByClubId(club.id, currentPage)
            .then(response => {
                setComments(prevComments => [...prevComments, ...response.content]);
                setLastPage(response.last);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [currentPage, club.id]);


    return (
        <Content className="page-comments">
            <div className="comments-container">
                <List
                    loading={loading}
                    className="comment-list"
                    header={
                        <div className="comment-header">
                            <span className="comment-label">Коментарі</span>
                            <ConditionalTooltip
                                condition={isUserClubOwner}
                                title="Не можна оцінити свій гурток"
                            >
                                <Button
                                    className={`outlined-button comment-button`}
                                    disabled={isUserClubOwner}
                                    style={isUserClubOwner ? { borderRadius: "6px" } : {}}
                                    onClick={() => {
                                        if (userId != null)
                                            setCommentEditVisible(true);
                                        else
                                            message.error("Увійдіть або зареєструйтеся!");
                                    }}
                                >
                                    Залишити коментар
                                </Button>
                            </ConditionalTooltip>
                        </div>
                    }
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={item => (
                        <>
                            <li>
                                <Comment className={"root-comment"}
                                         author={
                                             <div className="author">
                                                 <img className="avatar"
                                                      src={`${process.env.PUBLIC_URL}${item.user.urlLogo}`}
                                                      alt="avatar"/>
                                                 <div className="author-content">
                                <span
                                    className="name">{`${item.user ? item.user.firstName : "unknown"}
                                     ${item.user ? item.user.lastName : "unknown"}`}</span>
                                                     <span className="datetime">{item.date}</span>
                                                 </div>
                                                 <Rate className="rating" disabled allowHalf value={item.rate}/>
                                             </div>
                                         }
                                         content={
                                             <>
                                                 {item.text.split('\n').map((line, index) => <p key={index}>{line}</p>)}
                                                 <Button className={"answer-comment"}
                                                         onClick={(event) => {
                                                             if (localStorage.getItem('id') != null)
                                                                 openReplyDialog(item);
                                                             else
                                                                 message.error("Увійдіть або зареєструйтеся!");
                                                             event.currentTarget.blur();
                                                         }}>
                                                     <EnterOutlined style={{transform: "scaleX(-1)"}}/>
                                                     <p className={"answer-p"}>Відповісти</p>
                                                 </Button>
                                             </>
                                         }
                                />
                            </li>
                            <CommentReplies replies={item.replies}/>
                        </>
                    )}
                />

                {!lastPage && (
                    <Button
                        className={"show-more-button"}
                        onClick={(event) => {
                            handleShowMore();
                            event.currentTarget.blur();
                        }}>
                        <p className={"show-more-p"}>Показати більше</p>
                        <ArrowDownOutlined/>
                    </Button>
                )}
            </div>

            <CommentReplyDialog
                visible={replyDialogVisible}
                onSubmit={handleReplySubmit}
                onCancel={handleReplyDialogCancel}
                comment={replyTargetComment}
            />

            {localStorage.getItem('id') && <CommentEditComponent
                visible={commentEditVisible}
                setVisible={setCommentEditVisible}
                club={club}
                onFeedbackAdded={handleAddComment}/>}
        </Content>

    )
}

PageComments.propTypes = {
    club: PropTypes.array.isRequired
};


export default PageComments;