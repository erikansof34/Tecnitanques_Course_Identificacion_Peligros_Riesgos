import React, { useState, useEffect } from "react";
import useStore from "../../store";
import { useMediaQuery } from "react-responsive";
import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import "../slides/styles/EvaluandoEfectividadControles.css";
import img1 from "../../assets/img/img1.svg";
import img2 from "../../assets/img/img2.svg";
import img3 from "../../assets/img/img1.svg";
import img4 from "../../assets/img/img2.svg";
import avatarHombre from "../../assets/img/cuerpo_completo/avatar_completo_saludando.webp";

const cardData = [
  {
    id: 1,
    img: img1,
    title: "Análisis de brechas",
    description: "Este método consiste en comparar el diseño de los controles con su implementación para identificar cualquier brecha."
  },
  {
    id: 2,
    img: img2,
    title: "Análisis de causa raíz",
    description: "Este método se utiliza para identificar las causas raíz de los incidentes y eventos relacionados con los riesgos.​"
  },
  {
    id: 3,
    img: img3,
    title: "Auditorías Internas",
    description: "Las auditorías internas son evaluaciones independientes del sistema de control interno."
  },
  {
    id: 4,
    img: img4,
    title: "Pruebas de control",
    description: "Las pruebas de control son pruebas diseñadas para verificar que los controles funcionan como se espera."
  }
];

export default function EvaluandoEfectividadControles() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleCardClick = (id) => {
    setActiveCard(id === activeCard ? null : id);
  };

  return (
    <div className="mb-36 md:mb-0">
      <div className="quiz-header">
        <Title>Aprendamos...</Title>
        <Subtitle>Evaluando la Efectividad de los controles</Subtitle>
        <Paragraph>Tamara ha investigado un poco, y comparte con sus compañeros que existen diversos métodos para evaluar la efectividad de los controles implementados, algunos de los más comunes son:</Paragraph>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-center mt-3 md:w-[90%]">
          <div className="w-full md:w-2/3 px-4">
            <div className="card-grid-control">
              {cardData.map((card) => (
                <div
                  key={card.id}
                  className={`card-control ${activeCard === card.id ? 'active' : ''}`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <img src={card.img} alt={`Imagen ${card.id}`} className="card-img-control" />
                  <hr />
                  <p className="card-text-control">
                    <strong>{card.title}</strong>
                    <br />
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/3 mobile-img-disable">
            <div className="space-img" id="selected-image-container-control">
              <img id="selected-image-control" src={avatarHombre} alt="Imagen seleccionada" />
            </div>
          </div>
          {/* <div className="w-full md:w-1/3 mobile-img-active">
            <div id="selected-image-container-control mt-0">
              <img id="selected-image-control" src={avatarHombre} alt="Imagen seleccionada" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}