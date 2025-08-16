export default function SkillsForm({ currentCV, updateCV, isVisible }: any) {
  if (!isVisible) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Habilidades</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Habilidades Técnicas</label>
        <textarea
          placeholder="Ex: JavaScript, React, Node.js, Python, SQL..."
          value={currentCV.technicalSkills}
          onChange={(e) => updateCV({ ...currentCV, technicalSkills: e.target.value })}
          className="w-full p-2 border rounded h-20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Habilidades UX/Design</label>
        <textarea
          placeholder="Ex: Figma, Adobe XD, Design Thinking, Prototipagem..."
          value={currentCV.uxSkills}
          onChange={(e) => updateCV({ ...currentCV, uxSkills: e.target.value })}
          className="w-full p-2 border rounded h-20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Idiomas</label>
        <textarea
          placeholder="Ex: Português (nativo), Inglês (fluente), Espanhol (intermediário)..."
          value={currentCV.languages}
          onChange={(e) => updateCV({ ...currentCV, languages: e.target.value })}
          className="w-full p-2 border rounded h-20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Habilidades Comportamentais</label>
        <textarea
          placeholder="Ex: Liderança, Comunicação, Trabalho em equipe, Resolução de problemas..."
          value={currentCV.softSkills}
          onChange={(e) => updateCV({ ...currentCV, softSkills: e.target.value })}
          className="w-full p-2 border rounded h-20"
        />
      </div>
    </div>
  );
};