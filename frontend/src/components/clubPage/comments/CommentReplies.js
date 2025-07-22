import React from 'react';
import { List } from 'antd';
import { Comment } from '@ant-design/compatible';

const CommentReplies = ({replies}) => {
    if (!replies || replies.length === 0) {
        return null;
    }

    return (
        <List
            className="reply-list"
            itemLayout="horizontal"
            dataSource={replies}
            renderItem={reply => (
                <li>
                    <div className={"reply-container"}>
                    <Comment className={"reply-message"}
                             author={
                                 <div className="author">
                                     <img className="avatar"
                                          src={`${process.env.PUBLIC_URL}${reply.user.urlLogo}`}
                                          alt="avatar"/>
                                     <div className="author-content">
                                <span
                                    className="name">{`${reply.user ? reply.user.firstName : "unknown"}
                                     ${reply.user ? reply.user.lastName : "unknown"}`}</span>
                                         <span className="datetime">{reply.date}</span>
                                     </div>
                                 </div>
                             }
                             content={
                                 reply.text.split('\n').map((line, index) => <p key={index}>{line}</p>)
                             }
                    />
                    </div>
                </li>
            )}
        />
    );
}

export default CommentReplies;