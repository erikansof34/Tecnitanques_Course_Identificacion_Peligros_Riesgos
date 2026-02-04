import React, { useState, useEffect, useCallback } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import Paragraph from "../components/Paragraph"
import Instruction from "../components/Instruction"
import Button from "../../pages/components/Button"
import ModalDialog from "../../pages/components/ModalDialog"
import { faCheck, faSync, faBrain } from "@fortawesome/free-solid-svg-icons"
import useStore from "../../store"
import { useMediaQuery } from "react-responsive"
import "../slides/styles/FundamentosValoracionRiesgos.css"
import "../slides/styles/PasosProgramaControlPerdida.css"
import imgAvatar from "../../assets/img/caras/avatar_neutro.webp"
import imgRecuerda from "../../assets/img/botones/recuerda_icono.webp"

const initialItems = [
  { id: "2", content: <span>Implementación de Medidas Preventivas (Controles)</span>, position: 2 },
  { id: "4", content: <span>Gestión de Incidentes</span>, position: 4 },
  { id: "5", content: <span>Mejora Continua</span>, position: 5 },
  { id: "1", content: <span>Identificación de Peligros y Valoración de Riesgos</span>, position: 1 },
  { id: "3", content: <span>Monitoreo y Revisión</span>, position: 3 },
]

const mobileItems = [
  { id: "2", content: "Implementación de Medidas Preventivas (Controles)", correctPosition: 2 },
  { id: "4", content: "Gestión de Incidentes", correctPosition: 4 },
  { id: "5", content: "Mejora Continua", correctPosition: 5 },
  { id: "1", content: "Identificación de Peligros y Valoración de Riesgos", correctPosition: 1 },
  { id: "3", content: "Monitoreo y Revisión", correctPosition: 3 },
]

function SortableItem({ id, content, isCorrect, showValidation }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
    position: "relative",
    zIndex: isDragging ? 2 : 1,
  }
  const className = `list-group-item ${showValidation ? (isCorrect ? "correct-order" : "incorrect-order") : ""}`

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={className}>
      {content}
      {showValidation && <span className="ml-2 font-bold">{isCorrect ? "Correcto" : "Incorrecto"}</span>}
    </div>
  )
}

function DragOverlayItem({ content }) {
  return (
    <div
      className="list-group-item"
      style={{
        cursor: "grabbing",
        backgroundColor: "white",
        boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
        width: "100%",
      }}
    >
      {content}
    </div>
  )
}

