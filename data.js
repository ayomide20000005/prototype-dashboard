// dashboard/data.js
// Career + roadmap data (taken from the main Carilume site).
// Loaded before app.js, so everything here is available globally.

const CARILUME_URL = 'https://carilume.ng';
const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb80oFI6mYPSSKmWOl0V';

// Index matches the "hours per week" answer on the main site (0–3)
const HOURS_LABELS = [
  'under 5 hrs/week',
  '5–10 hrs/week',
  '10–20 hrs/week',
  '20+ hrs/week'
];

// Personalised timeline per career, indexed by hours answer (0–3)
const TIMELINE_MAP = {
  uiux:   ['14 months', '10 months', '8 months', '5 months'],
  webdev: ['18 months', '14 months', '10 months', '7 months'],
  data:   ['14 months', '10 months', '8 months', '5 months'],
  digmkt: ['8 months',  '6 months',  '4 months', '3 months'],
  cyber:  ['20 months', '16 months', '12 months', '9 months']
};

// Circle colours for phases 1–4 on the roadmap
const PHASE_COLORS = [
  { bg: '#E6F1FB', text: '#185FA5' },
  { bg: '#E1F5EE', text: '#0F6E56' },
  { bg: '#EEEDFE', text: '#3C3489' },
  { bg: '#FAEEDA', text: '#633806' }
];

