import { useEffect, useRef, useState } from 'react';
import BlockText from '../components/blockTriz';
import AddButton, { DeleteButton, SecondaryButton } from '../components/buttonTriz';
import { CVPreview } from '../components/cvPreview';
import AwardsForm from '../components/forms/awardsForm';
import CertificatesForm from '../components/forms/certificatesForm';
import EducationForm from '../components/forms/educationForm';
import ExperienceForm from '../components/forms/experienceForm';
import PersonalInfoForm from '../components/forms/personalInfoForm';
import ProjectsForm from '../components/forms/projectsForm';
import SkillsForm from '../components/forms/skillsForm';
import SummaryForm from '../components/forms/summaryForm';
import Signature from '../components/signature';
import type { CVData } from '../types/types';
import Home from './home';

export function CVGenerator() {
  const [cvList, setCvList] = useState<CVData[]>([]);
  const [currentCV, setCurrentCV] = useState<CVData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // carregar CVs salvos na inicialização
  useEffect(() => {
    const savedCVs = localStorage.getItem('cvGenerator_cvList');
    if (savedCVs) {
      const parsedCVs = JSON.parse(savedCVs);
      setCvList(parsedCVs);
      if (parsedCVs.length > 0) {
        setCurrentCV(parsedCVs[0]);
      }
    }
  }, []);

  // salvar na localStorage sempre que houver mudanças
  useEffect(() => {
    if (cvList.length > 0) {
      localStorage.setItem('cvGenerator_cvList', JSON.stringify(cvList));
    }
  }, [cvList]);

  // fechar menu mobile ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // template inicial para novo cv
  const createNewCV = (): CVData => ({
    id: Date.now().toString(),
    name: 'Novo CV',
    personalInfo: {
      fullName: '',
      title: '',
      email: '',
      location: '',
      linkedin: '',
      github: '',
      website: ''
    },
    professionalSummary: '',
    experience: [],
    education: [],
    technicalSkills: '',
    uxSkills: '',
    languages: '',
    softSkills: '',
    certificates: [],
    projects: [],
    awards: []
  });

  const handleNewCV = () => {
    const newCV = createNewCV();
    setCvList([...cvList, newCV]);
    setCurrentCV(newCV);
    setIsEditing(true);
  };

  const handleDeleteCV = (cvId: string) => {
    const updatedList = cvList.filter(cv => cv.id !== cvId);
    setCvList(updatedList);
    if (currentCV?.id === cvId) {
      setCurrentCV(updatedList.length > 0 ? updatedList[0] : null);
    }
  };

  const handleDuplicateCV = (cv: CVData) => {
    const duplicatedCV = {
      ...cv,
      id: Date.now().toString(),
      name: `${cv.name} (Cópia)`
    };
    setCvList([...cvList, duplicatedCV]);
    setCurrentCV(duplicatedCV);
  };

  const updateCV = (updatedCV: CVData) => {
    const updatedList = cvList.map(cv => cv.id === updatedCV.id ? updatedCV : cv);
    setCvList(updatedList);
    setCurrentCV(updatedCV);
  };

  const handlePrintCV = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${currentCV?.personalInfo.fullName || 'CV'}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; color: #333; }
          .cv-container { max-width: 21cm; margin: 0 auto; padding: 1cm; }
          .text-xl { font-size: 20px; }
          .text-base { font-size: 14px; }
          .text-sm { font-size: 11px; }
          .text-xs { font-size: 10px; }
          .font-bold { font-weight: bold; }
          .font-normal { font-weight: normal; }
          .uppercase { text-transform: uppercase; }
          .flex { display: flex; }
          .flex-col { flex-direction: column; }
          .flex-row { flex-direction: row; }
          .flex-wrap { flex-wrap: wrap; }
          .justify-center { justify-content: center; }
          .justify-between { justify-content: space-between; }
          .items-center { align-items: center; }
          .gap-1 { gap: 0.25rem; }
          .gap-2 { gap: 0.5rem; }
          .mt-2 { margin-top: 0.5rem; }
          .my-3 { margin-top: 0.75rem; margin-bottom: 0.75rem; }
          .mb-2 { margin-bottom: 0.5rem; }
          .leading-tight { line-height: 1.25; }
          .text-left { text-align: left; }
          .text-center { text-align: center; }
          .inline-flex { display: inline-flex; }
          .w-3 { width: 0.75rem; }
          .w-4 { width: 1rem; }
          .border-0 { border-width: 0; }
          .border-b-2 { border-bottom-width: 2px; }
          .border-solid { border-style: solid; }
          .list-disc { list-style-type: disc; }
          .list-inside { list-style-position: inside; }
          .underline { text-decoration: underline; }
          .first\\:mt-0:first-child { margin-top: 0; }
          section h2 { border-bottom: 2px solid #333; }
          
          /* Regras específicas para remover headers e footers da impressão */
          @media print {
            body { 
              print-color-adjust: exact; 
              -webkit-print-color-adjust: exact;
            }
            .cv-container { 
              margin: 0; 
              padding: 0; 
            }
            
            /* Remove headers e footers do navegador */
            @page {
              margin: 0.5in;
              size: A4;
              /* Remove header e footer */
              @top-left { content: ""; }
              @top-center { content: ""; }
              @top-right { content: ""; }
              @bottom-left { content: ""; }
              @bottom-center { content: ""; }
              @bottom-right { content: ""; }
            }
            
            /* Força remoção de elementos de sistema */
            body::before,
            body::after,
            html::before,
            html::after {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();

    // corrigindo erros de textos na sangria do pdf abaixo
    // aguarda um pouco mais para garantir que o CSS seja aplicado
    setTimeout(() => {
      // tenta configurar as opções de impressão programaticamente
      if (printWindow.print) {
        printWindow.print();
      }
      // fecha a janela após um delay maior
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    }, 500);
  };

  // se nunca fez cv mostra tela inicial
  if (!currentCV) {
    return (
      <Home action={handleNewCV} />
    );
  }

  return (
    <div className="min-h-screen bg-emerald-800">
      {/* header com lista de CVs */}
      <div className="bg-emerald-700 shadow-sm border-b px-4 lg:px-6 py-4 relative mobile-menu-container">
        <div className="flex items-center justify-between max-w-7xl mx-auto text-white">
          <BlockText prefix={'Gerador de'} blocktext={'CV'} />

          {/* desktop menu */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <select
              value={currentCV.id}
              onChange={(e) => {
                const selectedCV = cvList.find(cv => cv.id === e.target.value);
                if (selectedCV) setCurrentCV(selectedCV);
              }}
              className="button-triz rounded px-2 lg:px-3 py-2 text-xs lg:text-sm shadow-border-sm"
            >
              {cvList.map(cv => (
                <option key={cv.id} value={cv.id}>{cv.name}</option>
              ))}
            </select>

            <AddButton customText='+ Novo CV' action={handleNewCV} isNavButton />

            <SecondaryButton action={() => handleDuplicateCV(currentCV)} />

            <DeleteButton action={() => handleDeleteCV(currentCV.id)} disabled={cvList.length <= 1} />
          </div>

          {/* mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer"
          >
            <div className={`w-6 h-0.5 bg-emerald-400 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></div>
            <div className={`w-6 h-0.5 bg-emerald-400 transition-all duration-300 ease-in-out my-1 ${isMobileMenuOpen ? 'opacity-0' : ''
              }`}></div>
            <div className={`w-6 h-0.5 bg-emerald-400 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></div>
          </button>
        </div>

        {/* mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-emerald-700 border-t border-emerald-600 shadow-lg z-50">
            <div className="px-4 py-3 space-y-3">
              <select
                value={currentCV.id}
                onChange={(e) => {
                  const selectedCV = cvList.find(cv => cv.id === e.target.value);
                  if (selectedCV) setCurrentCV(selectedCV);
                  setIsMobileMenuOpen(false);
                }}
                className="button-triz rounded px-3 py-2 text-sm shadow-border-sm w-full"
              >
                {cvList.map(cv => (
                  <option key={cv.id} value={cv.id}>{cv.name}</option>
                ))}
              </select>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleNewCV();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-emerald-900 hover:bg-emerald-950 text-emerald-400 hover:text-emerald-300 px-4 py-2 rounded shadow-border-sm text-sm w-full text-left"
                >
                  + Novo CV
                </button>

                <button
                  onClick={() => {
                    handleDuplicateCV(currentCV);
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-emerald-900 hover:bg-emerald-950 text-emerald-400 hover:text-emerald-300 px-4 py-2 rounded shadow-border-sm text-sm w-full text-left"
                >
                  Duplicar
                </button>

                <button
                  onClick={() => {
                    handleDeleteCV(currentCV.id);
                    setIsMobileMenuOpen(false);
                  }}
                  disabled={cvList.length <= 1}
                  className="bg-red-900 hover:bg-red-950 text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded shadow-border-sm text-sm w-full text-left"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          {/* painel de edição */}
          <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
              <h2 className="text-base lg:text-lg font-semibold">
                {isEditing ? 'Editando CV' : 'Visualizando CV'}
              </h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-3 py-2 rounded flex items-center gap-2 text-sm flex-1 sm:flex-none justify-center ${isEditing ? 'bg-emerald-900 text-white hover:bg-emerald-950' : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                >
                  {isEditing ? 'Salvar' : 'Editar'}
                </button>
                <button
                  onClick={handlePrintCV}
                  className="button-triz text-white px-3 py-2 rounded flex items-center gap-2 text-sm flex-1 sm:flex-none justify-center"
                >
                  PDF
                </button>
              </div>
            </div>

            {isEditing && (
              <>
                {/* tabs de Navegação */}
                <div className="flex flex-wrap gap-1 lg:gap-2 mb-6 border-b overflow-x-auto">
                  {[
                    { id: 'personal', label: 'Pessoal' },
                    { id: 'summary', label: 'Resumo' },
                    { id: 'experience', label: 'Experiência' },
                    { id: 'education', label: 'Educação' },
                    { id: 'skills', label: 'Habilidades' },
                    { id: 'projects', label: 'Projetos' },
                    { id: 'awards', label: 'Prêmios' },
                    { id: 'certificates', label: 'Certificados' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-2 lg:px-3 py-2 text-xs lg:text-sm rounded-t-lg whitespace-nowrap ${activeTab === tab.id
                        ? 'button-triz border-b-4'
                        : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* formulários por tab */}
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  <PersonalInfoForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'personal'} />
                  <SummaryForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'summary'} />
                  <ExperienceForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'experience'} />
                  <EducationForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'education'} />
                  <SkillsForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'skills'} />
                  <ProjectsForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'projects'} />
                  <AwardsForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'awards'} />
                  <CertificatesForm currentCV={currentCV} updateCV={updateCV} isVisible={activeTab === 'certificates'} />
                </div>
              </>
            )}
          </div>

          {/* preview do CV */}
          <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
            <h2 className="text-base lg:text-lg font-semibold mb-4 flex items-center gap-2">
              Preview do CV
            </h2>
            <div className="border rounded-lg p-2 lg:p-4 bg-gray-50 overflow-auto" style={{ minHeight: '600px' }}>
              <CVPreview cv={currentCV} ref={printRef} />
            </div>
          </div>
        </div>
        <Signature className='' />
      </div>
    </div>
  );
};