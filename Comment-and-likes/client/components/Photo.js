import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Photo = React.createClass({
  render() {
    const { post, i, comments } = this.props;

  //   useEffect(() => {
  //     if (user && likes.find((like) => like.username === user.username)) {        
  //         setLiked(true);
  //     } else setLiked(false);
  // }, [user, likes]);

  // const [likePost] = useMutation(LIKE_POST_MUTATION, {
  //     variables: { postId: id }
  // }); 


    return (
      <figure className="grid-figure">
        <div className="grid-photo-wrap">
          <Link to={`/view/${post.code}`}>
            <img src={post.display_src} alt={post.caption} className="grid-photo" />
          </Link>

          <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <span key={post.likes} className="likes-heart">{post.likes}</span>
          </CSSTransitionGroup>

        </div>

        <figcaption>
          <p>{post.caption}</p>
          <div className="control-buttons">
          {/* {likePost} likePost is trying to incorporate the mutation REVIEW!  */}
            <button onClick={this.props.increment.bind(null, i)}  className="likes">&hearts; {post.likes}</button>
            <Link className="button" to={`/view/${post.code}`}>
              <span className="comment-count">
                <span className="speech-bubble"></span>
                {comments[post.code] ? comments[post.code].length : 0 }
              </span>
            </Link>
          </div>
        </figcaption>

      </figure>
    )
  }
});

export default Photo;



