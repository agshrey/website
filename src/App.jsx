import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '@fortawesome/fontawesome-free/css/all.min.css'
import emailjs from "emailjs-com"
import './App.css'

// Sample project data with skills
const projects = [
  {
    id: 1,
    title: 'PerfectPunch 🥊',
    description: 'PerfectPunch is an AI-driven boxing training system that leverages computer vision and machine learning to analyze a boxers punching form, speed, accuracy, and injury risk in real-time. It aims to revolutionize boxing training by providing data-driven insights that enhance performance and prevent injuries, all without the need for wearables.',
    skills: ['Python', 'Django', 'OpenCV', 'MediaPipe', 'PyTorch', 'Taipy', 'NumPy', 'Pandas', 'Matplotlib', 'HTML5', 'CSS3', 'JavaScript'],
    images: [
      'perfectpunch.gif'
    ],
    github: 'https://github.com/Archerman1/PerfectPunch',
    demo: 'https://devpost.com/software/perfectpunch'
},
{
  id: 2,
  title: 'SafeWay 🛣️',
  description: 'SafeWay is a navigation app that prioritizes safety by providing routes that avoid high-crime areas, poorly lit streets, and damaged roads. It uses data from government websites to calculate optimal routes based on user preferences for safety, walkability, lighting, and efficiency.',
  skills: ['Python', 'Flask', 'MongoDB', 'PyMongo', 'HTML5', 'CSS3', 'JavaScript', 'Mapbox API', 'Docker', 'Terraform'],
  images: [
    'safeway.gif'
  ],
  github: 'https://github.com/CalebBunch/hackGT11',
  demo: 'https://devpost.com/software/saferoute-2iyzml'
},
{
  id: 3,
  title: 'ClubBuddy 👥',
  description: 'ClubBuddy is a club management app designed for students to join clubs at their school or university, manage club assignments, and track their participation. Advisors have a separate UI to manage student rosters, create meetings, and monitor club activities. Developed in Swift, it uses Firebase for authentication and MySQL for data storage.',
  skills: ['Swift', 'Firebase', 'MySQL', 'Xcode', 'UI/UX Design'],
  images: [
    'clubbuddy.gif'
  ],
  github: 'https://github.com/agshruti12/BRCT1?tab=readme-ov-file',
  demo: 'https://www.youtube.com/watch?v=zLklrt5ntvo'
}
];

// All available skills
const allSkills = {
  'Frontend Development': ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'SASS/SCSS'],
  'Backend Development': ['Node.js', 'Express.js', 'Python', 'Django', 'RESTful APIs', 'GraphQL', 'MongoDB', 'PostgreSQL'],
  'DevOps & Tools': ['Git', 'Docker', 'AWS', 'CI/CD', 'Linux', 'VS Code', 'Postman', 'Jira']
};

// Add these images to your public folder
const educationImage = 'education.png';

// Add this after your projects data
const experiences = [
  {
    id: 3,
    title: 'Software Development Intern',
    company: 'LCKR 🔐',
    timeline: 'Summer 2023',
    description: 'Developed e-marketplace where users can rent out their items and rent other items using smart lock powered by Arduino.',
    image: 'lckr.gif'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'iOS Club @ GT 📱',
    timeline: 'Fall 2024',
    description: 'Developed and maintained Firestore backend for Loop, a competitive social media running app. Used Swift, Firebase, and SwiftUI to create a seamless and efficient user experience.',
    image: 'loop.png'
  },
  {
    id: 1,
    title: 'Incoming Software Engineering Intern',
    company: 'CarMax 🚗',
    timeline: 'Summer 2025',
    description: 'Incoming...',
    image: 'carmax_gif.gif'
  }
];



