import React, { useState, useEffect, useRef } from "react";
import Title from "../../pages/components/Title";
import Subtitle from "../../pages/components/Subtitle";
import Paragraph from "../../pages/components/Paragraph";
import Instruction from "../../pages/components/Instruction";
import Button from "../../pages/components/Button";
import ModalDialog from "../../pages/components/ModalDialog";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../store";
import { useMediaQuery } from "react-responsive";
import imgRecuerda from "../../assets/img/botones/recuerda_icono.webp";
import imgIngeMorelco from "../../assets/img/caras/avatar_asombrado.webp";
import "../slides/styles/PasosUsarMatrizRiesgo.css";
import matriz1 from "../../assets/img/matriz-1.svg";
import matriz2 from "../../assets/img/matriz-2.svg";
import matriz3 from "../../assets/img/matriz-3.svg";
import matriz4 from "../../assets/img/matriz-4.svg";
import matriz5 from "../../assets/img/matriz-5.svg";
import audio1 from "../../assets/audio/sld14_audios/1_identificar_los_riesgos.mp3";
import audio2 from "../../assets/audio/sld14_audios/2_describir_los_riesgos.mp3";
import audio3 from "../../assets/audio/sld14_audios/3_evaluar_probabilidad_de_ocurrencia.mp3";
import audio4 from "../../assets/audio/sld14_audios/4_evalua_la_probabilidad.mp3";
import audio5 from "../../assets/audio/sld14_audios/5_priorizar_los_riesgos.mp3";

const matrixSteps = [
  {
    id: 1,
    text: "Identifica los riesgos del proyecto",
    image: matriz1,
    audio: audio1
  },
  {
    id: 2,
    text: "Describir los riesgos del proyecto",
    image: matriz2,
    audio: audio2
  },
  {
    id: 3,
    text: "Evaluar la probabilidad de ocurrencia",
    image: matriz3,
    audio: audio3
  },
  {
    id: 4,
    text: "Evaluar la gravedad de las conseguencias",
    image: matriz4,
    audio: audio4
  },
  {
    id: 5,
    text: "Priorizar los riesgos y actúar en consecuencia",
    image: matriz5,
    audio: audio5
  }
];

function PasosUsarMatrizRiesgo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const audioRefs = useRef({});
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  useEffect(() => {
    const handlePlay = (playingId) => {
      Object.entries(audioRefs.current).forEach(([id, audio]) => {
        if (id !== playingId && audio && !audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      setActiveCard(parseInt(playingId));
    };

    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      if (audio) {
        audio.addEventListener('play', () => handlePlay(id));
      }
    });

    return () => {
      Object.entries(audioRefs.current).forEach(([id, audio]) => {
        if (audio) {
          audio.removeEventListener('play', () => handlePlay(id));
        }
      });
    };
  }, []);

  const handleCardClick = (stepId) => {
    if (audioRefs.current[stepId]) {
      if (audioRefs.current[stepId].paused) {
        audioRefs.current[stepId].play();
      } else {
        audioRefs.current[stepId].pause();
        audioRefs.current[stepId].currentTime = 0;
        setActiveCard(null);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-auto md:h-screen py-0 pb-3 md:py-3 px-6 md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <div className="my-4 text-center">
            <Title>Aprendamos…</Title>
            <Subtitle>Matriz de Riesgos</Subtitle>
          </div>
          <div className="w-[40%]">
            <img src={imgIngeMorelco} alt="imagen ingeniera morelco" className="w-full m-0" />
          </div>
          <div className="md:px-14 text-center">
            <Paragraph justify={isMobile ? 'justify' : 'center'}>
              Veamos ahora, un resumen de los 5 pasos clave para usar una MATRIZ DE RIESGOS:
            </Paragraph>
          </div>
          <div className="mt-6">
            <Button
              bold={false}
              icon={faBrain}
              roundedFull={true}
              onClick={() => setIsModalOpen(true)}
            >
              Recuerda
            </Button>
          </div>
        </div>
      </div>

      <div className="md:flex-1 bg-white md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="my-auto h-full flex flex-col justify-center items-center">
          <div className='text-center'>
            <Title><span className='text-secondary-color'>5 pasos para usar la matriz de riesgos</span></Title>
          </div>
          <div className="flex justify-center items-center px-3 mb-3">
            <Instruction theme="light" arrow="down">
              Haz clic en cada paso y escucha su explicación
            </Instruction>
          </div>
          <div className="card-container-matriz">
            {matrixSteps.map((step) => (
              <div
                key={step.id}
                className={`card-matriz ${activeCard === step.id ? 'active-matriz' : ''}`}
                onClick={() => handleCardClick(step.id)}
              >
                <img src={step.image} alt={`Paso ${step.id}`} className="card-image-matriz m-0" />
                <p>{`${step.id}. ${step.text}`}</p>
                <audio
                  className="h-10"
                  ref={el => audioRefs.current[step.id] = el}
                  src={step.audio}
                  controls
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ModalDialog
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        title="Recuerda"
      >
        <div className="flex justify-center">
          <img
            src={imgRecuerda}
            alt="Imagen recuerda"
            className="w-32"
          />
        </div>
        <Paragraph theme="ligth" justify={isMobile ? "justify" : "justify"}>
          No olvides que luego de elaborar tu MATRIZ DE RIESGOS debes <br />
          a. Desarrollar un plan de acción: Para cada riesgo prioritario, se debe desarrollar un plan de acción que incluya medidas para prevenir o mitigar el riesgo. <br />
          b. Monitorear y revisar la matriz de riesgos: La matriz de riesgos se debe monitorear y revisar periódicamente para asegurarse de que sigue siendo precisa y actualizada.
        </Paragraph>
      </ModalDialog>
    </div>
  );
}

export default PasosUsarMatrizRiesgo;

