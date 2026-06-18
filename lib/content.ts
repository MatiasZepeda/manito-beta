export interface Objective {
  id: string;
  text: string;
  tip?: string;
}

export interface Mission {
  id: string;
  number: number | string;
  title: string;
  description: string;
  objectives: Objective[];
  optional?: boolean;
  foundersNote?: string;
}

export const clienteMissions: Mission[] = [
  {
    id: "c1",
    number: 1,
    title: "Agrega tu primera propiedad",
    description:
      "Antes de pedir cualquier servicio, Manito necesita saber dónde se va a hacer el trabajo. Tu misión termina cuando tu propiedad quedó guardada y la puedes ver en tu perfil.",
    objectives: [
      {
        id: "c1-1",
        text: "Logra que tu propiedad quede registrada con su dirección y detalles",
        tip: "¿el autocompletado funcionó bien para tu dirección?",
      },
      {
        id: "c1-2",
        text: "Confirma que aparece guardada en tu perfil",
        tip: "¿fue fácil encontrar dónde se agregaba?",
      },
    ],
  },
  {
    id: "c2",
    number: 2,
    title: "Crea tu primera solicitud de servicio",
    description:
      "Imagínate que necesitas una limpieza en tu casa. Tu objetivo es entrar a la app y crear esa solicitud hasta que quede enviada. No te vamos a decir exactamente cómo — eso es lo que queremos observar.",
    objectives: [
      {
        id: "c2-1",
        text: "Logra que tu solicitud de limpieza quede enviada",
        tip: "¿fue obvio desde dónde se partía?",
      },
      {
        id: "c2-2",
        text: "Responde las preguntas del trabajo",
        tip: "¿alguna pregunta te confundió o no sabías qué responder?",
      },
      { id: "c2-3", text: "Si quieres, agrega una foto (es opcional)" },
      { id: "c2-4", text: "Confirma que quedó enviada" },
    ],
  },
  {
    id: "c3",
    number: 3,
    title: "Entérate de cómo va tu solicitud",
    description:
      "Ya enviaste tu solicitud. Ahora averigua en qué está: encuentra tu proyecto y revisa las cotizaciones que llegaron. Tu reto es entender qué te está ofreciendo cada profesional.",
    objectives: [
      { id: "c3-1", text: "Encuentra el proyecto que acabas de crear" },
      {
        id: "c3-2",
        text: "Revisa las cotizaciones recibidas y compáralas si hay más de una",
        tip: "¿entendiste qué incluía cada oferta y en qué se diferenciaban?",
      },
    ],
  },
  {
    id: "c4",
    number: 4,
    title: "Contrata a un profesional",
    description:
      "Elige la cotización que más te convenza y llega hasta tener la visita agendada con fecha y hora. No te decimos dónde — queremos ver si llegas solo.",
    objectives: [
      {
        id: "c4-1",
        text: "Acepta la cotización que prefieras",
        tip: "¿tuviste toda la información que necesitabas para decidir?",
      },
      {
        id: "c4-2",
        text: "Deja la visita agendada con fecha y hora confirmadas",
        tip: "¿quedó claro qué pasa después de confirmar?",
      },
    ],
  },
  {
    id: "c5",
    number: 5,
    title: "Coordina un detalle con tu profesional",
    description:
      "Necesitas avisarle algo antes de la visita — un dato del acceso, dónde estacionar, lo que sea. Logra que ese mensaje le llegue.",
    objectives: [
      {
        id: "c5-1",
        text: "Hazle llegar un mensaje al profesional de tu proyecto",
        tip: "¿preferirías esto o WhatsApp? ¿por qué?",
      },
    ],
  },
  {
    id: "c6",
    number: 6,
    title: "Cierra el trabajo",
    description:
      "Cuando el profesional marque el trabajo como terminado, te toca a ti. Tu misión termina cuando el proyecto quedó confirmado con calificación.",
    objectives: [
      {
        id: "c6-1",
        text: "Confirma que el trabajo quedó terminado",
        tip: "¿entendiste qué estabas confirmando exactamente?",
      },
      {
        id: "c6-2",
        text: "Deja una calificación y comentario al profesional",
        tip: "¿el formato de calificación te permitió decir lo que querías?",
      },
    ],
  },
  {
    id: "c7",
    number: 7,
    title: "Habla con Manny",
    description:
      "Manny es el asistente de Manito. Pruébalo como si tuvieras un problema real en tu casa — puede ser real o inventado.",
    objectives: [
      {
        id: "c7-1",
        text: "Cuéntale un problema de tu casa y sigue la conversación hasta donde llegue",
        tip: "¿te ayudó a llegar a una solución? ¿en algún punto se cortó?",
      },
    ],
  },
  {
    id: "cA",
    number: "A",
    title: "Guarda un profesional como favorito",
    description:
      "En Manito puedes guardar profesionales de confianza para contratarlos de nuevo fácilmente. Logra que un profesional quede en tu lista.",
    objectives: [
      {
        id: "cA-1",
        text: "Encuentra cómo guardar un profesional en favoritos",
      },
    ],
    optional: true,
  },
  {
    id: "cB",
    number: "B",
    title: "Deja las notificaciones a tu gusto",
    description:
      "La app te manda avisos sobre tus proyectos. Averigua qué notificaciones existen y deja activas solo las que te sirvan.",
    objectives: [
      {
        id: "cB-1",
        text: "Revisa qué notificaciones existen",
        tip: "¿quedó claro para qué sirve cada tipo de aviso?",
      },
      { id: "cB-2", text: "Ajusta cuáles quieres recibir" },
    ],
    optional: true,
  },
  {
    id: "cC",
    number: "C",
    title: "Cambia tu contraseña",
    description:
      "Función básica que igual hay que probar. Logra cambiarla sin que nadie te diga dónde está.",
    objectives: [
      {
        id: "cC-1",
        text: "Encuentra cómo cambiar tu contraseña",
        tip: "¿la encontraste a la primera o tuviste que buscar?",
      },
    ],
    optional: true,
  },
  {
    id: "cD",
    number: "D",
    title: "Revisa tu historial de trabajos",
    description:
      "Averigua dónde puedes ver todos tus proyectos, pasados y actuales.",
    objectives: [
      {
        id: "cD-1",
        text: "Encuentra la sección de historial",
        tip: "¿hay suficiente detalle sobre cada trabajo pasado?",
      },
    ],
    optional: true,
  },
  {
    id: "cE",
    number: "E",
    title: "Reporta un problema con un trabajo",
    description:
      "Imagina que algo del trabajo no quedó bien. Encuentra cómo reportar el problema e inicia el proceso.",
    objectives: [
      {
        id: "cE-1",
        text: "Entra a un proyecto y busca cómo reportar un problema",
      },
      {
        id: "cE-2",
        text: "Inicia el proceso",
        tip: "¿quedó claro qué va a pasar después de reportar?",
      },
    ],
    optional: true,
  },
];

