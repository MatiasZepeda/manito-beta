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
      "Antes de pedir cualquier servicio, Manito necesita saber dónde se va a hacer el trabajo. Tu misión es registrar la propiedad donde vives o donde necesitas el servicio.",
    objectives: [
      { id: "c1-1", text: "Abre la app y busca dónde agregar una propiedad" },
      {
        id: "c1-2",
        text: "Ingresa la dirección de tu propiedad",
        tip: "Prueba el autocompletado — ¿funciona bien para tu dirección?",
      },
      {
        id: "c1-3",
        text: "Completa el tipo de propiedad y los detalles que te pidan",
      },
      {
        id: "c1-4",
        text: "Confirma que quedó guardada y aparece en tu perfil",
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
        text: "Encuentra desde dónde se solicita un servicio",
        tip: "¿Fue obvio desde la pantalla de inicio?",
      },
      { id: "c2-2", text: 'Elige "limpieza" como tipo de servicio' },
      {
        id: "c2-3",
        text: "Rellena el formulario con las preguntas del trabajo",
        tip: "¿Alguna pregunta te confundió o no sabías qué responder?",
      },
      { id: "c2-4", text: "Sube una foto si quieres (es opcional)" },
      {
        id: "c2-5",
        text: "Revisa el resumen final antes de enviar",
        tip: "¿Quedó claro que al presionar siguiente se enviaba la solicitud?",
      },
      { id: "c2-6", text: "Envía la solicitud y confirma que quedó enviada" },
    ],
  },
  {
    id: "c3",
    number: 3,
    title: "Revisa tu proyecto y las cotizaciones",
    description:
      "Una vez enviada la solicitud, busca tu proyecto en la sección de proyectos y explora lo que llegó. Cada cotización muestra quién es el maestro, cuánto cobra y el tiempo estimado.",
    objectives: [
      { id: "c3-1", text: "Ve a la sección de proyectos de la app" },
      { id: "c3-2", text: "Encuentra el proyecto que acabas de crear" },
      {
        id: "c3-3",
        text: "Revisa el estado actual y las cotizaciones recibidas",
        tip: "¿Entendiste lo que te estaban ofreciendo?",
      },
      {
        id: "c3-4",
        text: "Si hay más de una cotización, compáralas",
        tip: "¿Fue fácil navegar desde la solicitud hasta ver las cotizaciones?",
      },
    ],
  },
  {
    id: "c4",
    number: 4,
    title: "Agrega a alguien como favorito",
    description:
      "En Manito puedes guardar maestros de confianza para contratarlos fácilmente de nuevo. Busca cómo hacerlo.",
    objectives: [
      { id: "c4-1", text: "Encuentra el perfil de un maestro dentro de la app" },
      { id: "c4-2", text: "Agrégalo a tus favoritos" },
      {
        id: "c4-3",
        text: "Confirma que aparece en tu lista de favoritos",
        tip: "¿Fue fácil encontrar la opción de favorito?",
      },
    ],
  },
  {
    id: "c5",
    number: 5,
    title: "Habla con Manny",
    description:
      "Manny es el asistente de Manito. Puede ayudarte a diagnosticar un problema o encontrar el tipo de servicio que necesitas. Pruébalo como si tuvieras un problema real en tu casa.",
    objectives: [
      { id: "c5-1", text: "Busca a Manny dentro de la app" },
      {
        id: "c5-2",
        text: "Cuéntale sobre algún problema en tu casa",
        tip: "Puede ser real o inventado — lo que importa es ver cómo responde",
      },
      {
        id: "c5-3",
        text: "Sigue el flujo que te sugiere hasta donde llegues",
      },
      {
        id: "c5-4",
        text: "¿Manny te ayudó a llegar a alguna solución o recomendación?",
        tip: "Cuéntanos en el feedback si la conversación fue útil o se cortó en algún punto",
      },
    ],
  },
  {
    id: "c6",
    number: 6,
    title: "Notificaciones y preferencias",
    description:
      "La app te manda avisos sobre el estado de tus proyectos y otros eventos. Explora qué tipos de notificaciones existen y ajusta lo que quieras.",
    objectives: [
      { id: "c6-1", text: "Busca la sección de notificaciones o preferencias" },
      { id: "c6-2", text: "Revisa qué notificaciones tienes activas" },
      {
        id: "c6-3",
        text: "Ajusta alguna preferencia",
        tip: "¿Quedó claro para qué sirve cada tipo de notificación?",
      },
    ],
  },
  {
    id: "c7",
    number: 7,
    title: "Cambia tu contraseña",
    description:
      "Función básica que igual hay que probar. Busca cómo cambiar tu contraseña sin que nadie te diga dónde está.",
    objectives: [
      { id: "c7-1", text: "Ve a la configuración de tu cuenta o perfil" },
      { id: "c7-2", text: "Busca la opción de cambiar contraseña" },
      {
        id: "c7-3",
        text: "Completa el proceso",
        tip: "¿Fue intuitivo encontrarlo o tuviste que buscar un rato?",
      },
    ],
  },
  {
    id: "cA",
    number: "A",
    title: "Inicia una disputa de cargo",
    description:
      "Si te asignamos esta misión opcional, queremos que pruebes el flujo de disputa para verificar que funciona y se entiende correctamente.",
    objectives: [
      { id: "cA-1", text: "Entra a un proyecto cerrado o completado" },
      { id: "cA-2", text: "Busca la opción para disputar un cargo" },
      {
        id: "cA-3",
        text: "Inicia el proceso (no tienes que completarlo)",
        tip: "Solo necesitamos saber si el flujo existe y se encuentra fácilmente",
      },
    ],
    optional: true,
  },
  {
    id: "cB",
    number: "B",
    title: "Revisa el historial de trabajos",
    description:
      "Busca dónde puedes ver todos los proyectos que has tenido, pasados y actuales.",
    objectives: [
      { id: "cB-1", text: "Encuentra la sección de historial de proyectos" },
      {
        id: "cB-2",
        text: "Revisa cómo está organizada la información",
        tip: "¿Hay suficiente detalle sobre cada trabajo pasado?",
      },
    ],
    optional: true,
  },
];

