import React, { useState } from 'react';
import './../../css/post.css';
import RocketImg from "./../../imgs/rocket.png";

const PostModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.length > 400) {
      alert('Post must be 400 characters or less.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    if (file) formData.append('image', file);

    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Posted!');
        onClose();
      } else {
        alert('Post failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <div className="modal-overlay">
      <div class="modal-wrapper--post modal-wrapper--post--active"></div>
      <div className="modal-content">
        <h2>Create New Post</h2>

        <form onSubmit={handleSubmit}>
         <div class="input-wrapper">

          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          </div>

          <div
          className={`upload-zone ${file ? "uploaded" : ""}`}
          onClick={() => document.getElementById("fileInput").click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setFile(e.dataTransfer.files[0]);
          }}
        >
          <img src={RocketImg} alt="upload" className="upload-icon" />
          <p>{file ? file.name : "Drag a file here, or"} <span>Choose a file to upload</span></p>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
        <br />

          <textarea
            placeholder="What's on your mind? (max 400 chars)"
            value={text}
            maxLength={400}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="char-count">{text.length}/400</div>


          <button type="submit" className="post-btn">Post</button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