export const profesionalMissions: Mission[] = [
  {
    id: "p1",
    number: 1,
    title: "Deja tu perfil listo para recibir clientes",
    description:
      "Regístrate como profesional y completa tu perfil hasta que un cliente que lo vea pueda entender quién eres, qué haces y cuánto cobras. Tú decides qué poner — queremos ver si el proceso se explica solo.",
    objectives: [
      {
        id: "p1-1",
        text: "Crea tu cuenta y llega hasta tener el perfil completo",
        tip: "¿hubo algún paso donde no sabías qué poner o para qué servía?",
      },
      {
        id: "p1-2",
        text: "Revisa tu perfil terminado",
        tip: "¿te representa bien como profesional?",
      },
    ],
  },
  {
    id: "p2",
    number: 2,
    title: "Define dónde y qué trabajas",
    description:
      "Esto determina qué solicitudes de clientes vas a ver. Tu misión termina cuando tu zona de trabajo y tus servicios reflejan tu pega real.",
    objectives: [
      {
        id: "p2-1",
        text: "Deja configurada tu zona (comunas o radio)",
        tip: "¿pudiste reflejar dónde trabajas de verdad?",
      },
      {
        id: "p2-2",
        text: "Deja seleccionados tus servicios",
        tip: "¿falta alguna categoría de trabajo que tú haces?",
      },
    ],
  },
  {
    id: "p3",
    number: 3,
    title: "Deja tu agenda como la usarías de verdad",
    description:
      "Configura tu disponibilidad semanal y prueba el calendario agregando algo tuyo (una visita, un trámite, lo que sea).",
    objectives: [
      {
        id: "p3-1",
        text: "Deja marcados los días y horarios en que trabajas",
        tip: "¿el sistema permite reflejar tu horario real?",
      },
      {
        id: "p3-2",
        text: "Agrega una tarea o visita propia al calendario",
        tip: "¿esto reemplazaría cómo organizas tu agenda hoy?",
      },
    ],
  },
  {
    id: "p4",
    number: 4,
    title: "Arma tu pricebook",
    description:
      "El pricebook es tu lista de tarifas estándar — te ahorra tiempo al cotizar. Tu misión termina cuando tienes al menos 3 servicios tuyos guardados con sus precios.",
    objectives: [
      {
        id: "p4-1",
        text: "Deja guardados al menos 3 servicios con precio",
        tip: "¿el formato se ajusta a cómo manejas tus precios hoy?",
      },
    ],
  },
  {
    id: "p5",
    number: 5,
    title: "Encuentra un trabajo que te interese",
    description:
      "Entra al feed de solicitudes y revísalo como lo harías de verdad: lee, filtra, descarta, y quédate con uno que cotizarías.",
    objectives: [
      {
        id: "p5-1",
        text: "Revisa varias solicitudes y elige una que te interese",
        tip: "¿las cards te dan suficiente información para decidir si entrar al detalle?",
      },
      {
        id: "p5-2",
        text: "Revisa el detalle completo de esa solicitud",
        tip: "¿la información del cliente alcanza para decidir si cotizas? ¿qué falta?",
      },
    ],
  },
  {
    id: "p6",
    number: 6,
    title: "Cotiza un trabajo",
    description:
      "Arma y envía una cotización como si fuera real: mano de obra, materiales, todo.",
    objectives: [
      {
        id: "p6-1",
        text: "Logra que tu cotización quede enviada al cliente",
        tip: "¿el formato se parece a cómo cotizas tú hoy? ¿le falta algo?",
      },
      {
        id: "p6-2",
        text: "Revisa el total antes de enviar",
        tip: "¿los cálculos cuadraron en tiempo real?",
      },
    ],
  },
  {
    id: "p7",
    number: 7,
    title: "Trabaja un proyecto de principio a fin 🤝",
    description:
      "La misión más completa. Un cliente aceptó tu cotización — ahora queremos ver el flujo entero: desde que empiezas hasta que cierras, con informe y rendición de materiales incluidos.",
    objectives: [
      { id: "p7-1", text: "Comienza el trabajo del proyecto asignado" },
      {
        id: "p7-2",
        text: "Deja registrado un informe del avance",
        tip: "¿pudiste subir fotos sin problema?",
      },
      {
        id: "p7-3",
        text: "Agrega una rendición de materiales con un recibo ficticio",
        tip: "¿el proceso con recibo tiene sentido para cómo trabajas?",
      },
      {
        id: "p7-4",
        text: "Cierra el tramo correspondiente",
        tip: "¿quedó claro que el cliente recibe un aviso al cerrarlo?",
      },
      { id: "p7-5", text: "Deja el proyecto completado y cerrado" },
    ],
  },
  {
    id: "p8",
    number: 8,
    title: "Reagenda una visita 🤝",
    description:
      "La vida pasa y los horarios cambian. Logra que una visita ya coordinada quede propuesta para otra fecha u hora.",
    objectives: [
      {
        id: "p8-1",
        text: "Propón el cambio y confirma que quedó pendiente de aceptación del cliente",
        tip: "¿fue fácil encontrar cómo hacerlo?",
      },
    ],
  },
  {
    id: "p9",
    number: 9,
    title: "Coordina con tu cliente por la app 🤝",
    description:
      "Toda la comunicación queda registrada dentro del proyecto. Logra que un mensaje tuyo le llegue al cliente.",
    objectives: [
      {
        id: "p9-1",
        text: "Hazle llegar un mensaje al cliente de tu proyecto",
        tip: "¿esto te sirve o preferirías WhatsApp? ¿por qué?",
      },
    ],
  },
  {
    id: "pA",
    number: "A",
    title: "Crea una orden de cambio",
    description:
      "A veces un trabajo crece. Documenta un ajuste con su costo adicional y hazlo llegar al cliente.",
    objectives: [
      {
        id: "pA-1",
        text: "Crea y envía una orden de cambio",
        tip: "¿el proceso fue claro? ¿cambiarías algo?",
      },
    ],
    optional: true,
  },
  {
    id: "pB",
    number: "B",
    title: "Crea tu empresa y agrega un trabajador",
    description:
      "Si tienes equipo, Manito te permite gestionarlo. Prueba el flujo con datos ficticios.",
    objectives: [
      {
        id: "pB-1",
        text: "Crea tu empresa y agrega un trabajador",
        tip: "¿se entiende el proceso de crear empresa y sumar gente?",
      },
    ],
    optional: true,
  },
  {
    id: "pC",
    number: "C",
    title: "Revisa tu análisis de desempeño",
    description:
      "Explora la sección de estadísticas. Si todavía no tienes trabajos cerrados va a estar vacía — igual cuéntanos qué te gustaría ver.",
    objectives: [
      {
        id: "pC-1",
        text: "Revisa la sección de estadísticas",
        tip: "¿qué te gustaría ver ahí para saber cómo te está yendo?",
      },
    ],
    optional: true,
    foundersNote:
      "Como profesional fundador, Martín va a coordinar una videollamada de WhatsApp contigo para acompañarte en el recorrido de todas las funciones. Eso es adicional a estas misiones. Te va a contactar en los próximos días.",
  },
];
