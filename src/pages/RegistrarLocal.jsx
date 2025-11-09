import FilePicker from "../components/FilePicker";
import {
    Button,
    Card,
    Flex,
    Heading,
    Separator,
    Text,
    TextField,
    Select,
    Dialog
} from '@radix-ui/themes';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

export const RegistrarLocal = () => {
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
        <main className="min-h-screen bg-background-dark text-text">

            <section className="mx-auto max-w-5xl px-4 py-6 md:py-8">
                <Card size="3" className="border border-zinc-700/40">
                    <form onSubmit={handleSubmit} noValidate>
                        <Flex direction="column" gap="4">
                            <div>
                                <Text size="2" color="gray">
                                    Completa los datos del local a registrar para futuros registros de eventos.
                                    Los campos marcados con <span aria-hidden="true">*</span> son obligatorios.
                                </Text>
                            </div>
                            <Separator my="2" size="4" />
                            <div className="space-y-3">
                                <Heading size="3">Datos del local</Heading>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-1">
                                        <label htmlFor="nombre" className="text-sm font-medium">
                                            Nombre del local <span className="text-red-500">*</span>
                                        </label>
                                        <TextField.Root
                                            id="nombre"
                                            name="nombre"
                                            required
                                            aria-describedby="nombre-help"
                                            size="3">
                                        </TextField.Root>
                                        <Text id="nombre-help" size="1" color="gray">
                                            Ingesa el nombre del local a registrar.
                                        </Text>
                                    </div>
                                    <div className="space-y-1">
                                        <label htmlFor="direccion" className="text-sm font-medium">
                                            Dirección del local <span className="text-red-500">*</span>
                                        </label>
                                        <TextField.Root
                                            id="direccion"
                                            name="direccion"
                                            required
                                            aria-describedby="direccion-help"
                                            size="3">
                                        </TextField.Root>
                                        <Text id="direccion-help" size="1" color="gray">
                                            Ingesa la dirección del local.
                                        </Text>
                                    </div>
                                    <div className="w-full min-w-0 space-y-1">
                                        <label htmlFor="tipo_espacio" className="block text-sm font-medium">
                                            Tipo de espacio <span className="text-red-500">*</span>
                                        </label>
                                        <Select.Root name="doc_tipo" required>
                                            <Select.Trigger id="tipo_espacio" size="3" placeholder="Seleccione"  className="w-full" />
                                                <Select.Content position="popper" sideOffset={4} className="w-[var(--radix-select-trigger-width)]">
                                                    <Select.Item value="estadio">Estadio</Select.Item>
                                                    <Select.Item value="teatro">Teatro</Select.Item>
                                                    <Select.Item value="escenario">Escenario</Select.Item>
                                            </Select.Content>
                                        </Select.Root>
                                    </div>
                                    <div className="space-y-1">
                                        <label htmlFor="capacidad" className="text-sm font-medium">
                                            Capacidad total <span className="text-red-500">*</span>
                                        </label>
                                        <TextField.Root
                                            id="capacidad"
                                            name="capacidad"
                                            inputMode="numeric"
                                            pattern="[0-9]{1,12}"
                                            maxLength={12}
                                            required
                                            aria-describedby="capacidad-help"
                                            size="3">
                                        </TextField.Root>
                                        <Text id="capacidad-help" size="1" color="gray">
                                            Ingrese la capacidad máxima registrada en los documentos de seguridad.
                                        </Text>
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
                                    labelText="Adjuntar croquis y documentación de registro público."
                                    name="archivo"
                                    required
                                    accept=".zip,.rar"
                                    multiple={false}
                                    error={errors.archivo}
                                />
                            </div>
                            <Flex gap="3" justify="end" mt="3">
                                <Button type="button" variant="soft" color="gray">
                                    <Link to="/">Cancelar</Link>
                                </Button>
                                <Button type="submit" variant="solid">
                                    Enviar solicitud
                                </Button>
                            </Flex>
                        </Flex>
                    </form>
                </Card>
            </section>
            <Dialog.Root open={successOpen} onOpenChange={setSuccessOpen}>
                <Dialog.Content size="3" className="max-w-md" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                    <Dialog.Title>
                    </Dialog.Title>
                    <Flex direction="column" align="center" gap="3">
                        <CheckCircledIcon width={48} height={48} className="text-green-600" />
                        <Heading size="4">¡Registro enviado!</Heading>
                        <Text size="2" color="gray" align="center">
                            Hemos recibido tu solicitud de registro de local. Te enviaremos una confirmación por correo.
                        </Text>
                        <Flex gap="3" mt="3">
                            <Button onClick={() => navigate('/')} /* o a donde quieras */>
                                Ir al inicio
                            </Button>
                        </Flex>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </main>
    );
};
