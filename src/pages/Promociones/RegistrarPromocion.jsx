import { useState } from "react";
import { Theme, Flex, Separator } from "@radix-ui/themes";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Button from "../../components/ui/Button";

import { SeleccionarPromocion } from "./SeleccionarPromocion.jsx";
import { RellenarFormulario } from "./RellenarFormulario.jsx";
import { ResumenPromocion } from "./ResumenPromocion.jsx";
import { RegistroExitoso } from "./RegistroExitoso.jsx";

import Validation from "../../components/Promociones/PromocionValidation.js";

export const RegistrarPromocion = () => {
  // Estado para los pasos
  const [currentStep, setCurrentStep] = useState(1);

  const initialState = {
    tipoPromocion: null,
    nombrePromocion: "",
    descripcion: "",
    valorDescuento: "",
    fechaInicio: "",
    fechaFin: "",
    stockDisponible: "",
    condicionesCanal: "",
    condicionesSector: "",
  };

  // Estados para los datos de la promoción
  const [promocionData, setPromocionData] = useState(initialState);

  // Lógica de Navegación entre pasos
  const handleNext = () => {
    console.log("Datos actuales de la promoción:", promocionData);

    setErrors({});

    if (currentStep === 2) {
      const validationErrors = Validation(promocionData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep((step) => step + 1);
    }
  };

  // Para manejar los errores
  const [errors, setErrors] = useState({});

  const handleBack = () => {
    setErrors({});
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  };

  const handleReset = () => {
    setPromocionData(initialState);
    setErrors({});
    setCurrentStep(1);
  };

  // Actualización de datos
  const updateData = (key, value) => {
    setPromocionData((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  // Validación (sin cambios)
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return promocionData.tipoPromocion !== null;
      case 2:
        return true;
      case 3:
        return true;
      default:
        return true;
    }
  };

  // Texto dinámico para el botón "Siguiente"
  const nextButtonText =
    currentStep === 3 ? "Finalizar y Guardar" : "Siguiente";

  return (
    <Theme appearance="dark">
      <main className="flex h-full min-h-screen w-full bg-background-dark text-text">
        <section className="mx-auto max-w-3xl w-full px-4 py-6 md:py-12">
          <div className="rounded-2xl bg-slate-950/95 p-6 md:p-10 shadow-2xl">
            {/* Contenido de los pasos */}
            <div className="min-h-[300px]">
              <div style={{ display: currentStep === 1 ? "block" : "none" }}>
                <SeleccionarPromocion
                  data={promocionData}
                  updateData={updateData}
                />
              </div>
              <div style={{ display: currentStep === 2 ? "block" : "none" }}>
                <RellenarFormulario
                  data={promocionData}
                  updateData={updateData}
                  errors={errors}
                />
              </div>
              <div style={{ display: currentStep === 3 ? "block" : "none" }}>
                <ResumenPromocion
                  data={promocionData}
                  updateData={updateData}
                />
              </div>
              <div style={{ display: currentStep === 4 ? "block" : "none" }}>
                <RegistroExitoso data={promocionData} onReset={handleReset} />
              </div>
            </div>

            {currentStep < 4 && (
              <>
                <Separator my="5" size="4" />
                <Flex justify="between" align="center">
                  {/* Botón Atrás */}
                  <Button
                    variant="ghost"
                    size="3"
                    className="text-subtle hover:bg-white/10 cursor-pointer"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    style={{
                      visibility: currentStep === 1 ? "hidden" : "visible",
                    }}
                  >
                    <ArrowLeft size={18} />
                    Atrás
                  </Button>

                  {/* Botón Siguiente */}
                  <Button
                    size="3"
                    onClick={handleNext}
                    disabled={!isStepComplete()}
                  >
                    {nextButtonText}
                    <ArrowRight size={18} />
                  </Button>
                </Flex>
              </>
            )}
          </div>
        </section>
      </main>
    </Theme>
  );
};
