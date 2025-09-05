// propriedades que o componente section recebe
interface SectionProps {
  title: string; // titulo da secao (ex: "experiencia", "educacao")
  children: React.ReactNode; // conteudo que vai dentro da secao
  template?: 'modern' | 'minimal' | 'creative'; // tipo de template
  creativeColor?: 'emerald' | 'blue' | 'purple' | 'rose' | 'orange' | 'teal'; // cor para templates coloridos
}

// componente que cria uma secao do cv (experiencia, educacao, etc)
export const Section: React.FC<SectionProps> = ({ title, children, template = 'modern', creativeColor = 'emerald' }) => {
  // funcao que define os estilos de cor e borda do titulo da secao
  const getColorStyles = () => {
    // estilos base que todos os titulos tem
    const baseStyles = {
      border: '0',
      borderBottom: '2px solid', // linha embaixo do titulo
      margin: '0.75rem 0 0.5rem 0' // espacamento
    };

    // mapa com todas as cores disponiveis para cada template
    // cada cor tem versoes diferentes para template modern e creative
    const colorMap = {
      emerald: { modern: { borderBottomColor: '#10b981', color: '#059669' }, creative: { borderBottomColor: '#34d399', color: '#047857' } },
      blue: { modern: { borderBottomColor: '#3b82f6', color: '#2563eb' }, creative: { borderBottomColor: '#60a5fa', color: '#1d4ed8' } },
      purple: { modern: { borderBottomColor: '#8b5cf6', color: '#7c3aed' }, creative: { borderBottomColor: '#a78bfa', color: '#6d28d9' } },
      rose: { modern: { borderBottomColor: '#f43f5e', color: '#e11d48' }, creative: { borderBottomColor: '#fb7185', color: '#be123c' } },
      orange: { modern: { borderBottomColor: '#f97316', color: '#ea580c' }, creative: { borderBottomColor: '#fb923c', color: '#c2410c' } },
      teal: { modern: { borderBottomColor: '#14b8a6', color: '#0d9488' }, creative: { borderBottomColor: '#2dd4bf', color: '#0f766e' } }
    };

    // se o template for modern ou creative, usa as cores personalizadas
    if (template === 'modern' || template === 'creative') {
      return { ...baseStyles, ...colorMap[creativeColor][template] };
    } else {
      // para template minimal, usa preto
      return { ...baseStyles, borderBottomColor: '#000' };
    }
  };

  // funcao que define as classes css do titulo baseado no template
  const getSectionTitleClasses = () => {
    const baseClasses = 'uppercase font-bold'; // maiusculo e negrito sempre

    switch (template) {
      case 'modern':
        return `${baseClasses} tracking-wide`; // adiciona espacamento entre letras
      case 'minimal':
      case 'creative':
      default:
        return baseClasses; // so maiusculo e negrito
    }
  };

  // renderiza a secao com titulo e conteudo
  return (
    <section className="text-left leading-tight">
      {/* titulo da secao com estilos dinamicos baseados no template */}
      <h2 className={getSectionTitleClasses()} style={getColorStyles()}>
        {title}
      </h2>
      {/* conteudo da secao (experiencias, educacao, etc) */}
      {children}
    </section>
  );
};