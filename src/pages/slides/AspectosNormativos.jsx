import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
// import "../../assets/css/cards.css";
import "../../../node_modules/video-react/dist/video-react.css";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import Button from "../../pages/components/Button";
import ModalDialog from "../../pages/components/ModalDialog";
import useStore from "../../store";
import { useMediaQuery } from "react-responsive";
import "../slides/styles/AspectosNormativos.css";
import imgSabiasQue from "../../assets/img/botones/sabias_que_icono.webp";

const secondaryColor = '#0A9EAD';

function AspectosNormativos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [expanded, setExpanded] = useState('panel1');
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionData = [
    {
      title: "Decreto ley 1072 de 2015",
      content: 'Esta ley establece el Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST), el cual obliga a todos los empleadores a implementar un proceso de IPVR como parte fundamental del mismo. La ley define los principios, responsabilidades y obligaciones en materia de seguridad y salud en el trabajo'
    },
    {
      title: "Resolución 0312 de 2019",
      content: "Es una norma técnica de vital importancia para la seguridad y salud de los trabajadores en Colombia. Esta norma establece los estándares mínimos que deben cumplir las empresas en materia de seguridad y salud en el trabajo, y su implementación es obligatoria para todas las empresas del país."
    },
    {
      title: "GTC 45",
      content: "La Guía Técnica Colombiana GTC 45 es una metodología diseñada para identificar los peligros y valorar los riesgos de seguridad y de salud en el trabajo. La primera versión de este documento apareció en 1997 y era una herramienta destinada, básicamente, a elaborar un diagnóstico de las condiciones laborales. Su propósito era construir un panorama global de los factores de riesgo."
    },
    {
      title: "Norma ISO 45001 Sistemas de gestión de seguridad y salud ocupacional",
      content: "La norma exige que las organizaciones establezcan un proceso sistemático para identificar, valorar y controlar los peligros y riesgos en el lugar de trabajo. La certificación ISO 45001 evalúa la eficacia del proceso de IPVR de la organización, incluyendo su alcance, metodología, documentación y aplicación en las actividades cotidianas."
    },
    {
      title: "Norma ISO 31000",
      content: "Proporciona un marco genérico para la gestión del riesgo en cualquier contexto, incluyendo la seguridad y salud en el trabajo. Si bien la IPVR no es un requisito específico de la ISO 31000, si ofrece un enfoque sistemático para la identificación y valoración de riesgos."
    }
  ];

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          {/* Left Column */}
          <div className="my-2 text-center">
            <Title>Aprendamos...</Title>
            <Subtitle>Aspectos normativos de la</Subtitle>
            <Subtitle>Identificación de Peligros</Subtitle>
          </div>
          <div className="px-6 md:px-14 text-justify">
            <Paragraph justify={isMobile ? 'justify' : 'justify'}>
              En Colombia, usamos algunos referentes internacionales para estructurar nuestras normas, en lo relacionado con la Identificación de peligros y valoración de riesgos, nos acogemos a varias normas y resoluciones que se enfocan en la seguridad en el trabajo y el uso adecuado de estas herramientas. Revisa atentamente esta lista de algunas de las normas más relevantes para el uso seguro de herramientas.
            </Paragraph>
          </div>
          <div className="mt-4">
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

      <div className="md:flex-2 bg-white md:w-1/2 w-full px-6 md:pr-20 flex justify-center items-center pb-8">
        <div className="w-full flex flex-col justify-center items-start" style={{ position: isMobile ? 'static' : 'relative', top: isMobile ? '0' : '0' }}>
          <div className="flex justify-center mx-auto items-center">
            <Instruction arrow="down" theme="light" className="w-full">
              Haz clic en cada norma y despliega su contenido, léelo atentamente
            </Instruction>
          </div>
          <div className=" w-full px-18">
            {accordionData.map((item, index) => (
              <Accordion
                key={`panel${index + 1}`}
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
                className="bg-secondary-color text-red mb-1 m-0"
                sx={{
                  backgroundColor: '#0f172a',
                  color: 'white',
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary
                  style={{ minHeight: '40px', maxHeight: 'auto', lineHeight: '1.1rem' }}
                  expandIcon={<ExpandMoreIcon className="text-white" />}
                  aria-controls={`panel${index + 1}a-content`}
                  id={`panel${index + 1}a-header`}
                  sx={{
                    backgroundColor: '#0f172a',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: secondaryColor,
                    },
                    '&.Mui-expanded': {
                      backgroundColor: secondaryColor,
                    },
                    '& .MuiAccordionSummary-expandIconWrapper': {
                      color: 'white',
                    },
                    '&.Mui-expanded .MuiAccordionSummary-expandIconWrapper': {
                      color: 'white',
                    },
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <span className="text-white">{item.title}</span>
                </AccordionSummary>
                <AccordionDetails className="bg-acordion" style={{ border: '1px solid gray', margin: 0 }}>
                  <p className="text-slate-900 text-justify">{item.content}</p>
                </AccordionDetails>
              </Accordion>
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
          <img
            src={imgSabiasQue}
            alt="Imagen pregunta"
            className="image-boton w-32"
          />
        </div>
        <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
        Según la Organización Internacional del Trabajo (OIT), cada año se producen aproximadamente 270 millones de accidentes laborales en todo el mundo, de los cuales casi 2 millones resultan en muertes. Un estudio indica que uno de cada cinco accidentes laborales está relacionado con el uso de herramientas manuales, eléctricas o de percusión.
        </Paragraph>
      </ModalDialog>
    </div>
  );
}

export default AspectosNormativos;