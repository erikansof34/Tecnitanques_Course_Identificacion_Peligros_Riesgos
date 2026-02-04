import { useState, useEffect } from "react"
import useStore from "../../store"
import "../../pages/slides/styles/RecordemosListaDesplegable.css"
import Paragraph from "../components/Paragraph"
import Title from "../components/Title"
import { useMediaQuery } from "react-responsive"
import Instruction from "../components/Instruction"
import Button from "../../pages/components/Button"
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons"
import imgPeligro1 from "../../assets/img/peligro-1.jpg"
import imgPeligro2 from "../../assets/img/peligro-2.jpg"
import imgPeligro3 from "../../assets/img/peligro-3.jpg"
import imgPeligro4 from "../../assets/img/peligro-4.jpg"
import imgFalso from "../../assets/img/TrueOrFalse/xmarkAct.png"
import imgVerdadero from "../../assets/img/TrueOrFalse/checkAct.png"

function RecordemosListaDesplegable() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)
  const isMobile = useMediaQuery({ maxWidth: 640 })
  const [errorMessage, setErrorMessage] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const [hazards, setHazards] = useState([
    {
      image: imgPeligro1,
      description: "Se observa una escalera en mal estado, varias personas ya se han tropezado",
      correctAnswer: "1",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: imgPeligro2,
      description: "Huele a un gas propano cuando pasan en frente de la planta de producción",
      correctAnswer: "2",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: imgPeligro3,
      description: "Varios compañeros se han quejado de exceso de trabajo, y han tenido conflictos en las reuniones",
      correctAnswer: "3",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: imgPeligro4,
      description:
        "Las personas del área de contabilidad manifiestan que se les duermen las piernas y deben pararse varias veces al día",
      correctAnswer: "4",
      selectedAnswer: "",
      isCorrect: false,
    },
  ])

  const allOptions = [
    { value: "1", label: "Seguridad Locativo" },
    { value: "2", label: "Químicos" },
    { value: "3", label: "Psicosociales" },
    { value: "4", label: "Ergonómicos" },
  ]

  const [availableOptions, setAvailableOptions] = useState(allOptions)

  useEffect(() => {
    setIsOnDivisor(false)
  }, [setIsOnDivisor])

  const handleSelect = (index, value) => {
    const updatedHazards = [...hazards]
    const previousAnswer = updatedHazards[index].selectedAnswer
    updatedHazards[index].selectedAnswer = value
    setHazards(updatedHazards)

    // Update available options
    let updatedOptions = [...availableOptions]
    if (previousAnswer) {
      updatedOptions.push(allOptions.find((option) => option.value === previousAnswer))
    }
    if (value) {
      updatedOptions = updatedOptions.filter((option) => option.value !== value)
    }
    setAvailableOptions(updatedOptions)
  }

  const handleValidate = () => {
    if (hazards.some((hazard) => hazard.selectedAnswer === "")) {
      setErrorMessage("Debe seleccionar todas las opciones antes de validar.")
      return
    }

    let correct = 0
    const updatedHazards = hazards.map((hazard) => {
      const isCorrect = hazard.selectedAnswer === hazard.correctAnswer
      if (isCorrect) correct++
      return { ...hazard, isCorrect }
    })

    setHazards(updatedHazards)
    setCorrectCount(correct)
    setIsVerified(true)
    setErrorMessage("")
  }

  const handleReset = () => {
    setHazards(hazards.map((hazard) => ({ ...hazard, selectedAnswer: "", isCorrect: false })))
    setAvailableOptions(allOptions)
    setErrorMessage("")
    setIsVerified(false)
    setCorrectCount(0)
  }

  // Calculate the percentage of correct answers
  const calculatePercentage = () => {
    return Math.round((correctCount / hazards.length) * 100)
  }

  return (
    <div className="quiz-container mb-36 md:mb-0">
      <div className="quiz-header">
        <Title>Recordemos...</Title>
        <div className="quiz-subtitle">
          <Paragraph theme="dark" justify={isMobile ? "justify" : "center"}>
            Para comenzar, su compañero quiere ayudar a Tamara a identificar los PELIGROS en las siguientes situaciones en su
            entorno laboral. Tamara no está muy segura, pero quiere intentarlo. Ayúdale a clasificar a que TIPO DE
            PELIGRO corresponde cada situación:
          </Paragraph>
        </div>
      </div>
      <div className="flex justify-center items-center px-3">
        <Instruction theme="light" arrow="down">
          Selecciona en la lista despegable la opcion correcta
        </Instruction>
      </div>
      <div className="container_peligro gap-3">
        {hazards.map((hazard, index) => (
          <div
            key={index}
            className={`box_peligro h-[400px] flex flex-col justify-center items-center relative
              ${isVerified ? (hazard.isCorrect ? "bg-[#4CAF50]" : "bg-[#F44336]") : ""}
            `}
          >
            <div className="relative w-44 h-44 mb-2">
              <img
                src={hazard.image || "/placeholder.svg"}
                alt={`Hazard ${index + 1}`}
                className="w-full h-full object-cover rounded-md shw-img"
              />
              {isVerified && (
                <img
                  src={hazard.isCorrect ? imgVerdadero : imgFalso}
                  alt={hazard.isCorrect ? "Correcto" : "Incorrecto"}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16"
                />
              )}
            </div>
            <p className={`parrafo_peligro text-justify text-paragraph-light-color ${isVerified ? "text-white" : ""}`}>
              {hazard.description}
            </p>
            <select
              className="dropdown_peligro mt-2 w-full p-2 border rounded bg-white"
              value={hazard.selectedAnswer || ""}
              onChange={(e) => handleSelect(index, e.target.value)}
              disabled={isVerified}
            >
              <option value="">
                Seleccione...
              </option>
              {[
                ...availableOptions,
                ...(hazard.selectedAnswer ? [allOptions.find((option) => option.value === hazard.selectedAnswer)] : []),
              ].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {isVerified && (
              <p className="text-white font-bold mt-2">{hazard.isCorrect ? "¡Correcto!" : "¡Incorrecto!"}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-4">
        {errorMessage && <p className="text-secondary-color text-center text-md font-bold mt-2">{errorMessage}</p>}
        {isVerified && (
          <p
            className={`text-md mt-2 font-bold ${correctCount === 4 ? "text-[#65f38a]" : "text-paragraph-light-color"}`}
          >
            Tus respuestas correctas son: {correctCount} de 4 ({calculatePercentage()}%)
          </p>
        )}
        <div className="button-container">
          {!isVerified ? (
            <Button bold={false} icon={faCheck} roundedFull={true} onClick={handleValidate}>
              Validar
            </Button>
          ) : (
            <Button bold={false} icon={faRepeat} roundedFull={true} onClick={handleReset}>
              Reiniciar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecordemosListaDesplegable

