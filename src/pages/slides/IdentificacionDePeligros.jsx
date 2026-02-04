import { useState, useEffect, useRef } from "react";
import Title from "../../pages/components/Title";
import Subtitle from "../../pages/components/Subtitle";
import Paragraph from "../../pages/components/Paragraph";
import Instruction from "../../pages/components/Instruction";
import Button from "../../pages/components/Button";
import ModalDialog from "../../pages/components/ModalDialog";
import { faCircleQuestion, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStore from "../../store";
import { useMediaQuery } from "react-responsive";
import imgSabiasQue from "../../assets/img/botones/no-olvides-color.webp";
import imgPortada from "../../assets/img/instruccion_flechas.webp";
import imgPaso1 from "../../assets/img/sld7_carrusel_img_1.webp";
import imgPaso2 from "../../assets/img/sld7_carrusel_img_2.webp";
import imgPaso3 from "../../assets/img/sld7_carrusel_img_3.webp";
import imgPaso4 from "../../assets/img/sld7_carrusel_img_4.webp";
import audioPaso1 from "../../assets/audio/sld7_identificacion_1.mp3";
import audioPaso2 from "../../assets/audio/sld7_identificacion_2.mp3";
import audioPaso3 from "../../assets/audio/sld7_identificacion_3.mp3";
import audioPaso4 from "../../assets/audio/sld7_identificacion_4.mp3";

import "../slides/styles/IdentificacionDePeligros.css";

function IdentificacionDePeligros() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const audioRef = useRef(null);

  const slides = [
    {
      image: imgPortada,
      title: "",
      audio: null
    },
    {
      image: imgPaso1,
      title: "1. Propósito de la Identificación de Peligros",
      audio: audioPaso1
    },
    {
      image: imgPaso2,
      title: "2. Responsabilidad de los Trabajadores",
      audio: audioPaso2
    },
    {
      image: imgPaso3,
      title: "3. Establecimiento de Controles",
      audio: audioPaso3
    },
    {
      image: imgPaso4,
      title: "4. Importancia de la Descripción Específica",
      audio: audioPaso4
    }
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  useEffect(() => {
    // Detener el audio cuando se cambia de slide
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;  // Resetea el tiempo del audio
    }

    // Reproducir el nuevo audio si existe
    if (slides[currentSlide].audio) {
      audioRef.current.src = slides[currentSlide].audio;
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSlide]);

  const handlePrevSlide = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    // Detener el audio actual antes de cambiar
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleIndicatorClick = (index) => {
    // Detener el audio actual antes de cambiar
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentSlide(index);
  };

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <div className="my-2 text-center">
            <Title>Aprendamos...</Title>
            <Subtitle>¿Qué es la Identificación de Peligros?</Subtitle>
            <div className="px-6">
              <Paragraph justify={isMobile ? 'center' : 'center'}>
                Ahora veamos cómo Tamara se lo explica a <span className="text-subtitle-color-qa">sus compañeros:</span>
              </Paragraph>
            </div>
          </div>
          <div className="px-6 md:px-14">
            <Paragraph justify={isMobile ? 'justify' : 'justify'}>
              Tamara ha puesto mucha atención a las explicaciones de su jefe y ha aprendido mucho. Mientras habla con uno de sus compañeros, uno de estos le comento que hay un olor extraño en las tuberías que conducen los gases a la planta de producción, Tamara lo felicita y le indica que eso precisamente es el primer paso para identificar un Peligro en la operación, y que posiblemente se trate de un PELIGRO QUÍMICO. Sus compañeros animan y le preguntan, en qué más consiste la IDENTIFICACIÓN DE PELIGROS, Tamara continua:
            </Paragraph>
          </div>
          <div className="mt-6">
            <Button
              bold={false}
              icon={faCircleQuestion}
              roundedFull={true}
              onClick={() => setIsModalOpen(true)}
            >
              ¿Sabías que?
            </Button>
          </div>
        </div>
      </div>

      <div className="md:flex-1 bg-white md:w-1/2 w-full h-auto md:h-screen px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <div className="px-6 md:px-14 flex justify-center w-auto">
            <Instruction arrow="down" theme="light">
              Haz clic sobre las flechas laterales para avanzar y retroceder
            </Instruction>
          </div>

          <div className="carousel-container">
            <button className="carousel-arrow prev" onClick={handlePrevSlide}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div className="carousel-content">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="carousel-image"
              />
              <div className="carousel-caption">
                <p>{slides[currentSlide].title}</p>
                {slides[currentSlide].audio && (
                  <audio
                    // key={currentSlide} // Esta es la modificación clave
                    ref={audioRef}
                    controls
                    className="carousel-audio"
                  >
                    <source src={slides[currentSlide].audio} type="audio/mp3" />
                  </audio>
                )}
              </div>
            </div>

            <button className="carousel-arrow next" onClick={handleNextSlide}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <div className="carousel-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => handleIndicatorClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ModalDialog
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        title="¿Sabías que?"
      >
        <div className="flex justify-center">
          <img
            src={imgSabiasQue}
            alt="Imagen pregunta"
            className="image-boton w-32"
          />
        </div>
        <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
          Este curso se fundamenta en la metodología establecida por el Icontec en la GTC 45 (versión 2012). Este estándar es una guía técnica clave para la identificación, evaluación y control de peligros y riesgos en el entorno laboral. Proporciona un enfoque sistemático y práctico que incluye ejemplos aplicados en sus anexos, facilitando la aplicación de la teoría en situaciones reales. Su orientación paso a paso resulta invaluable para implementar un sistema efectivo de gestión de riesgos.
        </Paragraph>
      </ModalDialog>
    </div>
  );
}

export default IdentificacionDePeligros;