const CAREERS = {
  uiux: {
    key: 'uiux',
    name: 'UI/UX Design',
    emoji: '🎨',
    apt: 'People with your profile — visual thinkers who value creative, tangible output — typically thrive in UI/UX design.',
    phases: [
      {
        name: 'Foundation', duration: 'Months 1–2',
        focus: 'Learn Figma and UI/UX fundamentals. Complete the Google UX Design intro module. Understand design principles without tools first.',
        goal: 'By the end of this phase, you can use Figma confidently and explain UI/UX design clearly to someone who has never heard of it.',
        milestone: 'Design 2 complete practice screens from scratch using Figma'
      },
      {
        name: 'Build', duration: 'Months 2–5',
        focus: 'Design 3 portfolio case studies — real or concept projects. Get your first feedback from a working designer via community or mentor.',
        goal: 'By the end of this phase, you have 3 complete portfolio case studies ready to show to employers or clients.',
        milestone: '3 complete case studies hosted on Behance or personal site'
      },
      {
        name: 'Specialise', duration: 'Months 5–7',
        focus: 'Complete the Google UX advanced modules. Learn user research methodology, accessibility standards, and interaction design.',
        goal: 'By the end of this phase, you can conduct user research, present designs confidently, and explain your decisions in an interview.',
        milestone: 'Portfolio reviewed and refined — ready to show to employers'
      },
      {
        name: 'Launch', duration: 'Months 7–8',
        focus: 'Apply to 3 roles or pitch 3 freelance clients per week. Optimise LinkedIn profile. Use portfolio actively in every application.',
        goal: 'By the end of this phase, you have applied to your first 10 roles or pitched your first 5 clients and received genuine feedback.',
        milestone: 'First paid role or client signed — you are a working designer'
      }
    ]
  },

  webdev: {
    key: 'webdev',
    name: 'Web Development',
    emoji: '💻',
    apt: 'People with your profile — logical thinkers who enjoy building systems that work — typically excel in web development.',
    phases: [
      {
        name: 'Foundation', duration: 'Months 1–3',
        focus: 'Learn HTML and CSS from scratch using freeCodeCamp. Build 5 static web pages. Understand how browsers render content.',
        goal: 'By the end of this phase, you can build a static website from scratch and host it publicly on GitHub Pages.',
        milestone: '5 complete static pages built and published on GitHub Pages'
      },
      {
        name: 'Build', duration: 'Months 3–7',
        focus: 'Learn JavaScript fundamentals. Complete the freeCodeCamp JS curriculum. Build 3 interactive projects — a calculator, a to-do app, and one of your own ideas.',
        goal: 'By the end of this phase, you can write JavaScript to make web pages interactive and have 3 projects live on GitHub.',
        milestone: '3 JavaScript projects live on GitHub with clean, readable code'
      },
      {
        name: 'Specialise', duration: 'Months 7–9',
        focus: 'Choose your path — frontend (React) or backend (Node.js). Go deep on your chosen specialisation. Build one substantial project in your stack.',
        goal: 'By the end of this phase, you can build and deploy a complete web application using your chosen framework or backend.',
        milestone: 'One production-grade project deployed and linked on your LinkedIn'
      },
      {
        name: 'Launch', duration: 'Months 9–10',
        focus: 'Apply to junior developer roles or pitch freelance clients. Build your GitHub profile. Optimise your LinkedIn. Aim for 10 applications or pitches per week.',
        goal: 'By the end of this phase, you have a polished GitHub portfolio, an optimised LinkedIn, and have applied to 10 junior roles.',
        milestone: 'First junior role offer received or first paying client signed'
      }
    ]
  },

  data: {
    key: 'data',
    name: 'Data Analysis',
    emoji: '📊',
    apt: 'People with your profile — analytical thinkers who find patterns and insights where others see noise — typically thrive in data analysis.',
    phases: [
      {
        name: 'Foundation', duration: 'Months 1–2',
        focus: 'Master Excel for data analysis — pivot tables, VLOOKUP, charts, and basic statistics. Begin the Google Data Analytics certificate.',
        goal: 'By the end of this phase, you can analyse a dataset in Excel and present findings as a clear, professional report.',
        milestone: 'Complete 2 Excel analysis projects using real or publicly available Nigerian datasets'
      },
      {
        name: 'Build', duration: 'Months 2–5',
        focus: 'Learn SQL to extract and analyse data from databases. Work through the Mode Analytics or SQLZoo SQL curriculum. Build 2 end-to-end analysis projects you can present.',
        goal: 'By the end of this phase, you can write SQL queries to extract and summarise data and have completed 2 analysis projects.',
        milestone: '2 complete data analysis projects with findings presented as clear reports'
      },
      {
        name: 'Specialise', duration: 'Months 5–7',
        focus: 'Learn Python for data analysis using pandas and matplotlib. Build dashboards in Power BI or Tableau. Participate in a Kaggle competition.',
        goal: 'By the end of this phase, you can build Power BI dashboards and write basic Python for data analysis.',
        milestone: 'Power BI dashboard and one Python analysis project published on GitHub'
      },
      {
        name: 'Launch', duration: 'Months 7–8',
        focus: 'Apply to junior analyst roles. Set up a Kaggle portfolio. Optimise LinkedIn with your projects. Target banks, fintechs, and FMCG companies specifically.',
        goal: 'By the end of this phase, you have a data portfolio on Kaggle or GitHub and have applied to your first analyst roles.',
        milestone: 'First analyst job offer or first data freelance contract signed'
      }
    ]
  },

  digmkt: {
    key: 'digmkt',
    name: 'Digital Marketing',
    emoji: '📱',
    apt: 'People with your profile — communicators who understand people and enjoy crafting messages that land — typically excel in digital marketing.',
    phases: [
      {
        name: 'Foundation', duration: 'Months 1–2',
        focus: 'Complete the Google Digital Marketing & E-commerce certificate. Learn the fundamentals — SEO, social media, email marketing, and paid advertising concepts.',
        goal: 'By the end of this phase, you understand all major digital marketing channels and have earned the Google Digital Marketing certificate.',
        milestone: 'Google Digital Marketing certificate earned and LinkedIn profile updated'
      },
      {
        name: 'Build', duration: 'Months 2–3',
        focus: 'Run real campaigns — even small ones with minimal budget. Practice writing ad copy, setting up Meta and Google campaigns, and reading analytics dashboards.',
        goal: 'By the end of this phase, you have run real campaigns on Meta and Google — even with a small budget — and documented the results.',
        milestone: 'Run 2 live campaigns (even small budget) and document the results honestly'
      },
      {
        name: 'Specialise', duration: 'Months 3–4',
        focus: 'Pick one specialisation — paid social, SEO, email marketing, or content strategy — and go deep. Build a case study from your Phase 2 campaigns.',
        goal: 'By the end of this phase, you have one specialisation and a case study that proves you can drive results.',
        milestone: 'One detailed case study showing campaign setup, results, and learnings'
      },
      {
        name: 'Launch', duration: 'Months 4–5',
        focus: 'Pitch your first 5 freelance clients or apply to marketing agencies. Your case study is your portfolio. One good result is more convincing than any certificate.',
        goal: 'By the end of this phase, you have your first paying client on retainer or your first full-time marketing role offer.',
        milestone: 'First paying client on retainer or first full-time marketing role secured'
      }
    ]
  },

  cyber: {
    key: 'cyber',
    name: 'Cybersecurity',
    emoji: '🔒',
    apt: 'People with your profile — analytical, logical thinkers who enjoy understanding how systems work and how they can be protected — typically excel in cybersecurity.',
    phases: [
      {
        name: 'Foundation', duration: 'Months 1–3',
        focus: 'Understand how computers and networks work before learning to protect them. Complete the Google Cybersecurity Certificate. Learn basic Linux commands.',
        goal: 'By the end of this phase, you can navigate Linux confidently, explain how TCP/IP works, and describe the main categories of cyber threats.',
        milestone: 'Comfortable using Linux command line and able to explain how TCP/IP works'
      },
      {
        name: 'Build', duration: 'Months 3–7',
        focus: 'Learn core security concepts using TryHackMe and the CompTIA Security+ study materials. Practice in legal lab environments daily. Study threat analysis and incident response.',
        goal: 'By the end of this phase, you have passed the CompTIA Security+ exam — the foundational industry credential.',
        milestone: 'CompTIA Security+ exam passed — the industry’s foundational credential'
      },
      {
        name: 'Specialise', duration: 'Months 7–10',
        focus: 'Choose a specialisation — penetration testing, security operations (SOC), cloud security, or GRC. Build practical experience through TryHackMe rooms and CTF competitions.',
        goal: 'By the end of this phase, you have chosen a specialisation track and have hands-on lab experience to demonstrate it.',
        milestone: 'One specialisation track completed with portfolio evidence on GitHub or LinkedIn'
      },
      {
        name: 'Launch', duration: 'Months 10–12',
        focus: 'Apply for junior SOC analyst or security analyst roles. Highlight your Security+ certification, lab experience, and any CTF achievements. Network actively on LinkedIn.',
        goal: 'By the end of this phase, you have applied to SOC analyst or security analyst roles and positioned yourself as a credentialled candidate.',
        milestone: 'First cybersecurity role secured — you are a working security professional'
      }
    ]
  }
};

// Personalised timeline label, e.g. getTimeline('uiux', 2) -> '8 months'
function getTimeline(careerKey, hoursIndex) {
  const map = TIMELINE_MAP[careerKey];
  return (map && map[hoursIndex]) || '';
}