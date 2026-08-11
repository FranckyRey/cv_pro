import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Mail, Globe, Code, Download, MapPin, Briefcase, Calendar, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);
  const navbarRef = useRef(null);
  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations
      const heroElements = heroRef.current.querySelectorAll('.hero-anim');
      gsap.from(heroElements, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2
      });

      // About Animation
      gsap.from(aboutRef.current.querySelector('.about-content'), {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Experience Timeline Animation
      const cards = experienceRef.current.querySelectorAll('.timeline-card');
      cards.forEach((card, i) => {
        const direction = i % 2 === 0 ? -50 : 50;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          x: window.innerWidth > 768 ? direction : -30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          onComplete: () => {
            gsap.fromTo(card.querySelector('.timeline-dot'), 
              { scale: 0.5, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
            );
          }
        });
      });

      // Skills Animation (Grille de Maîtrise)
      const skillCards = skillsRef.current.querySelectorAll('.skill-card');
      skillCards.forEach((card) => {
        const circle = card.querySelector('.progress-ring');
        const percentText = card.querySelector('.progress-text');
        const targetPercent = parseInt(card.dataset.percent, 10);
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(card, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
            
            gsap.to(circle, {
              strokeDashoffset: circumference - (targetPercent / 100) * circumference,
              duration: 1.5,
              ease: 'power2.out',
              delay: 0.2
            });

            gsap.to(percentText, {
              innerText: targetPercent,
              duration: 1.5,
              snap: { innerText: 1 },
              ease: 'power2.out',
              delay: 0.2
            });
          }
        });
      });

      // Education Animation
      const eduCards = educationRef.current.querySelectorAll('.edu-card');
      gsap.from(eduCards, {
        scrollTrigger: {
          trigger: educationRef.current,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Contact Animation
      const contactLinks = contactRef.current.querySelectorAll('.contact-link');
      gsap.from(contactLinks, {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 85%',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      period: "2023 - Présent",
      title: "Développeur Chatbot IA",
      company: "Projet Académique / Freelance",
      desc: "Développement d'un chatbot intelligent avec le framework Rasa sur VSCode. Création de flux conversationnels NLP avancés."
    },
    {
      period: "2022 - 2023",
      title: "Analyste de Données Junior",
      company: "Divers Projets",
      desc: "Réalisation de projets d'analyse et de visualisation de données avec Python, SQL et Power BI pour des décisions stratégiques."
    },
    {
      period: "2021 - 2022",
      title: "Coordinateur Digital",
      company: "Associations Étudiantes",
      desc: "Gestion et coordination d'activités étudiantes et projets collaboratifs liés à la communication et au digital."
    }
  ];

  const skills = [
    { name: "Data Science & Analyse", percent: 90 },
    { name: "Python & SQL", percent: 85 },
    { name: "Visualisation (Power BI)", percent: 80 },
    { name: "IA & Chatbots (Rasa)", percent: 75 },
    { name: "Communication & Leadership", percent: 85 }
  ];

  const education = [
    { year: "2023 - 2025", degree: "Master en Data Science & IA", school: "Université de Technologie" },
    { year: "2020 - 2023", degree: "Licence en Informatique", school: "Université des Sciences" }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-primary text-background selection:bg-accent selection:text-white">
      <div className="noise-overlay"></div>

      {/* Navbar - La Signature Flottante */}
      <nav ref={navbarRef} className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-[2rem] px-6 py-3 flex items-center gap-8 ${scrolled ? 'bg-primary/60 backdrop-blur-xl border border-white/10 shadow-lg' : 'bg-transparent'}`}>
        <div className="font-sans font-bold text-lg tracking-tight">
          F<span className="text-accent">.</span>K
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#about" className="hover:text-accent interactive-hover">À propos</a>
          <a href="#experience" className="hover:text-accent interactive-hover">Expérience</a>
          <a href="#skills" className="hover:text-accent interactive-hover">Compétences</a>
        </div>
        <a href="/cv-placeholder.pdf" download className="btn-magnetic bg-accent text-white px-5 py-2 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(123,97,255,0.4)]">
          CV
        </a>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[100dvh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Digital Texture" 
            className="w-full h-full object-cover opacity-30 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/95 to-primary"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-16">
          <div className="hero-anim w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-accent/30 p-1 mb-8 relative">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden relative group">
              {/* Placeholder photo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent"></div>
              <span className="text-4xl font-serif text-white/50">FK</span>
            </div>
          </div>
          
          <h1 className="hero-anim text-5xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tighter mb-4 text-white drop-shadow-[0_0_30px_rgba(123,97,255,0.2)]">
            Francky K<span className="text-accent">.</span>N<span className="text-accent">.</span>
          </h1>
          
          <h2 className="hero-anim text-2xl md:text-4xl font-serif italic text-white/80 mb-8">
            Data Scientist Junior & Entrepreneur Digital
          </h2>
          
          <div className="hero-anim flex flex-wrap justify-center items-center gap-4 text-sm md:text-base font-mono text-accent/80 mb-12">
            <span className="flex items-center gap-2"><Briefcase size={16} /> 3+ Projets IA</span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> International</span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> Dispo. Immédiate</span>
          </div>
          
          <div className="hero-anim flex flex-col sm:flex-row gap-4">
            <a href="/cv-placeholder.pdf" download className="btn-magnetic bg-accent text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(123,97,255,0.5)]">
              <Download size={20} />
              Télécharger CV
            </a>
            <a href="#contact" className="btn-magnetic border border-white/20 hover:border-accent hover:bg-accent/10 px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-colors">
              Me contacter
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-32 px-6 bg-background text-text">
        <div className="max-w-6xl mx-auto about-content">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 flex md:justify-end">
              <h2 className="text-4xl md:text-5xl font-serif italic mt-2">À propos</h2>
            </div>
            
            <div className="hidden md:block col-span-1 flex justify-center">
              <div className="w-[2px] h-32 bg-accent/30 mt-4 rounded-full"></div>
            </div>
            
            <div className="md:col-span-7">
              <p className="text-lg md:text-xl leading-relaxed text-text/80 mb-6">
                Je suis étudiant en Data Science passionné par l'intelligence artificielle, les technologies digitales et l'innovation. J'ai travaillé sur plusieurs projets d'analyse de données, de visualisation et de développement de chatbot IA, tout en développant des compétences en communication et en leadership.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-text/80">
                Ma vision est d'utiliser la technologie et la data pour créer des solutions à impact en Afrique et évoluer vers des responsabilités internationales dans le domaine du numérique et de l'innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={experienceRef} className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-center mb-24">
            La <span className="font-serif italic text-accent font-normal">Timeline</span>
          </h2>
          
          <div className="relative">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-accent/20 -translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-24">
              {experiences.map((exp, idx) => (
                <div key={idx} className={`timeline-card relative flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  <div className="md:w-1/2 w-full flex flex-col justify-center">
                    <div className="bg-primary border border-white/5 p-8 rounded-[2rem] card-hover relative z-10">
                      <span className="font-mono text-accent text-sm mb-4 block">{exp.period}</span>
                      <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                      <p className="text-white/60 mb-4 font-medium">{exp.company}</p>
                      <p className="text-white/40 leading-relaxed text-sm">{exp.desc}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-0 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 timeline-dot opacity-0">
                    <div className="w-4 h-4 bg-accent rounded-full shadow-[0_0_15px_rgba(123,97,255,0.8)] border-4 border-primary"></div>
                  </div>
                  
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-32 px-6 bg-primary/50 relative border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-center mb-20">
            Tableau de <span className="font-serif italic text-accent font-normal">Bord</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {skills.map((skill, idx) => (
              <div key={idx} className="skill-card flex flex-col items-center opacity-0 translate-y-10" data-percent={skill.percent}>
                <div className="relative w-32 h-32 mb-6">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                    <circle 
                      className="text-white/10 stroke-current" 
                      strokeWidth="8" 
                      cx="60" cy="60" r="50" 
                      fill="transparent" 
                    />
                    <circle 
                      className="progress-ring text-accent stroke-current" 
                      strokeWidth="8" 
                      strokeLinecap="round" 
                      cx="60" cy="60" r="50" 
                      fill="transparent" 
                      style={{ filter: 'drop-shadow(0 0 8px rgba(123,97,255,0.5))' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="font-mono text-2xl font-bold"><span className="progress-text">0</span>%</span>
                  </div>
                </div>
                <h4 className="text-center font-medium text-sm md:text-base h-12 flex items-center">{skill.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section ref={educationRef} className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif italic text-center mb-16 text-white/80">Les Fondations</h2>
          
          <div className="grid gap-6">
            {education.map((edu, idx) => (
              <div key={idx} className="edu-card bg-primary border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-4 card-hover">
                <div>
                  <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                  <p className="text-white/50">{edu.school}</p>
                </div>
                <span className="font-mono text-accent bg-accent/10 px-4 py-2 rounded-full text-sm inline-block w-max">
                  {edu.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-32 px-6 bg-background text-text rounded-t-[4rem] relative z-20 -mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-serif italic mb-12">Travaillons ensemble</h2>
          
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <a href="#" className="contact-link interactive-hover flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <Mail size={24} className="group-hover:text-accent transition-colors" />
              </div>
              <span className="font-medium text-sm">Email</span>
            </a>
            <a href="#" className="contact-link interactive-hover flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <Globe size={24} className="group-hover:text-accent transition-colors" />
              </div>
              <span className="font-medium text-sm">Portfolio</span>
            </a>
            <a href="#" className="contact-link interactive-hover flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <Code size={24} className="group-hover:text-accent transition-colors" />
              </div>
              <span className="font-medium text-sm">Projets</span>
            </a>
          </div>
          
          <a href="#" className="btn-magnetic inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-accent transition-colors shadow-2xl">
            Envoyer un message
            <ChevronRight size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#05050A] text-white pt-24 pb-8 px-6 relative z-10 text-center rounded-t-[4rem]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
            <span className="font-mono text-xs uppercase tracking-wider text-white/70">En ligne & Disponible</span>
          </div>
          <p className="font-medium mb-2">Francky KETWOUO NGUEUMEN</p>
          <p className="text-white/40 text-sm">Fait avec le vibe coding • {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
