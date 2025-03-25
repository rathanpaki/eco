import React from "react";

const VideoTutorials = () => {
  return (
    <section className="video-tutorials" data-aos="fade-up">
      <h2>Video Tutorials on Green Shopping</h2>
      <div className="video-carousel">
        <div className="video-card">
          <iframe
            src="https://www.youtube.com/embed/v7gp84UrtTs"
            title="Green Shopping Tips"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h3>5 Tips for Sustainable Shopping</h3>
        </div>
        <div className="video-card">
          <iframe
            src="https://www.youtube.com/embed/2mha2iU29Vo?si=1IASP8IB-JHWpF5b"
            title="Eco-Friendly Packaging"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h3>How to Choose Eco-Friendly Packaging</h3>
        </div>
        <div className="video-card">
          <iframe
            src="https://www.youtube.com/embed/xPfvHmBp8F0?si=t1i8nC48BseHsF29"
            title="DIY Sustainable Gifts"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h3>DIY Sustainable Gift Ideas</h3>
        </div>
      </div>
    </section>
  );
};

export default VideoTutorials;