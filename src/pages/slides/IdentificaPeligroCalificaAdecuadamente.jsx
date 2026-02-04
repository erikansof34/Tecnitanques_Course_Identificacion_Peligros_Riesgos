import Title from "../../pages/components/Title";
import Subtitle from "../../pages/components/Subtitle";
import Paragraph from "../../pages/components/Paragraph";
import Instruction from "../../pages/components/Instruction";
import Button from "../../pages/components/Button";
import ModalDialog from "../../pages/components/ModalDialog";
import { faPaw, faThumbsUp, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import useStore from "../../store";
import { useMediaQuery } from "react-responsive";
import imgSabiasQue from "../../assets/img/botones/no-olvides-color.webp";
import imgIngeMorelco from "../../assets/img/caras/avatar_sonriente.webp";
import "../slides/styles/BienvenidosModulo.css";
import img1 from "../../assets/img/imagen-1.webp";
import img2 from "../../assets/img/imagen-2.webp";
import img3 from "../../assets/img/imagen-3.webp";
import img4 from "../../assets/img/imagen-4.webp";
import img5 from "../../assets/img/imagen-5.webp";
import Loader from "../components/Loader"

function IdentificaPeligroCalificaAdecuadamente() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const slides = [
    img1,
    img2,
    img3,
    img4,
    img5,
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleVideoLoad = () => {
    setIsLoading(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 2500); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <div className="my-4 text-center">
            <Title>Apliquemos…</Title>
            <Subtitle>Se identifica un peligro y</Subtitle>
            <Subtitle>se califica adecuadamente…</Subtitle>
          </div>
          <div className="w-[40%]">
            <img src={imgIngeMorelco} alt="imagen ingeniera morelco" className="w-full m-0" />
          </div>
          <div className="px-6 md:px-14 text-justify">
            <Paragraph justify={isMobile ? 'justify' : 'justify'}>
              Tamara está muy contenta, los trabajadores participan activamente en la IPVR (Identificación de peligros y valoración de riesgos)
            </Paragraph>
          </div>
        </div>
      </div>

      <div className="md:flex-1 bg-white md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-6 md:px-[14px] flex flex-col justify-center items-center">
        <div className="slideshow-container m-0 md:m-auto flex flex-col items-center justify-center md:w-[80%]">
          <div className="flex justify-center">
            <Instruction arrow="down" theme="ligth">
              Observa el video y comparte con tus compañeros en el grupo:
            </Instruction>
          </div>
          <div className="flex justify-center">
            <div style={{ position: "relative" }}>
              {isLoading && <Loader />}
              <iframe
                src="https://iframe.mediadelivery.net/embed/351989/ab2e9c7f-36f8-4d91-a636-dc90dedf3b1a?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
                loading="lazy"
                // onTimeUpdate={handleVideoTimeUpdate}
                // ref={videoRef}
                className="w-[90vw] md:w-[500px] md:h-[45vh] h-[27vh]"
                style={{
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)", opacity: isLoading ? 0 : 1,
                  transition: "opacity 0.5s ease-in-out",
                }}
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                allowFullScreen={true}
                onLoad={handleVideoLoad}
              ></iframe>
            </div>
            {/* <video controls className="md:w-[500px] absolute">
              <source src={videoCompartir} type="video/mp4"></source>
            </video> */}
          </div>
          {/* <div className="flex justify-center relative mt-[240px] md:mt-[300px]">
            <Button
              bold={false}
              icon={faQuestionCircle}
              roundedFull={true}
              onClick={() => setIsModalOpen(true)}
            >
              Comparte
            </Button>
          </div> */}
        </div>

      </div>

      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Pregunta"
      >
        <div className="flex justify-center">
          <img
            src={imgSabiasQue}
            alt="Imagen pregunta"
            className="image-boton w-32"
          />
        </div>
        <Paragraph theme="ligth" justify={isMobile ? "justify" : "center"}>
          Haz clic en el enlace y comparte un peligro que identifiques en tu operación y qué medidas de mitigación o control propondrías para controlarlo.
        </Paragraph>
        <div className="flex justify-center mt-2">
          <Button
            bold={false}
            icon={faQuestionCircle}
            roundedFull={true}
            onClick=""
          >
            Comparte
          </Button>
        </div>
      </ModalDialog>
    </div>
  );
}

export default IdentificaPeligroCalificaAdecuadamente;