export const maestroMissions: Mission[] = [
  {
    id: "m1",
    number: 1,
    title: "Crea tu cuenta y configura tu perfil",
    description:
      "Regístrate como maestro y completa tu perfil desde cero. Son cuatro pasos que nos dan la información base para que los clientes puedan encontrarte.",
    objectives: [
      { id: "m1-1", text: "Descarga la app y regístrate como maestro" },
      {
        id: "m1-2",
        text: "Paso 1: completa tu información y descripción de negocio",
        tip: "¿Quedó claro qué poner en la descripción?",
      },
      {
        id: "m1-3",
        text: "Paso 2: selecciona los servicios que ofreces",
        tip: "¿Las categorías disponibles cubren bien lo que tú haces?",
      },
      {
        id: "m1-4",
        text: "Paso 3: define tus tarifas y radio de trabajo",
      },
      {
        id: "m1-5",
        text: "Paso 4: agrega los datos de tu negocio (dirección, RUT, cuenta bancaria)",
        tip: "¿Había algo que no entendías para qué servía?",
      },
      { id: "m1-6", text: "Verifica que tu perfil quedó guardado y completo" },
    ],
  },
  {
    id: "m2",
    number: 2,
    title: "Configura tu área de servicio y servicios",
    description:
      "Afina dónde y qué trabajas. Esto define qué solicitudes de clientes vas a ver en tu feed.",
    objectives: [
      { id: "m2-1", text: "Define en qué comunas o radio geográfico trabajas" },
      {
        id: "m2-2",
        text: "Confirma o ajusta los servicios que ofreces",
        tip: "¿Falta alguna categoría de trabajo que tú haces?",
      },
      {
        id: "m2-3",
        text: "Guarda los cambios y verifica que quedaron aplicados",
      },
    ],
  },
  {
    id: "m3",
    number: 3,
    title: "Ajusta tus preferencias de horario",
    description:
      "Configura en qué días y horas estás disponible para recibir trabajos. Manito necesita saber cuándo puedes operar.",
    objectives: [
      { id: "m3-1", text: "Busca la sección de horarios o disponibilidad" },
      {
        id: "m3-2",
        text: "Marca los días y rangos de hora en que trabajas",
        tip: "¿El sistema permite reflejar tu horario real de trabajo?",
      },
      { id: "m3-3", text: "Guarda la configuración" },
    ],
  },
  {
    id: "m4",
    number: 4,
    title: "Agrega entradas a tu pricebook",
    description:
      "El pricebook es tu lista de tarifas estándar. Te ahorra tiempo al cotizar porque puedes agregar ítems directamente desde ahí en vez de escribir desde cero.",
    objectives: [
      { id: "m4-1", text: "Busca la sección de pricebook o tarifas" },
      {
        id: "m4-2",
        text: "Agrega al menos 3 servicios con sus precios",
        tip: "¿El formato se ajusta a cómo manejas tus precios hoy en día?",
      },
      { id: "m4-3", text: "Verifica que quedaron guardados correctamente" },
    ],
  },
  {
    id: "m5",
    number: 5,
    title: "Explora los trabajos disponibles",
    description:
      "El feed es donde ves las solicitudes de clientes que encajan con tu perfil. Explora, filtra y toma decisiones como lo harías en la vida real.",
    objectives: [
      { id: "m5-1", text: "Entra al feed de trabajos disponibles" },
      {
        id: "m5-2",
        text: "Lee al menos 3 solicitudes de clientes con atención",
        tip: "¿Tienes suficiente información en cada card para decidir si vale la pena entrar al detalle?",
      },
      {
        id: "m5-3",
        text: "Usa los filtros: urgencia, distancia, cotizaciones existentes",
        tip: "¿Los filtros te son útiles para tu forma de trabajar?",
      },
      {
        id: "m5-4",
        text: "Elige una solicitud y revisa el detalle completo",
        tip: "¿La información que da el cliente es suficiente para decidir si cotizas?",
      },
    ],
  },
  {
    id: "m6",
    number: 6,
    title: "Arma una cotización",
    description:
      "El constructor de cotizaciones es una de las herramientas principales de Manito. Úsalo como si fuera una cotización real para un cliente.",
    objectives: [
      {
        id: "m6-1",
        text: "Entra al constructor de cotizaciones desde una solicitud",
      },
      {
        id: "m6-2",
        text: "Agrega ítems de mano de obra con sus precios",
      },
      {
        id: "m6-3",
        text: "Agrega materiales con cantidad, unidad y precio unitario",
        tip: "¿El total se calcula bien en tiempo real?",
      },
      {
        id: "m6-4",
        text: "Revisa la cotización completa antes de enviar",
        tip: "¿El formato se parece a cómo cotizas tú hoy? ¿Le falta algo?",
      },
      { id: "m6-5", text: "Envía la cotización al cliente" },
    ],
  },
  {
    id: "m7",
    number: 7,
    title: "Trabaja un proyecto de principio a fin",
    description:
      "La misión más completa. Queremos ver el flujo completo: desde que aceptas un trabajo hasta que lo cierras, con informe y rendición de materiales incluidos.",
    objectives: [
      { id: "m7-1", text: "Toma un proyecto asignado y comienza el trabajo" },
      {
        id: "m7-2",
        text: "Sube un informe del avance del trabajo",
        tip: "¿Fue fácil agregar el informe? ¿Puedes subir fotos?",
      },
      {
        id: "m7-3",
        text: "Agrega una rendición de materiales con un recibo ficticio",
        tip: "¿El proceso de agregar materiales con recibo tiene sentido para ti?",
      },
      {
        id: "m7-4",
        text: "Cierra el tramo de pago correspondiente",
        tip: "¿Quedó claro que al cerrar el tramo el cliente recibe el aviso?",
      },
      { id: "m7-5", text: "Completa y cierra el proyecto" },
    ],
  },
  {
    id: "m8",
    number: 8,
    title: "Crea una orden de cambio",
    description:
      "A veces un trabajo crece. Las órdenes de cambio sirven para documentar y cobrar esos ajustes con total transparencia hacia el cliente.",
    objectives: [
      {
        id: "m8-1",
        text: "Dentro de un proyecto activo, busca la opción de orden de cambio",
      },
      {
        id: "m8-2",
        text: "Describe el cambio y agrega el costo adicional",
      },
      {
        id: "m8-3",
        text: "Envíasela al cliente",
        tip: "¿El proceso fue claro? ¿Cambiarías algo de cómo funciona?",
      },
    ],
  },
  {
    id: "m9",
    number: 9,
    title: "Reagenda una visita",
    description:
      "La vida pasa y los horarios cambian. Prueba cómo funciona el proceso de reagendar un trabajo ya coordinado.",
    objectives: [
      {
        id: "m9-1",
        text: "Busca un trabajo o visita programada en tu calendario o proyectos",
      },
      { id: "m9-2", text: "Propone un cambio de fecha u hora" },
      {
        id: "m9-3",
        text: "Confirma que queda pendiente de aceptación por el cliente",
        tip: "¿Fue fácil encontrar la opción de reagendar?",
      },
    ],
  },
  {
    id: "m10",
    number: 10,
    title: "Escríbele al cliente desde la app",
    description:
      "Manito tiene mensajería interna para que toda la comunicación quede registrada dentro del proyecto. Prueba cómo funciona.",
    objectives: [
      { id: "m10-1", text: "Entra a un proyecto activo" },
      { id: "m10-2", text: "Manda un mensaje al cliente desde dentro de la app" },
      {
        id: "m10-3",
        text: "Verifica que el mensaje se envió correctamente",
        tip: "¿La mensajería dentro de la app te parece útil o preferirías usar WhatsApp?",
      },
    ],
  },
  {
    id: "m11",
    number: 11,
    title: "Anota algo en tu calendario",
    description:
      "Manito tiene un calendario para organizar tus visitas y tareas. Prueba si funciona para tu forma de trabajar.",
    objectives: [
      { id: "m11-1", text: "Busca la sección de calendario" },
      { id: "m11-2", text: "Agrega una visita o tarea con fecha y hora" },
      {
        id: "m11-3",
        text: "Verifica que aparece en el calendario",
        tip: "¿Esto reemplazaría cómo organizas tu agenda de trabajo hoy?",
      },
    ],
  },
  {
    id: "m12",
    number: 12,
    title: "Crea tu empresa y agrega un trabajador",
    description:
      "Si tienes un equipo o empresa, Manito te permite gestionarlo también. Prueba el flujo aunque sea con datos ficticios.",
    objectives: [
      { id: "m12-1", text: "Busca la sección de empresa o equipo en tu perfil" },
      { id: "m12-2", text: "Crea tu empresa con los datos básicos" },
      {
        id: "m12-3",
        text: "Agrega a un trabajador ficticio",
        tip: "¿El proceso para crear empresa y agregar trabajadores se entiende?",
      },
    ],
  },
  {
    id: "m13",
    number: 13,
    title: "Revisa tu análisis de desempeño",
    description:
      "La app tiene estadísticas sobre cómo te está yendo. Explora esa sección y cuéntanos si la información es útil.",
    objectives: [
      {
        id: "m13-1",
        text: "Busca la sección de estadísticas o análisis de desempeño",
      },
      {
        id: "m13-2",
        text: "Revisa las métricas disponibles: trabajos, calificación, ingresos",
        tip: "¿La información es útil para entender cómo te está yendo?",
      },
      {
        id: "m13-3",
        text: "¿Hay alguna métrica que te gustaría ver y no está?",
        tip: "Cuéntanoslo en el feedback — esto nos sirve mucho",
      },
    ],
    foundersNote:
      "Como maestro founder, Martín va a coordinar una llamada de WhatsApp contigo para hacer un recorrido personalizado de todas estas funciones. Eso es adicional a este testing — te va a contactar en los próximos días.",
  },
];
