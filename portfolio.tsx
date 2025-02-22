"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Mail, Github, Linkedin, Instagram, ChevronLeft, ChevronRight, Download, Send, Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  SiTypescript,
  SiPhp,
  SiJavascript,
  SiMysql,
  SiLaravel,
  SiNodedotjs,
  SiComposer,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiVite,
  SiBootstrap,
  SiFlutter,
  SiNpm,
  SiGit,
  SiDocker,
  SiGithub,
  SiPostman,
  SiAndroidstudio,
} from "react-icons/si"

const skills = [
  {
    category: "Langage",
    items: [
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
      { name: "PHP", icon: SiPhp, color: "text-indigo-400" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-300" },
      { name: "SQL", icon: SiMysql, color: "text-orange-400" },
    ],
  },
  {
    category: "Technologies Backend",
    items: [
      { name: "Laravel", icon: SiLaravel, color: "text-red-500" },
      { name: "MySQL", icon: SiMysql, color: "text-blue-500" },
      { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
      { name: "Composer", icon: SiComposer, color: "text-yellow-600" },
    ],
  },
  {
    category: "Technologies Frontend",
    items: [
      { name: "React", icon: SiReact, color: "text-cyan-400" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-300" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "Vite", icon: SiVite, color: "text-purple-400" },
      { name: "Bootstrap", icon: SiBootstrap, color: "text-purple-500" },
      { name: "Flutter", icon: SiFlutter, color: "text-blue-400" },
      { name: "React Native", icon: SiReact, color: "text-cyan-400" },
      { name: "npm", icon: SiNpm, color: "text-red-500" },
    ],
  },
  {
    category: "Autres Technologies",
    items: [
      { name: "Git", icon: SiGit, color: "text-orange-500" },
      { name: "Docker", icon: SiDocker, color: "text-blue-400" },
      { name: "GitHub", icon: SiGithub, color: "text-gray-400" },
      { name: "Postman", icon: SiPostman, color: "text-orange-500" },
      { name: "Android Studio", icon: SiAndroidstudio, color: "text-green-500" },
    ],
  },
]

const projects = [
  {
    title: "Projet 1",
    description: "Description du projet 1",
    details: "Détails du projet 1",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Projet 2",
    description: "Description du projet 2",
    details: "Détails du projet 2",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Projet 3",
    description: "Description du projet 3",
    details: "Détails du projet 3",
    image: "/placeholder.svg?height=400&width=600",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".mobile-menu")) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 focus:outline-none"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {isOpen && (
        <div className="mobile-menu absolute top-12 right-0 bg-gray-900 w-48 p-4 rounded-lg shadow-lg z-50">
          <a href="#about" className="block py-2 hover:text-pink-400 transition-colors">À propos</a>
          <a href="#skills" className="block py-2 hover:text-purple-400 transition-colors">Compétences</a>
          <a href="#projects" className="block py-2 hover:text-indigo-400 transition-colors">Réalisations</a>
          <a href="#contact" className="block py-2 hover:text-blue-400 transition-colors">Contact</a>
        </div>
      )}
    </div>
  )
}

