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

function FundamentosValoracionRiesgos() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)
  const isMobile = useMediaQuery({ maxWidth: 640 })
  const videoRef = useRef(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showQuestions, setShowQuestions] = useState(true)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({ correct: 0, total: 2, percentage: 0 })
  const [questionResults, setQuestionResults] = useState([])
  const [isValidated, setIsValidated] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const questions = [
    {
      question:
        "¿Qué es lo primero que debe hacer la organización una vez que se han identificado los peligros en el lugar de trabajo?",
      options: [
        { text: "Iniciar inmediatamente las operaciones sin necesidad de evaluación.", correct: false },
        {
          text: "Evaluar el peligro analizando cómo podría afectar la salud y seguridad de los trabajadores.",
          correct: true,
        },
        { text: "Implementar medidas de control sin ningún tipo de análisis previo.", correct: false },
      ],
      correctFeedback:
        "Muy bien! Evaluar el peligro es fundamental para entender su naturaleza y cómo puede afectar a los trabajadores, lo que permite diseñar estrategias de control efectivas y específicas para mitigar los riesgos.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
    {
      question: "¿Cómo se determina el nivel de riesgo asociado a un peligro identificado?",
      options: [
        { text: "Comparando el peligro con otros peligros de la misma industria.", correct: false },
        { text: "Asumiendo que todos los peligros tienen el mismo nivel de riesgo.", correct: false },
        {
          text: "Calculando el riesgo combinando la probabilidad de ocurrencia con la severidad de las consecuencias.",
          correct: true,
        },
      ],
      correctFeedback:
        "Determinar el nivel de riesgo requiere un análisis cuantitativo y cualitativo, que combina la probabilidad de que ocurra un evento peligroso con la gravedad de sus posibles consecuencias, lo que permite priorizar los riesgos y tomar decisiones informadas.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
  ]

  useEffect(() => {
    setIsOnDivisor(false)
  }, [setIsOnDivisor])

  const handleVideoTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= videoRef.current.duration - 15) {
      setShowQuestions(true)
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
      setResults({
        correct: correctAnswers,
        total: questions.length,
        percentage: percentage,
      })
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
    setResults({ correct: 0, total: questions.length, percentage: 0 })
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
                src="https://iframe.mediadelivery.net/embed/351989/d6a8a567-e389-4848-bfa0-441e5af3efb1?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
                loading="lazy"
                ref={videoRef}
                className="w-[90vw] md:w-[22vw] h-[80vh]"
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
              <span className="text-secondary-color">Reflexionemos…</span>
            </Title>
            <Subtitle theme="ligth">Fundamentos de la Valoración de Riesgos</Subtitle>
          </div>
          <div className="text-justify">
            <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
              Ahora que Andy ha compartido con sus compañeros la importancia de la Identificación de Peligros, Tamara
              quiere que demos un paso adicional: Realizar la Valoración de Riesgos, observa el video y responde las
              preguntas:
            </Paragraph>
          </div>
          <div className="flex justify-center items-center">
            <Instruction theme="light" arrow="down">
              Responde las siguientes preguntas basadas en el video que acabas de ver.
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
                  Tus respuestas correctas son: {results.correct} de {results.total} ({results.percentage}%)
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

export default FundamentosValoracionRiesgos

