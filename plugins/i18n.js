import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(async ({ vueApp }) => {
  // Cargar los archivos de localización de forma dinámica
  const enData = {
    "personalInfo": {
      "name": "Ricardo Morales",
      "title": "Software Engineer",
      "picture":"https://avatars.githubusercontent.com/u/5186093",
      "links": [
        {
          "name": "LinkedIn",
          "url": "https://www.linkedin.com/in/drupalio",
          "icon": ["fab", "linkedin"]
        },
        {
          "name": "Website",
          "url": "https://www.drupalio.com",
          "icon": ["fas", "globe"]
        }
      ]
    },
    "summary": {
      "title": "About me",
      "summaryText": "Experienced system developer with a strong ability to navigate diverse tech stacks, prioritize clean and efficient coding, and embrace innovation. Committed, creative, and driven by continuous learning. Excel in fostering collaboration and delivering high-quality results. Passionate about both technology and gastronomy, strive to leverage my skills to create meaningful impacts across industries and communities."
    },
    "workExperienceSection": {
      "title": "Work Experience"
    },
    "workExperience": [
      {
        "title": "Java Senior Developer",
        "company": "Multiplica Talent",
        "period": "Apr 2024 - Present",
        "icon": ["fas", "briefcase"],
        "projects": [
          {
            "name": "Hive & Colony",
            "description": "Integrated and implemented Zoho One and Shopify for streamlined business operations",
            "technologies": ["Java", "Zoho One", "Shopify"]
          },
          {
            "name": "Banorte",
            "description": "Developed templates and modules for Banorte's new public portal using MagnoliaCMS",
            "technologies": ["Java", "MagnoliaCMS", "HTML", "CSS", "JavaScript"]
          },
          {
            "name": "Qualitas",
            "description": "Developed and integrated a CRM core using SQL/PLus stored procedures, functions and a Java backend",
            "technologies": ["Java", "SQL/PLus", "Oracle", "CRM"]
          },
          {
            "name": "GEPP",
            "description": "Backend analysis and development using data mining and procedures for promotion management on a custom CRM",
            "technologies": ["Java", "Data Mining", "SQL", "CRM", "Stored Procedures"]
          },
          {
            "name": "PlanSeguro",
            "description": "Restructuring of look and feel for the insurance company, updating UI components and Angular versions",
            "technologies": ["Angular", "TypeScript", "UI/UX", "CSS", "HTML"]
          }
        ]
      },  {
      "title": "Java Microservices Developer",
      "company": "Globant",
      "period": "May 2019 - Feb 2024",
      "icon": ["fas", "microchip"],
      "projects": [
        {
          "name": "QuizzerA",
          "description": "Customized GPT for key projects and developed an interview follow-up system to enhance feedback and efficiency",
          "technologies": ["Java", "Spring Boot", "GPT", "AI"]
        },
        {
          "name": "Banco Nacional del Peru",
          "description": "Modernized online banking with microservices using the YAPE framework",
          "technologies": ["Java", "Microservices", "YAPE Framework"]
        },
        {
          "name": "Round Feather",
          "description": "Built and maintained financial microservices with Quarkus and Kubernetes on Google Cloud, automating deployments with GitHub Actions",
          "technologies": ["Java", "Quarkus", "Kubernetes", "Google Cloud", "GitHub Actions"]
        },
        {
          "name": "Santander",
          "description": "Led the transition of its banking platform to microservices architecture with Spring Boot",
          "technologies": ["Java", "Spring Boot", "Microservices"]
        },
        {
          "name": "Expedia (Despegar & Hotels.com)",
          "description": "Ensured seamless integration and optimized microservices performance",
          "technologies": ["Java", "Microservices", "Performance Optimization"]
        },
        {
          "name": "AEPE Energy",
          "description": "Optimized CI/CD processes, maintenance and scalable architecture",
          "technologies": ["Java", "CI/CD", "DevOps"]
        },
        {
          "name": "Commodity Finance",
          "description": "Maintained microservices and web platforms",
          "technologies": ["Java", "Microservices", "Web Development"]
        },
        {
          "name": "MyGrowth",
          "description": "Implemented strategic microservices to improve assessments and user experience",
          "technologies": ["Java", "Microservices", "UX"]
        },
        {
          "name": "Disney",
          "description": "Co-developed batch processing infrastructure for invoicing and cinema payments",
          "technologies": ["Java", "Batch Processing", "Payment Systems"]
        },
        {
          "name": "HSBC",
          "description": "Expanded microservices and modernized its digital banking platform",
          "technologies": ["Java", "Microservices", "Digital Banking"]
        }
      ]
    },
    {
      "title": "Java Ssr Developer",
      "company": "GFT Technologies",
      "period": "Mar 2017 - Apr 2019",
      "icon": ["fas", "briefcase"],
      "projects": [
        {
          "name": "Glomo",
          "description": "Migrated BBVA Bancomer's banking platform from a monolithic to a microservices architecture using CXF Spring Framework and BBVA's SDLO, applying SOLID principles and continuous integration",
          "technologies": ["Java", "CXF Spring Framework", "BBVA SDLO", "Microservices", "CI/CD"]
        },
        {
          "name": "Claims",
          "description": "Provided first-level support for BBVA's claims system and developed core APIs for the claims engine/core system",
          "technologies": ["Java", "API Development", "Support"]
        }
      ]
    },
    {
      "title": "Java Specialist",
      "company": "Telcel Radio Dipsa",
      "period": "Jun 2015 - Mar 2017",
      "icon": ["fas", "mobile-alt"],
      "projects": [
        {
          "name": "Telcel Blue Circle",
          "description": "Rebuilt the reactive campaigns engine and Telcel Blue Circle rewards system ",
          "technologies": ["Java", "Reactive Programming", "Rewards System"]
        }
      ]
    },
    {
      "title": "Java Developer",
      "company": "Grupo Salinas Dinero Expres",
      "period": "Apr 2015 - Jul 2015",
      "icon": ["fas", "money-bill-wave"],
      "projects": [
        {
          "name": "Money Transfer System",
          "description": "Migrated Money Transfer WebServices (SOA) from Oracle Application Server to JBoss EAP",
          "technologies": ["Java", "SOA", "Oracle Application Server", "JBoss EAP"]
        }
      ]
    },
    {
      "title": "Java Developer Jr",
      "company": "MXD Solutions",
      "period": "Jun 2014 - Apr 2015",
      "icon": ["fas", "code"],
      "projects": [
        {
          "name": "Money Transfer System",
          "description": "Migrated Money Transfer WebServices (SOA) from Oracle Application Server to JBoss EAP",
          "technologies": ["Java", "SOA", "Oracle Application Server", "JBoss EAP"]
        }
      ]
    },
    {
      "title": "Web Developer",
      "company": "Remodelaciones Industriales",
      "period": "Jan 2013 - Aug 2013",
      "icon": ["fas", "laptop-code"],
      "projects": [
        {
          "name": "Client Management System",
          "description": "Developed, maintained and supported the CMS for client management",
          "technologies": ["PHP", "MySQL", "HTML", "CSS", "JavaScript"]
        }
      ]
    }
    ],
    "education": {
      "formalEducation": [
        {
          "degree": "Bachelor of Computer System Engineering",
          "institution": "Tecnologico de estudios superiores de Ecatepec",
          "period": "Aug 2015 - Aug 2018"
        },
        {
          "degree": "Computer Technician",
          "institution": "Centro de Estudios tecnologicos y de servicios numero 55",
          "period": "Jun 2005 - Aug 2008"
        }
      ],
      "certifications": [
        {
          "title": "Oracle Certified Associate Java",
          "platform": "Oracle",
          "issue_date": "Feb 2015",
          "credential_id": "237614080OCAJSE7",
          "icon": ["fab", "java"]
        },
        {
          "title": "Scrum Fundamentals Certified",
          "platform": "VMEdu Inc.",
          "issue_date": "Apr 2018",
          "credential_id": "623619",
          "icon": ["fas", "users-cog"]
        }
      ],
      "courses": [
        {
          "title": "Lambda Expressions and Streams in Java",
          "platform": "Udemy",
          "completion_date": "Dec 2023",
          "icon": ["fas", "book"]
        },
        {
          "title": "Communication Skills: Improve Your Communication",
          "platform": "Udemy",
          "completion_date": "Nov 2022",
          "icon": ["fas", "book"]
        },
        {
          "title": "Leadership: Practical Leadership Skills",
          "platform": "Udemy",
          "completion_date": "Oct 2022",
          "icon": ["fas", "book"]
        }
      ]
    },
    "certifications": [
      {
        "title": "Oracle Certified Associate Java",
        "platform": "Oracle",
        "issue_date": "Feb 2015",
        "credential_id": "237614080OCAJSE7",
        "icon": ["fab", "java"]
      },
      {
        "title": "Scrum Fundamentals Certified",
        "platform": "VMEdu Inc.",
        "issue_date": "Apr 2018",
        "credential_id": "623619",
        "icon": ["fas", "users-cog"]
      }
    ],
    "courses": [
      {
        "title": "Lambda Expressions and Streams in Java",
        "platform": "Udemy",
        "completion_date": "Dec 2023",
        "icon": ["fas", "book"]
      },
      {
        "title": "Communication Skills: Improve Your Communication",
        "platform": "Udemy",
        "completion_date": "Nov 2022",
        "icon": ["fas", "book"]
      },
      {
        "title": "Leadership: Practical Leadership Skills",
        "platform": "Udemy",
        "completion_date": "Oct 2022",
        "icon": ["fas", "book"]
      }
    ],
    "skills": {
      "categories": {
        "programming": "Programming Languages",
        "devFrameworks": "Development Frameworks",
        "testFrameworks": "Testing Frameworks",
        "databases": "Databases",
        "cloud": "Cloud Providers",
        "servers": "Servers & Containers",
        "monitoringTools": "Monitoring Tools",
        "architectureAndMethodologies": "Architecture & Methodologies",
        "projectManagement": "Project Management",
        "aiAndLLMs": "AI & LLMs",
        "versionControl": "Version Control",
        "buildTools": "Build Tools",
        "developmentTools": "Development Tools"
      },
      "programmingLanguages": [
        { "name": "Java (17 and above)", "level": "Very Experienced", "icon": ["fab", "java"] },
        { "name": "Kotlin", "level": "Experienced", "icon": ["fab", "android"] },
        { "name": "PHP", "level": "Experienced", "icon": ["fab", "php"] },
        { "name": "Python", "level": "Experienced", "icon": ["fab", "python"] },
        { "name": "JavaScript", "level": "Experienced", "icon": ["fab", "js"] },
        { "name": "TypeScript", "level": "Experienced", "icon": ["fab", "js-square"] },
        { "name": "Ruby", "level": "Skilled", "icon": ["fas", "gem"] },
        { "name": "Rust", "level": "Skilled", "icon": ["fas", "cog"] },
        { "name": "GoLang", "level": "Skilled", "icon": ["fas", "code"] },
        { "name": "C#", "level": "Skilled", "icon": ["fab", "microsoft"] },
        { "name": "C++", "level": "Skilled", "icon": ["fas", "code"] },
        { "name": "Ziglang", "level": "Skilled", "icon": ["fas", "bolt"] },
        { "name": "Swift", "level": "Skilled", "icon": ["fab", "apple"] }
      ],
      "frameworks": [
        { "name": "Spring Framework", "level": "Very Experienced", "icon": ["fas", "leaf"] },
        { "name": "Swagger", "level": "Experienced", "icon": ["fas", "file-code"] },
        { "name": "Junit", "level": "Experienced", "icon": ["fas", "vial"] },
        { "name": "Mockito", "level": "Experienced", "icon": ["fas", "vials"] }
      ],
      "cloudProviders": [
        { "name": "AWS", "level": "Experienced", "icon": ["fab", "aws"] },
        { "name": "Google Cloud Platform", "level": "Skilled", "icon": ["fab", "google"] },
        { "name": "Azure", "level": "Skilled", "icon": ["fab", "microsoft"] }
      ],
      "serversAndContainers": [
        { "name": "Tomcat", "level": "Experienced", "icon": ["fas", "server"] },
        { "name": "Glassfish", "level": "Experienced", "icon": ["fas", "fish"] },
        { "name": "IBM WebSphere", "level": "Skilled", "icon": ["fas", "globe"] },
        { "name": "OpenLiberty", "level": "Skilled", "icon": ["fas", "flag"] },
        { "name": "Apache", "level": "Experienced", "icon": ["fas", "feather"] },
        { "name": "Payara", "level": "Skilled", "icon": ["fas", "fish"] },
        { "name": "Jboss", "level": "Experienced", "icon": ["fas", "fire"] },
        { "name": "Openshift", "level": "Skilled", "icon": ["fas", "ship"] },
        { "name": "DOCKER", "level": "Experienced", "icon": ["fab", "docker"] },
        { "name": "Kubernetes", "level": "Experienced", "icon": ["fas", "dharmachakra"] }
      ],
      "developmentFrameworks": [
        { "name": "Spring Framework", "level": "Very Experienced", "icon": ["fas", "leaf"] },
        { "name": "Quarkus", "level": "Experienced", "icon": ["fas", "bolt"] },
        { "name": "Helidon", "level": "Skilled", "icon": ["fas", "sun"] },
        { "name": "Hibernate", "level": "Experienced", "icon": ["fas", "database"] },
        { "name": "EJB", "level": "Skilled", "icon": ["fas", "cubes"] },
        { "name": "Apache Camel", "level": "Skilled", "icon": ["fas", "exchange-alt"] },
        { "name": "Bootstrap", "level": "Skilled", "icon": ["fab", "bootstrap"] },
        { "name": "Apache Kafka", "level": "Experienced", "icon": ["fas", "stream"] },
        { "name": "RabbitMQ", "level": "Skilled", "icon": ["fas", "envelope"] },
        { "name": "CodeIgniter", "level": "Skilled", "icon": ["fas", "fire"] },
        { "name": "Vue.js", "level": "Skilled", "icon": ["fab", "vuejs"] },
        { "name": "Django", "level": "Skilled", "icon": ["fab", "python"] },
        { "name": "Express.js", "level": "Skilled", "icon": ["fab", "node-js"] },
        { "name": "Wordpress", "level": "Skilled", "icon": ["fab", "wordpress"] },
        { "name": "Drupal", "level": "Skilled", "icon": ["fab", "drupal"] },
        { "name": "Foundation", "level": "Skilled", "icon": ["fas", "layer-group"] },
        { "name": "Angular", "level": "Skilled", "icon": ["fab", "angular"] },
        { "name": "jQuery", "level": "Skilled", "icon": ["fab", "js"] },
        { "name": "Knockout", "level": "Skilled", "icon": ["fas", "box-open"] },
        { "name": "Cordova", "level": "Skilled", "icon": ["fab", "android"] },
        { "name": "Primefaces", "level": "Skilled", "icon": ["fas", "window-maximize"] },
        { "name": "Flask", "level": "Skilled", "icon": ["fas", "flask"] },
        { "name": "Gatsby", "level": "Skilled", "icon": ["fab", "react"] },
        { "name": "Laravel", "level": "Skilled", "icon": ["fab", "laravel"] },
        { "name": "React", "level": "Skilled", "icon": ["fab", "react"] },
        { "name": "Next.js", "level": "Skilled", "icon": ["fab", "react"] }
      ],
      "testingFrameworks": [
        { "name": "JUnit", "level": "Experienced", "icon": ["fas", "vial"] },
        { "name": "Mockito", "level": "Experienced", "icon": ["fas", "vials"] },
        { "name": "Selenium", "level": "Skilled", "icon": ["fas", "atom"] },
        { "name": "Jest", "level": "Skilled", "icon": ["fab", "js"] },
        { "name": "Cypress", "level": "Skilled", "icon": ["fas", "check-circle"] },
        { "name": "Mocha", "level": "Skilled", "icon": ["fas", "coffee"] },
        { "name": "Chai", "level": "Skilled", "icon": ["fas", "mug-hot"] },
        { "name": "TestNG", "level": "Skilled", "icon": ["fas", "check-double"] },
        { "name": "Cucumber", "level": "Skilled", "icon": ["fas", "leaf"] },
        { "name": "Postman", "level": "Experienced", "icon": ["fas", "paper-plane"] },
        { "name": "Swagger", "level": "Experienced", "icon": ["fas", "file-code"] }
      ],
      "monitoringTools": [
        { "name": "ELK Stack", "level": "Experienced", "icon": ["fas", "search"] },
        { "name": "Grafana", "level": "Skilled", "icon": ["fas", "chart-line"] },
        { "name": "Prometheus", "level": "Skilled", "icon": ["fas", "fire"] },
        { "name": "New Relic", "level": "Skilled", "icon": ["fas", "tachometer-alt"] },
        { "name": "Datadog", "level": "Skilled", "icon": ["fas", "dog"] },
        { "name": "Splunk", "level": "Skilled", "icon": ["fas", "search"] }
      ],
      "architectureAndMethodologies": [
        { "name": "Event-Driven Architecture", "level": "Experienced" },
        { "name": "ESB", "level": "Skilled" },
        { "name": "Cloud Native", "level": "Experienced" },
        { "name": "Clean Architecture", "level": "Experienced" },
        { "name": "Microservices Architecture", "level": "Very Experienced" },
        { "name": "Onion Architecture", "level": "Experienced" },
        { "name": "MV*", "level": "Experienced" },
        { "name": "C4D Architecture", "level": "Skilled" }
      ],
      "projectManagement": [
        { "name": "Scrum", "level": "Experienced" },
        { "name": "Kanban", "level": "Experienced" },
        { "name": "SAFe", "level": "Skilled" },
        { "name": "RUP", "level": "Skilled" }
      ],
      "aiAndLLMs": [
        { "name": "MagnifAI", "level": "Skilled", "icon": ["fas", "search-plus"] },
        { "name": "Mistral", "level": "Skilled", "icon": ["fas", "wind"] },
        { "name": "Hugging Face", "level": "Skilled", "icon": ["fas", "smile-beam"] },
        { "name": "Vikuna", "level": "Skilled", "icon": ["fas", "paw"] },
        { "name": "Bloom", "level": "Skilled", "icon": ["fas", "seedling"] },
        { "name": "Stable Diffusion", "level": "Skilled", "icon": ["fas", "paint-brush"] },
        { "name": "Midjourney", "level": "Skilled", "icon": ["fas", "mountain"] },
        { "name": "LLama2", "level": "Skilled", "icon": ["fas", "comment-dots"] },
        { "name": "RAG", "level": "Skilled", "icon": ["fas", "book"] },
        { "name": "OpenAI (ChatGPT)", "level": "Skilled", "icon": ["fas", "robot"] },
        { "name": "Copilot", "level": "Skilled", "icon": ["fas", "user-astronaut"] },
        { "name": "Qwen", "level": "Skilled", "icon": ["fas", "brain"] },
        { "name": "DeepSeek", "level": "Skilled", "icon": ["fas", "search"] },
        { "name": "Ollama", "level": "Skilled", "icon": ["fas", "server"] },
        { "name": "OllamaFactory", "level": "Skilled", "icon": ["fas", "industry"] },
        { "name": "Docker Model Runner", "level": "Skilled", "icon": ["fab", "docker"] },
        { "name": "SmallVM", "level": "Skilled", "icon": ["fas", "microchip"] },
        { "name": "OpenManus", "level": "Skilled", "icon": ["fas", "hand-paper"] },
        { "name": "Agent Development Kit", "level": "Skilled", "icon": ["fas", "toolbox"] },
        { "name": "Gemini", "level": "Skilled", "icon": ["fas", "gem"] }
      ],
      "databases": [
        { "name": "MySQL", "level": "Experienced", "icon": ["fas", "database"] },
        { "name": "PostgreSQL", "level": "Experienced", "icon": ["fas", "database"] },
        { "name": "MongoDB", "level": "Skilled", "icon": ["fas", "leaf"] },
        { "name": "Oracle", "level": "Experienced", "icon": ["fas", "database"] },
        { "name": "SQL Server", "level": "Skilled", "icon": ["fab", "microsoft"] },
        { "name": "Redis", "level": "Skilled", "icon": ["fas", "server"] },
        { "name": "Cassandra", "level": "Skilled", "icon": ["fas", "database"] },
        { "name": "DynamoDB", "level": "Skilled", "icon": ["fab", "aws"] },
        { "name": "Firebase", "level": "Skilled", "icon": ["fas", "fire"] },
        { "name": "Elasticsearch", "level": "Skilled", "icon": ["fas", "search"] }
      ],
      "versionControl": [
        { "name": "Git", "level": "Experienced", "icon": ["fab", "git-alt"] },
        { "name": "SVN", "level": "Experienced", "icon": ["fas", "code-branch"] },
        { "name": "Mercurial", "level": "Experienced", "icon": ["fas", "code-branch"] },
        { "name": "GitHub", "level": "Experienced", "icon": ["fab", "github"] },
        { "name": "GitLab", "level": "Experienced", "icon": ["fab", "gitlab"] },
        { "name": "Bitbucket", "level": "Experienced", "icon": ["fab", "bitbucket"] }
      ],
      "buildTools": [
        { "name": "Maven", "level": "Experienced", "icon": ["fas", "box"] },
        { "name": "Gradle", "level": "Experienced", "icon": ["fas", "cogs"] },
        { "name": "npm", "level": "Experienced", "icon": ["fab", "npm"] },
        { "name": "Yarn", "level": "Experienced", "icon": ["fab", "yarn"] },
        { "name": "NuGet", "level": "Experienced", "icon": ["fas", "box"] },
        { "name": "Ant", "level": "Skilled", "icon": ["fas", "bug"] }
      ],
      "developmentTools": [
        { "name": "IntelliJ IDEA", "level": "Experienced", "icon": ["fas", "laptop-code"] },
        { "name": "Eclipse", "level": "Experienced", "icon": ["fas", "moon"] },
        { "name": "VS Code", "level": "Experienced", "icon": ["fas", "code"] },
        { "name": "Jenkins", "level": "Experienced", "icon": ["fas", "cogs"] },
        { "name": "GitLab CI/CD", "level": "Experienced", "icon": ["fab", "gitlab"] },
        { "name": "GitHub Actions", "level": "Experienced", "icon": ["fab", "github"] },
        { "name": "Jira", "level": "Experienced", "icon": ["fab", "jira"] },
        { "name": "Confluence", "level": "Experienced", "icon": ["fas", "book"] },
        { "name": "Postman", "level": "Experienced", "icon": ["fas", "paper-plane"] },
        { "name": "SonarQube", "level": "Experienced", "icon": ["fas", "check-circle"] }
      ]
    },
    "softSkillsSection": {
      "title": "Soft Skills",
      "description": "Key personal attributes that complement my technical expertise:"
    },
    "petProjectsSection": {
      "title": "Pet Projects",
      "description": "Personal projects I've developed to explore new technologies and solve interesting problems:"
    },
    "petProjects": [
         {
        "name": "1XXXDaysOfPython",
        "description": "A personal challenge repository showcasing hands-on exercises, scripts and projects in Python to deepen practical fluency.",
        "technologies": ["Python", "Jupyter Notebook"],
        "link": "https://github.com/drupalio/1XXXDaysOfPython",
        "icon": ["fas", "book"]
      },
      {
        "name": "1XXXDaysOfRust",
        "description": "A collection of Rust-based learning examples and mini-projects exploring systems programming and modern Rust idioms.",
        "technologies": ["Rust"],
        "link": "https://github.com/drupalio/1XXXDaysOfRust",
        "icon": ["fas", "gears"]
      },
    {
      "name": "Promptr34",
      "description": "A platform offering 1,500,000 optimized and autogenerated prompts for data mining of civitai, using AI agents and MCP for advanced prompt handling",
      "technologies": ["JavaScript", "OpenAI API", "Agents", "MCP Protocol", "Prompt Engineering"],
      "link": "https://promptr34.com/",
      "icon": ["fas", "brain"]
    },
      {
        "name": "Resume Builder",
        "description": "A Vue.js-based resume builder with multilingual support and modern UI design",
        "technologies": ["Vue.js", "Nuxt.js", "i18n", "CSS3"],
        "link": "https://github.com/drupalio/resume-builder",
        "icon": ["fas", "file-alt"]
      },
      {
        "name": "AI Code Assistant",
        "description": "A VS Code extension that uses AI to help developers write better code and documentation",
        "technologies": ["TypeScript", "VS Code API", "OpenAI API", "Node.js"],
        "link": "https://github.com/drupalio/ai-code-assistant",
        "icon": ["fas", "robot"]
      },
      {
        "name": "Microservices Demo",
        "description": "A demonstration of microservices architecture using Spring Boot and Docker",
        "technologies": ["Java", "Spring Boot", "Docker", "Kubernetes", "RabbitMQ"],
        "link": "https://github.com/drupalio/microservices-demo",
        "icon": ["fas", "cubes"]
      },
      {
        "name": "Smart Home Hub",
        "description": "An IoT hub for smart home devices with a web-based dashboard",
        "technologies": ["Python", "Flask", "MQTT", "React", "MongoDB"],
        "link": "https://github.com/drupalio/smart-home-hub",
        "icon": ["fas", "home"]
      },
      {
        "name": "Blockchain Explorer",
        "description": "A web application to explore and visualize blockchain data",
        "technologies": ["JavaScript", "Node.js", "Express", "Web3.js", "D3.js"],
        "link": "https://github.com/drupalio/blockchain-explorer",
        "icon": ["fas", "link"]
      }
    ],
    "softSkills": [
      { "name": "Outside of the Box Thinker", "icon": ["fas", "lightbulb"] },
      { "name": "Team Player", "icon": ["fas", "users"] },
      { "name": "Leadership", "icon": ["fas", "user-tie"] },
      { "name": "Fast Learner", "icon": ["fas", "book-reader"] },
      { "name": "Adaptability", "icon": ["fas", "sync-alt"] },
      { "name": "Critical Thinking", "icon": ["fas", "brain"] },
      { "name": "Problem Solver", "icon": ["fas", "puzzle-piece"] },
      { "name": "Teamwork", "icon": ["fas", "handshake"] }
    ]
  };

  const esData = {
    "personalInfo": {
      "name": "Ricardo Morales",
      "title": "Ingeniero de Software",
      "picture":"https://avatars.githubusercontent.com/u/5186093",
      "links": [
        {
          "name": "LinkedIn",
          "url": "https://www.linkedin.com/in/drupalio",
          "icon": ["fab", "linkedin"]
        },
        {
          "name": "Sitio Web",
          "url": "https://www.drupalio.com",
          "icon": ["fas", "globe"]
        }
      ]
    },
    "summary": {
      "title": "Sobre mí",
      "summaryText": "Desarrollador de sistemas con experiencia y una sólida capacidad para navegar por diversos stacks tecnológicos, priorizando un código limpio y eficiente, y abrazando la innovación. Comprometido, creativo y motivado por el aprendizaje continuo. Destaco en fomentar la colaboración y entregar resultados de alta calidad. Apasionado tanto por la tecnología como por la gastronomía, busco aprovechar mis habilidades para crear impactos significativos en diversas industrias y comunidades."
    },
    "workExperienceSection": {
      "title": "Experiencias Laborales"
    },
    "workExperience": [
      {
        "title": "Desarrollador Java Senior",
        "company": "Multiplica Talent",
        "period": "Abr 2024 - Presente",
        "icon": ["fas", "briefcase"],
        "projects": [
          {
            "name": "Hive & Colony",
            "description": "Integración e implementación de Zoho One y Shopify para operaciones comerciales optimizadas",
            "technologies": ["Java", "Zoho One", "Shopify"]
          },
          {
            "name": "Banorte",
            "description": "Desarrollo de plantillas y módulos para el nuevo portal público de Banorte utilizando MagnoliaCMS",
            "technologies": ["Java", "MagnoliaCMS", "HTML", "CSS", "JavaScript"]
          },
          {
            "name": "Qualitas",
            "description": "Desarrollo e integración de un núcleo CRM utilizando procedimientos almacenados SQL/PLus, funciones y un backend Java",
            "technologies": ["Java", "SQL/PLus", "Oracle", "CRM"]
          },
          {
            "name": "GEPP",
            "description": "Análisis y desarrollo de backend utilizando minería de datos y procedimientos para la gestión de promociones sobre un CRM hecho a medida",
            "technologies": ["Java", "Minería de Datos", "SQL", "CRM", "Procedimientos Almacenados"]
          },
          {
            "name": "PlanSeguro",
            "description": "Reestructuración de look and feel para la aseguradora, actualizando los componentes UI y las versiones de Angular",
            "technologies": ["Angular", "TypeScript", "UI/UX", "CSS", "HTML"]
          }
        ]
      },
      {
        "title": "Desarrollador de Microservicios Java",
        "company": "Globant",
        "period": "May 2019 - Feb 2024",
        "icon": ["fas", "microchip"],
        "projects": [
          {
            "name": "QuizzerA",
            "description": "GPT personalizado para proyectos clave y desarrollo de un sistema de seguimiento de entrevistas para mejorar la retroalimentación y la eficiencia",
            "technologies": ["Java", "Spring Boot", "GPT", "AI"]
          },
          {
            "name": "Banco Nacional del Perú",
            "description": "Modernización de la banca en línea con microservicios utilizando el framework YAPE",
            "technologies": ["Java", "Microservicios", "Framework YAPE"]
          }
        ]
      }
    ],
    "education": {
      "formalEducation": [
        {
          "degree": "Ingeniería en Sistemas Computacionales",
          "institution": "Tecnológico de estudios superiores de Ecatepec",
          "period": "Ago 2015 - Ago 2018"
        },
        {
          "degree": "Técnico en computación",
          "institution": "Centro de Estudios tecnológicos y de servicios número 55",
          "period": "Jun 2005 - Ago 2008"
        }
      ],
      "certifications": [
        {
          "title": "Oracle Certified Associate Java",
          "platform": "Oracle",
          "issue_date": "Feb 2015",
          "credential_id": "237614080OCAJSE7",
          "icon": ["fab", "java"]
        },
        {
          "title": "Scrum Fundamentals Certified",
          "platform": "VMEdu Inc.",
          "issue_date": "Abr 2018",
          "credential_id": "623619",
          "icon": ["fas", "users-cog"]
        }
      ],
      "courses": [
        {
          "title": "Expresiones Lambda y Streams en Java",
          "platform": "Udemy",
          "completion_date": "Dic 2023",
          "icon": ["fas", "book"]
        },
        {
          "title": "Habilidades de Comunicación: Mejora tu Comunicación",
          "platform": "Udemy",
          "completion_date": "Nov 2022",
          "icon": ["fas", "book"]
        },
        {
          "title": "Liderazgo: Habilidades Prácticas de Liderazgo",
          "platform": "Udemy",
          "completion_date": "Oct 2022",
          "icon": ["fas", "book"]
        }
      ]
    },
    "certifications": [
      {
        "title": "Oracle Certified Associate Java",
        "platform": "Oracle",
        "issue_date": "Feb 2015",
        "credential_id": "237614080OCAJSE7",
        "icon": ["fab", "java"]
      },
      {
        "title": "Scrum Fundamentals Certified",
        "platform": "VMEdu Inc.",
        "issue_date": "Abr 2018",
        "credential_id": "623619",
        "icon": ["fas", "users-cog"]
      }
    ],
    "courses": [
      {
        "title": "Expresiones Lambda y Streams en Java",
        "platform": "Udemy",
        "completion_date": "Dic 2023",
        "icon": ["fas", "book"]
      },
      {
        "title": "Habilidades de Comunicación: Mejora tu Comunicación",
        "platform": "Udemy",
        "completion_date": "Nov 2022",
        "icon": ["fas", "book"]
      },
      {
        "title": "Liderazgo: Habilidades Prácticas de Liderazgo",
        "platform": "Udemy",
        "completion_date": "Oct 2022",
        "icon": ["fas", "book"]
      }
    ],
    "skills": {
      "categories": {
        "programming": "Lenguajes de Programación",
        "devFrameworks": "Frameworks de Desarrollo",
        "testFrameworks": "Frameworks de Pruebas",
        "databases": "Bases de Datos",
        "cloud": "Proveedores de Nube",
        "servers": "Servidores y Contenedores",
        "monitoringTools": "Herramientas de Monitoreo",
        "architectureAndMethodologies": "Arquitectura y Metodologías",
        "projectManagement": "Gestión de Proyectos",
        "aiAndLLMs": "IA y LLMs",
        "versionControl": "Control de Versiones",
        "buildTools": "Herramientas de Construcción",
        "developmentTools": "Herramientas de Desarrollo"
      },
      "programmingLanguages": [
        { "name": "Java (17 y superior)", "level": "Experto", "icon": ["fab", "java"] },
        { "name": "Kotlin", "level": "Experimentado", "icon": ["fab", "android"] },
        { "name": "PHP", "level": "Experimentado", "icon": ["fab", "php"] },
        { "name": "Python", "level": "Experimentado", "icon": ["fab", "python"] },
        { "name": "JavaScript", "level": "Experimentado", "icon": ["fab", "js"] },
        { "name": "TypeScript", "level": "Experimentado", "icon": ["fab", "js-square"] },
        { "name": "Ruby", "level": "Hábil", "icon": ["fas", "gem"] },
        { "name": "Rust", "level": "Hábil", "icon": ["fas", "cog"] },
        { "name": "GoLang", "level": "Hábil", "icon": ["fas", "code"] },
        { "name": "C#", "level": "Hábil", "icon": ["fab", "microsoft"] },
        { "name": "C++", "level": "Hábil", "icon": ["fas", "code"] },
        { "name": "Ziglang", "level": "Hábil", "icon": ["fas", "bolt"] },
        { "name": "Swift", "level": "Hábil", "icon": ["fab", "apple"] }
      ],
      "frameworks": [
        { "name": "Spring Framework", "level": "Experto", "icon": ["fas", "leaf"] },
        { "name": "Swagger", "level": "Experimentado", "icon": ["fas", "file-code"] },
        { "name": "Junit", "level": "Experimentado", "icon": ["fas", "vial"] },
        { "name": "Mockito", "level": "Experimentado", "icon": ["fas", "vials"] }
      ],
      "cloudProviders": [
        { "name": "AWS", "level": "Experimentado", "icon": ["fab", "aws"] },
        { "name": "Google Cloud Platform", "level": "Hábil", "icon": ["fab", "google"] },
        { "name": "Azure", "level": "Hábil", "icon": ["fab", "microsoft"] }
      ],
      "serversAndContainers": [
        { "name": "Tomcat", "level": "Experimentado", "icon": ["fas", "server"] },
        { "name": "Glassfish", "level": "Experimentado", "icon": ["fas", "fish"] },
        { "name": "IBM WebSphere", "level": "Hábil", "icon": ["fas", "globe"] },
        { "name": "OpenLiberty", "level": "Hábil", "icon": ["fas", "flag"] },
        { "name": "Apache", "level": "Experimentado", "icon": ["fas", "feather"] },
        { "name": "Payara", "level": "Hábil", "icon": ["fas", "fish"] },
        { "name": "Jboss", "level": "Experimentado", "icon": ["fas", "fire"] },
        { "name": "Openshift", "level": "Hábil", "icon": ["fas", "ship"] },
        { "name": "DOCKER", "level": "Experimentado", "icon": ["fab", "docker"] },
        { "name": "Kubernetes", "level": "Experimentado", "icon": ["fas", "dharmachakra"] }
      ],
      "developmentFrameworks": [
        { "name": "Spring Framework", "level": "Experto", "icon": ["fas", "leaf"] },
        { "name": "Quarkus", "level": "Experimentado", "icon": ["fas", "bolt"] },
        { "name": "Helidon", "level": "Hábil", "icon": ["fas", "sun"] },
        { "name": "Hibernate", "level": "Experimentado", "icon": ["fas", "database"] },
        { "name": "EJB", "level": "Hábil", "icon": ["fas", "cubes"] },
        { "name": "Apache Camel", "level": "Hábil", "icon": ["fas", "exchange-alt"] },
        { "name": "Bootstrap", "level": "Hábil", "icon": ["fab", "bootstrap"] },
        { "name": "Apache Kafka", "level": "Experimentado", "icon": ["fas", "stream"] },
        { "name": "RabbitMQ", "level": "Hábil", "icon": ["fas", "envelope"] },
        { "name": "CodeIgniter", "level": "Hábil", "icon": ["fas", "fire"] },
        { "name": "Vue.js", "level": "Hábil", "icon": ["fab", "vuejs"] },
        { "name": "Django", "level": "Hábil", "icon": ["fab", "python"] },
        { "name": "Express.js", "level": "Hábil", "icon": ["fab", "node-js"] },
        { "name": "Wordpress", "level": "Hábil", "icon": ["fab", "wordpress"] },
        { "name": "Drupal", "level": "Hábil", "icon": ["fab", "drupal"] },
        { "name": "Foundation", "level": "Hábil", "icon": ["fas", "layer-group"] },
        { "name": "Angular", "level": "Hábil", "icon": ["fab", "angular"] },
        { "name": "jQuery", "level": "Hábil", "icon": ["fab", "js"] },
        { "name": "Knockout", "level": "Hábil", "icon": ["fas", "box-open"] },
        { "name": "Cordova", "level": "Hábil", "icon": ["fab", "android"] },
        { "name": "Primefaces", "level": "Hábil", "icon": ["fas", "window-maximize"] },
        { "name": "Flask", "level": "Hábil", "icon": ["fas", "flask"] },
        { "name": "Gatsby", "level": "Hábil", "icon": ["fab", "react"] },
        { "name": "Laravel", "level": "Hábil", "icon": ["fab", "laravel"] },
        { "name": "React", "level": "Hábil", "icon": ["fab", "react"] },
        { "name": "Next.js", "level": "Hábil", "icon": ["fab", "react"] }
      ],
      "testingFrameworks": [
        { "name": "JUnit", "level": "Experimentado", "icon": ["fas", "vial"] },
        { "name": "Mockito", "level": "Experimentado", "icon": ["fas", "vials"] },
        { "name": "Selenium", "level": "Hábil", "icon": ["fas", "atom"] },
        { "name": "Jest", "level": "Hábil", "icon": ["fab", "js"] },
        { "name": "Cypress", "level": "Hábil", "icon": ["fas", "check-circle"] },
        { "name": "Mocha", "level": "Hábil", "icon": ["fas", "coffee"] },
        { "name": "Chai", "level": "Hábil", "icon": ["fas", "mug-hot"] },
        { "name": "TestNG", "level": "Hábil", "icon": ["fas", "check-double"] },
        { "name": "Cucumber", "level": "Hábil", "icon": ["fas", "leaf"] },
        { "name": "Postman", "level": "Experimentado", "icon": ["fas", "paper-plane"] },
        { "name": "Swagger", "level": "Experimentado", "icon": ["fas", "file-code"] }
      ],
      "monitoringTools": [
        { "name": "ELK Stack", "level": "Experimentado", "icon": ["fas", "search"] },
        { "name": "Grafana", "level": "Hábil", "icon": ["fas", "chart-line"] },
        { "name": "Prometheus", "level": "Hábil", "icon": ["fas", "fire"] },
        { "name": "New Relic", "level": "Hábil", "icon": ["fas", "tachometer-alt"] },
        { "name": "Datadog", "level": "Hábil", "icon": ["fas", "dog"] },
        { "name": "Splunk", "level": "Hábil", "icon": ["fas", "search"] }
      ],
      "architectureAndMethodologies": [
        { "name": "Arquitectura orientada a eventos", "level": "Experimentado" },
        { "name": "ESB", "level": "Hábil" },
        { "name": "Nativo en la nube", "level": "Experimentado" },
        { "name": "Arquitectura limpia", "level": "Experimentado" },
        { "name": "Arquitectura de microservicios", "level": "Experto" },
        { "name": "Arquitectura en cebolla", "level": "Experimentado" },
        { "name": "MV*", "level": "Experimentado" },
        { "name": "Arquitectura C4D", "level": "Hábil" }
      ],
      "projectManagement": [
        { "name": "Scrum", "level": "Experimentado" },
        { "name": "Kanban", "level": "Experimentado" },
        { "name": "SAFe", "level": "Hábil" },
        { "name": "RUP", "level": "Hábil" }
      ],
      "aiAndLLMs": [
        { "name": "MagnifAI", "level": "Hábil", "icon": ["fas", "search-plus"] },
        { "name": "Mistral", "level": "Hábil", "icon": ["fas", "wind"] },
        { "name": "Hugging Face", "level": "Hábil", "icon": ["fas", "smile-beam"] },
        { "name": "Vikuna", "level": "Hábil", "icon": ["fas", "paw"] },
        { "name": "Bloom", "level": "Hábil", "icon": ["fas", "seedling"] },
        { "name": "Stable Diffusion", "level": "Hábil", "icon": ["fas", "paint-brush"] },
        { "name": "Midjourney", "level": "Hábil", "icon": ["fas", "mountain"] },
        { "name": "LLama2", "level": "Hábil", "icon": ["fas", "comment-dots"] },
        { "name": "RAG", "level": "Hábil", "icon": ["fas", "book"] },
        { "name": "OpenAI (ChatGPT)", "level": "Hábil", "icon": ["fas", "robot"] },
        { "name": "Copilot", "level": "Hábil", "icon": ["fas", "user-astronaut"] },
        { "name": "Qwen", "level": "Hábil", "icon": ["fas", "brain"] },
        { "name": "DeepSeek", "level": "Hábil", "icon": ["fas", "search"] },
        { "name": "Ollama", "level": "Hábil", "icon": ["fas", "server"] },
        { "name": "OllamaFactory", "level": "Hábil", "icon": ["fas", "industry"] },
        { "name": "Docker Model Runner", "level": "Hábil", "icon": ["fab", "docker"] },
        { "name": "SmallVM", "level": "Hábil", "icon": ["fas", "microchip"] },
        { "name": "OpenManus", "level": "Hábil", "icon": ["fas", "hand-paper"] },
        { "name": "Agent Development Kit", "level": "Hábil", "icon": ["fas", "toolbox"] },
        { "name": "Gemini", "level": "Hábil", "icon": ["fas", "gem"] }
      ],
      "databases": [
        { "name": "MySQL", "level": "Experimentado", "icon": ["fas", "database"] },
        { "name": "PostgreSQL", "level": "Experimentado", "icon": ["fas", "database"] },
        { "name": "MongoDB", "level": "Hábil", "icon": ["fas", "leaf"] },
        { "name": "Oracle", "level": "Experimentado", "icon": ["fas", "database"] },
        { "name": "SQL Server", "level": "Hábil", "icon": ["fab", "microsoft"] },
        { "name": "Redis", "level": "Hábil", "icon": ["fas", "server"] },
        { "name": "Cassandra", "level": "Hábil", "icon": ["fas", "database"] },
        { "name": "DynamoDB", "level": "Hábil", "icon": ["fab", "aws"] },
        { "name": "Firebase", "level": "Hábil", "icon": ["fas", "fire"] },
        { "name": "Elasticsearch", "level": "Hábil", "icon": ["fas", "search"] }
      ],
      "versionControl": [
        { "name": "Git", "level": "Experimentado", "icon": ["fab", "git-alt"] },
        { "name": "SVN", "level": "Experimentado", "icon": ["fas", "code-branch"] },
        { "name": "Mercurial", "level": "Experimentado", "icon": ["fas", "code-branch"] },
        { "name": "GitHub", "level": "Experimentado", "icon": ["fab", "github"] },
        { "name": "GitLab", "level": "Experimentado", "icon": ["fab", "gitlab"] },
        { "name": "Bitbucket", "level": "Experimentado", "icon": ["fab", "bitbucket"] }
      ],
      "buildTools": [
        { "name": "Maven", "level": "Experimentado", "icon": ["fas", "box"] },
        { "name": "Gradle", "level": "Experimentado", "icon": ["fas", "cogs"] },
        { "name": "npm", "level": "Experimentado", "icon": ["fab", "npm"] },
        { "name": "Yarn", "level": "Experimentado", "icon": ["fab", "yarn"] },
        { "name": "NuGet", "level": "Experimentado", "icon": ["fas", "box"] },
        { "name": "Ant", "level": "Hábil", "icon": ["fas", "bug"] }
      ],
      "developmentTools": [
        { "name": "IntelliJ IDEA", "level": "Experimentado", "icon": ["fas", "laptop-code"] },
        { "name": "Eclipse", "level": "Experimentado", "icon": ["fas", "moon"] },
        { "name": "VS Code", "level": "Experimentado", "icon": ["fas", "code"] },
        { "name": "Jenkins", "level": "Experimentado", "icon": ["fas", "cogs"] },
        { "name": "GitLab CI/CD", "level": "Experimentado", "icon": ["fab", "gitlab"] },
        { "name": "GitHub Actions", "level": "Experimentado", "icon": ["fab", "github"] },
        { "name": "Jira", "level": "Experimentado", "icon": ["fab", "jira"] },
        { "name": "Confluence", "level": "Experimentado", "icon": ["fas", "book"] },
        { "name": "Postman", "level": "Experimentado", "icon": ["fas", "paper-plane"] },
        { "name": "SonarQube", "level": "Experimentado", "icon": ["fas", "check-circle"] }
      ]
    },
    "softSkillsSection": {
      "title": "Habilidades Blandas",
      "description": "Atributos personales clave que complementan mi experiencia técnica:"
    },
    "petProjectsSection": {
      "title": "Proyectos Personales",
      "description": "Proyectos personales que he desarrollado para explorar nuevas tecnologías y resolver problemas interesantes:"
    },
    "petProjects": [
      {
        "name": "1XXXDaysOfPython",
        "description": "Un repositorio de desafío personal que muestra ejercicios prácticos, scripts y proyectos en Python para profundizar la fluidez práctica.",
        "technologies": ["Python", "Jupyter Notebook"],
        "link": "https://github.com/drupalio/1XXXDaysOfPython",
        "icon": ["fas", "book"]
      },
      {
        "name": "1XXXDaysOfRust",
        "description": "Una colección de ejemplos de aprendizaje y mini-proyectos basados en Rust que exploran la programación de sistemas y los modismos modernos de Rust.",
        "technologies": ["Rust"],
        "link": "https://github.com/drupalio/1XXXDaysOfRust",
        "icon": ["fas", "gears"]
      },
      {
        "name": "Promptr34",
        "description": "Una plataforma que ofrece 1,500,000 prompts optimizados y autogenerados para minería de datos de civitai, utilizando agentes de IA y MCP para el manejo avanzado de prompts",
        "technologies": ["JavaScript", "OpenAI API", "Agents", "MCP Protocol", "Prompt Engineering"],
        "link": "https://promptr34.com/",
        "icon": ["fas", "brain"]
      },
      {
        "name": "Constructor de Currículum",
        "description": "Un constructor de currículum basado en Vue.js con soporte multilingüe y diseño de interfaz moderno",
        "technologies": ["Vue.js", "Nuxt.js", "i18n", "CSS3"],
        "link": "https://github.com/drupalio/resume-builder",
        "icon": ["fas", "file-alt"]
      },
      {
        "name": "Asistente de Código IA",
        "description": "Una extensión de VS Code que utiliza IA para ayudar a los desarrolladores a escribir mejor código y documentación",
        "technologies": ["TypeScript", "VS Code API", "OpenAI API", "Node.js"],
        "link": "https://github.com/drupalio/ai-code-assistant",
        "icon": ["fas", "robot"]
      },
      {
        "name": "Demo de Microservicios",
        "description": "Una demostración de arquitectura de microservicios utilizando Spring Boot y Docker",
        "technologies": ["Java", "Spring Boot", "Docker", "Kubernetes", "RabbitMQ"],
        "link": "https://github.com/drupalio/microservices-demo",
        "icon": ["fas", "cubes"]
      },
      {
        "name": "Hub para Casa Inteligente",
        "description": "Un hub IoT para dispositivos de casa inteligente con un panel web",
        "technologies": ["Python", "Flask", "MQTT", "React", "MongoDB"],
        "link": "https://github.com/drupalio/smart-home-hub",
        "icon": ["fas", "home"]
      },
      {
        "name": "Explorador de Blockchain",
        "description": "Una aplicación web para explorar y visualizar datos de blockchain",
        "technologies": ["JavaScript", "Node.js", "Express", "Web3.js", "D3.js"],
        "link": "https://github.com/drupalio/blockchain-explorer",
        "icon": ["fas", "link"]
      }
    ],
    "softSkills": [
      { "name": "Pensador fuera de la caja", "icon": ["fas", "lightbulb"] },
      { "name": "Trabajo en equipo", "icon": ["fas", "users"] },
      { "name": "Liderazgo", "icon": ["fas", "user-tie"] },
      { "name": "Aprendiz rápido", "icon": ["fas", "book-reader"] },
      { "name": "Adaptabilidad", "icon": ["fas", "sync-alt"] },
      { "name": "Pensamiento crítico", "icon": ["fas", "brain"] },
      { "name": "Resolución de problemas", "icon": ["fas", "puzzle-piece"] },
      { "name": "Colaboración", "icon": ["fas", "handshake"] }
    ]
  };

  console.log('Loaded locales:', { en: Object.keys(enData), es: Object.keys(esData) });

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: process.client && localStorage.getItem('language') ? localStorage.getItem('language') : 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    missingWarn: false,
    fallbackWarn: false,
    messages: {
      en: enData,
      es: esData
    }
  })

  vueApp.use(i18n)

  // Provide i18n instance to the app
  vueApp.provide('i18n', i18n)

  // Log para depuración
  if (process.client) {
    console.log('i18n initialized with locale:', i18n.global.locale.value)
    console.log('Available messages:', Object.keys(i18n.global.messages.value))
  }

  return {
    provide: {
      i18n: i18n
    }
  }
})
