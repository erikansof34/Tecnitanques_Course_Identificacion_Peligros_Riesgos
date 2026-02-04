import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faRepeat,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import useStore from "../../store";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import imgTrue from "../../assets/img/true.jpg";
import imgFalse from "../../assets/img/false.jpg";
import imgIngeMorelco from "../../assets/img/caras/avatar_asombrado.webp";
import ingeTabasco from "../../assets/img/caras/avatar_neutro.webp";
import "../../../node_modules/video-react/dist/video-react.css";
import "../../pages/slides/styles/AprendamosMatrizDeRiesgos.css";

const questions = [
  {
    text: "Las matrices de riesgos tienen como objetivo principal evaluar la probabilidad y la gravedad de los riesgos en un proyecto o actividad.",
    correct: true,
    feedback:
      "Muy bien! Las matrices de riesgos están diseñadas para evaluar tanto la probabilidad como la gravedad de los riesgos, lo que ayuda a identificar cuáles son los más críticos y deben ser abordados de inmediato.",
  },
  {
    text: "El único propósito de una matriz de riesgos es priorizar los riesgos en función de su gravedad.",
    correct: false,
    feedback:
      "Así es!! Aunque priorizar los riesgos en función de su gravedad es un objetivo importante, una matriz de riesgos también busca proporcionar una visión clara de todos los riesgos, evaluar su probabilidad, y facilitar la comunicación y toma de decisiones.",
  },
  {
    text: "Una de las funciones de la matriz de riesgos es facilitar la toma de decisiones relacionadas con la gestión de riesgos.",
    correct: true,
    feedback:
      "Lo haces genial!!. Una de las funciones clave de la matriz de riesgos es facilitar la toma de decisiones informadas sobre cómo gestionar los riesgos identificados, asegurando que se adopten las medidas preventivas más adecuadas.",
  },
];

function ActividadRefuerzoApliquemos() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [scorePercentage, setScorePercentage] = useState(0)

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleAnswer = (userAnswer) => {
    const isCorrect = userAnswer === questions[currentQuestion].correct;
    setAnswerSelected(isCorrect);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setShowFeedback(true);
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setAnswerSelected(null);
      setShowFeedback(false);
    } else {
      const percentage = Math.round((score / questions.length) * 100)
      setScorePercentage(percentage)
      setShowScore(true);
      setShowFeedback(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setScorePercentage(0)
    setShowScore(false);
    setAnswerSelected(null);
    setShowFeedback(false);
  };

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-auto md:h-screen py-0 pb-3 md:py-3 px-6 md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <div className="my-4 text-center">
            <Title>Apliquemos…</Title>
            <Subtitle>Matriz de Riesgos</Subtitle>
          </div>
          <div className="w-[40%]">
            <img
              src={ingeTabasco}
              alt="imagen ingeniera morelco"
              className="w-full m-0"
            />
          </div>
          <div className="md:px-14 text-justify">
            <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
              Repasemos un poco, PARA QUÉ sirven las MATRICES DE RIESGOS de
              acuerdo con lo visto hasta ahora, y tu experiencia en la materia.
              Lee con atención cada afirmación y ayúdale a Tamara a identificar si
              es Falsa o Verdadera
            </Paragraph>
          </div>
        </div>
      </div>

      <div className="md:flex-1 bg-white md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-6 md:px-[14px] flex-col justify-center items-center">
        <div className="my-auto h-full flex flex-col justify-center items-center">
          <Instruction arrow="down" theme="light" className="w-full">
            Ayúdale a Tamara a identificar si es Falso o Verdadera cada situación
          </Instruction>
          <div
            className="max-w-[32rem] w-full bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden"
            style={{ margin: "0 auto" }}
          >
            {showScore ? (
              <div className="text-center p-6">
                <p className="my-2 text-secondary-color font-bold">
                  Respuestas correctas
                </p>
                <Paragraph theme="ligth">
                  Tus respuestas correctas son: {score} de {questions.length} ({scorePercentage}%)
                </Paragraph>
                <div className="reset-container">
                  <button
                    onClick={resetQuiz}
                    className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white mx-auto my-3"
                  >
                    <FontAwesomeIcon icon={faRepeat} className="mr-2" />{" "}
                    Reiniciar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-gray-800 text-white text-center py-2 text-xl">
                  <span className="inc">{currentQuestion + 1}</span>/
                  <span className="tol">{questions.length}</span>
                </div>
                <div className="itemQ view p-6">
                  <div className="mb-3">
                    <Paragraph theme="ligth">
                      {questions[currentQuestion].text}
                    </Paragraph>
                  </div>
                  <div className="relative flex justify-center mb-4">
                    <div className="feedback">
                      <div className="w-32 h-32 relative">
                        <img
                          src={imgIngeMorelco}
                          alt="MorelcoPlan"
                          className="w-full h-full object-contain"
                        />
                        {answerSelected !== null && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                            <img
                              src={answerSelected ? imgTrue : imgFalse}
                              alt={answerSelected ? "Correct" : "Incorrect"}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                      <p
                        className={`text-lg font-bold ${
                          answerSelected === null
                            ? "opacity-0"
                            : answerSelected
                              ? "text-green-600 opacity-100"
                              : "text-red-600 opacity-100"
                        }`}
                      >
                        {answerSelected === null
                          ? " "
                          : answerSelected
                            ? "Correcto ¡Bien hecho!"
                            : "Incorrecto ¡Sigue intentándolo!"}
                      </p>
                    </div>
                  </div>

                  <hr
                    className="mb-4"
                    style={{ width: "100%", border: "1px solid gray" }}
                  />
                  {!showFeedback && (
                    <div className="check flex justify-center space-x-4">
                      <button
                        className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
                        onClick={() => handleAnswer(true)}
                        disabled={answerSelected !== null}
                      >
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />{" "}
                        Verdadero
                      </button>
                      <button
                        className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
                        onClick={() => handleAnswer(false)}
                        disabled={answerSelected !== null}
                      >
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />{" "}
                        Falso
                      </button>
                    </div>
                  )}
                  {showFeedback && (
                    <div className="flex justify-center mt-4">
                      <Button
                        bold={true}
                        icon={faArrowRight}
                        roundedFull={true}
                        onClick={handleNext}
                        className="bg-main-color"
                      >
                        {currentQuestion === questions.length - 1
                          ? "Finalizar"
                          : "Siguiente"}
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {showFeedback && !showScore && answerSelected && (
            <div className="feedback-container text-justify mt-4 max-w-[32rem] w-full">
              <Paragraph theme="light" justify="left">
                <strong style={{ color: "#4CAF50" }}>Correcto: </strong>
                {questions[currentQuestion].feedback}
              </Paragraph>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActividadRefuerzoApliquemos;
