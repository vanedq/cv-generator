import React from "react";
import type { CVData } from "../types/types";
import { EducationItem } from "./cv-sections/educationItem";
import { ExperienceItem } from "./cv-sections/experienceItem";
import { Header } from "./cv-sections/header";
import { ProjectItem } from "./cv-sections/projectItem";
import { Section } from "./cv-sections/section";

// componente de preview do CV
export const CVPreview = React.forwardRef<HTMLDivElement, { cv: CVData }>(({ cv }, ref) => (
  <div ref={ref} className="cv-container bg-white p-6 font-sans leading-tight text-black">
    <Header
      fullName={cv.personalInfo.fullName}
      title={cv.personalInfo.title}
      email={cv.personalInfo.email}
      phone={cv.personalInfo.phone}
      location={cv.personalInfo.location}
      github={cv.personalInfo.github}
      linkedin={cv.personalInfo.linkedin}
      website={cv.personalInfo.website}
    />

    {cv.professionalSummary && (
      <Section title="Resumo Profissional">
        <article className="text-sm leading-tight">
          <p>{cv.professionalSummary}</p>
        </article>
      </Section>
    )}

    {cv.experience.length > 0 && (
      <Section title="Experiência">
        {cv.experience.map((exp, index) => (
          <ExperienceItem
            key={index}
            company={exp.company}
            period={exp.period}
            position={exp.position}
            items={exp.items}
          />
        ))}
      </Section>
    )}

    {cv.education.length > 0 && (
      <Section title="Educação">
        {cv.education.map((edu, index) => (
          <EducationItem
            key={index}
            course={edu.course}
            period={edu.period}
            institution={edu.institution}
            details={edu.details}
          />
        ))}
      </Section>
    )}

    {(cv.technicalSkills || cv.uxSkills) && (
      <Section title="Habilidades Técnicas">
        <article className="text-sm leading-tight">
          {cv.technicalSkills && <p>{cv.technicalSkills}</p>}
          {cv.uxSkills && <p>{cv.uxSkills}</p>}
        </article>
      </Section>
    )}

    {cv.languages && (
      <Section title="Idiomas">
        <article className="text-sm leading-tight">
          <p>{cv.languages}</p>
        </article>
      </Section>
    )}

    {cv.softSkills && (
      <Section title="Habilidades Comportamentais">
        <article className="text-sm leading-tight">
          <p>{cv.softSkills}</p>
        </article>
      </Section>
    )}

    {cv.certificates.length > 0 && (
      <Section title="Certificados">
        <article>
          <ul className="text-sm list-disc list-inside">
            {cv.certificates.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </article>
      </Section>
    )}

    {cv.projects.length > 0 && (
      <Section title="Projetos">
        {cv.projects.map((project, index) => (
          <ProjectItem
            key={index}
            title={project.title}
            technologies={project.technologies}
            description={project.description}
            link={project.link}
          />
        ))}
      </Section>
    )}

    {cv.awards.length > 0 && (
      <Section title="Prêmios e Reconhecimentos">
        {cv.awards.map((award, index) => (
          <article key={index} className="mt-2 text-sm leading-tight">
            <p className="font-bold">{award.title}</p>
            <div className="flex flex-row justify-between">
              <p>{award.organization}</p>
              <p className="text-xs">{award.year}</p>
            </div>
            {award.description && <p>{award.description}</p>}
          </article>
        ))}
      </Section>
    )}
  </div>
));