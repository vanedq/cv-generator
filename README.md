# CV Generator

Aplicação web para criar e editar currículos com múltiplos templates e exportação em PDF. ATS-Friendly.

## 💻 Preview

<img width="1258" height="807" alt="Captura de Tela 2025-09-04 às 21 37 00" src="https://github.com/user-attachments/assets/8b1e608d-55fe-45fc-bdb0-a40bf6d0c9ee" />

## ✨ Funcionalidades

- **Local Storage**: Crie quantos currículos quiser e alterne entre eles facilmente, tudo salvo no browser
- **Templates**: Três estilos diferentes (Modern, Minimal e Creative) com várias opções de cores  
- **Edição**: Interface organizada em abas para não se perder
- **Export**: Gere PDFs profissionais direto do navegador
- **Responsivo**: Funciona bem tanto no computador quanto no celular  
- **Automático**: Tudo é salvo sozinho enquanto você edita
- **Flexível**: Adicione ou remova seções conforme sua necessidade

### Seções que você pode preencher:

- 📝 Dados pessoais e contatos
- 🎯 Resumo profissional 
- 💼 Experiências de trabalho
- 🎓 Formação acadêmica
- ⚡ Habilidades técnicas e soft skills
- 🌍 Idiomas que você fala
- 🏆 Projetos pessoais ou profissionais
- 🥇 Prêmios e reconhecimentos
- 📜 Certificados e cursos

## 🛠️ Tecnologias usadas

O projeto foi construído com as ferramentas:

**Frontend:**
- React 19
- TypeScript
- TailwindCSS 4
- Vite
- Lucide React (pros ícones)

**Desenvolvimento:**
- ESLint pra manter o código limpo
- Hot Module Replacement pra agilizar o desenvolvimento

## ⚙️ Rodando o projeto

Rodando localmente:

```bash
git clone [url-do-repositorio]
cd cv-generator/cv-generator
```

Instale as dependências:

```bash
npm install
# ou
pnpm install
# ou
yarn install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
pnpm dev
# ou
yarn run dev
```

Depois é só abrir http://localhost:5173 no navegador.

## 🧪 Guia rápido de uso

**Começando do zero:**
1. Clique em "Criar Novo CV" na primeira tela
2. Preencha suas informações na aba "Pessoal"
3. Vá preenchendo as outras abas conforme sua experiência
4. Escolha um template e cor na aba "Template"
5. Veja o resultado em tempo real no lado direito
6. Quando estiver satisfeito, clique em "PDF" para baixar

**Gerenciando vários CVs:**
- Use o menu dropdown no topo para trocar entre seus currículos
- "Duplicar" cria uma cópia do CV atual (útil para adaptar para vagas específicas)
- "Excluir" remove um CV (sempre vai sobrar pelo menos um)

## 📁 Como o código está organizado

```
cv-generator/
├── src/
│   ├── components/
│   │   ├── cv-sections/        # Como cada seção do CV aparece
│   │   │   ├── header.tsx      # Cabeçalho com nome e contatos
│   │   │   ├── section.tsx     # Template base para seções
│   │   │   ├── experienceItem.tsx
│   │   │   ├── educationItem.tsx
│   │   │   └── projectItem.tsx
│   │   ├── forms/              # Formulários de edição
│   │   │   ├── personalInfoForm.tsx
│   │   │   ├── experienceForm.tsx
│   │   │   ├── templateForm.tsx
│   │   │   └── [outras seções]
│   │   ├── appHeader.tsx       # Barra superior da aplicação
│   │   ├── editPanel.tsx       # Painel esquerdo (edição)
│   │   ├── previewPanel.tsx    # Painel direito (preview)
│   │   └── cvPreview.tsx       # Como o CV é renderizado
│   ├── screens/
│   │   ├── App.tsx             # Componente principal
│   │   └── home.tsx            # Tela de boas-vindas
│   ├── types/
│   │   └── types.tsx           # Tipos TypeScript
│   ├── utils/
│   │   └── colors.ts           # Sistema de cores
│   └── index.css               # Estilos globais
├── public/
├── package.json
└── vite.config.ts
```

## 🎨 Templates disponíveis

**Moderno**: Visual contemporâneo com cores destacadas e layout atual. Bom para a maioria das áreas.

**Minimalista**: Foco total no conteúdo, sem distrações visuais. Ideal para áreas mais conservadoras.

**Criativo**: Cabeçalho colorido e elementos visuais únicos. Perfeito para design, marketing e áreas criativas.

Todos os templates vêm em 6 cores: Verde, Azul, Roxo, Rosa, Laranja e Teal.

## 💡 Detalhes técnicos interessantes

**Arquitetura**: Cada componente tem uma responsabilidade específica, facilitando manutenção e testes.

**Local host (persistência)**: Seus dados ficam salvos no navegador automaticamente. Mesmo fechando a aba, tudo volta quando você abrir novamente.

**Export PDF**: Usa a função nativa de impressão do navegador, mas com CSS otimizado para gerar PDFs com qualidade profissional.

**Responsividade**: Foi pensado primeiro para mobile, então funciona bem em qualquer tela.

## 🚀 Build para produção

```bash
# Gerar build otimizada
npm run build

# Testar a build localmente
npm run preview

# Verificar qualidade do código
npm run lint
```

---

**Desenvolvido por [triz](https://github.com/synthriz)**
