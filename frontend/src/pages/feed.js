import React, { Component } from "react";
import { FaPlusSquare, FaEllipsisV, FaSignOutAlt } from "react-icons/fa";
import { FiEdit, FiTrash, FiStar } from "react-icons/fi";
import { MdDashboard, MdCreate, MdViewStream, MdSettings, MdAccountCircle } from "react-icons/md";
import axios from "axios";
import "./../css/feed.css";
import Img from "./../imgs/rocket.png";

class SocialFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      activePost: null,
      showSettings: null,
    };
  }

  async componentDidMount() {
    try {
      var domain = process.env.REACT_APP_API;
      if(!process.env.REACT_APP_API){
        domain = "http://localhost:5000";
      }
      const res = await axios.get(`${domain}/api/posts/fb`, { withCredentials: true });
      const fbPosts = res.data.posts.map((post, index) => ({
        id: index + 1,
        image: post.full_picture || Img,
        caption: post.message || "No caption",
        platforms: ["Facebook"], // You can enhance this if you track more platforms
      }));

      this.setState({ posts: fbPosts });
    } catch (err) {
      console.error("Failed to fetch FB posts", err);
      // fallback to default static posts
      this.setState({
        posts: [
          { id: 1, image: Img, caption: "Instagram & Facebook", platforms: ["Instagram", "Facebook"] },
          { id: 2, image: Img, caption: "LinkedIn post", platforms: ["LinkedIn"] },
          { id: 3, image: Img, caption: "Insta + Nextdoor", platforms: ["Instagram", "Nextdoor"] },
        ]
      });
    }
  }

  render() {
    const { posts, activePost, showSettings } = this.state;

    return (
      <div className="feed-container">
        <aside className="sidebar">
          <div>
            <h2 className="sidebar-title">Social Manager</h2>
            <nav className="nav-menu">
              <div className="nav-item">
                <a href="/dashboard"><MdDashboard /><span>Dashboard</span></a>
              </div>
              <div className="nav-item">
                <MdCreate /><span>Create Post</span>
              </div>
              <div className="nav-item active">
                <MdViewStream /><span>Feed</span>
              </div>
              <div className="nav-item">
                <MdAccountCircle /><span>Profile</span>
              </div>
              <div className="nav-item">
                <MdSettings /><span>Settings</span>
              </div>
            </nav>
          </div>
          <button className="logout-button">
            <FaSignOutAlt /><span>Logout</span>
          </button>
        </aside>

        <main className="main-feed">
          <div className="post-grid">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <img src={post.image} alt="Post" className="post-image" />
                <FaPlusSquare
                  className="post-icon"
                  onClick={() => this.setState({ activePost: post })}
                />
                <FaEllipsisV
                  className="settings-icon"
                  onClick={() => this.setState({ showSettings: post })}
                />
                <p className="caption">{post.caption || "No caption"}</p>
              </div>
            ))}
          </div>

          {activePost && (
            <div className="modal-overlay">
              <div className="modal-box">
                <button
                  onClick={() => this.setState({ activePost: null })}
                  className="close-button"
                >✕</button>
                <h3 className="modal-title">Posted Platforms</h3>
                <ul className="modal-list">
                  {activePost.platforms.map((platform, index) => (
                    <li key={index}>{platform}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {showSettings && (
            <div className="modal-overlay">
              <div className="modal-box">
                <button
                  onClick={() => this.setState({ showSettings: null })}
                  className="close-button"
                >✕</button>
                <h3 className="modal-title">Post Options</h3>
                <div className="modal-actions">
                  <button className="modal-btn edit"><FiEdit /><span>Edit</span></button>
                  <button className="modal-btn delete"><FiTrash /><span>Delete</span></button>
                  <button className="modal-btn favorite"><FiStar /><span>Mark as Favorite</span></button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default SocialFeed;
