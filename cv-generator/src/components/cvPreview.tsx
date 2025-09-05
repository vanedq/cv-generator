// imports das dependencias e tipos
import { forwardRef } from "react";
import type { CVData } from "../types/types";

// imports dos componentes das secoes do cv
import { EducationItem } from "./cv-sections/educationItem";
import { ExperienceItem } from "./cv-sections/experienceItem";
import { Header } from "./cv-sections/header";
import { ProjectItem } from "./cv-sections/projectItem";
import { Section } from "./cv-sections/section";

// componente principal que renderiza o preview do cv
export const CVPreview = forwardRef<HTMLDivElement, { cv: CVData }>(({ cv }, ref) => {
  // funcao que define as classes css baseadas no template escolhido
  const getTemplateClasses = () => {
    const color = cv.creativeColor || 'emerald'; // cor padrao caso nao tenha

    // diferentes estilos para cada tipo de template
    switch (cv.template) {
      case 'modern':
        return 'cv-container bg-white p-6 font-sans leading-tight text-black';
      case 'minimal':
        return 'cv-container bg-white p-6 font-sans leading-tight text-black';
      case 'creative':
        return `cv-container p-6 font-sans leading-tight text-black relative overflow-hidden creative-${color}`;
      default:
        return 'cv-container bg-white p-6 font-sans leading-tight text-black';
    }
  };


  // renderiza o cv completo com todas as secoes
  return (
    <div ref={ref} className={getTemplateClasses()}>
      {/* cabecalho com informacoes pessoais */}
      <Header
        fullName={cv.personalInfo.fullName}
        title={cv.personalInfo.title}
        email={cv.personalInfo.email}
        phone={cv.personalInfo.phone}
        location={cv.personalInfo.location}
        github={cv.personalInfo.github}
        linkedin={cv.personalInfo.linkedin}
        website={cv.personalInfo.website}
        template={cv.template}
        creativeColor={cv.creativeColor}
      />

      {/* secao do resumo profissional - so aparece se tiver conteudo */}
      {cv.professionalSummary && (
        <Section title="Resumo Profissional" template={cv.template} creativeColor={cv.creativeColor}>
          <article className="text-sm leading-tight">
            <p>{cv.professionalSummary}</p>
          </article>
        </Section>
      )}

      {/* secao de experiencia profissional - so aparece se tiver pelo menos 1 item */}
      {cv.experience.length > 0 && (
        <Section title="Experiência" template={cv.template} creativeColor={cv.creativeColor}>
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

      {/* secao de educacao - so aparece se tiver pelo menos 1 item */}
      {cv.education.length > 0 && (
        <Section title="Educação" template={cv.template} creativeColor={cv.creativeColor}>
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

      {/* secao de habilidades tecnicas - aparece se tiver habilidades tecnicas ou ux */}
      {(cv.technicalSkills || cv.uxSkills) && (
        <Section title="Habilidades Técnicas" template={cv.template} creativeColor={cv.creativeColor}>
          <article className="text-sm leading-tight">
            {cv.technicalSkills && <p>{cv.technicalSkills}</p>}
            {cv.uxSkills && <p>{cv.uxSkills}</p>}
          </article>
        </Section>
      )}

      {/* secao de idiomas - so aparece se tiver conteudo */}
      {cv.languages && (
        <Section title="Idiomas" template={cv.template} creativeColor={cv.creativeColor}>
          <article className="text-sm leading-tight">
            <p>{cv.languages}</p>
          </article>
        </Section>
      )}

      {/* secao de habilidades comportamentais - so aparece se tiver conteudo */}
      {cv.softSkills && (
        <Section title="Habilidades Comportamentais" template={cv.template} creativeColor={cv.creativeColor}>
          <article className="text-sm leading-tight">
            <p>{cv.softSkills}</p>
          </article>
        </Section>
      )}

      {/* secao de certificados - so aparece se tiver pelo menos 1 certificado */}
      {cv.certificates.length > 0 && (
        <Section title="Certificados" template={cv.template} creativeColor={cv.creativeColor}>
          <article>
            <ul className="text-sm list-disc list-inside">
              {cv.certificates.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </article>
        </Section>
      )}

      {/* secao de projetos - so aparece se tiver pelo menos 1 projeto */}
      {cv.projects.length > 0 && (
        <Section title="Projetos" template={cv.template} creativeColor={cv.creativeColor}>
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

      {/* secao de premios e reconhecimentos - so aparece se tiver pelo menos 1 premio */}
      {cv.awards.length > 0 && (
        <Section title="Prêmios e Reconhecimentos" template={cv.template} creativeColor={cv.creativeColor}>
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
  )
});