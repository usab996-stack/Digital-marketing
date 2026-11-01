import { CourseItem, SoftwareItem } from '../types';

export const INITIAL_COURSES: CourseItem[] = [
  {
    id: 'course-1',
    type: 'course',
    title: 'Full-Stack Modern Web & Mobile Development Masterclass',
    category: 'Web Development',
    description: 'Complete zero-to-hero roadmap covering React 19, Next.js, Node.js, TypeScript, PostgreSQL, and Cloud Deployment with real production apps.',
    instructor: 'Sagar & Senior Dev Mentors',
    level: 'Masterclass',
    duration: '48 Hours · 12 Weeks',
    modulesCount: 24,
    rating: 4.9,
    studentsCount: 3420,
    primaryLink: 'https://drive.google.com/drive/folders/sagar-brand-fullstack-masterclass',
    mirrorLink: 'https://mega.nz/folder/sagar-brand-webdev-mirror',
    telegramLink: 'https://t.me/sagarbrand_vip',
    thumbnail: '/src/assets/images/course_masterclass_banner_1793506322464.jpg',
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    syllabus: [
      {
        title: 'Module 1: Foundations & Modern JavaScript Deep Dive',
        duration: '4 Hours',
        topics: ['ES2024 features', 'Event loops & concurrency', 'Memory management', 'Asynchronous architectures']
      },
      {
        title: 'Module 2: React 19 & Next.js App Router Architecture',
        duration: '8 Hours',
        topics: ['Server Components (RSC)', 'Actions & mutation pipelines', 'State stores', 'Zustand patterns']
      },
      {
        title: 'Module 3: Scalable Backend Services & Databases',
        duration: '12 Hours',
        topics: ['REST & GraphQL APIs', 'PostgreSQL & Prisma ORM', 'JWT & OAuth2', 'Docker containers']
      },
      {
        title: 'Module 4: Real-Time Systems, WebSockets & Production Deploy',
        duration: '10 Hours',
        topics: ['Socket.IO infrastructure', 'CI/CD pipelines', 'Cloud Run / AWS deployment', 'Edge performance']
      }
    ],
    isFeatured: true,
    order: 1
  },
  {
    id: 'course-2',
    type: 'course',
    title: 'Graphic Design, Branding & UI/UX Design System Pro',
    category: 'Design & UI/UX',
    description: 'Master Photoshop, Illustrator, and Figma. Learn typography math, color psychology, modern design systems, 3D elements, and real client pitch deck design.',
    instructor: 'Sagar Creative Academy',
    level: 'Intermediate',
    duration: '36 Hours · 8 Weeks',
    modulesCount: 18,
    rating: 4.8,
    studentsCount: 2890,
    primaryLink: 'https://drive.google.com/drive/folders/sagar-brand-graphic-uiux-pro',
    mirrorLink: 'https://mega.nz/folder/sagar-brand-graphic-mirror',
    telegramLink: 'https://t.me/sagarbrand_vip',
    thumbnail: '/src/assets/images/hero_sagar_brand_1793506320862.jpg',
    tags: ['Figma', 'Photoshop', 'Illustrator', 'Design Systems', 'Branding'],
    syllabus: [
      {
        title: 'Module 1: Visual Identity & Brand Logo Creation',
        duration: '6 Hours',
        topics: ['Vector mastery in Illustrator', 'Typography pairing rules', 'Golden ratio grid systems', 'Brand guidelines']
      },
      {
        title: 'Module 2: High-End Photo Manipulation & Retouching',
        duration: '8 Hours',
        topics: ['Color grading in Photoshop', 'Lighting & shadow synthesis', 'Commercial ad posters', 'Social media kit']
      },
      {
        title: 'Module 3: Figma UI/UX Design Systems & Micro-Interactions',
        duration: '12 Hours',
        topics: ['Auto-layout 5.0', 'Variables & tokens', 'Interactive prototyping', 'Design handoff workflow']
      }
    ],
    isFeatured: true,
    order: 2
  },
  {
    id: 'course-3',
    type: 'course',
    title: 'Cinematic Video Editing, After Effects VFX & 3D Motion',
    category: 'Video & Animation',
    description: 'Premier Pro & After Effects power course. Motion graphics, transitions, sound design, Hollywood color grading with DaVinci Resolve, and viral social formatting.',
    instructor: 'Sagar Media Lab',
    level: 'Advanced',
    duration: '42 Hours · 10 Weeks',
    modulesCount: 20,
    rating: 4.9,
    studentsCount: 1940,
    primaryLink: 'https://drive.google.com/drive/folders/sagar-brand-video-editing-vfx',
    mirrorLink: 'https://mega.nz/folder/sagar-brand-video-mirror',
    telegramLink: 'https://t.me/sagarbrand_vip',
    thumbnail: '/src/assets/images/software_vault_banner_1793506321691.jpg',
    tags: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Sound Design', 'VFX'],
    syllabus: [
      {
        title: 'Module 1: Storytelling & Fast-Paced Narrative Editing',
        duration: '8 Hours',
        topics: ['Rough cut to fine cut', 'Pacing & rhythm', 'B-roll orchestration', 'Multi-camera editing']
      },
      {
        title: 'Module 2: DaVinci Resolve Color Grading & HDR',
        duration: '10 Hours',
        topics: ['Node-based color pipelines', 'LUT creation', 'Skin tone isolation', 'Cinematic film look emulation']
      },
      {
        title: 'Module 3: After Effects Motion Graphics & Visual Effects',
        duration: '14 Hours',
        topics: ['3D camera tracking', 'Kinetic typography', 'Screen replacement', 'Particle systems & audio reactivity']
      }
    ],
    isFeatured: false,
    order: 3
  },
  {
    id: 'course-4',
    type: 'course',
    title: 'Python Automation, AI Agents & Machine Learning Engineering',
    category: 'AI & Python',
    description: 'Build real-world bots, web scrapers, data pipelines, LLM agents with LangChain & Gemini, and automated workflow scripts for business tasks.',
    instructor: 'Sagar Tech Studio',
    level: 'Intermediate',
    duration: '32 Hours · 6 Weeks',
    modulesCount: 16,
    rating: 4.9,
    studentsCount: 2150,
    primaryLink: 'https://drive.google.com/drive/folders/sagar-brand-python-ai-agents',
    mirrorLink: 'https://mega.nz/folder/sagar-brand-python-mirror',
    telegramLink: 'https://t.me/sagarbrand_vip',
    thumbnail: '/src/assets/images/hero_sagar_brand_1793506320862.jpg',
    tags: ['Python', 'AI Agents', 'Automation', 'Web Scraping', 'APIs'],
    syllabus: [
      {
        title: 'Module 1: Python Core & System Automation',
        duration: '6 Hours',
        topics: ['File system automation', 'API requests & JSON parsing', 'Task scheduling', 'Selenium & Playwright']
      },
      {
        title: 'Module 2: AI Agents, Prompt Engineering & LLM APIs',
        duration: '12 Hours',
        topics: ['Gemini API SDK', 'Function calling & tool execution', 'RAG search databases', 'Autonomous bot design']
      }
    ],
    isFeatured: false,
    order: 4
  },
  {
    id: 'course-5',
    type: 'course',
    title: 'Ethical Hacking, Penetration Testing & Network Security',
    category: 'Cyber Security',
    description: 'Learn Kali Linux, Wireshark, Metasploit, web application security (OWASP Top 10), and vulnerability assessment from certified security professionals.',
    instructor: 'Sagar Cyber Squad',
    level: 'Advanced',
    duration: '40 Hours · 9 Weeks',
    modulesCount: 22,
    rating: 4.9,
    studentsCount: 1680,
    primaryLink: 'https://drive.google.com/drive/folders/sagar-brand-cyber-security',
    mirrorLink: 'https://mega.nz/folder/sagar-brand-cyber-mirror',
    telegramLink: 'https://t.me/sagarbrand_vip',
    thumbnail: '/src/assets/images/software_vault_banner_1793506321691.jpg',
    tags: ['Kali Linux', 'PenTesting', 'OWASP', 'Wireshark', 'Network Security'],
    syllabus: [
      {
        title: 'Module 1: Reconnaissance & Network Scanning',
        duration: '8 Hours',
        topics: ['Nmap advanced scripting', 'Wireshark packet inspection', 'DNS & OSINT mapping', 'Port exploitation']
      },
      {
        title: 'Module 2: Web App Penetration Testing',
        duration: '12 Hours',
        topics: ['SQL injection defense', 'XSS & CSRF security', 'Authentication bypasses', 'API fuzzing']
      }
    ],
    isFeatured: false,
    order: 5
  },
  {
    id: 'course-6',
    type: 'course',
    title: 'High-Ticket Freelancing, Upwork Domination & Agency Scaling',
    category: 'Business & Freelancing',
    description: 'How to land international clients on Upwork, Fiverr, and LinkedIn. Proposal writing templates, contract negotiation, client retention, and agency scaling tactics.',
    instructor: 'Sagar Khan (Founder)',
    level: 'Masterclass',
    duration: '22 Hours · 4 Weeks',
    modulesCount: 12,
    rating: 5.0,
    studentsCount: 4200,
    primaryLink: 'https://drive.google.com/drive/folders/sagar-brand-freelancing-mastery',
    mirrorLink: 'https://mega.nz/folder/sagar-brand-freelance-mirror',
    telegramLink: 'https://t.me/sagarbrand_vip',
    thumbnail: '/src/assets/images/course_masterclass_banner_1793506322464.jpg',
    tags: ['Upwork', 'Freelancing', 'Client Closing', 'Agency', 'Dollar Earnings'],
    syllabus: [
      {
        title: 'Module 1: Irresistible Profile Optimization & Portfolio Stacking',
        duration: '5 Hours',
        topics: ['Profile SEO for Upwork & LinkedIn', 'High-converting case study structure', 'Pricing your services high']
      },
      {
        title: 'Module 2: 80% Win-Rate Proposals & Video Pitching',
        duration: '6 Hours',
        topics: ['Custom proposal frameworks', 'Loom video pitch scripts', 'Handling objections & revisions']
      }
    ],
    isFeatured: true,
    order: 6
  }
];

