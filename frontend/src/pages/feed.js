import React, { useState } from "react";
import "./SocialFeed.css";
import { FaPlusSquare, FaEllipsisV, FaSignOutAlt } from "react-icons/fa";
import { FiEdit, FiTrash, FiStar } from "react-icons/fi";
import { MdDashboard, MdCreate, MdViewStream, MdSettings, MdAccountCircle } from "react-icons/md";
import "./../css/feed.css";

const posts = [
  { id: 1, image: "/sample1.jpg", platforms: ["Instagram", "Facebook"] },
  { id: 2, image: "/sample2.jpg", platforms: ["LinkedIn"] },
  { id: 3, image: "/sample3.jpg", platforms: ["Instagram", "Nextdoor"] },
];

const SocialFeed = () => {
  const [activePost, setActivePost] = useState(null);
  const [showSettings, setShowSettings] = useState(null);

  return (
    <div className="feed-container">
      <aside className="sidebar">
        <div>
          <h2 className="sidebar-title">Social Manager</h2>
          <nav className="nav-menu">
            <div className="nav-item">
              <MdDashboard /><span>Dashboard</span>
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
              <img
                src={post.image}
                alt="Post"
                className="post-image"
              />
              <FaPlusSquare
                className="post-icon"
                onClick={() => setActivePost(post)}
              />
              <FaEllipsisV
                className="settings-icon"
                onClick={() => setShowSettings(post)}
              />
            </div>
          ))}
        </div>

        {activePost && (
          <div className="modal-overlay">
            <div className="modal-box">
              <button
                onClick={() => setActivePost(null)}
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
                onClick={() => setShowSettings(null)}
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
};

export default SocialFeed;
