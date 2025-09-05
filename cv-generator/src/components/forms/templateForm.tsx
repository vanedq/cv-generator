// imports dos tipos e utilitarios
import type { CVData } from '../../types/types';
import { getColorOptions } from '../../utils/colors';

// propriedades que o componente recebe
interface TemplateFormProps {
  currentCV: CVData; // dados do cv atual
  updateCV: (cv: CVData) => void; // funcao para atualizar o cv
  isVisible: boolean; // se o formulario esta visivel
}

// formulario para escolher o template e cor do cv
export default function TemplateForm({ currentCV, updateCV, isVisible }: TemplateFormProps) {
  // se nao esta visivel, nao renderiza nada
  if (!isVisible) return null;

  // opcoes de templates disponiveis com seus emojis de preview
  const templates = [
    {
      id: 'modern',
      label: 'Moderno',
      preview: 'ッ'
    },
    {
      id: 'minimal',
      label: 'Minimalista',
      preview: 'ᵕ̈'
    },
    {
      id: 'creative',
      label: 'Criativo',
      preview: '⸜(*ˊᗜˋ*)⸝'
    }
  ] as const;

  // funcao chamada quando usuario escolhe um template diferente
  const handleTemplateChange = (template: 'modern' | 'minimal' | 'creative') => {
    updateCV({
      ...currentCV,
      template,
      // se escolheu creative ou modern, mantem a cor atual ou usa emerald como padrao
      creativeColor: (template === 'creative' || template === 'modern') ? (currentCV.creativeColor || 'emerald') : undefined
    });
  };

  // funcao chamada quando usuario escolhe uma cor diferente
  const handleColorChange = (color: 'emerald' | 'blue' | 'purple' | 'rose' | 'orange' | 'teal') => {
    updateCV({
      ...currentCV,
      creativeColor: color
    });
  };

  // pega as opcoes de cores disponiveis
  const colors = getColorOptions();

  // renderiza o formulario de escolha de template
  return (
    <div className="space-y-4">
      {/* titulo e descricao da secao */}
      <div>
        <h3 className="text-sm font-medium mb-2">Template do CV</h3>
        <p className="text-xs text-gray-600">Escolha o estilo visual do seu currículo</p>
      </div>

      {/* seletor de cor - so aparece para templates creative e modern */}
      {(currentCV.template === 'creative' || currentCV.template === 'modern') && (
        <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
          <div>
            <h4 className="text-sm font-medium mb-2">Cor do Template</h4>
            <p className="text-xs text-gray-600">
              {currentCV.template === 'creative'
                ? 'Escolha a cor de fundo do cabeçalho'
                : 'Escolha a cor dos elementos do template'
              }
            </p>
          </div>
          {/* grid com opcoes de cores */}
          <div className="grid grid-cols-3 gap-2">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorChange(color.id as 'emerald' | 'blue' | 'purple' | 'rose' | 'orange' | 'teal')}
                className={`relative flex items-center gap-2 p-2 rounded-lg border transition-colors ${currentCV.creativeColor === color.id
                  ? 'border-gray-400 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {/* circulo colorido para mostrar a cor */}
                <div className={`w-4 h-4 rounded-full ${color.class}`}></div>
                <span className="text-xs">{color.label}</span>
                {/* indicador de cor selecionada */}
                {currentCV.creativeColor === color.id && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-gray-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* lista de templates disponiveis */}
      <div className="grid grid-cols-1 gap-3">
        {templates.map((template) => (
          <label
            key={template.id}
            className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${currentCV.template === template.id
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
          >
            {/* radio button escondido */}
            <input
              type="radio"
              name="template"
              value={template.id}
              checked={currentCV.template === template.id}
              onChange={() => handleTemplateChange(template.id)}
              className="sr-only"
            />

            <div className="flex items-center gap-3 w-full">
              {/* emoji preview do template */}
              <div className='flex justify-center items-center h-8 w-16'>
                <span className="text-xl">{template.preview}</span>
              </div>
              {/* nome do template */}
              <div className="flex-1">
                <div className="font-medium text-sm">{template.label}</div>
              </div>
              {/* indicador de template selecionado */}
              {currentCV.template === template.id && (
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}