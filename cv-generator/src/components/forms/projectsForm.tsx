import type { Project } from "../../types/types";
import AddButton from "../buttonTriz";

export default function ProjectsForm({ currentCV, updateCV, isVisible }: any) {
  if (!isVisible) return null;

  const addProject = () => {
    const newProject: Project = { title: '', technologies: '', description: '', link: '' };
    updateCV({ ...currentCV, projects: [...currentCV.projects, newProject] });
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...currentCV.projects];
    updated[index] = { ...updated[index], [field]: value };
    updateCV({ ...currentCV, projects: updated });
  };

  const removeProject = (index: number) => {
    updateCV({ ...currentCV, projects: currentCV.projects.filter((_: any, i: number) => i !== index) });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Projetos</h3>
        <AddButton action={addProject} />
      </div>

      {currentCV.projects.map((project: Project, index: number) => (
        <div key={index} className="border p-4 rounded bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium text-sm">Projeto {index + 1}</span>
            <button
              onClick={() => removeProject(index)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remover
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Título do Projeto"
              value={project.title}
              onChange={(e) => updateProject(index, 'title', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="text"
              placeholder="Tecnologias utilizadas"
              value={project.technologies}
              onChange={(e) => updateProject(index, 'technologies', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
            <textarea
              placeholder="Descrição do projeto"
              value={project.description}
              onChange={(e) => updateProject(index, 'description', e.target.value)}
              className="w-full p-2 border rounded text-sm h-20"
            />
            <input
              type="text"
              placeholder="Link do projeto (opcional)"
              value={project.link || ''}
              onChange={(e) => updateProject(index, 'link', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
          </div>
        </div>
      ))}
    </div>
  );
};