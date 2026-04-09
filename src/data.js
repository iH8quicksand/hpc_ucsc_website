// data.js

export const SITE_DATA = {
  // --- Global App Settings ---
  asciiLogo: `
 /$$   /$$  /$$$$$$   /$$$$$$   /$$$$$$        /$$   /$$ /$$$$$$$   /$$$$$$ 
| $$  | $$ /$$__  $$ /$$__  $$ /$$__  $$      | $$  | $$| $$__  $$ /$$__  $$
| $$  | $$| $$  \\__/| $$  \\__/| $$  \\__/      | $$  | $$| $$  \\ $$| $$  \\__/
| $$  | $$| $$      |  $$$$$$ | $$            | $$$$$$$$| $$$$$$$/| $$      
| $$  | $$| $$       \\____  $$| $$            | $$__  $$| $$____/ | $$      
| $$  | $$| $$    $$ /$$  \\ $$| $$    $$      | $$  | $$| $$      | $$    $$
|  $$$$$$/|  $$$$$$/|  $$$$$$/|  $$$$$$/      | $$  | $$| $$      |  $$$$$$/
 \\______/  \\______/  \\______/  \\______/       |__/  |__/|__/       \\______/ 
`,
  bootSequence: [
    "Initializing kernel...",
    "Loading UCSC HPC modules...",
    "Connecting to humming-bird.ucsc.edu:22...",
    "Handshake successful.",
    "Verifying encryption keys... OK.",
    "Allocating resources (Nodes: 420, GPU: 0/1)...",
    "Mounting /home/guest/...",
    "Welcome to UCSC High Performance Computing Club --AKA-- Not So Slow SLugs"
  ],

  // --- Home / About ---
  clubName: "UC Santa Cruz High Performance Computing Club",
  description: "We are Not-So-Slow-Slugs, a student-run organization dedicated to solving computationally intensive problems. We build clusters, optimize systems, and get results.",
  currentStatus: [
    "Competing in Winter Classic 2026",
    "Competing in Single Board Cluster"
  ],
  connectionMessage: "You are logged into the public node of our virtual cluster. Navigate the file system to check out what we've been up to!",

  // --- External Links ---
  discordLink: "https://discord.gg/XMzAkprgag",
  discordDescription: "This is our primary platform for all club communications, project discussions, and competition planning.",

  // --- Meetings ---
  meetingInfo: {
    day: "Tuesday",
    time: "5:15 PM - 6:15 PM",
    building: "Baskin Engineering 2",
    room: "Room 207"
  },

  // --- Competitions ---
  competitions: [
    {
      id: "wc26",
      name: "Winter Classic 2026",
      status: "active",
      subtitle: "National Invitational",
      link: "https://www.winterclassicinvitational.com/",
      linkText: "winterclassicinvitational.com"
    },
    {
      id: "sbc",
      name: "Single Board Cluster Comp",
      status: "active",
      subtitle: "Hosted by UCSD",
      link: "https://single-board-cluster-competition.github.io/new-sbcc-site/main-page.html",
      linkText: "singleboardclustercompetition.com",
      details: "Constraints: $6k Spending Cap, 250W Power Limit. We need hardware for this!!!"
    },
    {
      id: "indie25",
      name: "Indy SCC Fall 2025",
      status: "past",
      subtitle: "Student Cluster Competition",
      link: "https://sc25.supercomputing.org/students/indyscc/",
      linkText: "IndySCC"
    },
    {
      id: "wc25",
      name: "Winter Classic 2025",
      status: "past",
      subtitle: "National Invitational"
    }
  ],

  // --- Hardware Inventory ---
  hardware: {
    inventory: [
      { model: "Sunfire x2200", quantity: 2, status: "offline", location: "E2 207" },
      { model: "Dell Poweredge R515", quantity: 2, status: "offline", location: "E2 207" },
      { model: "Dell Poweredge R510", quantity: 1, status: "offline", location: "E2 207" }
    ],
    total_nodes: 5,
    system_health: "could be better"
  },

  // --- Goals ---
  goalsText: "We have two primary objectives for our cluster moving forward:",
  goals: [
    {
      title: "Academic Replication",
      description: "We aim to utilize our servers to recreate and verify results from current academia and published research papers. By validating existing research on our own bare-metal hardware, members gain practical experience with real world problems."
    },
    {
      title: "Local LLMs",
      description: "With the rapid advancement of open-source AI, we are configuring our infrastructure to deploy, fine-tune, and serve Large Language Models entirely locally. This provides hands-on experience with distributed tensor operations and AI systems engineering."
    }
  ],

  // --- Contacts ---
  contacts: {
    leadership: [
      { name: "Myles Hallett", role: "President", email: "mthallet@ucsc.edu" }
    ],
    faculty: [
      { name: "Scott Beamer", role: "Faculty", email: "sbeamer@ucsc.edu" },
      { name: "Abel Souza", role: "Faculty", email: "absouza@ucsc.edu" }
    ]
  }
};

// You can still keep the file structure definitions here so it's easy to add new tabs later
export const FILES = [
  { name: 'README.md', id: 'home' },
  { name: 'DISCORD.link', id: 'discord' },
  { name: 'CONTACT.info', id: 'contact' },
  { name: 'MEETINGS.txt', id: 'meetings' },
  { name: 'COMPETITIONS.info', id: 'competitions' },
  { name: 'HARDWARE.json', id: 'hardware' },
  { name: 'GOALS.md', id: 'goals' },
];