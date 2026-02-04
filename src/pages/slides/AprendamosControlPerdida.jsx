import { useState, useEffect } from "react"
import "../../../node_modules/video-react/dist/video-react.css"
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import Paragraph from "../components/Paragraph"
import Instruction from "../components/Instruction"
import Button from "../../pages/components/Button"
import { faCheck, faSync, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import useStore from "../../store"
import { useMediaQuery } from "react-responsive"
import "../slides/styles/FundamentosValoracionRiesgos.css"
import imgTrue from "../../assets/img/true.jpg"
import imgFalse from "../../assets/img/false.jpg"
import imgIngeMorelco from "../../assets/img/caras/avatar_asombrado.webp"

function AprendamosControlPerdida() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)
  const isMobile = useMediaQuery({ maxWidth: 640 })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [questionResults, setQuestionResults] = useState([])
  const [isValidated, setIsValidated] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [answerSelected, setAnswerSelected] = useState(null)
  const [scorePercentage, setScorePercentage] = useState(0)

  const questions = [
    {
      question:
        "¿El Control de Pérdidas se enfoca en eliminar o controlar los peligros que pueden causar accidentes y enfermedades laborales?",
      options: [
        { text: "SI", correct: true },
        { text: "NO", correct: false },
      ],
      feedback:
        "Tienes razón !!. El Control de Pérdidas se centra en identificar y eliminar o controlar los peligros para prevenir accidentes, enfermedades laborales y otras pérdidas.",
      incorrectFeedback: "Incorrecto: ¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
    {
      question: "¿El Control de Pérdidas requiere evaluar los riesgos asociados a los peligros identificados?",
      options: [
        { text: "SI", correct: true },
        { text: "NO", correct: false },
      ],
      feedback:
        "¡Estás en lo correcto!. Una parte esencial del Control de Pérdidas es la evaluación de los riesgos que surgen de los peligros identificados, lo que permite priorizar y gestionar dichos riesgos de manera efectiva.",
      incorrectFeedback: "Incorrecto: ¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
    {
      question:
        "¿El Control de Pérdidas se detiene después de la identificación de peligros, sin implementar medidas de control?",
      options: [
        { text: "SI", correct: false },
        { text: "NO", correct: true },
      ],
      feedback:
        "¡¡Has aprendido mucho !!. El Control de Pérdidas no sólo identifica peligros, sino que también implementa medidas para eliminar o controlar los riesgos evaluados, asegurando así la seguridad en el entorno laboral",
      incorrectFeedback: "Incorrecto: ¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
  ]

  useEffect(() => {
    setIsOnDivisor(false)
  }, [setIsOnDivisor])

  const handleAnswerSelect = (optionIndex) => {
    if (!isValidated) {
      setSelectedAnswers((prev) => {
        const newAnswers = [...prev]
        newAnswers[currentQuestion] = optionIndex
        return newAnswers
      })
      setShowErrorMessage(false)
      setShowFeedback(false)
    }
  }

  const handleValidate = () => {
    if (selectedAnswers[currentQuestion] !== undefined) {
      const isCorrect = questions[currentQuestion].options[selectedAnswers[currentQuestion]].correct
      setAnswerSelected(isCorrect)

      setQuestionResults((prev) => {
        const newResults = [...prev]
        newResults[currentQuestion] = isCorrect ? 1 : 0
        return newResults
      })

      setIsValidated(true)
      setShowErrorMessage(false)
      setShowFeedback(true)
    } else {
      setShowErrorMessage(true)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setIsValidated(false)
      setShowFeedback(false)
      setAnswerSelected(null)
      setSelectedAnswers((prev) => {
        const newAnswers = [...prev]
        newAnswers[currentQuestion] = undefined
        return newAnswers
      })
    } else {
      const correctAnswers = questionResults.reduce((a, b) => a + b, 0)
      const percentage = Math.round((correctAnswers / questions.length) * 100)
      setScorePercentage(percentage)
      setShowScore(true)
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setShowScore(false)
    setIsValidated(false)
    setQuestionResults([])
    setShowErrorMessage(false)
    setShowFeedback(false)
    setAnswerSelected(null)
    setScorePercentage(0)
  }

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <div className="mb-4 text-center">
            <Title>Aprendamos…</Title>
            <Subtitle>Control de Pérdidas</Subtitle>
          </div>
          <div className="px-6 md:px-14 text-justify">
            <div className="mb-2">
              <Paragraph justify={isMobile ? "justify" : "center"}>
                Veamos ahora, Tamara tiene un nuevo reto en la organización: <br />
                ¡¡Ahora apliquemos!!
              </Paragraph>
            </div>
            <Paragraph justify={isMobile ? "justify" : "justify"}>
              Ahora la Jefatura de la empresa, ha recomendado a Tamara que implemente un Programa de control de pérdidas
              asociada a la gestión de riesgos en la organización. Tamara se ha puesto a investigar y ha encontrado que
              de hecho el control de pérdidas y la Identificación de Peligros y Valoración de Riesgos (IPVR) están
              estrechamente relacionados. ya que ésta es un componente fundamental del Control de Pérdidas, proporciona
              la base para identificar, evaluar y controlar los riesgos que pueden ocasionar pérdidas en una
              organización. Ayúdale a Tamara a contestar estas preguntas que le hizo su jefe al respecto:
            </Paragraph>
          </div>
        </div>
      </div>

      <div className="md:flex-2 bg-white md:w-1/2 w-full px-6 md:pr-20 flex justify-center items-center pb-2">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <Instruction theme="light" arrow="down">
              Lee cada pregunta y ayúdale a Tamara a seleccionar 1 sola respuesta:
            </Instruction>
          </div>

          {!showResults && (
            <div className="preguntas_01 w-full max-w-[32rem]">
              <div className="ctItem">
                <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
                  <strong>Pregunta {currentQuestion + 1}: </strong>
                  {questions[currentQuestion].question}
                </Paragraph>
                <div className="relative flex justify-center mb-4">
                  <div className="w-32 h-32 relative">
                    <img
                      src={imgIngeMorelco || "/placeholder.svg"}
                      alt="MorelcoPlan"
                      className="w-full h-full object-contain"
                    />
                    {isValidated && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                        <img
                          src={answerSelected ? imgTrue : imgFalse}
                          alt={answerSelected ? "Correct" : "Incorrect"}
                          className="w-full h-full object-contain m-0"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  {questions[currentQuestion].options.map((option, index) => (
                    <p
                      key={index}
                      className={`
                        ${selectedAnswers[currentQuestion] === index ? "act" : ""}
                        ${isValidated && selectedAnswers[currentQuestion] === index
                          ? option.correct
                            ? "true"
                            : "false"
                          : ""
                        }
                      `}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      {String.fromCharCode(97 + index)}. {option.text}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col items-center">
                  {showErrorMessage && (
                    <h3 theme="light" className="text-secondary-color font-bold mb-2">
                      Debe seleccionar una opción
                    </h3>
                  )}
                  <Button
                    bold={false}
                    icon={isValidated ? faArrowRight : faCheck}
                    roundedFull={true}
                    onClick={isValidated ? handleNext : handleValidate}
                    disabled={selectedAnswers[currentQuestion] === undefined}
                  >
                    {isValidated ? "Siguiente" : "Validar"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showFeedback && !showScore && (
            <div className="feedback-container text-justify mt-4 max-w-[32rem] w-full">
              <Paragraph theme="light" justify="left">
                {answerSelected ? (
                  <strong style={{ color: "#4CAF50" }}>Correcto: </strong>
                ) : (
                  <strong style={{ color: "#f44336" }}>Incorrecto: </strong>
                )}
                {answerSelected
                  ? questions[currentQuestion].feedback
                  : questions[currentQuestion].incorrectFeedback.substring(11)}
              </Paragraph>
            </div>
          )}

          {showResults && (
            <div className="resultado-container">
              <p className="text-secondary-color font-bold">Resultados:</p>
              <div className="results-list">
                {questionResults.map((result, index) => (
                  <Paragraph key={index} theme="light">
                    El resultado de la pregunta {index + 1} es{" "}
                    <span className={result === 1 ? "text-success" : "text-error"}>{result}/1 respuestas correctas</span>
                  </Paragraph>
                ))}
              </div>
              <Paragraph theme="light" className="mt-4">
                <strong>
                  Tus respuestas correctas son: {questionResults.reduce((a, b) => a + b, 0)} de {questions.length} (
                  {scorePercentage}%)
                </strong>
              </Paragraph>
              <Button bold={false} icon={faSync} roundedFull={true} onClick={handleReset}>
                Reiniciar Actividad
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AprendamosControlPerdida

