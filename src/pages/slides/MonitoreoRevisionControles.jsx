import { useState, useEffect, useRef } from "react"
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
import Loader from "../components/Loader"

function MonitoreoRevisionControles() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)
  const isMobile = useMediaQuery({ maxWidth: 640 })
  const videoRef = useRef(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showQuestions, setShowQuestion] = useState(true)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [questionResults, setQuestionResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isValidated, setIsValidated] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [scorePercentage, setScorePercentage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const questions = [
    {
      question:
        "¿Qué método de monitoreo implica la observación directa de los controles para verificar su correcta implementación?",
      options: [
        { text: "Inspecciones", correct: true },
        { text: "Análisis de datos", correct: false },
        { text: "Informes", correct: false },
      ],
      correctFeedback:
        "Haz aprendido mucho!. Las inspecciones son un método clave de monitoreo que implica la observación física directa para verificar que los controles se implementen adecuadamente y funcionen según lo previsto.​",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
    {
      question: "¿Cuál de los siguientes es un componente clave de la revision formal del sistema de control interno?",
      options: [
        { text: "Evaluación de la eficiencia de los controles", correct: true },
        { text: "Realización de las pruebas ocasionales", correct: false },
        { text: "Observación diaria de los controles", correct: false },
      ],
      correctFeedback:
        "Lo haces muy bien!. La revisión formal del sistema de control interno incluye la evaluación de la eficacia de los controles para asegurar que están funcionando como se espera y mitigando los riesgos de manera efectiva.​",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
  ]

  useEffect(() => {
    setIsOnDivisor(false)
  }, [setIsOnDivisor])

  const handleVideoTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= videoRef.current.duration - 15) {
      setShowQuestion(true)
    }
  }

  const handleVideoLoad = () => {
    setIsLoading(false)
  }

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
    } else {
      const correctAnswers = questionResults.reduce((a, b) => a + b, 0)
      const percentage = Math.round((correctAnswers / questions.length) * 100)
      setScorePercentage(percentage)
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setIsValidated(false)
    setQuestionResults([])
    setShowErrorMessage(false)
    setShowFeedback(false)
    setScorePercentage(0)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-auto md:h-auto py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center mx-auto items-center">
            <Instruction arrow="down" theme="dark">
              Haz clic para ejecutar el video
            </Instruction>
            <div style={{ position: "relative" }}>
              {isLoading && <Loader />}
              <iframe
                src="https://iframe.mediadelivery.net/embed/351989/31476409-5ac0-42e5-ba57-476cca65dc0d?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
                loading="lazy"
                className="w-[90vw] md:w-[100%] h-[80vh]"
                style={{
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
                  opacity: isLoading ? 0 : 1,
                  transition: "opacity 0.5s ease-in-out",
                }}
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                allowFullScreen={true}
                onLoad={handleVideoLoad}
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex-2 bg-white md:w-3/5 w-full px-6 md:pr-20 flex justify-center items-center pb-2">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-center my-2">
            <Title>
              <span className="text-secondary-color">Aprendamos…</span>
            </Title>
            <Subtitle theme="ligth">Monitoreo y Revisión de los controles</Subtitle>
          </div>
          <div className="text-justify">
            <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
              Ahora que Andy ha aprendido mucho, Tamara quiere compartirle lo relacionado con la etapa de Monitoreo y
              Revisión de los controles, a fin de garantizar la mitigación de los riesgos evaluados.
            </Paragraph>
          </div>
          <div className="flex justify-center items-center">
            <Instruction theme="light" arrow="down">
              Responde la siguiente pregunta basada en el video que acabas de ver.
            </Instruction>
          </div>

          {showQuestions && !showResults && (
            <div className="preguntas_01">
              <div className="ctItem">
                <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
                  <strong>Pregunta {currentQuestion + 1}: </strong>
                  {questions[currentQuestion].question}
                </Paragraph>
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

          {showQuestions && !showResults && showFeedback && (
            <div className="feedback-container ctItem mt-4">
              <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
                <strong
                  style={{
                    color: questionResults[currentQuestion] === 1 ? "#4CAF50" : "#F44336",
                  }}
                >
                  {questionResults[currentQuestion] === 1 ? "Correcto: " : "Incorrecto: "}
                </strong>
                {questionResults[currentQuestion] === 1
                  ? questions[currentQuestion].correctFeedback
                  : questions[currentQuestion].incorrectFeedback}
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

export default MonitoreoRevisionControles

