import React, { useState } from 'react';
import './Article.css';

function Article({ username }) {
  // Sample article data
  const articleData = {
    title: 'Sample Article',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    description: 'This is a sample article description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum condimentum augue, nec aliquet libero tincidunt eget. Sed nec lectus quis tellus auctor tempus. Integer vehicula mauris nec eros tristique, nec lobortis orci vulputate. Vivamus sodales est id neque malesuada, vitae vehicula ex efficitur. Donec suscipit odio ut tincidunt varius.',
    rating: 4.5,
    comments: [
      { id: 1, user: 'User1', text: 'This is the first comment.' },
      { id: 2, user: 'User2', text: 'This is the second comment.' },
    ],
  };

  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);

  const handlePostComment = () => {
    // Handle posting comment
    if (comment.trim() !== '') {
      const newComment = { id: Date.now(), user: username, text: comment }; // Use username prop as the author's name
      // Update comments array
      articleData.comments.push(newComment);
      // Clear comment input
      setComment('');
    }
  };

  const handleLike = () => {
    // Handle like button click
    setLiked(!liked);
  };

  return (
    <div className="article-container">
      <div className="left-section">
        <div className="user-info">
          <div className="user-icon">
            <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="User Icon" />
          </div>
          <div className="username text-center">
            <p>Authorname</p>
            </div> {/* Display username */}
        </div>
        <button className="follow-btn">Follow</button>
      </div>

      <div className="right-section">
        <div className="article-info-box">
          <h2>{articleData.title}</h2>
          <div className="tags">
            {articleData.tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
          <div className="description-box">
            <p className="description">{articleData.description}</p>
          </div>
          <button className={`like-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
            Like
          </button>
          <div className="comment-section">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={handlePostComment} className="post-button">Post</button>
          </div>
          <div className="comments">
            {articleData.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <span className="user">{comment.user}:</span>
                <span className="text">{comment.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;