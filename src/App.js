import { useState } from 'react';

// import Users from './users/Users';
import Userposts from './user posts/UserPosts';
import UserComments from './user comments/UserComments';

function App() {
  
  const [userPostId, setUserPostId] = useState(0);

  // get post id to pass to comments component for displaying the correct one
  const getUserPostsId = (postId) => {
    setUserPostId(postId + 1);
  }

  return (
    <div className="container-fluid">

      <div className="row">
        <div className="col-5">
          <Userposts getUserPostsId={getUserPostsId} />
        </div>

        <div className="col-7">
          <UserComments userPostId={userPostId} />
        </div>
      </div>
    </div>
  );
}

export default App;
