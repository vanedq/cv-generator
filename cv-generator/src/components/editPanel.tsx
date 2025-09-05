// componente para o painel de edição dos dados do cv
import type { CVData } from '../types/types';
import AwardsForm from './forms/awardsForm';
import CertificatesForm from './forms/certificatesForm';
import EducationForm from './forms/educationForm';
import ExperienceForm from './forms/experienceForm';
import PersonalInfoForm from './forms/personalInfoForm';
import ProjectsForm from './forms/projectsForm';
import SkillsForm from './forms/skillsForm';
import SummaryForm from './forms/summaryForm';
import TemplateForm from './forms/templateForm';

// propriedades que o componente recebe
interface EditPanelProps {
  currentCV: CVData; // cv atual sendo editado
  isEditing: boolean; // se está no modo edição ou visualização
  activeTab: string; // qual aba está ativa nos formulários
  onEditToggle: () => void; // callback para alternar modo edição/visualização
  onPrintCV: () => void; // callback para gerar pdf
  onTabChange: (tabId: string) => void; // callback para mudar aba ativa
  updateCV: (updatedCV: CVData) => void; // callback para atualizar dados do cv
}

export default function EditPanel({
  currentCV,
  isEditing,
  activeTab,
  onEditToggle,
  onPrintCV,
  onTabChange,
  updateCV
}: EditPanelProps) {
  return (
    // painel esquerdo - formulários de edição
    <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
      {/* cabeçalho do painel com botões */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <h2 className="text-base lg:text-lg font-semibold">
          {isEditing ? 'Editando CV =)' : 'Visualizando CV ⊙.⊙'}
        </h2>
        <div className="flex gap-2 w-full sm:w-auto">
          {/* botão para alternar entre edição e visualização */}
          <button
            onClick={onEditToggle}
            className={`px-3 py-2 rounded flex items-center gap-2 text-sm flex-1 sm:flex-none justify-center ${isEditing
              ? 'bg-emerald-900 text-white hover:bg-emerald-950'
              : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
          >
            {isEditing ? 'Salvar' : 'Editar'}
          </button>
          {/* botão para gerar pdf */}
          <button
            onClick={onPrintCV}
            className="button-triz text-white px-3 py-2 rounded flex items-center gap-2 text-sm flex-1 sm:flex-none justify-center"
          >
            PDF
          </button>
        </div>
      </div>

      {/* conteúdo que só aparece no modo edição */}
      {isEditing && (
        <>
          {/* abas de navegação entre os formulários */}
          <div className="flex flex-wrap gap-1 lg:gap-2 mb-6 border-b overflow-x-auto">
            {[
              { id: 'personal', label: 'Pessoal' },
              { id: 'summary', label: 'Resumo' },
              { id: 'experience', label: 'Experiência' },
              { id: 'education', label: 'Educação' },
              { id: 'skills', label: 'Habilidades' },
              { id: 'projects', label: 'Projetos' },
              { id: 'awards', label: 'Prêmios' },
              { id: 'certificates', label: 'Certificados' },
              { id: 'template', label: 'Template' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-2 lg:px-3 py-2 text-xs lg:text-sm rounded-t-lg whitespace-nowrap ${activeTab === tab.id
                  ? 'button-triz border-b-4' // aba ativa
                  : 'text-gray-600 hover:text-gray-800' // aba inativa
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* área dos formulários - cada um aparece baseado na aba ativa */}
          <div className="space-y-6 max-h-96 overflow-y-auto">
            <PersonalInfoForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'personal'} />
            <SummaryForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'summary'} />
            <ExperienceForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'experience'} />
            <EducationForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'education'} />
            <SkillsForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'skills'} />
            <ProjectsForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'projects'} />
            <AwardsForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'awards'} />
            <CertificatesForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'certificates'} />
            <TemplateForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'template'} />
          </div>
        </>
      )}
    </div>
  );
}