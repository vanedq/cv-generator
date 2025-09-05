// const de cores usadas nos cvs
export const COLORS = {
  emerald: {
    name: 'verde',
    tailwindBg: 'bg-emerald-900',
    tailwindText: 'text-white'
  },
  blue: {
    name: 'azul',
    tailwindBg: 'bg-blue-900',
    tailwindText: 'text-white'
  },
  purple: {
    name: 'roxo',
    tailwindBg: 'bg-purple-900',
    tailwindText: 'text-white'
  },
  rose: {
    name: 'rosa',
    tailwindBg: 'bg-rose-900',
    tailwindText: 'text-white'
  },
  orange: {
    name: 'laranja',
    tailwindBg: 'bg-orange-900',
    tailwindText: 'text-white'
  },
  teal: {
    name: 'teal',
    tailwindBg: 'bg-teal-900',
    tailwindText: 'text-white'
  }
};

// funcoes auxiliares para trabalhar com as cores

// funcao que pega uma cor especifica pelo id
// ex: getColor('emerald') retorna { name: 'verde', tailwindBg: 'bg-emerald-900', tailwindText: 'text-white' }
export const getColor = (colorId: keyof typeof COLORS) => COLORS[colorId];

// funcao que transforma o objeto COLORS em um array de opcoes para usar em selects/formularios
// pega cada cor e cria um objeto com id, nome em portugues e classe css do tailwind
// ex: [{ id: 'emerald', label: 'verde', class: 'bg-emerald-900' }, { id: 'blue', label: 'azul', class: 'bg-blue-900' }, ...]
export const getColorOptions = () =>
  Object.entries(COLORS).map(([id, config]) => ({
    id, // chave da cor (emerald, blue, purple, etc)
    label: config.name, // nome em portugues (verde, azul, roxo, etc)
    class: config.tailwindBg // classe css do tailwind para background (bg-emerald-900, bg-blue-900, etc)
  }));