export const INITIAL_SOFTWARES: SoftwareItem[] = [
  {
    id: 'soft-1',
    type: 'software',
    title: 'Adobe Creative Cloud Master Suite 2025 (Pre-Activated)',
    category: 'Creative & Media',
    description: 'Full suite including Photoshop 2025, Premiere Pro, Illustrator, After Effects, and Audition. 1-Click offline installer, verified clean without bloatware.',
    version: 'v26.2.0 Complete Edition',
    fileSize: '14.8 GB',
    platform: 'Windows',
    verifiedClean: true,
    downloadUrl: 'https://drive.google.com/drive/folders/sagar-brand-adobe-cc-2025',
    mirrorUrl: 'https://mega.nz/folder/sagar-brand-adobe-mirror',
    torrentUrl: 'magnet:?xt=urn:btih:sagarbrandadobe2025suite',
    thumbnail: '/src/assets/images/software_vault_banner_1793506321691.jpg',
    tags: ['Photoshop', 'Premiere', 'Illustrator', 'Design', 'Full Suite'],
    installSteps: [
      'Extract the 7-Zip / RAR archive using WinRAR or 7-Zip.',
      'Temporarily disable Windows Defender Real-Time Protection during installation.',
      'Run the "Autoplay.exe" as Administrator.',
      'Select the specific Adobe apps you wish to install.',
      'Click Install and wait 5-10 minutes. The apps are pre-activated with permanent offline license.'
    ],
    systemRequirements: 'Windows 10/11 64-bit · 16 GB RAM (32 GB recommended) · 4 GB VRAM GPU · 40 GB Free SSD Space',
    isFeatured: true,
    order: 1
  },
  {
    id: 'soft-2',
    type: 'software',
    title: 'DaVinci Resolve Studio 19.1 Ultra Color & VFX',
    category: 'Creative & Media',
    description: 'Industry-standard Hollywood color grading, Fairlight sound studio, and Fusion VFX with GPU neural engine acceleration unlocked.',
    version: 'v19.1.2 Build 24',
    fileSize: '4.6 GB',
    platform: 'Multi-Platform',
    verifiedClean: true,
    downloadUrl: 'https://drive.google.com/drive/folders/sagar-brand-davinci-studio-19',
    mirrorUrl: 'https://mega.nz/folder/sagar-brand-davinci-mirror',
    thumbnail: '/src/assets/images/course_masterclass_banner_1793506322464.jpg',
    tags: ['DaVinci Resolve', 'Color Grading', 'Studio', 'VFX', 'Video Editing'],
    installSteps: [
      'Run "Install Resolve 19.1.2.exe".',
      'Follow wizard steps and complete default installation.',
      'Copy the cracked dlls from "Crack/Studio_Patch" folder into the main install directory (C:\\Program Files\\Blackmagic Design\\DaVinci Resolve).',
      'Launch and enjoy Studio features including Neural Engine face refinement and Magic Mask.'
    ],
    systemRequirements: 'Windows 10/11 or macOS Sonoma/Sequoia · 16 GB RAM · NVIDIA RTX or AMD Radeon 6000+ with 6GB VRAM',
    isFeatured: true,
    order: 2
  },
  {
    id: 'soft-3',
    type: 'software',
    title: 'Visual Studio Code Pro Developer Powerpack 2025',
    category: 'Developer Tools',
    description: 'Custom curated development bundle: VS Code with 60+ pre-configured extensions, Node.js LTS, Git, Python 3.12, Prettier, Docker tools, and Sagar Brand dark themes.',
    version: 'v1.98.0 DevPack Edition',
    fileSize: '850 MB',
    platform: 'Multi-Platform',
    verifiedClean: true,
    downloadUrl: 'https://drive.google.com/drive/folders/sagar-brand-vscode-powerpack',
    mirrorUrl: 'https://mega.nz/folder/sagar-brand-vscode-mirror',
    thumbnail: '/src/assets/images/hero_sagar_brand_1793506320862.jpg',
    tags: ['VS Code', 'Python', 'Node.js', 'Git', 'Extensions', 'Development'],
    installSteps: [
      'Extract the package to any folder.',
      'Double-click "Install_Environment.bat" to register path variables and extensions.',
      'Launch VS Code with full language support and AI linters ready.'
    ],
    systemRequirements: 'Windows, macOS or Linux · 4 GB RAM · 2 GB Disk Space',
    isFeatured: false,
    order: 3
  },
  {
    id: 'soft-4',
    type: 'software',
    title: 'Windows 11 / 10 Ultimate Debloater & Gaming Optimizer Pro',
    category: 'System Optimization',
    description: 'Sagar Brand exclusive tuning suite. Removes Windows telemetry, disables background bloat, optimizes CPU latency, frees up RAM, and boosts gaming FPS by up to 35%.',
    version: 'v4.2.8 Enterprise',
    fileSize: '45 MB',
    platform: 'Windows',
    verifiedClean: true,
    downloadUrl: 'https://drive.google.com/drive/folders/sagar-brand-windows-optimizer',
    mirrorUrl: 'https://mega.nz/folder/sagar-brand-optimizer-mirror',
    thumbnail: '/src/assets/images/software_vault_banner_1793506321691.jpg',
    tags: ['Windows 11', 'Optimization', 'FPS Booster', 'Debloat', 'RAM Cleaner'],
    installSteps: [
      'Right-click "Sagar_Optimizer.exe" and click Run as Administrator.',
      'Create a System Restore point with 1 click in the "Backup" tab.',
      'Click "Apply Recommended Fast Preset" and reboot your computer.'
    ],
    systemRequirements: 'Windows 10 (21H2+) or Windows 11 (all builds)',
    isFeatured: true,
    order: 4
  },
  {
    id: 'soft-5',
    type: 'software',
    title: 'Internet Download Manager (IDM) 6.42 + Clean Trial Reset',
    category: 'Utilities & Downloaders',
    description: 'High-speed multi-threaded downloader with modern clean patcher, browser extension auto-integration for Chrome/Brave/Edge, and permanent status.',
    version: 'v6.42 Build 25',
    fileSize: '18 MB',
    platform: 'Windows',
    verifiedClean: true,
    downloadUrl: 'https://drive.google.com/drive/folders/sagar-brand-idm-complete',
    mirrorUrl: 'https://mega.nz/folder/sagar-brand-idm-mirror',
    thumbnail: '/src/assets/images/hero_sagar_brand_1793506320862.jpg',
    tags: ['IDM', 'Downloader', 'High Speed', 'Internet Tool'],
    installSteps: [
      'Exit any running IDM from system tray.',
      'Run "idman642build25.exe" to install.',
      'Run "IDM_Activator.cmd" as admin and choose option [1] Activate.',
      'Enable IDM Integration Module extension in your web browser.'
    ],
    systemRequirements: 'Windows XP / 7 / 8 / 10 / 11 (32-bit & 64-bit)',
    isFeatured: false,
    order: 5
  },
  {
    id: 'soft-6',
    type: 'software',
    title: 'Blender 4.3 Studio VFX & 3D Render Toolkit',
    category: '3D & VFX',
    description: 'Full 3D modeling and animation powerhouse pre-bundled with 20+ top geometry node packs, procedural material library, and Cycles GPU raytracing presets.',
    version: 'v4.3.2 Studio Pack',
    fileSize: '3.2 GB',
    platform: 'Multi-Platform',
    verifiedClean: true,
    downloadUrl: 'https://drive.google.com/drive/folders/sagar-brand-blender-studio-toolkit',
    mirrorUrl: 'https://mega.nz/folder/sagar-brand-blender-mirror',
    thumbnail: '/src/assets/images/course_masterclass_banner_1793506322464.jpg',
    tags: ['Blender 4.3', '3D Modeling', 'Cycles', 'Animation', 'Assets'],
    installSteps: [
      'Install Blender from the installer file.',
      'Copy the "assets_library" folder to your Documents directory.',
      'In Blender Preferences > File Paths, point Asset Libraries to the copied folder.'
    ],
    systemRequirements: 'Windows / macOS / Linux · 8 GB RAM (16 GB recommended) · OpenGL 4.3 compatible GPU',
    isFeatured: false,
    order: 6
  }
];
