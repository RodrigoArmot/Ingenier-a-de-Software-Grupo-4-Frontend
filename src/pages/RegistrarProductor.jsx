import HeaderRegistroProductor from "../components/HeaderRegistroProductor";
import FilePicker from "../components/FilePicker";
import {
  Flex,
  Heading,
  Separator,
  Text,
  TextField,
  Select,
  Dialog,
} from "@radix-ui/themes";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";

export const RegistrarProductor = () => {
  const navigate = useNavigate();
  const [errors] = useState({});
  const [successOpen, setSuccessOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if (typeof form.checkValidity === "function" && !form.checkValidity()) {
      form.reportValidity?.();
      return;
    }

    const data = Object.fromEntries(fd.entries());
    console.log("payload", data);
    setSuccessOpen(true);
  }

  return (
    <main className="h-full bg-background-dark text-text">
      <HeaderRegistroProductor />
      <section className="mx-auto max-w-5xl px-4 py-6 md:py-8">
        <div className="rounded-2xl bg-slate-950/95 p-10 md:p-12 ring-1 shadow-2xl mb-5">
          <form onSubmit={handleSubmit} noValidate>
            <Flex direction="column" gap="4">
              <div>
                <Text size="3" color="var(--color-text)">
                  Completa los datos del productor y del representante legal.
                  Los campos marcados con <span aria-hidden="true">*</span> son
                  obligatorios.
                </Text>
              </div>
              <Separator my="2" size="4" />
              <div className="space-y-3">
                <Heading size="3">Datos del productor</Heading>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="razon" className="text-sm font-medium">
                      Razón social <span className="text-red-500">*</span>
                    </label>
                    <TextField.Root
                      id="razon"
                      name="razon"
                      required
                      aria-describedby="razon-help"
                      size="3"
                    ></TextField.Root>
                    <Text id="razon-help" size="1" color="var(--color-text)">
                      Usa la denominación registrada en SUNARP/SUNAT.
                    </Text>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="ruc" className="text-sm font-medium">
                      Número de RUC <span className="text-red-500">*</span>
                    </label>
                    <TextField.Root
                      id="ruc"
                      name="ruc"
                      inputMode="numeric"
                      pattern="[0-9]{11}"
                      maxLength={11}
                      placeholder="11 dígitos"
                      required
                      aria-describedby="ruc-help"
                      size="3"
                    ></TextField.Root>
                    <Text id="ruc-help" size="1" color="var(--color-text)">
                      Debe tener 11 dígitos.
                    </Text>
                  </div>
                </div>
              </div>
              <Separator my="2" size="4" />
              <div className="space-y-3">
                <Heading size="3">Representante legal</Heading>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="rep_nombre" className="text-sm font-medium">
                      Nombres <span className="text-red-500">*</span>
                    </label>
                    <TextField.Root
                      id="rep_nombre"
                      name="rep_nombre"
                      placeholder="Nombres del representante"
                      required
                      size="3"
                    ></TextField.Root>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="rep_apellidos"
                      className="text-sm font-medium"
                    >
                      Apellidos <span className="text-red-500">*</span>
                    </label>
                    <TextField.Root
                      id="rep_apellidos"
                      name="rep_apellidos"
                      placeholder="Apellidos del representante"
                      required
                      size="3"
                    ></TextField.Root>
                  </div>
                  <div className="w-full min-w-0 space-y-1">
                    <label
                      htmlFor="doc_tipo"
                      className="block text-sm font-medium"
                    >
                      Tipo de documento <span className="text-red-500">*</span>
                    </label>
                    <Select.Root name="doc_tipo" required>
                      <Select.Trigger
                        id="doc_tipo"
                        size="3"
                        placeholder="Seleccione"
                        className="w-full"
                      />
                      <Select.Content
                        position="popper"
                        sideOffset={4}
                        className="w-(--radix-select-trigger-width)"
                      >
                        <Select.Item value="dni">DNI</Select.Item>
                        <Select.Item value="ce">
                          Carné de extranjería
                        </Select.Item>
                        <Select.Item value="pasaporte">Pasaporte</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="doc_numero" className="text-sm font-medium">
                      Número de documento{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <TextField.Root
                      id="doc_numero"
                      name="doc_numero"
                      placeholder="Ej. 123456789"
                      inputMode="numeric"
                      pattern="[0-9]{12}"
                      maxLength={12}
                      required
                      size="3"
                    ></TextField.Root>
                  </div>
                </div>
              </div>
              <Separator my="2" size="4" />
              <div className="space-y-3">
                <Heading size="3">Datos de contacto</Heading>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <TextField.Root
                      id="email"
                      name="email"
                      type="email"
                      placeholder="correo@empresa.com"
                      required
                      size="3"
                    ></TextField.Root>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <TextField.Root
                      id="telefono"
                      name="telefono"
                      placeholder="Ej. 999 999 999"
                      inputMode="numeric"
                      pattern="[0-9]{6,}"
                      maxLength={12}
                      required
                      size="3"
                    ></TextField.Root>
                  </div>
                </div>
              </div>
              <Separator my="2" size="4" />
              <div className="space-y-2">
                <Heading size="3">Documentación</Heading>
                <Text size="2" color="gray">
                  Solo se acepta un único archivo en formato .zip o .rar.
                </Text>
                <FilePicker
                  labelText="Adjuntar documentación de registro público"
                  name="archivo"
                  required
                  accept=".zip,.rar"
                  multiple={false}
                  error={errors.archivo}
                />
              </div>
              <Flex gap="3" justify="end" mt="3">
                <Button variant="gray">
                  <Link to="/">Cancelar</Link>
                </Button>
                <Button type="submit" >
                  Enviar solicitud
                </Button>
              </Flex>
            </Flex>
          </form>
        </div>
      </section>
      <Dialog.Root open={successOpen} onOpenChange={setSuccessOpen}>
        <Dialog.Content
          size="3"
          className="max-w-md"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <Dialog.Title></Dialog.Title>
          <Flex direction="column" align="center" gap="3">
            <CheckCircledIcon
              width={48}
              height={48}
              className="text-green-600"
            />
            <Heading size="4">¡Registro enviado!</Heading>
            <Text size="2" color="gray" align="center">
              Hemos recibido tu solicitud de registro de productor. Te
              enviaremos una confirmación por correo.
            </Text>
            <Flex gap="3" mt="3">
              <Button onClick={() => navigate("/")} /* o a donde quieras */>
                Ir al inicio
              </Button>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </main>
  );
};
