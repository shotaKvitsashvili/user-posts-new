import { useEffect, useState } from "react";

import ContentLoader from "react-content-loader";
import { Scrollbars } from 'react-custom-scrollbars';

import './styles.css';

const CommentLoader = () => (
    <ContentLoader>
        <rect x="0" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="0" y="37" rx="4" ry="4" width="250" height="13" />
        <rect x="0" y="67" rx="4" ry="4" width="500" height="43" />
    </ContentLoader>
);

export default function UserComments(props) {

    const [userComments, setUserComments] = useState([]);
    const [userReply, setUserReply] = useState([]);

    // Setting comment id to use for reply later
    const [id, setId] = useState(0);

    // Let know the component when the reply should be added
    const [shouldComponentAdd, setshouldComponentAdd] = useState(false);


    useEffect(() => {
        async function getUsersComments() {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
            const usersComments = await response.json();
            return usersComments;
        }

        getUsersComments().then(userComments => {
            setUserComments(userComments)
        });        
    }, []);

    // Displaying correct comment for each post
    const displayUserComments = userComments.filter(e => e.postId === props.userPostId);

    // Selecting a comment to add reply inside
    let addReplyInside = displayUserComments.find(e => e.id === id);

    if (shouldComponentAdd) {
        if (addReplyInside !== null || addReplyInside !== undefined) {
            // setUserReply([])
            addReplyInside.reply = userReply.filter(e => e);
        }

        setshouldComponentAdd(false);
    }

    console.log(displayUserComments);


    if (userComments.length > 0) {
        return (
            <div className="comment">
                <Scrollbars
                    renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
                    thumbMinSize={150}
                    style={{ height: '100vh' }}
                    className="posts-scroll-container">
                    <div className="p-2">
                        <h2>Comments for post {props.userPostId}</h2>
                    </div>

                    {
                        displayUserComments.map((val, ind) => {
                            return <div key={ind}>
                                <h1>id: {val.id}</h1>
                                <div className="px-2 py-1">
                                    <span>User Name: {val.name}</span>
                                </div>

                                <div className="px-2 py-1">
                                    <span><i>{val.email}</i></span>
                                </div>

                                <div className="p-2">
                                    {val.body}
                                </div>

                                <div className={val.reply === undefined ? 'd-none' : 'd-block py-2 px-5 comment__reply'}>
                                    <div>
                                        {
                                            val.reply === undefined ? '' : val.reply.map((v, i) => {
                                                return <div key={i}>
                                                    {v}
                                                    <br />
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="p-2">
                                    <div className="comment__add-reply py-1">
                                        <input
                                            type="text"
                                            placeholder="Add reply.."
                                            onKeyDown={
                                                (event) => {
                                                    if (event.keyCode === 13) {
                                                        val.reply = [];
                                                        setUserReply(
                                                            [...userReply, event.target.value]
                                                        )
                                                        event.target.value = '';
                                                        setId(val.id);
                                                        setshouldComponentAdd(true);
                                                    }
                                                }
                                            } />
                                    </div>
                                </div>

                                <hr />
                            </div>
                        })
                    }
                </Scrollbars>
            </div>
        )
    } else {
        return (
            <div>
                <div className="p-2">
                    <h2>Comments</h2>
                </div>
                <div>
                    <div className="p-2">
                        <CommentLoader />
                    </div>
                </div>
            </div>
        )
    }

}