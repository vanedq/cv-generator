// componente para o cabeçalho principal da aplicação
import type { CVData } from '../types/types';
import BlockText from './blockTriz';
import AddButton, { DeleteButton, SecondaryButton } from './buttonTriz';

// propriedades que o componente recebe
interface AppHeaderProps {
  cvList: CVData[]; // lista de todos os cvs
  currentCV: CVData; // cv atual selecionado
  isMobileMenuOpen: boolean; // se o menu mobile está aberto
  onCVSelect: (cvId: string) => void; // callback para selecionar um cv
  onNewCV: () => void; // callback para criar novo cv
  onDuplicateCV: (cv: CVData) => void; // callback para duplicar cv
  onDeleteCV: (cvId: string) => void; // callback para deletar cv
  onToggleMobileMenu: () => void; // callback para abrir/fechar menu mobile
}

export default function AppHeader({
  cvList,
  currentCV,
  isMobileMenuOpen,
  onCVSelect,
  onNewCV,
  onDuplicateCV,
  onDeleteCV,
  onToggleMobileMenu
}: AppHeaderProps) {
  return (
    // header principal com navegacao e acoes
    <div className="bg-emerald-700 shadow-sm border-b px-4 lg:px-6 py-4 relative mobile-menu-container">
      <div className="flex items-center justify-between max-w-7xl mx-auto text-white">
        {/* titulo do app */}

        <a className='flex flex-row justify-center items-center gap-1' href='https://github.com/synthriz' aria-label='link github'>
          <BlockText prefix={'Gerador de'} blocktext={'CV'} />
          <p> by <span className="underline font-bold">triz</span></p>
        </a>

        {/* menu para desktop com seletor de cv e acoes */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {/* dropdown para selecionar qual cv editar */}
          <select
            value={currentCV.id}
            onChange={(e) => onCVSelect(e.target.value)}
            className="button-triz rounded px-2 lg:px-3 py-2 text-xs lg:text-sm shadow-border-sm"
          >
            {cvList.map(cv => (
              <option key={cv.id} value={cv.id}>{cv.name}</option>
            ))}
          </select>

          {/* botoes de acao */}
          <AddButton customText='+ Novo CV' action={onNewCV} isNavButton />
          <SecondaryButton action={() => onDuplicateCV(currentCV)} />
          <DeleteButton action={() => onDeleteCV(currentCV.id)} disabled={cvList.length <= 1} />
        </div>

        {/* botao hamburguer para mobile */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer"
        >
          {/* animacao do hamburguer para x */}
          <div className={`w-6 h-0.5 bg-emerald-400 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}></div>
          <div className={`w-6 h-0.5 bg-emerald-400 transition-all duration-300 ease-in-out my-1 ${isMobileMenuOpen ? 'opacity-0' : ''
            }`}></div>
          <div className={`w-6 h-0.5 bg-emerald-400 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}></div>
        </button>
      </div>

      {/* menu dropdown que aparece no mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-emerald-700 border-t border-emerald-600 shadow-lg z-50">
          <div className="px-4 py-3 space-y-3">
            {/* seletor de cv para mobile */}
            <select
              value={currentCV.id}
              onChange={(e) => {
                onCVSelect(e.target.value);
                onToggleMobileMenu();
              }}
              className="button-triz rounded px-3 py-2 text-sm shadow-border-sm w-full"
            >
              {cvList.map(cv => (
                <option key={cv.id} value={cv.id}>{cv.name}</option>
              ))}
            </select>

            {/* botoes de acao para mobile */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  onNewCV();
                  onToggleMobileMenu();
                }}
                className="bg-emerald-900 hover:bg-emerald-950 text-emerald-400 hover:text-emerald-300 px-4 py-2 rounded shadow-border-sm text-sm w-full text-left"
              >
                + Novo CV
              </button>

              <button
                onClick={() => {
                  onDuplicateCV(currentCV);
                  onToggleMobileMenu();
                }}
                className="bg-emerald-900 hover:bg-emerald-950 text-emerald-400 hover:text-emerald-300 px-4 py-2 rounded shadow-border-sm text-sm w-full text-left"
              >
                Duplicar
              </button>

              <button
                onClick={() => {
                  onDeleteCV(currentCV.id);
                  onToggleMobileMenu();
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
  );
}