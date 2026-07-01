/**
 * Project data for portfolio showcase
 * Each project includes full details for modal view
 */
const PROJECTS = [
  {
    id: 'streetdeal',
    title: 'StreetDeal',
    subtitle: 'Digital Empowerment for Street Vendors',
    featured: false,
    image: null,
    images: [],
    tags: ['Figma', 'Full-Stack', 'UI/UX', 'AI'],
    year: '2025',
    award: 'TN-StartUp Finalist',
    description: 'A full-stack platform empowering street vendors with AI-driven income tracking, digital storefronts, and geofencing-based discovery — designed with low-literacy-friendly interfaces to accelerate MSME growth for underserved vendors.',
    features: [
      'Low-literacy-friendly interface design for accessibility',
      'AI-driven income tracking and financial insights',
      'Digital storefront creation for street vendors',
      'Geofencing-based vendor discovery for customers',
      'Full-stack architecture with responsive mobile-first design'
    ],
    challenges: [
      'Designing for users with varying literacy levels and tech familiarity',
      'Creating intuitive navigation without relying on complex text instructions',
      'Balancing feature richness with simplicity for first-time digital users'
    ],
    impact: 'Selected as TN-StartUp finalist — bridging the digital divide for underserved street vendors across Tamil Nadu.',
    github: 'https://github.com/RishonAnton',
    demo: null
  },
  {
    id: 'customcruise',
    title: 'CustomCruise',
    subtitle: 'AR Vehicle Customization Platform',
    featured: true,
    image: 'pictures/CustomCruise1.jpg',
    images: [
      'pictures/CustomCruise1.jpg',
      'pictures/CustomCruise2.jpg',
      'pictures/CustomCruise3.jpg',
      'pictures/CustomCruise4.jpg'
    ],
    tags: ['Figma', 'Flutter', 'Vuforia', 'Unity', 'AR'],
    year: '2024',
    award: '2nd Place — Hack-O-Mania · ₹7,000',
    description: 'An AR-based vehicle customization app with a clean, cross-platform Flutter interface — letting users preview custom finishes, performance upgrades, and AR previews on their dream ride in real time.',
    features: [
      'AR preview using Vuforia and Unity integration',
      'Cross-platform Flutter interface with dark automotive aesthetic',
      'Community, mechanics, and shop discovery modules',
      'Interactive 3D vehicle customization with real-time preview',
      'Performance metrics and satisfaction tracking dashboard'
    ],
    challenges: [
      'Integrating AR (Vuforia/Unity) with Flutter cross-platform architecture',
      'Creating an immersive dark UI that complements 3D vehicle renders',
      'Designing intuitive customization flows within a 48-hour hackathon timeline'
    ],
    impact: 'Awarded 2nd place and ₹7,000 prize at Hack-O-Mania 2024 for innovative AR automotive experience.',
    github: 'https://github.com/RishonAnton',
    demo: null
  },
  {
    id: 'medflow',
    title: 'MedFlow',
    subtitle: 'Healthcare Management Mobile App',
    featured: false,
    image: 'pictures/MedFlow1.jpg',
    images: [
      'pictures/MedFlow1.jpg',
      'pictures/MedFlow2.jpg',
      'pictures/MedFlow3.jpg',
      'pictures/MedFlow4.jpg',
      'pictures/MedFlow5.jpg',
      'pictures/MedFlow6.jpg',
      'pictures/MedFlow7.jpg'
    ],
    tags: ['UI/UX', 'Mobile Design', 'Healthcare', 'AR'],
    year: '2024',
    award: null,
    description: 'A comprehensive healthcare management mobile application featuring QR-based medical records, appointment scheduling, medication reminders, AR visualization, and telehealth connectivity — designed for intuitive patient-centric care.',
    features: [
      'QR code scanning for instant medical record access',
      'Appointment scheduling with calendar integration',
      'Smart medication and appointment reminders',
      'AR View for medical visualization and education',
      'E-commerce module for medicine ordering',
      'Direct doctor contact and telehealth messaging'
    ],
    challenges: [
      'Designing a color-coded action grid that prioritizes critical healthcare tasks',
      'Creating accessible navigation for users of all age groups',
      'Integrating multiple healthcare workflows into a cohesive mobile experience'
    ],
    impact: 'Unified six critical healthcare workflows into a single, intuitive mobile interface with clear visual hierarchy.',
    github: 'https://github.com/RishonAnton',
    demo: null
  },
  {
    id: 'skin-detector',
    title: 'AML Skin Care',
    subtitle: 'AI-Powered Skin Disease Detector',
    featured: false,
    image: 'pictures/SkinDiseaseDetector1.jpg',
    images: [
      'pictures/SkinDiseaseDetector1.jpg',
      'pictures/SkinDiseaseDetector2.jpg',
      'pictures/SkinDiseaseDetector3.jpg',
      'pictures/SkinDiseaseDetector4.jpg'
    ],
    tags: ['AI/ML', 'Healthcare', 'Web App', 'UI/UX'],
    year: '2024',
    award: 'Best Project — ProjectFest \'24 · ₹10,000',
    description: 'An AI-powered skin disease detection platform that analyzes dermoscopic images to identify potential skin conditions — featuring doctor connectivity, health informatics, e-commerce, and community support modules.',
    features: [
      'AI-powered skin lesion analysis with instant predictions',
      'Dermoscopic image upload and diagnostic results',
      'Doctor connectivity and telehealth consultation',
      'Health informatics dashboard with patient data',
      'E-commerce integration for skincare products',
      'Community forum for patient support and awareness'
    ],
    challenges: [
      'Designing a sensitive healthcare UI that communicates diagnostic results empathetically',
      'Balancing medical accuracy presentation with user-friendly language',
      'Creating a multi-module platform spanning diagnosis, commerce, and community'
    ],
    impact: 'Won Best Project Award at ProjectFest \'24 (Top 5 of 110 teams) with ₹10,000 prize — recognized for AI innovation in healthcare.',
    github: 'https://github.com/RishonAnton',
    demo: null
  },
  {
    id: 'techchallengethon',
    title: 'TechChallengethon',
    subtitle: 'Collaborative Hackathon Project',
    featured: false,
    image: 'pictures/TechChallengethon1.jpg',
    images: ['pictures/TechChallengethon1.jpg', 'pictures/TechChallengethon2.jpg'],
    tags: ['Team Project', 'Hackathon', 'Full-Stack'],
    year: '2024',
    award: null,
    description: 'A collaborative hackathon project built under intense time pressure at St. Joseph\'s College of Engineering — demonstrating rapid prototyping, team coordination, and full-stack development skills.',
    features: [
      'Rapid prototyping under hackathon time constraints',
      'Cross-functional team collaboration and task delegation',
      'End-to-end product development from ideation to demo',
      'Technical presentation to evaluators and peers'
    ],
    challenges: [
      'Delivering a functional prototype within strict hackathon deadlines',
      'Coordinating design and development across team members simultaneously',
      'Presenting technical solutions clearly under evaluation pressure'
    ],
    impact: 'Strengthened collaborative development skills and ability to ship under pressure — core competencies for high-growth engineering teams.',
    github: 'https://github.com/RishonAnton',
    demo: null
  }
];
