import Title from "../../pages/components/Title";
import Subtitle from "../../pages/components/Subtitle";
import Paragraph from "../../pages/components/Paragraph";
import Instruction from "../../pages/components/Instruction";
import Button from "../../pages/components/Button";
import ModalDialog from "../../pages/components/ModalDialog";
import { faPaw, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import useStore from "../../store";
import { useMediaQuery } from "react-responsive";
import imgSabiasQue from "../../assets/img/botones/no-olvides-color.webp";
import gifPresentacion from "../../assets/img/gifs/sld_14_paso1.gif";
import audioBienvenidos from "../../assets/audio/slide2_bienvenidos.mp3";
import "../slides/styles/BienvenidosModulo.css";
import img1 from "../../assets/img/imagen-1.webp";
import img2 from "../../assets/img/imagen-2.webp";
import img3 from "../../assets/img/imagen-3.webp";
import img4 from "../../assets/img/imagen-4.webp";
import img5 from "../../assets/img/imagen-5.webp";

function BienvenidosModulo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-main-color md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <div className="my-8 text-center">
            <Title>Bienvenidos al módulo</Title>
            <Subtitle>Identificación de Peligros</Subtitle>
            <Subtitle>Valoración de Riesgos EC</Subtitle>
          </div>
          <div className="px-6 md:px-14 text-justify">
            <Paragraph justify={isMobile ? 'justify' : 'justify'}>
              Bienvenidos y bienvenidas a este módulo virtual, en el cual buscamos
              mejorar la cultura de prevención en tus labores diarias, ayudándote
              a identificar los peligros y a valorar los riesgos que pueden estar
              presentes en la operación. Queremos recordarte las técnicas y
              herramientas que te ayudarán a ser consciente y protegerte en el
              trabajo.
            </Paragraph>
          </div>
          <div className=" px-6 md:px-14 flex justify-center w-auto">
            <Instruction arrow="down" theme="dark">
              Haz clic para ejecutar el audio
            </Instruction>
          </div>
          <div>
            <audio controls className="media-espanol">
              <source src={audioBienvenidos} type="audio/mp3" />
            </audio>
          </div>
        </div>
      </div>

      <div className="md:flex-1 bg-white md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className=" my-auto  flex flex-col justify-center items-center">
          <div className="slideshow-container w-[80%] relative md:top-[150px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`mySlides mySlidefade ${index === currentSlide ? "active" : ""
                  }`}
              >
                <img src={slide} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
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
          ¿Consideras que el jefe de Andy tiene alguna responsabilidad en que él
          todavía no tenga en cuenta los peligros y riesgos en su trabajo?
        </Paragraph>
      </ModalDialog>
    </div>
  );
}

export default BienvenidosModulo;