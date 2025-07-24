import React, { useState } from "react";
import { CalendarDays, X } from "lucide-react";
import "./../../css/post.css"; // External styling for pro design
import axios from "axios";
const platforms = ["Facebook", "Instagram", "LinkedIn", "Twitter"];

export default function Poster({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [caption, setCaption] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("12:00");
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    console.log(previews)
    setImagePreviews(previews);
  };

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleNext = () => {
    const newErrors = {};
    if (step === 0 && (!title.trim() || images.length === 0)) {
      if (!title.trim()) newErrors.title = "Title is required.";
      if (images.length === 0) newErrors.images = "At least one image is required.";
    }
    if (step === 2 && selectedPlatforms.length === 0) {
      newErrors.platforms = "Select at least one platform.";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleClose = () => {
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setImages([]);
    setImagePreviews([]);
    setTitle("");
    setCaption("");
    setSelectedPlatforms([]);
    setDate(new Date().toISOString().split("T")[0]);
    setTime("12:00");
    setStep(0);
    setErrors({});
    onClose();
  };

  const handleSubmit = async () => {
    if (!title || images.length === 0 || selectedPlatforms.length === 0) {
   alert("Please complete all required fields.");
   return;
 }

 const formData = new FormData();
 formData.append('title', title);
 formData.append('caption', caption);
 formData.append('date', date);
 formData.append('time', time);
 formData.append('platforms', JSON.stringify(selectedPlatforms));

 images.forEach((file) => formData.append('images', file));
 const domain = process.env.REACT_APP_API+"/api/" || "http://localhost:5000";
 try {
   await axios.post(`${domain}/api/posts/`, formData, {
     headers: {
       'Content-Type': 'multipart/form-data'
     },
     withCredentials: true
   });
   onClose();
 } catch (error) {
   console.error("Upload failed:", error);
   alert("Post failed to save.");
 }
};


  if (!isOpen) return null;

  return (
    <div className="poster-overlay">
      <div className="poster-modal">
        <button className="poster-close" onClick={handleClose}>
          <X size={22} />
        </button>

        {/* Stepper UI */}
        <div className="poster-progress">
          {[0, 1, 2].map((s) => (
            <div key={s} className={`poster-step ${step >= s ? "active" : ""}`} />
          ))}
        </div>

        <div className="poster-content">
          {step === 0 && (
            <>
              <h2 className="poster-title">Post Details</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="poster-input"
              />
              {errors.title && <p className="poster-error">{errors.title}</p>}

              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="poster-input mt-2"
              />
              {errors.images && <p className="poster-error">{errors.images}</p>}

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {imagePreviews.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`preview-${idx}`}
                      className="w-full h-32 object-cover rounded border"
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="poster-title">Write a Caption</h2>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Enter caption"
                className="poster-textarea"
              />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="poster-title">Schedule and Platforms</h2>
              <div className="poster-platforms">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    className={`poster-platform-btn ${
                      selectedPlatforms.includes(platform) ? "selected" : ""
                    }`}
                    onClick={() => togglePlatform(platform)}
                  >
                    {platform}
                  </button>
                ))}
              </div>
              {errors.platforms && <p className="poster-error">{errors.platforms}</p>}

              <div className="poster-schedule">
                <label>
                  <CalendarDays className="icon" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <div className="poster-actions">
          {step > 0 && (
            <button onClick={handleBack} className="poster-back">
              Back
            </button>
          )}
          {step < 2 ? (
            <button onClick={handleNext} className="poster-next">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="poster-submit">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
