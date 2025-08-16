export default function PersonalInfoForm({ currentCV, updateCV, isVisible }: any) {
  if (!isVisible) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Informações Pessoais</h3>
      <input
        type="text"
        placeholder="Nome do CV"
        value={currentCV.name}
        onChange={(e) => updateCV({ ...currentCV, name: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Nome Completo"
        value={currentCV.personalInfo.fullName}
        onChange={(e) => updateCV({
          ...currentCV,
          personalInfo: { ...currentCV.personalInfo, fullName: e.target.value }
        })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Título Profissional (ex: Front-end Developer | UX/UI Designer)"
        value={currentCV.personalInfo.title}
        onChange={(e) => updateCV({
          ...currentCV,
          personalInfo: { ...currentCV.personalInfo, title: e.target.value }
        })}
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={currentCV.personalInfo.email}
        onChange={(e) => updateCV({
          ...currentCV,
          personalInfo: { ...currentCV.personalInfo, email: e.target.value }
        })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Localização"
        value={currentCV.personalInfo.location}
        onChange={(e) => updateCV({
          ...currentCV,
          personalInfo: { ...currentCV.personalInfo, location: e.target.value }
        })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="LinkedIn (opcional)"
        value={currentCV.personalInfo.linkedin || ''}
        onChange={(e) => updateCV({
          ...currentCV,
          personalInfo: { ...currentCV.personalInfo, linkedin: e.target.value }
        })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="GitHub (opcional)"
        value={currentCV.personalInfo.github || ''}
        onChange={(e) => updateCV({
          ...currentCV,
          personalInfo: { ...currentCV.personalInfo, github: e.target.value }
        })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Website/Portfolio (opcional)"
        value={currentCV.personalInfo.website || ''}
        onChange={(e) => updateCV({
          ...currentCV,
          personalInfo: { ...currentCV.personalInfo, website: e.target.value }
        })}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};