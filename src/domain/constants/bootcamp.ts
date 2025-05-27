export const BOOTCAMP_INFO = {
  name: "BootCamp DevOps con AWS y Azure",
  startDate: "10 de mayo",
  schedule: "Sábados",
  instructor: {
    name: "Jose Liza",
    certifications: ["AWS", "Kubernetes", "Azure"],
    experience: "Arquitecto de Software con más de 10 años de experiencia en el diseño e implementación de soluciones cloud. Especialista en automatización de despliegues, seguridad de infraestructura y optimización de procesos DevOps. Ha liderado proyectos en múltiples industrias utilizando tecnologías como Kubernetes, Terraform y CI/CD con AWS y Azure."
  },
  modality: {
    type: "En vivo por Zoom",
    schedules: {
      peru: "7:00 PM - 10:00 PM",
      mexico: "6:00 PM - 9:00 PM",
      colombia: "7:00 PM - 10:00 PM",
      ecuador: "7:00 PM - 10:00 PM"
    }
  },
  pricing: {
    peru: {
      original: 700,
      discounted: 350,
      currency: "PEN"
    },
    latam: {
      original: 280,
      discounted: 140,
      currency: "USD"
    }
  },
  objective: "Aprender a implementar prácticas DevOps en la nube con AWS y Azure, optimizando procesos de desarrollo y operaciones. Dominar herramientas de integración continua, automatización, infraestructura como código y despliegue seguro en entornos cloud empresariales."
} as const;

export const LEARNING_TOPICS = [
  {
    icon: "FaJenkins",
    title: "Jenkins",
    description: "CI/CD y automatización"
  },
  {
    icon: "SiTerraform", 
    title: "Terraform",
    description: "Infrastructure as Code"
  },
  {
    icon: "FaDocker",
    title: "Docker",
    description: "Containerización"
  },
  {
    icon: "SiKubernetes",
    title: "Kubernetes",
    description: "Orquestación EKS y AKS"
  },
  {
    icon: "FaAws",
    title: "AWS",
    description: "Amazon Web Services"
  },
  {
    icon: "SiMicrosoftazure",
    title: "Azure",
    description: "Microsoft Azure Cloud"
  },
  {
    icon: "SiAnsible",
    title: "Ansible",
    description: "Gestión de configuración"
  },
  {
    icon: "SiPrometheus",
    title: "Prometheus",
    description: "Monitoreo y métricas"
  },
  {
    icon: "SiGrafana",
    title: "Grafana",
    description: "Visualización de datos"
  },
  {
    icon: "FaPython",
    title: "Python",
    description: "Scripting y automatización"
  }
] as const;

export const CURRICULUM = {
  modules: [
    {
      id: "introduccion",
      title: "Introducción",
      duration: "2 semanas",
      topics: [
        "DevOps, SRE y Cloud",
        "Uso de Git, GitHub, Linux básico, bash scripting",
        "Python básico: estructuras, ciclos, POO básica"
      ]
    },
    {
      id: "nube-aws-azure",
      title: "Nube en AWS y Azure",
      duration: "3 semanas", 
      topics: [
        "Fundamentos y modelos de nube",
        "Servicios: cómputo, networking, identidad, bases de datos, almacenamiento, seguridad",
        "AWS y Azure: máquinas virtuales, Kubernetes (EKS y AKS), redes, balanceadores, Application Gateway"
      ]
    },
    {
      id: "contenedores",
      title: "Contenedores",
      duration: "2 semanas",
      topics: [
        "Docker: imágenes, volúmenes, buenas prácticas"
      ]
    },
    {
      id: "orquestacion",
      title: "Orquestación de contenedores",
      duration: "4 semanas",
      topics: [
        "Kubernetes: Amazon EKS (básico a avanzado), autenticación, autorización",
        "ArgoCD, FluxCD, Helm Charts, prácticas para producción",
        "Azure Kubernetes Service (AKS): clústeres, seguridad, autenticación, Helm"
      ]
    },
    {
      id: "gestion-configuracion",
      title: "Gestión de configuración",
      duration: "2 semanas",
      topics: [
        "Ansible: diseño de playbooks, buenas prácticas, conceptos avanzados"
      ]
    },
    {
      id: "terraform",
      title: "Terraform",
      duration: "3 semanas",
      topics: [
        "Funciones, meta-argumentos, módulos, Terragrunt",
        "Terraform en Azure con ARM y Bicep"
      ]
    },
    {
      id: "cicd",
      title: "CI/CD",
      duration: "3 semanas",
      topics: [
        "Jenkins: pipelines, pruebas, manejo de artefactos, Spinnaker",
        "Gestión de repositorios y buenas prácticas"
      ]
    },
    {
      id: "devops-industria",
      title: "DevOps en la industria",
      duration: "2 semanas",
      topics: [
        "Diferencia entre perfiles DevOps",
        "Implementación de DevOps desde cero en empresas"
      ]
    },
    {
      id: "observabilidad",
      title: "Observabilidad",
      duration: "3 semanas",
      topics: [
        "Dynatrace: métricas, logs, trazas, RUM, monitoreo sintético",
        "Grafana, Prometheus"
      ]
    }
  ]
} as const;

export const PAYMENT_METHODS = [
  { name: "PayPal", logo: "/assets/images/paypal.png" },
  { name: "Yape", logo: "/assets/images/yape.png" },
  { name: "Plin", logo: "/assets/images/plin.png" },
  { name: "Interbank", logo: "/assets/images/interbank.png" },
  { name: "Scotiabank", logo: "/assets/images/scotiabank.png" },
  { name: "BCP", logo: "/assets/images/bcp.png" },
  { name: "BBVA", logo: "/assets/images/bbva.png" }
] as const;

export const PAYMENT_INFO = {
  peru: {
    yape_plin: {
      phone: "900 707 304",
      name: "Liz Floriza Crisostomo Meza"
    },
    bcp: {
      account: "31595256045023",
      cci: "00231519525604502302"
    },
    interbank: {
      account: "0433123700982",
      cci: "00304301312370098277"
    },
    scotiabank: {
      account: "0767372162",
      cci: "00925220076737216280"
    },
    bbva: {
      account: "0011-0157-0200438447",
      cci: "011-157-000200438447-51"
    }
  },
  latam: {
    email: "lcrisostomo.ingenieria@gmail.com",
    name: "Liz Floriza Crisostomo Meza",
    method: "Transferencia internacional"
  },
  contact: {
    phone: "+51 900 707 304",
    hashtag: "#LATAMEngineers",
    description: "Programas adicionales en: QA Automation, Programming, Product Management."
  }
} as const; 