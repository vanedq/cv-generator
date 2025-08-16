import type { Award } from "../../types/types";
import AddButton from "../buttonTriz";

export default function AwardsForm({ currentCV, updateCV, isVisible }: any) {
  if (!isVisible) return null;

  const addAward = () => {
    const newAward: Award = { title: '', year: '', organization: '', description: '' };
    updateCV({ ...currentCV, awards: [...currentCV.awards, newAward] });
  };

  const updateAward = (index: number, field: keyof Award, value: string) => {
    const updated = [...currentCV.awards];
    updated[index] = { ...updated[index], [field]: value };
    updateCV({ ...currentCV, awards: updated });
  };

  const removeAward = (index: number) => {
    updateCV({ ...currentCV, awards: currentCV.awards.filter((_: any, i: number) => i !== index) });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Prêmios e Reconhecimentos</h3>
        <AddButton action={addAward} />
      </div>

      {currentCV.awards.map((award: Award, index: number) => (
        <div key={index} className="border p-4 rounded bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium text-sm">Prêmio {index + 1}</span>
            <button
              onClick={() => removeAward(index)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remover
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Título do Prêmio"
              value={award.title}
              onChange={(e) => updateAward(index, 'title', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="text"
              placeholder="Ano"
              value={award.year}
              onChange={(e) => updateAward(index, 'year', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="text"
              placeholder="Organização"
              value={award.organization}
              onChange={(e) => updateAward(index, 'organization', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
            <textarea
              placeholder="Descrição (opcional)"
              value={award.description || ''}
              onChange={(e) => updateAward(index, 'description', e.target.value)}
              className="w-full p-2 border rounded text-sm h-20"
            />
          </div>
        </div>
      ))}
    </div>
  );
};