// src/Carousel.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';

const Carousel = ({ images }) => {
    return (
        <BootstrapCarousel>
            {images.map((image, index) => (
                <BootstrapCarousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image}
                        alt={`Slide ${index}`}
                    />
                </BootstrapCarousel.Item>
            ))}
        </BootstrapCarousel>
    );
};

export default Carousel;