export default function AmineLakehalPortfolio() {
  const [currentProject, setCurrentProject] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("about")

  const nextProject = useCallback(() => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }, [])

  const prevProject = useCallback(() => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextProject, 5000)
    return () => clearInterval(timer)
  }, [nextProject])

  // إضافة تأثير تغيير لون الـ navbar عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // تتبع الأقسام النشطة
  useEffect(() => {
    const sections = document.querySelectorAll("section")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white font-sans scroll-smooth">
      <header
        className={`sticky top-0 z-50 w-full border-b border-gray-800 backdrop-blur transition-all duration-300 ${
          isScrolled ? "bg-gray-900/95 shadow-lg" : "bg-gray-900/75"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center h-16">
            <span className="text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
              Amine Lakehal
            </span>
            <div className="hidden md:flex space-x-4">
              <a
                href="#about"
                className={`hover:text-pink-400 transition-colors ${
                  activeSection === "about" ? "border-b-2 border-pink-400" : ""
                }`}
              >
                À propos
              </a>
              <a
                href="#skills"
                className={`hover:text-purple-400 transition-colors ${
                  activeSection === "skills" ? "border-b-2 border-purple-400" : ""
                }`}
              >
                Compétences
              </a>
              <a
                href="#projects"
                className={`hover:text-indigo-400 transition-colors ${
                  activeSection === "projects" ? "border-b-2 border-indigo-400" : ""
                }`}
              >
                Réalisations
              </a>
              <a
                href="#contact"
                className={`hover:text-blue-400 transition-colors ${
                  activeSection === "contact" ? "border-b-2 border-blue-400" : ""
                }`}
              >
                Contact
              </a>
            </div>
            <MobileMenu />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.section id="about" className="mb-24 scroll-mt-24" {...fadeInUp}>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="/Amine.jpg?height=400&width=400"
                alt="Amine Lakehal"
                className="rounded-full w-64 h-64 object-cover shadow-lg border-4 border-indigo-500 hover:border-pink-500 transition-all duration-300 transform hover:scale-105"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
                Amine Lakehal
              </h1>
              <h2 className="text-2xl text-indigo-300 mb-6">Développeur Web et Application</h2>
              <p className="text-lg mb-6 leading-relaxed text-gray-300">
                Passionné par la création d'expériences numériques significatives, je suis un développeur full-stack
                expérimenté qui excelle dans la transformation d'idées en solutions web et mobiles innovantes.
              </p>
              <p className="mb-6 leading-relaxed text-gray-300">
                Mon expertise couvre un large éventail de technologies, de la conception d'interfaces utilisateur
                élégantes à la mise en place de backends robustes. Je m'efforce constamment de rester à la pointe de
                l'innovation technologique pour offrir des solutions optimales à chaque projet.
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Download className="mr-2 h-4 w-4" /> Télécharger CV
              </Button>
            </div>
          </div>
        </motion.section>

        <motion.section id="skills" className="mb-24 scroll-mt-24" {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
            Mes Compétences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skillCategory, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-indigo-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"
              >
                <CardHeader className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                  <CardTitle className="text-white font-bold text-xl">{skillCategory.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 gap-4">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center group">
                        <skill.icon
                          className={`w-6 h-6 mr-2 ${skill.color} group-hover:text-pink-400 transition-colors`}
                        />
                        <span className="group-hover:text-pink-400 transition-colors">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" className="mb-24 scroll-mt-24" {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
            Mes Réalisations
          </h2>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentProject * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="h-full bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-indigo-400">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-64 object-cover rounded-md mb-4"
                      />
                      <p className="text-gray-300">{project.details}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white"
                      >
                        Voir le projet
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 border-indigo-500 text-indigo-400"
              onClick={prevProject}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 border-indigo-500 text-indigo-400"
              onClick={nextProject}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.section>

        <motion.section id="contact" className="mb-24 scroll-mt-24" {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
            Contactez-moi
          </h2>
          <div className="max-w-md mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300">
            <form className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Nom"
                  className="w-full bg-gray-700 border-2 border-indigo-500 text-white placeholder-gray-400 focus:border-pink-500 transition-colors"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-gray-700 border-2 border-indigo-500 text-white placeholder-gray-400 focus:border-pink-500 transition-colors"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Message"
                  className="w-full bg-gray-700 border-2 border-indigo-500 text-white placeholder-gray-400 focus:border-pink-500 transition-colors"
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Send className="mr-2 h-5 w-5" /> Envoyer
              </Button>
            </form>
          </div>
        </motion.section>
      </main>

      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6">
            <a href="mailto:stivanemaikel@gmail.com" className="hover:text-pink-400 transition-colors">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </a>
            <a href="https://github.com/" className="hover:text-gray-400 transition-colors">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com/" className="hover:text-blue-400 transition-colors">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://instagram.com/" className="hover:text-red-400 transition-colors">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}