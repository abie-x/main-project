import React, {useState} from 'react'

const images = [
    {
      id: 1,
      src: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/zpkkdkmvlj5cuvqbc50t",
      alt: 'Image 1',
    },
    {
        id: 2,
        src: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/lzkjv3sxwwjkzg0vxpvt",
        alt: 'Image 2',
      },
      {
        id: 3,
        src: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/tgnvusbs3fnzz7xupeno",
        alt: 'Image 3',
      },
  ];

const Carousal = () => {
    const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

    return (
        <div className="carousel">
            <div className="carousel-img">
                <img src={images[activeIndex].src} alt={images[activeIndex].alt} />
                <h3>pizza</h3>
            </div>
            <button className="carousel-prev" onClick={handlePrevClick}>
                &#10094;
            </button>
            <button className="carousel-next" onClick={handleNextClick}>
                &#10095;
            </button>
        </div>
    )
}

export default Carousal