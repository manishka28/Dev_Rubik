import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

// Custom arrow components
const PrevArrow = ({ onClick }) => (
  <button
    className="slick-prev"
    onClick={onClick}
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '50%',
      left: '10px',
      zIndex: 1,
      transform: 'translateY(-50%)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '24px',
      color: 'white',
    }}
  >
  
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="slick-next"
    onClick={onClick}
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '50%',
      right: '10px',
      zIndex: 1,
      transform: 'translateY(-50%)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '24px',
      color: 'white',
    }}
  >
    
  </button>
);

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/events.json') // Ensure the path to your JSON file is correct
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setEvents(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  const gradientStyle = {
    background: 'linear-gradient(179.6deg, #FFFFFF 0.35%, rgba(255, 255, 255, 0.38) 122.8%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.13)',
    backdropFilter: 'blur(16.5px)',
    borderRadius: '24px',
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
      }
    ]
  };

  return (
    <div className='w-full overflow-hidden'>
      <div className='absolute inset-0 blur-21px'></div>
      <div className='relative flex flex-col items-center justify-center w-full h-full mb-10'>
        <h2 className='text-4xl font-extrabold text-center' style={gradientStyle}>
          Events
        </h2>
        <div className='flex flex-row gap-4 mt-4 justify-center'>
          <button className='bg-primaryRed text-white rounded-[16px] px-4 py-2'>
            Upcoming Events
          </button>
          <button className='bg-primaryRed text-white rounded-[16px] px-4 py-2'>
            Past Events
          </button>
        </div>
      </div>
      <div className='relative'>
        <Slider {...settings}>
          {events.map((event, index) => (
            <div key={index} className='flex mx-10 justify-between'>
              <div className='card w-80 h-96 shadow-xl py-10' style={cardStyle}>
                <figure className='px-10 pt-4'>
                  <img
                    src={event.image}
                    alt={event.title}
                    className='rounded-xl'
                  />
                </figure>
                <div className='card-body text-white items-center px-4'>
                  <h2 className='card-title'>{event.title}</h2>
                  <p>{event.description}</p>
                  <div className='card-actions'>
                    <button className='bg-primaryRed text-white rounded-[16px] my-2 px-4 py-2'>
                      {event.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Events;