function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [clickedProjectId, setClickedProjectId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (selectedSkills.length === 0) {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(
        projects.filter(project => 
          selectedSkills.every(skill => project.skills.includes(skill))
        )
      )
    }
  }, [selectedSkills])

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleProjectClick = (project) => {
    setClickedProjectId(project.id);
    setTimeout(() => {
      setSelectedProject(project);
      setCurrentImageIndex(0);
      setIsModalVisible(true);
      document.body.style.overflow = 'hidden';
    }, 300);
  }

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedProject(null);
      setClickedProjectId(null);
      document.body.style.overflow = 'auto';
    }, 300);
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedProject.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    )
  }

  const handleTimelineClick = (index) => {
    setActiveExperience(index);
    // Smooth scroll to experience section
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openResumeModal = () => {
    setIsResumeModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeResumeModal = () => {
    setIsResumeModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(null);  // To store success or error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    emailjs.sendForm('service_y1frgc7', 'template_dnxst2k', e.target, 'lkIyT3ccq3Op2VDoX')
      .then((result) => {
        setIsMessageSent(true);
        setFormData({ name: '', email: '', message: '' });  // Clear form fields
        setTimeout(() => {
          setIsMessageSent(false);
        }, 3000);  // Reset button after 3 seconds
      }, (error) => {
        setStatus('Message failed to send. Please try again.');
      });
  };
  

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            shrey agarwal
          </motion.div>
          <ul className="nav-links">
            <li><button className="nav-link" onClick={() => scrollToSection('about')}>about</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('education')}>education</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('experience')}>experience</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('projects')}>projects</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('contact')}>contact</button></li>
            <li>
              <button className="nav-link resume-button" onClick={openResumeModal}>
                resume
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            hi, i'm shrey
          </h1>
          <p className="subtitle">
            student 👨🏽‍🎓, developer 👨🏽‍💻, builder 👷🏽‍♂️
          </p>
          <div className="cta-buttons">
            <motion.button 
              className="btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
            >
              view my work
            </motion.button>
            <motion.button 
              className="btn secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
            >
              contact me
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            about me 🙋🏽‍♂️
          </motion.h2>
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p>
              <center>
                hi! i'm shrey, a computer engineering major at georgia tech. i like coding a bit, so i've built this website to showcase my projects. 
                my interests lie in cv/ml, ai, swe, and pretty much any other buzzword that's relevant! also i love meeting new people, so feel free to reach out ☕️!
              </center>
            </p>
            <div className="skills">
              <h3>skills 👾</h3>
              <div className="skills-grid">
                {Object.entries(allSkills).map(([category, skills]) => (
                  <motion.div 
                    key={category} 
                    className="skill-category"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h4>{category}</h4>
                    <div className="skill-tags">
                      {skills.map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>education 📚</h2>
          <div className="education-content">
            <div className="education-image">
              <img src={educationImage} alt="Education" />
              <div className="education-overlay">
                <p className="education-caption">me and the fam at freshman move-in!</p>
                <p className="education-subcaption">aug 9, 2024</p>
              </div>
            </div>
            <div className="education-details">
              <h3>Bachelor of Science in Computer Engineering</h3>
              <p className="timeline">2024 - 2027</p>
              <p className="institution">Georgia Institute of Technology, Atlanta, GA 🐝</p>
              <div className="education-highlights">
                <p>• Relevant Coursework: Data Structures and Algorithms, Objects and Design, Digital System Design</p>
                <p>• GPA: 4.0/4.0</p>
                <p>• Dean's List</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>experience 💼</h2>
          <div className="experience-content">
            <div className="experience-details">
              <h3>{experiences[activeExperience].title}</h3>
              <p className="timeline">{experiences[activeExperience].timeline}</p>
              <p className="company">{experiences[activeExperience].company}</p>
              <div className="experience-highlights">
                <p>{experiences[activeExperience].description}</p>
              </div>
            </div>
            <div className="experience-image">
              <img src={experiences[activeExperience].image} alt={experiences[activeExperience].company} />
              
            </div>
          </div>
          
          {/* Timeline */}
          <div className="timeline-container">
            <div className="timeline-track">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className={`timeline-item ${index === activeExperience ? 'active' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleTimelineClick(index)}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>{exp.title}</h4>
                    <p>{exp.company}</p>
                    <span>{exp.timeline}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            projects 🛠️
          </motion.h2>
          {selectedSkills.length > 0 && (
            <motion.div 
              className="filter-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Showing projects with: {selectedSkills.join(', ')}
              <button 
                className="clear-filters"
                onClick={() => setSelectedSkills([])}
              >
                Clear filters
              </button>
            </motion.div>
          )}
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className={`project-card ${clickedProjectId === project.id ? 'expanding' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: clickedProjectId === project.id ? 1.1 : 1,
                  zIndex: clickedProjectId === project.id ? 1000 : 1
                }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleProjectClick(project)}
              >
                <div className="project-image">
                  <img src={project.images[0]} alt={project.title} />
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-skills">
                  {project.skills.map(skill => (
                    <span key={skill} className="project-skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            get in touch 💌
          </motion.h2>
          <div className="contact-content">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <p>agshrey@gatech.edu</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <p>+1 (908) 842-7119</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <p>Atlanta, GA</p>
              </div>
            </motion.div>
            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
              ></textarea>
              <motion.button
                type="submit"
                className={`btn primary ${isMessageSent ? 'success' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isMessageSent ? (
                  <>
                    <i className="fas fa-check"></i> Message Sent
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </motion.form>
            {status && <p className="status-message">{status}</p>}  {/* Displaying the status message */}
          </div>
        </div>
      </section>


      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className={`project-modal ${isModalVisible ? 'visible' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}
          >
            <motion.div 
              className={`modal-content ${isModalVisible ? 'visible' : ''}`}
              initial={{ 
                scale: 0.9,
                opacity: 0,
                y: 20
              }}
              animate={{ 
                scale: 1,
                opacity: 1,
                y: 0
              }}
              exit={{ 
                scale: 0.9,
                opacity: 0,
                y: 20
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '90%',
                maxHeight: '90vh',
                margin: 'auto'
              }}
            >
              <button className="close-button" onClick={closeModal}>×</button>
              <div className="modal-grid">
                <div className="image-carousel">
                  <div className="carousel-container">
                    <button className="carousel-button prev" onClick={prevImage}>←</button>
                    <img 
                      src={selectedProject.images[currentImageIndex]} 
                      alt={selectedProject.title}
                      className="carousel-image"
                    />
                    <button className="carousel-button next" onClick={nextImage}>→</button>
                  </div>
                  <div className="carousel-dots">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
                <div className="project-details">
                  <h2>{selectedProject.title}</h2>
                  <div className="project-skills">
                    {selectedProject.skills.map(skill => (
                      <span key={skill} className="project-skill-tag">{skill}</span>
                    ))}
                  </div>
                  <p className="project-description">{selectedProject.description}</p>
                  <div className="project-links">
                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        <i className="fab fa-github"></i> View on GitHub
                      </a>
                    )}
                    {selectedProject.demo && (
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                        <i className="fas fa-external-link-alt"></i> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <motion.div 
            className="resume-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeResumeModal}
          >
            <motion.div 
              className="resume-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={closeResumeModal}>×</button>
              <div className="resume-preview">
                <iframe 
                  src="resume.pdf" 
                  title="Resume Preview"
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="resume-actions">
                <a 
                  href="resume.pdf" 
                  download="Shrey_Agarwal_Resume.pdf"
                  className="download-button"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer>
      <div className="container">
        <div className="social-links">
          {[
            { name: 'github', url: 'https://github.com/agshrey' },
            { name: 'linkedin', url: 'https://www.linkedin.com/in/agshrey1/' },
            { name: 'instagram', url: 'https://www.instagram.com/agshrey_05/' },
          ].map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className={`fab fa-${social.name}`}></i>
            </motion.a>
          ))}
        </div>
        <p>&copy; 2025 Shrey Agarwal</p>
      </div>
    </footer>
    </div>
  )
}

export default App
