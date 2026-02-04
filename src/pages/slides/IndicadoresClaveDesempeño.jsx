import React, { useState, useEffect, useRef } from "react";
import useStore from "../../store";
import "../../pages/slides/styles/IndicadoresClaveDesempeño.css";
import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import { useMediaQuery } from "react-responsive";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import imgTablaIndicadores from "../../assets/img/grafico-kpi.webp";
import imgRecuerda from "../../assets/img/botones/no-olvides-color.webp";
import audioMatriz1 from "../../assets/audio/kpi_audios/numero_incidentes_relacionados_con_riesgos.mp3";
import audioMatriz2 from "../../assets/audio/kpi_audios/gavedad_incidentes_relacionados_con_riesgos.mp3";
import audioMatriz3 from "../../assets/audio/kpi_audios/costos_incidentes_relacionados_con_riesgos.mp3";
import audioMatriz4 from "../../assets/audio/kpi_audios/porcentaje_cumplimiento_controles.mp3";
import audioMatriz5 from "../../assets/audio/kpi_audios/ipv_kpi.mp3";
import ingeMorelco from "../../assets/img/caras/avatar_neutro.webp";

const tooltips = [
  {
    id: 1,
    title: "Este KPI mide la frecuencia con la que se producen incidentes.",
    audio: audioMatriz1
  },
  {
    id: 2,
    title: "Este KPI mide la gravedad de los incidentes relacionados con riesgos.",
    audio: audioMatriz2
  },
  {
    id: 3,
    title: "Este KPI mide el costo financiero de los incidentes relacionados con riesgos.",
    audio: audioMatriz3
  },
  {
    id: 4,
    title: "'Este KPI mide el porcentaje de veces que los controles se implementan correctamente.",
    audio: audioMatriz4
  },
  {
    id: 5,
    title: "Este KPI mide la satisfacción de los usuarios con los controles.",
    audio: audioMatriz5
  }
];

function IndicadoresClaveDesempeño() {
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
        <Title>¿Y cómo nos medimos?</Title>
        <Subtitle>Indicadores clave de desempeño (KPI)</Subtitle>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="md:w-1/3 flex flex-col items-center justify-center  px-6 md:px-10 md:p-0">
          <div className="w-[50%]">
            <img src={ingeMorelco} alt="ingeniero Morelco" />
          </div>
          <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
            Los indicadores clave de desempeño (KPIs) son métricas que se utilizan para medir el desempeño de los controles. Los KPIs pueden ser cuantitativos o cualitativos. Algunos ejemplos de KPIs para la gestión de riesgos son:
          </Paragraph>
        </div>
        <div className="md:w-2/4 p-4">
          <div className="flex justify-center items-center">
            <Instruction theme="light" arrow="down">
              Haz clic en cada botón para escuchar la información:
            </Instruction>
          </div>
          <div className={`image-container1 ${activeTooltip ? 'darkened' : ''}`}>
            <img src={imgTablaIndicadores} alt="Matriz de riesgos" />
            {tooltips.map((tooltip) => (
              <React.Fragment key={tooltip.id}>
                <button
                  className={`circle-button ${activeTooltip === tooltip.id ? 'active' : ''}`}
                  id={`button${tooltip.id}-kpi`}
                  onClick={() => handleTooltipClick(tooltip.id)}
                >
                  {tooltip.id}
                </button>
                {activeTooltip === tooltip.id && (
                  <div className="message-box-kpi" style={{ top: '7%', left: '30%' }}>
                    <button className="number-indicator close-button" onClick={closeTooltip}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <h3>
                      <span className="tooltip-number">{tooltip.id}</span>
                      {tooltip.title}
                    </h3>
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
    </div>
  );
}

export default IndicadoresClaveDesempeño;