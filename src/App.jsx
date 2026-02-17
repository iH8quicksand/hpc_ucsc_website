import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Wifi, HardDrive, Shield, DollarSign, Users, ChevronRight, Activity, Power, X, MapPin, Clock } from 'lucide-react';

// --- Assets & Constants ---

const ASCII_LOGO = `
 /$$   /$$  /$$$$$$   /$$$$$$   /$$$$$$        /$$   /$$ /$$$$$$$   /$$$$$$ 
| $$  | $$ /$$__  $$ /$$__  $$ /$$__  $$      | $$  | $$| $$__  $$ /$$__  $$
| $$  | $$| $$  \\__/| $$  \\__/| $$  \\__/      | $$  | $$| $$  \\ $$| $$  \\__/
| $$  | $$| $$      |  $$$$$$ | $$            | $$$$$$$$| $$$$$$$/| $$      
| $$  | $$| $$       \\____  $$| $$            | $$__  $$| $$____/ | $$      
| $$  | $$| $$    $$ /$$  \\ $$| $$    $$      | $$  | $$| $$      | $$    $$
|  $$$$$$/|  $$$$$$/|  $$$$$$/|  $$$$$$/      | $$  | $$| $$      |  $$$$$$/
 \\______/  \\______/  \\______/  \\______/       |__/  |__/|__/       \\______/ 
`;

const FILES = [
  { name: 'README.md', id: 'home' },
  { name: 'JOIN.sh', id: 'join' },
  { name: 'MEETINGS.txt', id: 'meetings' },
  { name: 'COMPETITIONS.info', id: 'competitions' },
  { name: 'HARDWARE.json', id: 'hardware' },
  { name: 'GOALS.md', id: 'goals' },
  { name: 'CONTACT.info', id: 'contact' },
];

const BOOT_SEQUENCE = [
  "Initializing kernel...",
  "Loading UCSC HPC modules...",
  "Connecting to humming-bird.ucsc.edu:22...",
  "Handshake successful.",
  "Verifying encryption keys... OK.",
  "Allocating resources (Nodes: 420, GPU: 0/1)...",
  "Mounting /home/guest/...",
  "Welcome to UCSC High Performance Computing Club --AKA-- Not So Slow SLugs"
];

// COMPETITIONS DATA (Edit this to add/move competitions!)
const COMPETITIONS_DATA = [
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
];

// HARDWARE INVENTORY (Edit this to add/remove servers!)
const HARDWARE_DATA = {
  inventory: [
    { model: "Sunfire x2200", quantity: 2, status: "offline", location: "E2 207" },
    { model: "Dell Poweredge R515", quantity: 2, status: "offline", location: "E2 207" },
    { model: "Dell Poweredge R510", quantity: 1, status: "offline", location: "E2 207" }
  ],
  total_nodes: 5,
  system_health: "could be better"
};

// --- Helper Functions ---

// Automatically colorizes JSON so you don't have to write HTML spans manually
const syntaxHighlightJSON = (jsonObj) => {
  let json = JSON.stringify(jsonObj, null, 2);
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'text-orange-400'; // Numbers
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'text-blue-400'; // Keys
              return `<span class="${cls}">${match.replace(/:$/, '')}</span>:`;
          } else {
              cls = 'text-green-400'; // Strings
          }
      } else if (/true|false/.test(match)) {
          cls = 'text-purple-400'; // Booleans
      } else if (/null/.test(match)) {
          cls = 'text-zinc-500'; // Nulls
      }
      return `<span class="${cls}">${match}</span>`;
  });
};

// --- Components ---

const FileLink = ({ file, isActive, onClick }) => (
  <button
    onClick={() => onClick(file.id)}
    className={`w-full text-left px-4 py-2 font-mono text-sm transition-colors ${
      isActive ? 'bg-zinc-800 text-green-400 border-l-2 border-green-500' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
    }`}
  >
    {file.name}
  </button>
);

// --- Main App Component ---

