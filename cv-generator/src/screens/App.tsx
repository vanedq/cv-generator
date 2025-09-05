// imports dos hooks do react
import { useEffect, useRef, useState } from 'react';

// componentes da interface
import AppHeader from '../components/appHeader';
import EditPanel from '../components/editPanel';
import PreviewPanel from '../components/previewPanel';
import Signature from '../components/signature';

// tipos e tela inicial
import type { CVData } from '../types/types';
import Home from './home';

// componente principal do gerador de cv
export function CVGenerator() {
  // estados para gerenciar a lista de cvs e o cv atual
  const [cvList, setCvList] = useState<CVData[]>([]); // lista com todos os cvs salvos
  const [currentCV, setCurrentCV] = useState<CVData | null>(null); // cv que esta sendo editado/visualizado

  // estados para controlar a interface
  const [isEditing, setIsEditing] = useState(false); // se esta no modo edicao ou visualizacao
  const [activeTab, setActiveTab] = useState('personal'); // qual aba esta ativa nos formularios
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // se o menu mobile esta aberto

  // referencia para o elemento que sera usado na impressao do pdf
  const printRef = useRef<HTMLDivElement>(null);

  // carrega os cvs salvos do localstorage quando o componente inicia
  useEffect(() => {
    const savedCVs = localStorage.getItem('cvGenerator_cvList');
    if (savedCVs) {
      const parsedCVs = JSON.parse(savedCVs);
      setCvList(parsedCVs); // carrega a lista de cvs
      if (parsedCVs.length > 0) {
        setCurrentCV(parsedCVs[0]); // seleciona o primeiro cv como atual
      }
    }
  }, []);

  // salva automaticamente no localstorage sempre que a lista de cvs muda
  useEffect(() => {
    if (cvList.length > 0) {
      localStorage.setItem('cvGenerator_cvList', JSON.stringify(cvList));
    }
  }, [cvList]);

  // fecha o menu mobile quando o usuario clica fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // cria um novo cv vazio com valores padrao
  const createNewCV = (): CVData => ({
    id: Date.now().toString(), // usa timestamp como id unico
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
    awards: [],
    template: 'modern', // template padrao
    creativeColor: 'emerald' // cor padrao para template criativo
  });

  // funcao para criar um novo cv
  const handleNewCV = () => {
    const newCV = createNewCV();
    setCvList([...cvList, newCV]); // adiciona o novo cv na lista
    setCurrentCV(newCV); // seleciona o novo cv como atual
    setIsEditing(true); // entra automaticamente no modo edicao
  };

  // funcao para deletar um cv da lista
  const handleDeleteCV = (cvId: string) => {
    const updatedList = cvList.filter(cv => cv.id !== cvId); // remove o cv da lista
    setCvList(updatedList);
    // se o cv deletado era o atual, seleciona outro ou null
    if (currentCV?.id === cvId) {
      setCurrentCV(updatedList.length > 0 ? updatedList[0] : null);
    }
  };

  // funcao para duplicar um cv existente
  const handleDuplicateCV = (cv: CVData) => {
    const duplicatedCV = {
      ...cv, // copia todos os dados do cv original
      id: Date.now().toString(), // novo id unico
      name: `${cv.name} (Cópia)` // adiciona "(copia)" no nome
    };
    setCvList([...cvList, duplicatedCV]); // adiciona na lista
    setCurrentCV(duplicatedCV); // seleciona a copia como atual
  };

  // funcao para atualizar os dados de um cv
  const updateCV = (updatedCV: CVData) => {
    const updatedList = cvList.map(cv => cv.id === updatedCV.id ? updatedCV : cv);
    setCvList(updatedList); // atualiza na lista
    setCurrentCV(updatedCV); // atualiza o cv atual
  };

  // funcao para selecionar um cv da lista
  const handleCVSelect = (cvId: string) => {
    const selectedCV = cvList.find(cv => cv.id === cvId);
    if (selectedCV) setCurrentCV(selectedCV);
  };

  // funcao para gerar e imprimir o cv como pdf
  const handlePrintCV = () => {
    const printContent = printRef.current; // pega o conteudo do cv para impressao
    if (!printContent) return;

    // abre uma nova janela para impressao
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // cria o html completo com tailwind cdn e css customizado
    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${currentCV?.personalInfo.fullName || 'CV'}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          /* estilos customizados que o tailwind nao tem */
          
          /* estilo do header criativo */
          .creative-header { 
            margin: -1.5rem -1.5rem 0.5rem -1.5rem; 
            padding: 2.5rem 1.5rem 2rem 1.5rem; 
            color: white; 
          }
          .creative-header a { color: white !important; }
          .creative-header h1 { margin-top: 1rem; }
          
          /* remove underline dos links */
          .cv-container a { text-decoration: none; color: #000; }
          .creative-header a { color: #fff !important; }
          
          /* configuracoes para impressao em pdf */
          @media print {
            body { 
              print-color-adjust: exact; 
              -webkit-print-color-adjust: exact;
            }
            .cv-container { 
              margin: 0; 
              padding: 0; 
            }
            
            /* configura pagina a4 */
            @page {
              margin: 0.5in;
              size: A4;
              /* remove headers e footers do navegador */
              @top-left { content: ""; }
              @top-center { content: ""; }
              @top-right { content: ""; }
              @bottom-left { content: ""; }
              @bottom-center { content: ""; }
              @bottom-right { content: ""; }
            }
            
            /* remove elementos de sistema */
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

    // aguarda o css carregar e depois imprime
    setTimeout(() => {
      if (printWindow.print) {
        printWindow.print(); // abre o dialog de impressao
      }
      // fecha a janela depois de imprimir
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    }, 500);
  };

  // se nao tem nenhum cv criado, mostra a tela inicial
  if (!currentCV) {
    return (
      <Home action={handleNewCV} />
    );
  }

  // renderiza a interface principal do gerador de cv
  return (
    <div className="min-h-screen bg-emerald-800">
      {/* header principal com navegacao e acoes */}
      <AppHeader
        cvList={cvList}
        currentCV={currentCV}
        isMobileMenuOpen={isMobileMenuOpen}
        onCVSelect={handleCVSelect}
        onNewCV={handleNewCV}
        onDuplicateCV={handleDuplicateCV}
        onDeleteCV={handleDeleteCV}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* conteudo principal em duas colunas */}
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          {/* painel esquerdo - formularios de edicao */}
          <EditPanel
            currentCV={currentCV}
            isEditing={isEditing}
            activeTab={activeTab}
            onEditToggle={() => setIsEditing(!isEditing)}
            onPrintCV={handlePrintCV}
            onTabChange={setActiveTab}
            updateCV={updateCV}
          />

          {/* painel direito - preview do cv */}
          <PreviewPanel currentCV={currentCV} ref={printRef} />
        </div>
        {/* assinatura no final da pagina */}
        <Signature className='' />
      </div>
    </div>
  );
};