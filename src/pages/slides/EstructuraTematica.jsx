import momento1 from "../../assets/img/momentos/moment-1.webp";
import momento2 from "../../assets/img/momentos/moment-2.webp";
import momento3 from "../../assets/img/momentos/moment-3.webp";
import Paragraph from "../../pages/components/Paragraph";
import Title from "../../pages/components/Title";
import Instruction from "../../pages/components/Instruction";
import "../slides/styles/EstructuraTematica.css";

import { useEffect } from "react";
import useStore from "../../store";

function EstructuraTematica() {
  // const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  // useEffect(() => {
  //   setIsOnDivisor(false);
  // }, []);
  return (
    <div className="px-4 w-full h-auto md:h-screen flex items-center justify-center mb-36 md:mb-0 bg-main-color">
      <div className="container current pt-3">
        <div className="col-lg-12 col-md-12 flex flex-col justify-center items-center">
          <div className="my-2 text-center">
            <Title>
              Estructura{" "}
              <span className="text-subtitle-color-qa">temática</span>
            </Title>
          </div>
          <div>
            <Paragraph theme="dark" justify="center">
              En este curso encontrarás estos{" "}
              <span className="text-subtitle-color-qa">tres (3) Momentos </span>
              clave de acercamiento <br />a la cultura de nuestra organización. Continúa
              adelante para irlos revisando en el mismo orden
            </Paragraph>
          </div>
          <div className="w-auto flex justify-center items-center">
            <div className="instruction-web">
              <Instruction arrow="down" theme="dark">
                Pasa el mouse por cada sección para descubrir su contenido
              </Instruction>
            </div>
            <div className="instruction-mobile">
              <Instruction arrow="down" theme="dark">
                Desliza hacia abajo para ver el contenido de cada sección.
              </Instruction>
            </div>
          </div>
          <section className="section-tours my-3">
            <div className="container bgazul-doble-lateral p-0">
              <div className="row">
                <div className="col-lg-12 col-md-12 grid justify-center p-0 bg-main-color">
                  <div className="card-container_momentos">
                    <div className="card_momentos">
                      <img src={momento1} alt="Imagen 1" />
                      <div className="info_momentos">
                        <h3>1 - Identificación de Peligros</h3>
                        <hr />
                        <p>
                          Abordaremos la identificación de los tipos de
                          peligros en la operación, así como los métodos para
                          identificarlos fácilmente.
                        </p>
                      </div>
                    </div>
                    <div className="card_momentos">
                      <img src={momento2} alt="Imagen 2" />
                      <div className="info_momentos">
                        <h3>2 - Valoración de Riesgos</h3>
                        <hr />
                        <p>
                          Recordaremos las definiciones de Peligro y Riesgo, y
                          los diferentes métodos para realizar la valoración
                          de los riesgos.
                        </p>
                      </div>
                    </div>
                    <div className="card_momentos">
                      <img src={momento3} alt="Imagen 3" />
                      <div className="info_momentos">
                        <h3>3 - Establecimiento de Controles</h3>
                        <hr />
                        <p>
                          Podrás ayudar al equipo de Seguridad y Salud de tu
                          empresa a establecer controles para mitigar los
                          riesgos presentes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default EstructuraTematica;
