import React from 'react';
import { Carousel } from "react-bootstrap";
import Gallery1 from "../../assets/img/gallery1.PNG";
import Gallery2 from "../../assets/img/carrousel2.jpg";
import Gallery3 from "../../assets/img/carrousel3.png";
import Gallery4 from "../../assets/img/carrousel4.jpg";

export default function Gallery(){
    return(
        <Carousel style={{"width": "88%"}}>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={Gallery1}
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>Primer Imagen</h3>
                <p>El amor de una mamá</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={Gallery2}
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3>Segunda Imagen</h3>
                <p>La salud de un Infante es vital desde el vientre</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={Gallery3}
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Tercera Imagen</h3>
                <p>Los niños son el futuro</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={Gallery4}
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Cuarta Imagen</h3>
                <p>Los niños y niñas son nuestro motor de vida</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}