function PasosProgramaControlPerdida() {
  const [items, setItems] = useState(initialItems)
  const [mobileOrderItems, setMobileOrderItems] = useState(mobileItems)
  const [validationResults, setValidationResults] = useState({})
  const [hasValidated, setHasValidated] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPositions, setSelectedPositions] = useState({})
  const [activeId, setActiveId] = useState(null)
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)
  const isMobile = useMediaQuery({ maxWidth: 640 })
  const [correctPercentage, setCorrectPercentage] = useState(0)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    setIsOnDivisor(false)
  }, [setIsOnDivisor])

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id)
  }, [])

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event
    setActiveId(null)

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
    setHasValidated(false)
    setValidationResults({})
    setCorrectPercentage(0)
  }, [])

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  const handleSelectChange = useCallback((event, itemId) => {
    const newPosition = Number.parseInt(event.target.value)
    setSelectedPositions((prev) => ({
      ...prev,
      [itemId]: newPosition,
    }))
    setHasValidated(false)
    setValidationResults({})
    setCorrectPercentage(0)
  }, [])

  const validateOrder = useCallback(() => {
    const newValidationResults = {}
    let correctCount = 0
    const totalCount = isMobile ? mobileOrderItems.length : items.length

    if (isMobile) {
      mobileOrderItems.forEach((item) => {
        const isCorrect = item.correctPosition === selectedPositions[item.id]
        newValidationResults[item.id] = isCorrect
        if (isCorrect) correctCount++
      })
    } else {
      items.forEach((item, index) => {
        const isCorrect = Number.parseInt(item.id) === index + 1
        newValidationResults[item.id] = isCorrect
        if (isCorrect) correctCount++
      })
    }

    setValidationResults(newValidationResults)
    const percentage = Math.round((correctCount / totalCount) * 100)
    setCorrectPercentage(percentage)
    setHasValidated(true)
  }, [items, mobileOrderItems, selectedPositions, isMobile])

  const handleReset = useCallback(() => {
    setItems(initialItems)
    setMobileOrderItems(mobileItems)
    setValidationResults({})
    setHasValidated(false)
    setSelectedPositions({})
    setCorrectPercentage(0)
  }, [])

  const getAvailablePositions = useCallback(
    (currentItemId) => {
      const usedPositions = Object.entries(selectedPositions)
        .filter(([id]) => id !== currentItemId)
        .map(([, pos]) => pos)
      return [1, 2, 3, 4, 5].filter((pos) => !usedPositions.includes(pos))
    },
    [selectedPositions],
  )

  const activeItem = activeId ? items.find((item) => item.id === activeId) : null

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-main-color md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <div className="mb-4 text-center">
            <Title>Aprendamos…</Title>
            <Subtitle>Control de Pérdidas</Subtitle>
          </div>
          <div className="w-[40%] flex justify-center items-center">
            <img src={imgAvatar || "/placeholder.svg"} alt="imagen del avatar" className="avatar-image" />
          </div>
          <div className="px-6 md:px-14 text-justify">
            <Paragraph justify={isMobile ? "justify" : "center"}>
              Ayudémosle a Tamara a organizar los 5 pasos que debe tener el Programa de Control de Pérdidas:
            </Paragraph>
          </div>
          <div className="mt-6">
            <Button bold={false} icon={faBrain} roundedFull={true} onClick={() => setIsModalOpen(true)}>
              Recordemos
            </Button>
          </div>
        </div>
      </div>

      <div className="md:flex-2 bg-white md:w-3/5 w-full px-6 md:pr-20 flex justify-center items-center pb-2">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex justify-center items-center w-full">
            <Instruction theme="light" arrow="down">
              {isMobile
                ? "Selecciona el orden correcto para cada paso:"
                : "Arrastra cada elemento para organizar los 5 pasos del Programa de Control de Pérdidas que ha diseñado Tamara:"}
            </Instruction>
          </div>

          {isMobile ? (
            <div className="sortable-list w-full mt-4">
              {mobileOrderItems.map((item) => (
                <div
                  key={item.id}
                  className={`list-group-item ${hasValidated ? (validationResults[item.id] ? "correct-order" : "incorrect-order") : ""}`}
                >
                  <select
                    value={selectedPositions[item.id] || ""}
                    onChange={(e) => handleSelectChange(e, item.id)}
                    className="mr-2 p-2 border rounded"
                    disabled={hasValidated}
                  >
                    <option value="">Seleccionar</option>
                    {getAvailablePositions(item.id).map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                  <span className="flex-1">{item.content}</span>
                </div>
              ))}
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="sortable-list w-full mt-4">
                  {items.map((item) => (
                    <SortableItem
                      key={item.id}
                      id={item.id}
                      content={item.content}
                      isCorrect={validationResults[item.id]}
                      showValidation={hasValidated}
                    />
                  ))}
                </div>
              </SortableContext>
              <DragOverlay>{activeId ? <DragOverlayItem content={activeItem.content} /> : null}</DragOverlay>
            </DndContext>
          )}
          {hasValidated && (
            <div className="mt-4 text-center">
              <Paragraph theme="light">
                <strong>
                  Tus respuestas correctas son: {Object.values(validationResults).filter(Boolean).length} de{" "}
                  {isMobile ? mobileOrderItems.length : items.length} ({correctPercentage}%)
                </strong>
              </Paragraph>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <Button
              bold={false}
              icon={faCheck}
              roundedFull={true}
              onClick={validateOrder}
              disabled={isMobile && Object.keys(selectedPositions).length !== mobileOrderItems.length}
            >
              Validar
            </Button>
            <Button bold={false} icon={faSync} roundedFull={true} onClick={handleReset}>
              Reiniciar
            </Button>
          </div>
        </div>
      </div>

      <ModalDialog open={isModalOpen} handleClose={() => setIsModalOpen(false)} title="Recordemos">
        <div className="flex justify-center">
          <img src={imgRecuerda || "/placeholder.svg"} alt="Imagen recuerda" className="image-boton w-32" />
        </div>
        <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
          En resumen, el control de pérdidas es un enfoque integral de gestión que busca proteger los recursos humanos,
          materiales, y financieros de una organización mediante la prevención y control de los riesgos laborales,
          garantizando así la continuidad operativa y la seguridad en el trabajo
        </Paragraph>
      </ModalDialog>
    </div>
  )
}

export default PasosProgramaControlPerdida

