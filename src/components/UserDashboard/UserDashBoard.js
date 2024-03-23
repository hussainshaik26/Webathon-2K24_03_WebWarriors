import React, { useState, useEffect } from "react";
import axios from "axios";
import "C:/Users/Gopi Harishitha/OneDrive/Documents/Projects/webathon/front-end/src/components/UserDashboard/UserDashBoard.css";

function UserDashboard({ username }) {
  const [userDetails, setUserDetails] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [readingList, setReadingList] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch user details
    axios
      .get(`http://localhost:4000/user-api/user/${username}`)
      .then((response) => {
        setUserDetails(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

    // Fetch number of followers
    axios
      .get(`http://localhost:4000/user-api/user/${username}/followers`)
      .then((response) => {
        setFollowersCount(response.data.followers.length);
      })
      .catch((error) => {
        console.error("Error fetching followers count:", error);
      });

    // Fetch number of following
    axios
      .get(`http://localhost:4000/user-api/user/${username}/following`)
      .then((response) => {
        setFollowingCount(response.data.following.length);
      })
      .catch((error) => {
        console.error("Error fetching following count:", error);
      });

    // Fetch reading list
    axios
      .get(`http://localhost:4000/user-api/user/readinglist/${username}`)
      .then((response) => {
        setReadingList(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching reading list:", error);
      });
  }, [username]);

  const handleSeeFollowers = () => {
    setContent("followers");
    // Fetch followers
    axios
      .get(`http://localhost:4000/user-api/user/${username}/followers`)
      .then((response) => {
        setFollowers(
          response.data.followers.map((follower) => follower.username)
        );
      })
      .catch((error) => {
        console.error("Error fetching followers:", error);
      });
  };

  const handleSeeFollowing = () => {
    setContent("following");
    // Fetch following
    axios
      .get(`http://localhost:4000/user-api/user/${username}/following`)
      .then((response) => {
        setFollowing(response.data.following.map((user) => user.username));
      })
      .catch((error) => {
        console.error("Error fetching following:", error);
      });
  };

  const handleSeeReadingList = () => {
    setContent("readingList");
  };

  const handleSeePublishedArticles = () => {
    setContent("publishedArticles");
    // Fetch published articles
    // Example: axios.get(http://localhost:4000/user-api/user/${username}/articles)
    // .then(response => {
    //   // Handle response
    // })
    // .catch(error => {
    //   console.error('Error fetching published articles:', error);
    // });
  };

  return (
    <div className="user-dashboard">
      <div className="left-container">
        <h2>User Dashboard</h2>
        {userDetails && (
          <div className="user-details">
            <p>Username: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p>
          </div>
        )}
        <div className="follow-count">
          <p className="fs-4 fw-4">Followers: {followersCount}</p>
          <p className="fs-4 fw-4">Following: {followingCount}</p>
        </div>
        <div className="buttons">
          <button onClick={handleSeeFollowers}>See Followers</button>
          <br></br>
          <br></br>
          <button onClick={handleSeeFollowing}>See Following</button>
          <br></br>
          <br></br>
          <button onClick={handleSeeReadingList}>Reading Lists</button>
          <br></br>
          <br></br>
          <button onClick={handleSeePublishedArticles}>
            Published Articles
          </button>
        </div>
      </div>
      <div className="right-container">
        {content === "followers" && (
          <div className="followers-container">
            <h3>Followers</h3>
            <ul>
              {followers.map((follower, index) => (
                <li key={index}>{follower}</li>
              ))}
            </ul>
          </div>
        )}
        {content === "following" && (
          <div className="following-container">
            <h3>Following</h3>
            <ul>
              {following.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
        )}
        {content === "readingList" && (
          <div className="reading-list-container">
            <h3>Reading List</h3>
            {readingList.length > 0 ? (
              <ul>
                {readingList.map((article) => (
                  <li key={article.articleId}>{article.title}</li>
                ))}
              </ul>
            ) : (
              <p>No articles in reading list</p>
            )}
          </div>
        )}
        {content === "publishedArticles" && (
          <div className="published-articles-container">
            <h3>Published Articles</h3>
            {/* Display published articles here */}
            {/* You can fetch and display the articles in a similar way as reading list */}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
