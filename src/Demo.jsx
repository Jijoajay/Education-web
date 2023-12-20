import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const Demo = () => {
  const videoRef = useRef(null);
  const [selectedQuality, setSelectedQuality] = useState('medium');

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const hls = new Hls();
      const videoLink = getVideoLink(selectedQuality);

      hls.loadSource(videoLink);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }
  }, [selectedQuality]);

  const handleQualityChange = (quality) => {
    setSelectedQuality(quality);
  };

  const getVideoLink = (quality) => {
    const baseVideoLink = "https://cdn.pixabay.com/vimeo/637690589/laptop-92480";
    const format = ".m3u8?width=640&hash=e57afd47947f08af9cf23332266df2c1e6b3ea49";

    // Adjust the quality level based on the selected option
    switch (quality) {
      case 'low':
        return baseVideoLink + '-240p' + format;
      case 'medium':
        return baseVideoLink + '-540p' + format;
      case 'high':
        return baseVideoLink + '-720p' + format;
      default:
        return baseVideoLink + '-540p' + format; // Default to medium quality
    }
  };

  return (
    <div>
      <video ref={videoRef} controls width="600" height="400">
        Your browser does not support the video tag.
      </video>

      <div>
        <label>
          Low
          <input
            type="radio"
            value="low"
            checked={selectedQuality === 'low'}
            onChange={() => handleQualityChange('low')}
          />
        </label>
        <label>
          Medium
          <input
            type="radio"
            value="medium"
            checked={selectedQuality === 'medium'}
            onChange={() => handleQualityChange('medium')}
          />
        </label>
        <label>
          High
          <input
            type="radio"
            value="high"
            checked={selectedQuality === 'high'}
            onChange={() => handleQualityChange('high')}
          />
        </label>
      </div>
    </div>
  );
};

export default Demo;