export default function App() {
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [activeSection, setActiveSection] = useState('home');
  const contentRef = useRef(null);

  // Boot Sequence Effect
  useEffect(() => {
    let delay = 0;
    BOOT_SEQUENCE.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setBootLines(prev => [...prev, line]);
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(() => setBooted(true), 800);
        }
      }, delay);
    });
  }, []);

  // Scroll to top of content when changing sections
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeSection]);

  // --- Content Renderers ---

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* UPDATED: overflow-hidden stops the scrollbar */}
            <pre className="text-yellow-400 font-bold text-[5px] sm:text-xs leading-[0.8] sm:leading-none whitespace-pre overflow-hidden select-none opacity-80">
              {ASCII_LOGO}
            </pre>
            <div className="border-l-2 border-green-800 pl-4 py-2">
              <h1 className="text-xl font-bold text-white mb-2">UC Santa Cruz High Performance Computing Club</h1>
              <p className="text-zinc-300 max-w-2xl">
                We are Not-So-Slow-Slugs, a student-run organization dedicated to solving computationally intensive problems. 
                We build clusters, optimize systems, and get results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 p-4 border border-zinc-800 rounded hover:border-green-500/50 transition-colors">
                <h3 className="text-green-400 font-bold mb-2">
                   Current Status
                </h3>
                <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                  <li>Competing in Winter Classic 2026</li>
                  <li>Designing Single Board Cluster</li>
                  <li>Seeking Industry Sponsors</li>
                </ul>
              </div>
              <div className="bg-zinc-900/50 p-4 border border-zinc-800 rounded hover:border-green-500/50 transition-colors">
                <h3 className="text-blue-400 font-bold mb-2">
                   Connection Success!
                </h3>
                <p className="text-sm text-zinc-400">
                  You are logged into the public node of our virtual cluster. 
                  Navigate the file system to check out what we've been up to!
                </p>
              </div>
            </div>
          </div>
        );

      case 'join':
        return (
          <div className="space-y-6 max-w-3xl animate-in fade-in zoom-in-95 duration-300">
              <div className="border-l-2 border-green-500 pl-4 py-2 mb-6">
                  <h2 className="text-xl font-bold text-white">Initiation Task</h2>
                  <p className="text-zinc-400 text-sm mt-1">
				      To join Not-So-Slow-Slugs, you will have to log in to Hummingbird (UCSC's supercomputer) and add your name to ~/mthallet/club_roster.txt.
                  </p>
              </div>

              <div className="bg-black border border-zinc-800 rounded p-4 font-mono text-sm relative group">
                  <div className="absolute top-0 left-0 w-full h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                      <span className="ml-2 text-zinc-500 text-xs">guest@local:~/tasks</span>
                  </div>
                  <div className="mt-8 space-y-4 text-zinc-300">
                      <div>
                          <span className="text-green-500"># 1. SSH into Hummingbird</span>
                          <div className="bg-zinc-900/50 p-2 mt-1 border-l-2 border-green-500/30">
                              ssh &lt;cruzid&gt;@hummingbird.ucsc.edu
                          </div>
                      </div>

                      <div>
                          <span className="text-green-500"># 2. Append your details to the roster</span>
                          <div className="text-zinc-500 text-xs italic mb-1">// Replace with your actual info</div>
                          <div className="bg-zinc-900/50 p-2 mt-1 border-l-2 border-green-500/30">
                              echo "First Last | email@ucsc.edu" &gt;&gt; /hbs/home/mthallet/club_roster.txt
                          </div>
                          <div className="text-red-400 text-xs mt-2">
                              * Permission Denied? Email us. You shouldn't get this if you do it right.
                          </div>
                      </div>
                  </div>
              </div>
              
              <div className="text-zinc-500 text-xs mt-4">
                  * Note: You will need to be on the campus network (eduroam) or use the UCSC VPN to access Hummingbird.
              </div>
          </div>
        );

      case 'meetings':
        return (
          <div className="space-y-6 max-w-3xl animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm">
                <div className="flex items-start gap-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-6">Weekly General Meeting</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                            <div className="flex gap-3">
                                <Clock className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">When</div>
                                    <div className="text-zinc-200 font-mono">Wednesdays</div>
                                    <div className="text-green-400 font-bold font-mono">4:00 PM - 5:00 PM</div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <MapPin className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Where</div>
                                    <div className="text-zinc-200 font-mono">Baskin Engineering 2</div>
                                    <div className="text-green-400 font-bold font-mono">Room 207</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );

      case 'competitions':
        const activeComps = COMPETITIONS_DATA.filter(c => c.status === 'active');
        const pastComps = COMPETITIONS_DATA.filter(c => c.status === 'past');
        
        return (
          <div className="space-y-6 max-w-3xl animate-in fade-in zoom-in-95 duration-300">
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Active Competitions (Current)</h3>
              
              {activeComps.map(comp => (
                <div key={comp.id} className="bg-black border border-zinc-800 p-4 font-mono text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-green-500 animate-pulse">●</span>
                      <span className="text-zinc-200 font-bold">{comp.name}</span>
                    </div>
                    <div className="text-green-400">ONLINE</div>
                  </div>
                  <div className="text-zinc-500 ml-6">{comp.subtitle}</div>
                  
                  {comp.link && (
                    <a href={comp.link} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 hover:underline ml-6 text-xs transition-colors">
                      {comp.linkText}
                    </a>
                  )}
                  {!comp.link && comp.linkText && (
                    <span className="text-zinc-600 ml-6 text-xs italic">{comp.linkText}</span>
                  )}
                  
                  {comp.details && (
                    <div className="text-zinc-400 text-xs ml-6 mt-2 border-l border-zinc-700 pl-2">
                      {comp.details}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {pastComps.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider border-t border-zinc-800/50 pt-4">Past Competitions (Archived)</h3>
                
                {pastComps.map(comp => (
                  <div key={comp.id} className="bg-zinc-950 border border-zinc-800/50 p-4 font-mono text-sm opacity-60">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-600">○</span>
                        <span className="text-zinc-400 font-bold">{comp.name}</span>
                      </div>
                      <div className="text-zinc-500">OFFLINE</div>
                    </div>
                    <div className="text-zinc-600 ml-6">{comp.subtitle}</div>
                    {comp.linkText && !comp.link && (
                      <span className="text-zinc-600 ml-6 text-xs italic">{comp.linkText}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        );

      case 'hardware':
        return (
          <div className="space-y-6 max-w-3xl animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-zinc-900 p-5 rounded border border-zinc-700 font-mono text-sm overflow-x-auto leading-relaxed shadow-inner">
              {/* This automatically parses and colors the HARDWARE_DATA object! */}
              <pre 
                className="text-zinc-300"
                dangerouslySetInnerHTML={{ __html: syntaxHighlightJSON(HARDWARE_DATA) }}
              />
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6 max-w-3xl animate-in fade-in zoom-in-95 duration-300">
             <div className="prose prose-invert prose-zinc max-w-none">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  We have two primary objectives for our cluster moving forward:
                </p>
                <div className="space-y-6">
                   <div className="">
                      <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                        Academic Replication
                      </h3>
                      <p className="text-zinc-400 text-sm">
                         We aim to utilize our servers to recreate and verify results from current academia and published research papers. 
                         By validating existing research on our own bare-metal hardware, members gain practical experience with real world problems.
                      </p>
                   </div>
                   <div className="">
                      <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                         Local LLMs
                      </h3>
                      <p className="text-zinc-400 text-sm">
                         With the rapid advancement of open-source AI, we are configuring our infrastructure to deploy, fine-tune, and serve Large Language Models entirely locally. 
                         This provides hands-on experience with distributed tensor operations and AI systems engineering.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6 max-w-3xl animate-in fade-in zoom-in-95 duration-300">
             <div className="space-y-6">
                <div className="bg-zinc-900 p-5 rounded border border-zinc-800">
                   <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-sm text-zinc-500">Club Leadership</h3>
                   <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-zinc-300 font-bold">Myles Hallett</span>
                      <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded">President</span>
                   </div>
                   <div className="pt-2 text-sm">
                      <a href="mailto:mthallet@ucsc.edu" className="text-green-400 hover:text-green-300 hover:underline transition-colors">mthallet@ucsc.edu</a>
                   </div>
                </div>

                <div className="bg-zinc-900 p-5 rounded border border-zinc-800">
                   <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-sm text-zinc-500">Faculty Advisors</h3>
                   <div className="space-y-4">
                      <div>
                         <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                            <span className="text-zinc-300 font-bold">Scott Beamer</span>
                            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded">Faculty</span>
                         </div>
                         <div className="pt-2 text-sm">
                            <a href="mailto:sbeamer@ucsc.edu" className="text-green-400 hover:text-green-300 hover:underline transition-colors">sbeamer@ucsc.edu</a>
                         </div>
                      </div>
                      <div>
                         <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                            <span className="text-zinc-300 font-bold">Abel Souza</span>
                            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded">Faculty</span>
                         </div>
                         <div className="pt-2 text-sm">
                            <a href="mailto:absouza@ucsc.edu" className="text-green-400 hover:text-green-300 hover:underline transition-colors">absouza@ucsc.edu</a>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // --- Boot Screen ---

  if (!booted) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 text-sm md:text-base flex flex-col justify-end pb-20">
        <style>{`body, html { background-color: #09090b; margin: 0; padding: 0; height: 100%; }`}</style>
        {bootLines.map((line, i) => (
          <div key={i} className="mb-1">
            <span className="text-zinc-500">[{new Date().toLocaleTimeString()}]</span> {line}
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    );
  }

  // --- Main Interface ---

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono flex flex-col overflow-hidden selection:bg-green-500/30 selection:text-green-200">
      <style>{`body, html { background-color: #09090b; margin: 0; padding: 0; height: 100%; }`}</style>
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Sidebar Navigation */}
        <div className="hidden md:flex flex-col w-48 bg-black border-r border-zinc-800 flex-shrink-0 shadow-xl z-10">
           <div className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-900 bg-zinc-950/50">
             /home/guest
           </div>
           <div className="flex-1 overflow-y-auto py-2">
             {FILES.map(file => (
               <FileLink 
                  key={file.id} 
                  file={file} 
                  isActive={activeSection === file.id} 
                  onClick={(id) => setActiveSection(id)}
                />
             ))}
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-zinc-950">
            {/* Mobile Nav Header */}
            <div className="md:hidden bg-zinc-900 border-b border-zinc-800 p-3 overflow-x-auto whitespace-nowrap flex gap-2 z-10">
                {FILES.map(file => (
                    <button 
                        key={file.id}
                        onClick={() => setActiveSection(file.id)}
                        className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                          activeSection === file.id 
                            ? 'bg-green-900/40 text-green-400 border border-green-700/50' 
                            : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800'
                        }`}
                    >
                        {file.name}
                    </button>
                ))}
            </div>

            {/* Scrollable Output Container */}
            <div 
              ref={contentRef}
              className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
            >
                {/* Simulated Command Execution Line */}
                <div className="mb-6 flex items-center flex-wrap gap-2 text-sm sm:text-base font-mono border-b border-zinc-800/50 pb-4">
                  <span className="text-green-500 font-bold">guest@not-so-slow-slugs:~$</span>
                  <span className="text-zinc-200">
                    cat {FILES.find(f => f.id === activeSection)?.name}
                  </span>
                  <span className="w-2.5 h-5 bg-zinc-400 animate-pulse inline-block ml-1"></span>
                </div>

                {/* Active Content */}
                {renderContent()}
            </div>
        </div>
      </div>
    </div>
  );
}
