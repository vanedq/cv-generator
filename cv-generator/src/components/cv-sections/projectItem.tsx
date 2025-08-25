interface ProjectItemProps {
  title: string;
  technologies: string;
  description: string;
  link?: string;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ title, technologies, description, link }) => {
  return (
    <article className="mt-2 text-sm leading-tight">
      <p className="font-bold">{title}</p>
      <p>{technologies}</p>
      <p>{description}</p>
      {link && <a href={link} className="text-xs underline text-black">{link}</a>}
    </article>
  );
};