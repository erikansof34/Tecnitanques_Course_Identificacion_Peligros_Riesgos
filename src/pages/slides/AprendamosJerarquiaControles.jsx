import React, { useState, useEffect, useRef } from "react";
import useStore from "../../store";
import "../../pages/slides/styles/RecordemosListaDesplegable.css";
import "../../pages/slides/styles/AprendamosJerarquiaControles.css";
import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import { useMediaQuery } from "react-responsive";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import imgJeraquiaControles from "../../assets/img/jerarqui-controles.webp";
import imgRecuerda from "../../assets/img/botones/es_clave_icono.webp";
import audioJeraquia from "../../assets/audio/slide17_jerarquia.mp3";
import audioEliminacion from "../../assets/audio/sld17_audios/sld17_audio_eliminacion.mp3";
import audioSustitucion from "../../assets/audio/sld17_audios/sld17_audio_sustitucion.mp3";
import audioControlesIngenieria from "../../assets/audio/sld17_audios/sld17_audio_control_de_ingenieria.mp3";
import audioControlesAdministrativos from "../../assets/audio/sld17_audios/sld17_audio_controles_administrativos.mp3";
import audioElementosProteccionPersonal from "../../assets/audio/sld17_audios/sld17_audio_elementos_de_proteccion_personal.mp3";

const tooltipData = [
  {
    id: 1,
    position: "position-tooltip-1",
    title: "Eliminación",
    description: "Eliminación: Control más efectivo; consiste en quitar el riesgo del entorno laboral",
    audio: audioEliminacion
  },
  {
    id: 2,
    position: "position-tooltip-2",
    title: "Sustitución",
    description: "Sustitución: Reemplaza una fuente peligrosa por otra menos dañina.",
    audio: audioSustitucion
  },
  {
    id: 3,
    position: "position-tooltip-3",
    title: "Controles de Ingeniería",
    description: "Controles de Ingeniería: Modificación de equipos o sistemas para reducir la exposición.",
    audio: audioControlesIngenieria
  },
  {
    id: 4,
    position: "position-tooltip-4",
    title: "Controles Administrativos",
    description: "Controles Administrativos: Cambios en políticas y procedimientos de trabajo para minimizar la exposición.",
    audio: audioControlesAdministrativos
  },
  {
    id: 5,
    position: "position-tooltip-5",
    title: "Elementos de Protección Personal (EPP)",
    description: "(EPP): Última línea de defensa con equipo de protección como cascos y guantes.",
    audio: audioElementosProteccionPersonal
  }
];

function AprendamosJerarquiaControles() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRefs = useRef(tooltipData.map(() => React.createRef()));


  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleTooltipClick = (id) => {
    if (activeTooltip === id) {
      setActiveTooltip(null);
      audioRefs.current[id - 1].current.pause();
      audioRefs.current[id - 1].current.currentTime = 0;
    } else {
      setActiveTooltip(id);
      audioRefs.current.forEach((ref, index) => {
        if (index + 1 !== id) {
          ref.current.pause();
          ref.current.currentTime = 0;
        } else {
          ref.current.play();
        }
      });
    }
  };

  return (
    <div className="quiz-container mb-36 md:mb-0">
      <div className="quiz-header">
        <Title>Aprendamos... <span className="text-subtitle-color-qa">Jerarquia de controles</span></Title>
        <Paragraph>Una vez identificados los peligros y valorados los riesgos, debemos plantear controles de acuerdo con la jerarquía establecida por el Decreto 1072 de 2015:</Paragraph>
      </div>
      <div className="flex justify-center items-center px-3">
        <Instruction theme="light" arrow="down">
          Haz clic en cada nivel de la jerarquía de arriba a abajo, es decir, del más efectivo al menos efectivo:
        </Instruction>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
      <div className="pyramid-container">
          <img src={imgJeraquiaControles} alt="Jerarquía de controles" className="img-piramide-causas" />
          <div>
            {tooltipData.map((tooltip, index) => (
              <div key={tooltip.id} className={`tooltip-pyramid ${tooltip.position}`}>
                <button
                  className="tooltip-btn"
                  onClick={() => handleTooltipClick(tooltip.id)}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <div className="contenido-tlp">
                  <span className={`tooltiptext ${activeTooltip === tooltip.id ? 'visible' : ''}`}>
                    {tooltip.description}
                    <audio ref={audioRefs.current[index]} className="audio-piramide" controls>
                      <source src={tooltip.audio} type="audio/mp3" />
                    </audio>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center md:mt-4 mt-8">
        <Button
          bold={false}
          icon={faQuestionCircle}
          roundedFull={true}
          onClick={() => setIsModalOpen(true)}
        >
          Es clave que sepas
        </Button>
      </div>

      <ModalDialog
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        title="Es clave que sepas"
      >
        <div className="flex flex-col items-center">
          <img src={imgRecuerda} alt="Pregunta" className="w-32 mb-4" />
          <Paragraph theme="light" justify="justify">
            En general, los controles son medidas que se diseñan e implementan con el fin de reducir o mitigar los
            riesgos en su probabilidad o impacto, es decir, por un lado ayudan a prevenir que los riesgos a los que
            está expuesta la organización se materialicen y por otro, en caso de presentarse los riesgos, sirven para
            disminuir el impacto o las consecuencias generadas por estos.
          </Paragraph>
        </div>
      </ModalDialog>
    </div>
  );
}

export default AprendamosJerarquiaControles;