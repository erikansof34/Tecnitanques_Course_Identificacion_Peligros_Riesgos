import React, { useState, useEffect, useRef } from "react";
import useStore from "../../store";
import "../../pages/slides/styles/RecordemosListaDesplegable.css";
import "../../pages/slides/styles/AprendamosMatrizDeRiesgosTooltips.css";
import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import { useMediaQuery } from "react-responsive";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import imgTablaComparativa from "../../assets/img/matriz_riesgos.webp";
import imgRecuerda from "../../assets/img/botones/sabias_que_icono.webp";
import audioMatriz1 from "../../assets/audio/sld12_matriz_1.mp3";
import audioMatriz2 from "../../assets/audio/sld12_matriz_2.mp3";
import audioMatriz3 from "../../assets/audio/sld12_matriz_3.mp3";
import audioMatriz4 from "../../assets/audio/sld12_matriz_4.mp3";
import ingeTabasco from "../../assets/img/caras/avatar_neutro.webp";

const tooltips = [
  {
    id: 1,
    title: "Introducción a la Matriz de Riesgos",
    audio: audioMatriz1
  },
  {
    id: 2,
    title: "Eje Vertical: Probabilidad de Riesgo",
    audio: audioMatriz2
  },
  {
    id: 3,
    title: "Eje Horizontal: Impacto del Riesgo",
    audio: audioMatriz3
  },
  {
    id: 4,
    title: "Asignación de Valores y Convenciones de Color",
    audio: audioMatriz4
  }
];

function AprendamosMatrizDeRiesgosTooltips() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const audioRef = useRef(null);
  const modalAudioRef = useRef(null);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleTooltipClick = (tooltipId) => {
    if (activeTooltip === tooltipId) {
      setActiveTooltip(null);
      audioRef.current?.pause();
    } else {
      setActiveTooltip(tooltipId);
      const tooltip = tooltips.find(t => t.id === tooltipId);
      if (audioRef.current) {
        audioRef.current.src = tooltip.audio;
        audioRef.current.play();
      }
    }
  };

  const closeTooltip = () => {
    setActiveTooltip(null);
    audioRef.current?.pause();
  };

  return (
    <div className="quiz-container1 mb-36 md:mb-0">
      <div className="quiz-header">
        <Title>Aprendamos...</Title>
        <Subtitle>Matriz de Riesgos</Subtitle>
        <Paragraph>Veamos en qué consiste una MATRIZ DE RIESGOS y cómo apoya la VALORACIÓN DE LOS RIESGOS</Paragraph>
      </div>
      <div className="flex justify-center items-center px-3">
        <Instruction theme="light" arrow="down">
          Haz clic sobre los botones para escuchar la información
        </Instruction>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center h-full">
        <div className="md:w-1/3 flex flex-col items-center justify-center md:px-[20px] px-6 md:p-0">
          <div className="w-[40%]">
            <img src={ingeTabasco} alt="imagen ingeniera morelco" className="w-full m-0" />
          </div>
          <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
            Observa con atención esta <span className="font-bold">matriz de riesgos</span>, una
            herramienta fundamental en la gestión de riesgos que permite identificar y evaluar
            la probabilidad e impacto de distintos eventos adversos
          </Paragraph>
          <div className="mt-4">
            <Button
              bold={false}
              icon={faQuestionCircle}
              roundedFull={true}
              onClick={() => setIsModalOpen(true)}
            >
              ¿Sabías que?
            </Button>
          </div>
        </div>
        <div className="md:w-2/4 p-4">
          <div className={`image-container1 ${activeTooltip ? 'darkened' : ''}`}>
            <img src={imgTablaComparativa} alt="Matriz de riesgos" />
            {tooltips.map((tooltip) => (
              <React.Fragment key={tooltip.id}>
                <button
                  className={`circle-button ${activeTooltip === tooltip.id ? 'active' : ''}`}
                  id={`button${tooltip.id}`}
                  onClick={() => handleTooltipClick(tooltip.id)}
                >
                  {tooltip.id}
                </button>
                {activeTooltip === tooltip.id && (
                  <div className="message-box" style={{ top: '37%', left: '60%' }}>
                    <div className="number-indicator">{tooltip.id}</div>
                    <button className="close-button" onClick={closeTooltip}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <h3>{tooltip.title}</h3>
                    <audio ref={audioRef} className="audio-matriz" controls>
                      <source src={tooltip.audio} type="audio/mp3" />
                    </audio>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <ModalDialog
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        title="¿Sabías que?"
      >
        <div className="flex justify-center">
          <img src={imgRecuerda} alt="Pregunta" className="w-32 mb-4" />
        </div>
        <Paragraph theme="light" justify="justify">
          En Colombia, no existe una única metodología obligatoria para la implementación de la
          Identificación de Peligros, Valoración de Riesgos y Control (IPVR). Sin embargo, las
          guías técnicas y normativas establecidas por el gobierno colombiano recomiendan la
          aplicación de metodologías sistemáticas y adaptables a las características de cada organización.
        </Paragraph>
        {/* <div className="flex justify-center">
          <Instruction theme="light" arrow="down">
            Haz clic para ejecutar el audio
          </Instruction>
        </div>
        <audio ref={modalAudioRef} controls className="w-full mt-4">
          <source src="assets/audio/sld12_sabias-que-matriz.mp3" type="audio/mp3" />
        </audio> */}
      </ModalDialog>
    </div>
  );
}

export default AprendamosMatrizDeRiesgosTooltips;
