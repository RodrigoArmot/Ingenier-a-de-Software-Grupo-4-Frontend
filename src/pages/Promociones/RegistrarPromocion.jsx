import { useState } from 'react';
import { Theme, Flex, Separator, Button, } from '@radix-ui/themes';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { SeleccionarPromocion } from './SeleccionarPromocion.jsx';
import { RellenarFormulario } from './RellenarFormulario.jsx';
import { ResumenPromocion } from './ResumenPromocion.jsx';
import { RegistroExitoso } from './RegistroExitoso.jsx';


export const RegistrarPromocion = () => {

  // Estado para los pasos
  const [currentStep, setCurrentStep] = useState(1);

  // Estados para los datos de la promoción
  const [bookingData, setBookingData] = useState({
    schedule: null,
    seats: [],
    email: '',
  });

  // Lógica de Navegación entre pasos
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((step) => step + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  };

  const handleReset = () => {
    setBookingData({ schedule: null, seats: [], email: '' });
    setCurrentStep(1);
  };

  // Actualización de datos
  const updateData = (key, value) => {
    setBookingData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Validación que sí se puede avanzar al siguiente paso
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return bookingData.schedule !== null; // Debe haber un horario
      case 2:
        return bookingData.seats.length > 0; // Debe haber al menos 1 asiento
      case 3:
        // Expresión regular simple para validar email
        return bookingData.email && /\S+@\S+\.\S+/.test(bookingData.email);
      default:
        return true;
    }
  };

  // Para ir atras en los pasos
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SeleccionarPromocion data={bookingData} updateData={updateData} />;
      case 2:
        return <RellenarFormulario data={bookingData} updateData={updateData} />;
      case 3:
        return <ResumenPromocion data={bookingData} updateData={updateData} />;
      case 4:
        return <RegistroExitoso data={bookingData} onReset={handleReset} />;
      default:
        return <SeleccionarPromocion data={bookingData} updateData={updateData} />;
    }
  };

  // Texto dinámico para el botón "Siguiente"
  const nextButtonText = currentStep === 3 ? 'Finalizar' : 'Siguiente';

  return (
    // Aplicamos el tema de Radix UI y los estilos globales
    <Theme appearance="dark">
      {/* <GlobalStyles /> ha sido eliminado */}

      {/* Tu <main> original, usando tus variables de color */}
      <main className="flex h-full min-h-screen w-full bg-background-dark text-text">
        {/* Layout inspirado en RegistrarProductor.jsx */}
        <section className="mx-auto max-w-3xl w-full px-4 py-6 md:py-12">
          {/* Contenedor del Stepper (con el fondo oscuro de tu ejemplo) */}
          <div className="rounded-2xl bg-slate-950/95 p-6 md:p-10 shadow-2xl">
            {/* Contenido del paso actual */}
            <div className="min-h-[300px]">{renderStep()}</div>

            {/* Mostramos la navegación solo si no estamos en la pantalla final */}
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
                      visibility: currentStep === 1 ? 'hidden' : 'visible',
                    }}
                  >
                    <ArrowLeft size={18} />
                    Atrás
                  </Button>

                  {/* Botón Siguiente */}
                  <Button
                    size="3"
                    className="bg-primary hover:bg-primary-600 text-white cursor-pointer"
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