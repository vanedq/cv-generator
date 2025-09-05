# 📄 CV Generator

Criador de currículos profissionais com múltiplos templates e personalização completa. Crie, edite e exporte seu CV em PDF de forma simples e intuitiva (e esse readme.md definitivamente não foi gerado por IA :S)

## ⚡ Preview

[Em breve - Deploy aqui]

<!-- ![Preview do CV Generator](preview.png) -->

## ✨ Funcionalidades

✅ **Multiple CVs**: Crie e gerencie múltiplos currículos  
✅ **3 Templates**: Modern, Minimal e Creative com cores personalizáveis  
✅ **Editor Completo**: Interface intuitiva com abas organizadas  
✅ **Export PDF**: Gere PDFs profissionais com um clique  
✅ **Responsive**: Funciona perfeitamente em mobile e desktop  
✅ **Local Storage**: Seus dados são salvos automaticamente  
✅ **Formulários Dinâmicos**: Adicione/remova experiências, educação, projetos e mais

### Seções Disponíveis:

- 📝 Informações pessoais (nome, email, telefone, links)
- 🎯 Resumo profissional
- 💼 Experiências profissionais
- 🎓 Educação e formação
- ⚡ Habilidades técnicas e comportamentais
- 🌍 Idiomas
- 🏆 Projetos
- 🥇 Prêmios e reconhecimentos
- 📜 Certificados

## 🛠️ Stack Utilizada

**Frontend:**

- React 19
- TypeScript
- TailwindCSS 4
- Vite
- Lucide React (ícones)

**Build & Dev:**

- ESLint
- Hot Module Replacement (HMR)

## ⚙️ Como rodar localmente

Clone o repositório:

```bash
git clone [url-do-repositorio]
cd cv-generator/cv-generator
```

Instale as dependências:

```bash
npm install
# ou
pnpm install
```

Rode o projeto:

```bash
npm run dev
# ou
pnpm dev
```

Acesse http://localhost:5173 no navegador.

## 🧪 Como usar

1. **Primeira vez**: Clique em "Criar Novo CV" na tela inicial
2. **Informações**: Preencha os dados na aba "Pessoal"
3. **Conteúdo**: Use as abas para adicionar experiências, educação, etc
4. **Template**: Escolha o visual na aba "Template"
5. **Preview**: Visualize em tempo real no painel direito
6. **Export**: Clique em "PDF" para baixar

### Gerenciando múltiplos CVs:

- Use o dropdown no header para alternar entre CVs
- "Duplicar" para criar cópias
- "Excluir" para remover (mínimo 1 CV)

## 📁 Estrutura do projeto

```
cv-generator/
├── src/
│   ├── components/
│   │   ├── cv-sections/        # Componentes das seções do CV
│   │   │   ├── header.tsx      # Cabeçalho com info pessoal
│   │   │   ├── section.tsx     # Seção genérica
│   │   │   ├── experienceItem.tsx
│   │   │   ├── educationItem.tsx
│   │   │   └── projectItem.tsx
│   │   ├── forms/              # Formulários de edição
│   │   │   ├── personalInfoForm.tsx
│   │   │   ├── experienceForm.tsx
│   │   │   ├── templateForm.tsx
│   │   │   └── ...
│   │   ├── appHeader.tsx       # Header da aplicação
│   │   ├── editPanel.tsx       # Painel de edição
│   │   ├── previewPanel.tsx    # Painel de preview
│   │   └── cvPreview.tsx       # Renderização do CV
│   ├── screens/
│   │   ├── App.tsx             # Componente principal
│   │   └── home.tsx            # Tela inicial
│   ├── types/
│   │   └── types.tsx           # Definições TypeScript
│   ├── utils/
│   │   └── colors.ts           # Sistema de cores
│   └── index.css               # Estilos globais
├── public/
├── package.json
└── vite.config.ts
```

## 🎨 Templates Disponíveis

### Moderno

Design contemporâneo com cores vibrantes e elementos destacados.

### Minimalista

Estilo limpo e minimalista, focado no conteúdo.

### Criativo

Template colorido com cabeçalho destacado - ideal para áreas criativas.

**Cores disponíveis**: Verde, Azul, Roxo, Rosa, Laranja, Teal

## 💡 Funcionalidades Técnicas

### Componentização

- Arquitetura modular com componentes reutilizáveis
- Separação clara entre lógica de negócio e apresentação
- Props tipadas com TypeScript

### Persistência

- LocalStorage para salvar dados automaticamente
- Sistema de múltiplos CVs com IDs únicos
- Recuperação automática na inicialização

### Export PDF

- Geração de PDF via window.print()
- CSS otimizado para impressão
- Preservação de cores e layout

### Responsividade

- Design mobile-first
- Menu hambúrguer para mobile
- Layout adaptativo com CSS Grid

## 🚀 Build e Deploy

```bash
# Build para produção
npm run build

# Preview da build
npm run preview

# Lint do código
npm run lint
```

## 🧠 Processo de desenvolvimento

O projeto foi desenvolvido seguindo estas etapas:

1. **Análise de requisitos**: Definição das funcionalidades essenciais de um gerador de CV
2. **Arquitetura**: Estrutura modular com separação clara de responsabilidades
3. **Componentização**: Criação de componentes reutilizáveis e tipados
4. **Sistema de templates**: Implementação de múltiplos layouts com personalização
5. **Persistência**: Sistema robusto de salvamento local
6. **UX/UI**: Interface intuitiva com feedback visual
7. **Export**: Funcionalidade de geração de PDF profissional
8. **Otimização**: Limpeza de código e performance

## 🤝 Contribuição

Este é um projeto pessoal, mas sugestões e melhorias são bem-vindas!

---

**Feito com <3 por [triz](https://github.com/synthriz)**
