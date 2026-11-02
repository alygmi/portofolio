export interface ArchitectureDeepDive {
  title: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  domain: string;
  summaryBullets: string[];
  techStack: string[];
  architectureNotes?: ArchitectureDeepDive[];
}

export interface KeyProject {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  featured?: boolean;
  repoUrl?: string;
  liveUrl?: string;
  description: string;
  highlights: string[];
  techStack: string[];
  /** Optional link to public API docs (Swagger / OpenAPI / Postman) if the backend is hosted */
  docsUrl?: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  period: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Al Adiyat Nur Rusuli Jaya',
    shortName: 'Al Adiyat',
    headline: 'Backend-Leaning Fullstack Developer',
    location: 'Bandung, Indonesia',
    availability: 'Open for Backend / Fullstack Engineering Roles',
    summary:
      'Backend-leaning fullstack developer with 4+ years of professional experience building REST APIs and internal business systems in PHP (Laravel, Zend), TypeScript (Bun, Next.js), Python (FastAPI), Java (Spring Boot), and React.',
    subSummary:
      'Built retail operations software on SQL Server and SAP Business One data, covering approval workflows, financial reconciliation, member events, and sales field tooling for a multi-brand store network. Treats authorization rules, tests, and documentation as part of the deliverable rather than an afterthought.',
    links: {
      github: 'https://github.com/alygmi',
      githubHandle: 'github.com/alygmi',
      linkedin: 'https://linkedin.com/in/aladiyat',
      linkedinHandle: 'linkedin.com/in/aladiyat',
    },
  },

  experiences: [
    {
      id: 'anyar-retail',
      role: 'Full Stack Developer',
      company: 'PT Anyar Retail',
      location: 'Rancaekek, ID',
      period: 'Jun 2026 – Oct 2026',
      domain: 'Building Materials Retail (RKM, Triwarna, and Sister Brands)',
      summaryBullets: [
        'Shipped 340+ commits in three months across internal Daily Apps platform (React) and three Laravel services for marketing, operations, and finance, working against SQL Server and SAP Business One data.',
        'Built Event Management system end-to-end: admin console, member self-registration, QR check-in scanner, and branch-based invitations; unified member lookup across four retail brands.',
        'Delivered Event Quotation with template-driven multi-level approval, fixing a margin formula mixing VAT-inclusive/net prices and transaction routing issues.',
        'Built Sales Canvasing module (API & web admin) with POS-backed achievement tracking, map-based customer capture, and live comments over Firebase.',
        'Owned End-of-Day and Tender Collection reporting with finance team: settlement, MDR rules, deposits in transit, PDF reports, and reconciliation against POS figures.',
        'Built public member websites for RKM and Triwarna (React 19, Tailwind v4), cutting image payload from 24 MB to 1.3 MB, and served store locations via key-protected API.',
        'Handled SQL Server’s 2,100-parameter limit in bulk member invites via batched lookups, writing a comprehensive handover knowledge base.',
      ],
      techStack: [
        'React 19',
        'Laravel',
        'Tailwind v4',
        'SQL Server',
        'SAP Business One',
        'Firebase',
        'REST API',
      ],
      architectureNotes: [
        {
          title: 'Bypassing SQL Server’s 2,100-Parameter Hard Limit',
          problem:
            'Bulk member event invitations across 4 retail brands triggered SQL Server fatal errors whenever `WHERE IN (...)` clauses exceeded 2,100 bound parameters.',
          solution:
            'Implemented deterministic batched lookup chunking (1,500 parameters per batch) with indexed memory merging and documented the architectural pattern in the handover knowledge base.',
          impact: 'Zero crashes on large-scale branch event blasts & predictable memory footprint.',
          tags: ['SQL Server', 'Laravel', 'Batch Processing'],
        },
        {
          title: 'Multi-Level Quotation Approval & VAT Margin Fix',
          problem:
            'Existing quotation calculations mixed VAT-inclusive (PPN) and net prices in margin formulas, causing inaccurate profitability figures and misrouted approval chains.',
          solution:
            'Normalized all line-item unit costs to net baseline before margin computation and built a template-driven state machine for multi-level manager approvals.',
          impact: '100% accurate financial margin reporting & automated approval routing.',
          tags: ['Financial Logic', 'SAP B1', 'State Machine'],
        },
        {
          title: 'End-of-Day POS & Tender Reconciliation Engine',
          problem:
            'Finance teams needed accurate daily reconciliation between physical POS figures, EDC Merchant Discount Rate (MDR) deductions, and deposits in transit.',
          solution:
            'Built automated End-of-Day & Tender Collection reporting with configurable MDR rules and instant PDF settlement generation.',
          impact: 'Streamlined daily cashier-to-finance settlement auditing across store branches.',
          tags: ['Finance Reconciliation', 'MDR Rules', 'PDF Reporting'],
        },
      ],
    },
    {
      id: 'iotera',
      role: 'Backend Developer Intern',
      company: 'PT IoTera Sinergi Digital',
      location: 'Bandung, ID',
      period: 'Apr 2025 – Oct 2025',
      domain: 'IoT Solutions (Smart Vending Machine Platform)',
      summaryBullets: [
        'Built RESTful web services for a smart vending machine IoT platform using FastAPI (Python) and PostgreSQL.',
        'Led migration of platform codebase from Golang to Python, reducing onboarding friction and improving long-term maintainability.',
        'Designed and documented API contracts enabling seamless integration for embedded hardware clients.',
      ],
      techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Golang', 'IoT REST Contracts'],
      architectureNotes: [
        {
          title: 'Hardware-to-Cloud API Contract Standardization',
          problem:
            'Embedded vending machine controllers required strict, low-overhead JSON schemas and clear error states for inventory dispensing and payment callbacks.',
          solution:
            'Designed strict Pydantic models in FastAPI with automated OpenAPI specs so firmware and backend teams worked from a single source of truth.',
          impact: 'Eliminated integration ambiguity between embedded hardware and cloud backend.',
          tags: ['FastAPI', 'PostgreSQL', 'Embedded IoT'],
        },
      ],
    },
    {
      id: 'bakti-aksi',
      role: 'Freelance Technical Writer',
      company: 'PT Bakti Aksi',
      location: 'Bandung, ID',
      period: 'Jul 2024 – Oct 2024',
      domain: 'Network Infrastructure Documentation',
      summaryBullets: [
        'Produced end-to-end installation documentation for Wi-Fi infrastructure deployments across school networks.',
        'Standardized the technical writing process to remove ambiguity in field-engineer handoffs.',
      ],
      techStack: ['Technical Documentation', 'SOP Standardization', 'Network Architecture'],
    },
    {
      id: 'enakans',
      role: 'Web Developer',
      company: 'PT Enakans Media Teknologi',
      location: 'Bandung, ID',
      period: 'Jul 2023 – Jan 2024',
      domain: 'Enterprise Accounting & Portal Systems',
      summaryBullets: [
        'Migrated legacy PHP Zend frontend to ReactJS, improving UI performance and developer velocity.',
        'Built Juliet, an accounting management system on Zend Framework with complex multi-entity reporting, and maintained Ccarent & Telin Portal.',
      ],
      techStack: ['PHP', 'Zend Framework', 'ReactJS', 'Multi-Entity Accounting', 'SQL'],
    },
    {
      id: 'neuronworks',
      role: 'Web Tester (MSO)',
      company: 'PT Neuronworks',
      location: 'Bandung, ID',
      period: 'Mar 2022 – Jun 2022',
      domain: 'Quality Assurance & API Regression Testing',
      summaryBullets: [
        'Performed functional and regression API testing with Postman across service endpoints.',
        'Documented structured test cases and defect reports supporting stable production releases.',
      ],
      techStack: ['Postman', 'API Testing', 'Regression QA', 'Defect Tracking'],
    },
  ] as ExperienceItem[],

  projects: [
    // === TOP 4 FEATURED PROJECTS (Shown Initially) ===
    {
      id: 'task-management-platform',
      title: 'Project & Task Management Platform',
      subtitle: 'Built within a 72-Hour Engineering Assessment',
      badge: 'Featured • Fullstack Architecture',
      featured: true,
      description:
        'High-integrity project management system featuring granular role/state permissions, directed acyclic task dependency graphs (DAG), optimistic concurrency locking, and an immutable append-only audit trail.',
      highlights: [
        'Role & state-based permission matrix enforced at both Hono API middleware and UI layers',
        'Task dependency graph validation preventing circular blockers before state transitions',
        'Optimistic locking (`version` increment check) to prevent lost updates on concurrent edits',
        'Append-only audit trail recording actor, diff payload, and timestamp for every mutation',
      ],
      techStack: ['Bun', 'Hono', 'Prisma ORM', 'Next.js 16', 'TanStack Query', 'Zustand'],
    },
    {
      id: 'smartvending-api',
      title: 'SmartVending IoT API (convertAPIPy)',
      subtitle: 'Cloud Backend for Automated Vending Machines',
      badge: 'Featured • IoT & Backend Service',
      featured: true,
      repoUrl: 'https://github.com/alygmi/convertAPIPy',
      description:
        'Resilient backend service built with FastAPI and PostgreSQL for IoT-connected vending machines, orchestrating real-time slot inventory, cashless transactions, and hardware telemetry synchronization.',
      highlights: [
        'Atomic stock deduction and transaction state machine for unmanned hardware nodes',
        'Migrated core service from Golang to Python FastAPI (`convertAPIPy`)',
        'Clean OpenAPI schema contracts enabling plug-and-play firmware integration',
      ],
      techStack: ['Python', 'FastAPI', 'PostgreSQL', 'RESTful API', 'IoT Telemetry'],
    },
    {
      id: 'sayurku',
      title: 'Sayurku: Agricultural E-Commerce & Inventory',
      subtitle: 'Multi-Role Supply Chain & Payment Platform',
      badge: 'Featured • Enterprise E-Commerce',
      featured: true,
      description:
        'Fullstack agricultural commerce platform powered by Java Spring Boot and React, supporting multi-role access control (farmers/suppliers, warehouse admins, customers), real-time perishable stock tracking, and payment processing.',
      highlights: [
        'Multi-role authentication & authorization (Admin, Supplier, Buyer) in Spring Boot',
        'Relational MySQL inventory ledger preventing overselling during concurrent checkouts',
        'Responsive React storefront with integrated payment lifecycle handling',
      ],
      techStack: ['Java', 'Spring Boot', 'React', 'MySQL', 'REST API'],
    },
    {
      id: 'roastmycv-automation',
      title: 'RoastMyCv & CV Sender Automation',
      subtitle: 'AI Resume Analyzer & OAuth 2.0 Bulk Application Pipeline',
      badge: 'Featured • Live on Vercel',
      featured: true,
      repoUrl: 'https://github.com/alygmi/roast-my-cv',
      liveUrl: 'https://roast-my-cv-self.vercel.app',
      description:
        'Automated resume analysis tool ("rate your CV with good roast style, but still useful") paired with an OAuth 2.0-authenticated Gmail API pipeline that streamlines job application dispatches.',
      highlights: [
        'Live interactive web app deployed on Vercel (`roast-my-cv-self.vercel.app`)',
        'Automated resume parsing and actionable scoring feedback with constructive roast persona',
        'Secure Google OAuth 2.0 token lifecycle integration with Gmail API batch sender',
      ],
      techStack: ['Next.js', 'JavaScript', 'Python', 'Gmail API', 'OAuth 2.0', 'Vercel'],
    },

    // === ADDITIONAL GITHUB REPOSITORIES FROM github.com/alygmi (Revealed via "Show More") ===
    {
      id: 'artema-realtime-chat',
      title: 'Artema: Slack & Discord-Like Workspace',
      subtitle: 'Real-Time Team Messaging & Channel Service in Go',
      badge: 'GitHub Repo • Golang Backend',
      featured: false,
      repoUrl: 'https://github.com/alygmi/artema',
      description:
        'Slack and Discord-inspired real-time communication platform engineered in Go, designed around low-latency channel messaging, workspace isolation, and concurrent event broadcasting.',
      highlights: [
        'Built with Golang concurrency primitives for lightweight channel message routing',
        'Workspace & channel-based permission boundaries inspired by Discord/Slack architecture',
        'Structured REST & real-time event payload design',
      ],
      techStack: ['Go (Golang)', 'Real-Time Channels', 'REST API', 'Concurrency'],
    },
    {
      id: 'anyartech-office-purchase',
      title: 'AnyarTech: Office Management & Purchase Service',
      subtitle: 'Internal Procurement & Operations System',
      badge: 'GitHub Repo • Enterprise PHP',
      featured: false,
      repoUrl: 'https://github.com/alygmi/anyartech',
      description:
        'Internal office management and purchasing workflow system built in PHP, streamlining procurement requests, supplier tracking, and departmental operational approvals.',
      highlights: [
        'Structured purchase request lifecycle from submission to approval',
        'Centralized office asset and vendor purchasing records',
        'Role-based operational views for internal staff and administrators',
      ],
      techStack: ['PHP', 'Laravel / MVC', 'SQL', 'Procurement Workflow'],
    },
    {
      id: 'career-backend-laravel-jwt',
      title: 'Laravel JWT Auth & Real-Time External Search API',
      subtitle: 'Backend Engineering Assessment Repository',
      badge: 'GitHub Repo • REST API & JWT',
      featured: false,
      repoUrl: 'https://github.com/alygmi/CAREER_BackEnd_Al-Adiyat-Nur-Rusuli-Jaya',
      description:
        'Dedicated backend REST API service featuring stateless JWT authentication, complete User CRUD management, and real-time external API search aggregation.',
      highlights: [
        'Stateless JWT authentication middleware with token refresh & expiration guards',
        'RESTful User CRUD endpoints with strict request validation',
        'Real-time external data search integration and response normalization',
      ],
      techStack: ['PHP', 'Laravel', 'JWT Auth', 'REST API', 'Postman'],
    },
    {
      id: 'minishop-fullstack',
      title: 'MiniShop Fullstack & Ice-Stream Commerce',
      subtitle: 'Fullstack Storefront & Order Management Experiments',
      badge: 'GitHub Repo • Fullstack Web',
      featured: false,
      repoUrl: 'https://github.com/alygmi/minishop-fullstack',
      description:
        'Fullstack mini e-commerce application combining interactive JavaScript/React catalog browsing, cart state management, and backend order processing.',
      highlights: [
        'End-to-end product catalog, shopping cart state, and checkout flow',
        'Modular frontend-to-backend API integration',
        'Paired with Ice-Stream PHP backend service experiments',
      ],
      techStack: ['JavaScript', 'React', 'PHP', 'REST API', 'Fullstack'],
    },
    {
      id: 'fastapi-postgres-suite',
      title: 'FastAPI + PostgreSQL CRUD & JSON Ingestion Suite',
      subtitle: 'fastAPIcrud • pstgreJSON • ToDoListFastAPI',
      badge: 'GitHub Repo • Python Data Services',
      featured: false,
      repoUrl: 'https://github.com/alygmi/fastAPIcrud',
      description:
        'Collection of Python backend repositories demonstrating high-speed CRUD services with FastAPI, bulk JSON ingestion into PostgreSQL (`pstgreJSON`), and task APIs (`ToDoListFastAPI`).',
      highlights: [
        'Structured FastAPI + PostgreSQL CRUD patterns (`fastAPIcrud`)',
        'Automated JSON dataset parsing and relational insertion into PostgreSQL (`pstgreJSON`)',
        'Lightweight asynchronous endpoint design with Pydantic validation',
      ],
      techStack: ['Python', 'FastAPI', 'PostgreSQL', 'JSON Pipelines', 'SQL'],
    },
    {
      id: 'wedding-invitation-platform',
      title: 'Digital Wedding Invitation Platform (Laravel 10 & CI4)',
      subtitle: 'Custom Invitation Ordering & Production System',
      badge: 'GitHub Repo • Laravel 10 & CI4',
      featured: false,
      repoUrl: 'https://github.com/alygmi/wedding',
      description:
        'Web platform for ordering and generating digital wedding invitations, implemented across both Laravel 10 (`wedding`) and CodeIgniter 4 (`weddingProd`) architectures.',
      highlights: [
        'Customer order workflow for customizable digital wedding invitations',
        'Dual-framework implementation comparing Laravel 10 and CodeIgniter 4 patterns',
        'Dynamic guest RSVP, event schedule, and template rendering',
      ],
      techStack: ['PHP', 'Laravel 10', 'CodeIgniter 4', 'MySQL', 'Blade / Views'],
    },
  ] as KeyProject[],

  skillGroups: [
    {
      category: 'Backend & API Engineering',
      description: 'Core server-side frameworks, ORM layers, validation, and authentication.',
      skills: ['Laravel', 'Hono (Bun)', 'FastAPI', 'Spring Boot', 'Zend Framework', 'Prisma ORM', 'Zod', 'JWT'],
    },
    {
      category: 'Programming Languages',
      description: 'Polyglot production experience across strongly-typed and dynamic languages.',
      skills: ['PHP', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'SQL'],
    },
    {
      category: 'Frontend & Modern UI',
      description: 'Performant, accessible web interfaces with modern React state management.',
      skills: ['React 19', 'Next.js', 'TanStack Query', 'Zustand', 'React Hook Form', 'Tailwind CSS v4', 'Radix UI'],
    },
    {
      category: 'Data, ERP & Engineering Tools',
      description: 'Enterprise relational databases, ERP integration, and testing workflows.',
      skills: ['SQL Server', 'PostgreSQL', 'MySQL', 'SAP Business One', 'Firebase', 'Git', 'Postman', 'Vercel'],
    },
  ] as SkillGroup[],

  education: [
    {
      institution: 'Universitas Sangga Buana',
      location: 'Bandung, ID',
      degree: 'Undergraduate, Informatics',
      period: 'Oct 2024 – Present',
    },
    {
      institution: 'SMKN 13 Kota Bandung',
      location: 'Bandung, ID',
      degree: 'Software Engineering Vocational High School Diploma (RPL)',
      period: 'Jul 2019 – Jun 2022',
    },
  ] as EducationItem[],
};
