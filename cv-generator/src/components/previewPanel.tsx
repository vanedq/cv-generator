// componente para o painel de preview do cv
import { forwardRef } from 'react';
import type { CVData } from '../types/types';
import { CVPreview } from './cvPreview';

// propriedades que o componente recebe
interface PreviewPanelProps {
  currentCV: CVData; // cv atual para visualização
}

// usar forwardRef para permitir que o componente pai acesse a referência do elemento
const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(({ currentCV }, ref) => {
  return (
    // painel direito - preview do cv
    <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
      <h2 className="text-base lg:text-lg font-semibold mb-4 flex items-center gap-2">
        Preview do CV
      </h2>
      {/* área de preview com scroll caso necessário */}
      <div className="border rounded-lg p-2 lg:p-4 bg-gray-50 overflow-auto" style={{ minHeight: '600px' }}>
        {/* componente que renderiza o cv - ref usado para impressão */}
        <CVPreview cv={currentCV} ref={ref} />
      </div>
    </div>
  );
});

PreviewPanel.displayName = 'PreviewPanel';

export default PreviewPanel;