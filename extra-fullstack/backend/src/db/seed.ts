import { db } from "./database.js";

db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    modality TEXT NOT NULL CHECK(modality IN ('remote', 'onsite', 'hybrid')),
    level TEXT NOT NULL CHECK(level IN ('junior', 'mid', 'senior'))
  );

  CREATE TABLE IF NOT EXISTS job_technologies (
    job_id TEXT NOT NULL,
    technology TEXT NOT NULL,
    PRIMARY KEY (job_id, technology),
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS job_content (
    job_id TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    responsibilities TEXT NOT NULL,
    requirements TEXT NOT NULL,
    about TEXT NOT NULL,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
  );
`)

const insertJob = db.prepare(`
  INSERT OR IGNORE INTO jobs (id, title, company, location, description, modality, level)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

const insertTech = db.prepare(`
  INSERT OR IGNORE INTO job_technologies (job_id, technology) VALUES (?, ?)
`)

const insertContent = db.prepare(`
  INSERT OR IGNORE INTO job_content (job_id, description, responsibilities, requirements, about)
  VALUES (?, ?, ?, ?, ?)
`)

const seed = db.transaction(() => {
  // Job 1
  insertJob.run('1', 'Senior Frontend Developer', 'Tech Corp', 'Madrid, España', 'Buscamos un desarrollador frontend senior con experiencia en React y TypeScript.', 'hybrid', 'senior')
  insertTech.run('1', 'React')
  insertTech.run('1', 'TypeScript')
  insertTech.run('1', 'CSS')
  insertContent.run('1',
    'Buscamos un desarrollador frontend senior con experiencia en React y TypeScript para liderar el equipo de UI.',
    '- Liderar el desarrollo de componentes React\n- Revisar código del equipo\n- Optimizar rendimiento de la app\n- Colaborar con diseño UX',
    '- 5+ años con React\n- TypeScript avanzado\n- Experiencia con CSS/Tailwind\n- Conocimiento de testing con Jest',
    'Tech Corp es una empresa líder en soluciones web con más de 10 años en el mercado y presencia en toda Europa.')

  // Job 2
  insertJob.run('2', 'Full Stack Developer', 'StartupX', 'Remote', 'Únete a nuestro equipo como desarrollador full stack en una startup de rápido crecimiento.', 'remote', 'mid')
  insertTech.run('2', 'Node.js')
  insertTech.run('2', 'React')
  insertTech.run('2', 'PostgreSQL')
  insertContent.run('2',
    'Buscamos un full stack developer para trabajar en nuestra plataforma SaaS en crecimiento.',
    '- Desarrollar APIs REST con Node.js\n- Mantener y optimizar base de datos\n- Colaborar con el equipo frontend\n- Participar en decisiones de arquitectura',
    '- 3+ años de experiencia\n- Dominio de Node.js y React\n- Experiencia con PostgreSQL\n- Inglés nivel intermedio',
    'StartupX es una startup de tecnología en pleno crecimiento enfocada en soluciones B2B para el sector logístico.')

  // Job 3
  insertJob.run('3', 'Junior Backend Developer', 'FinTech Solutions', 'Barcelona, España', 'Gran oportunidad para desarrolladores junior con ganas de crecer en el sector fintech.', 'onsite', 'junior')
  insertTech.run('3', 'Node.js')
  insertTech.run('3', 'TypeScript')
  insertTech.run('3', 'MongoDB')
  insertContent.run('3',
    'Buscamos un desarrollador backend junior para unirse a nuestro equipo de ingeniería.',
    '- Desarrollar endpoints REST\n- Escribir tests unitarios\n- Documentar APIs\n- Participar en code reviews',
    '- 1+ año de experiencia\n- Conocimiento de Node.js\n- Ganas de aprender\n- Trabajo en equipo',
    'FinTech Solutions es una empresa fintech barcelonesa especializada en pagos digitales y procesamiento de transacciones.')

  // Job 4
  insertJob.run('4', 'DevOps Engineer', 'CloudBase', 'Remote', 'Buscamos un ingeniero DevOps para gestionar nuestra infraestructura en la nube.', 'remote', 'senior')
  insertTech.run('4', 'Docker')
  insertTech.run('4', 'Kubernetes')
  insertTech.run('4', 'AWS')
  insertContent.run('4',
    'Buscamos un DevOps Engineer senior para gestionar y escalar nuestra infraestructura cloud.',
    '- Gestionar infraestructura en AWS\n- Implementar pipelines CI/CD\n- Monitorear y optimizar servicios\n- Automatizar procesos con scripts',
    '- 4+ años en DevOps\n- Experiencia con Docker y Kubernetes\n- AWS certified (deseable)\n- Conocimiento de Terraform',
    'CloudBase ofrece soluciones de infraestructura como servicio para empresas medianas y grandes en Europa y Latinoamérica.')

  // Job 5
  insertJob.run('5', 'React Native Developer', 'MobileFirst', 'Valencia, España', 'Desarrolla aplicaciones móviles con React Native para millones de usuarios.', 'hybrid', 'mid')
  insertTech.run('5', 'React Native')
  insertTech.run('5', 'TypeScript')
  insertTech.run('5', 'Redux')
  insertContent.run('5',
    'Buscamos un desarrollador React Native para crear experiencias móviles excepcionales.',
    '- Desarrollar apps iOS y Android con React Native\n- Integrar APIs REST\n- Optimizar rendimiento móvil\n- Publicar actualizaciones en stores',
    '- 2+ años con React Native\n- TypeScript\n- Experiencia con Redux o Zustand\n- Conocimiento de UX móvil',
    'MobileFirst es una agencia especializada en desarrollo móvil con clientes en más de 15 países.')

  // Job 6
  insertJob.run('6', 'Data Engineer', 'DataFlow', 'Madrid, España', 'Construye pipelines de datos para procesar millones de eventos diarios.', 'hybrid', 'mid')
  insertTech.run('6', 'Python')
  insertTech.run('6', 'SQL')
  insertTech.run('6', 'Spark')
  insertContent.run('6',
    'Buscamos un Data Engineer para construir y mantener nuestra infraestructura de datos.',
    '- Diseñar y mantener pipelines ETL\n- Optimizar consultas SQL\n- Colaborar con el equipo de Data Science\n- Documentar procesos de datos',
    '- 3+ años en Data Engineering\n- Python avanzado\n- Experiencia con Spark o Airflow\n- SQL avanzado',
    'DataFlow es una empresa especializada en análisis de datos en tiempo real para el sector retail y e-commerce.')

  // Job 7
  insertJob.run('7', 'QA Engineer', 'QualityTech', 'Remote', 'Asegura la calidad de nuestros productos con testing automatizado.', 'remote', 'junior')
  insertTech.run('7', 'Cypress')
  insertTech.run('7', 'Jest')
  insertTech.run('7', 'JavaScript')
  insertContent.run('7',
    'Buscamos un QA Engineer para garantizar la calidad de nuestra plataforma web.',
    '- Escribir y mantener tests E2E con Cypress\n- Crear tests unitarios con Jest\n- Reportar y dar seguimiento a bugs\n- Colaborar con developers en la resolución de issues',
    '- 1+ año en QA\n- Experiencia con Cypress o Playwright\n- JavaScript básico\n- Atención al detalle',
    'QualityTech es una consultora de software que ayuda a startups y empresas a mejorar la calidad de sus productos digitales.')
})

seed()

console.log('Base de datos inicializada con', 7, 'jobs')