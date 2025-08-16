import type { Experience } from "../../types/types";
import AddButton, { SmallAddButton } from "../buttonTriz";

export default function ExperienceForm({ currentCV, updateCV, isVisible }: any) {
  if (!isVisible) return null;

  const addExperience = () => {
    const newExp: Experience = { company: '', period: '', position: '', items: [''] };
    updateCV({ ...currentCV, experience: [...currentCV.experience, newExp] });
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const updated = [...currentCV.experience];
    updated[index] = { ...updated[index], [field]: value };
    updateCV({ ...currentCV, experience: updated });
  };

  const removeExperience = (index: number) => {
    updateCV({ ...currentCV, experience: currentCV.experience.filter((_: any, i: number) => i !== index) });
  };

  const addItem = (expIndex: number) => {
    const updated = [...currentCV.experience];
    updated[expIndex].items.push('');
    updateCV({ ...currentCV, experience: updated });
  };

  const updateItem = (expIndex: number, itemIndex: number, value: string) => {
    const updated = [...currentCV.experience];
    updated[expIndex].items[itemIndex] = value;
    updateCV({ ...currentCV, experience: updated });
  };

  const removeItem = (expIndex: number, itemIndex: number) => {
    const updated = [...currentCV.experience];
    updated[expIndex].items = updated[expIndex].items.filter((_: string, i: number) => i !== itemIndex);
    updateCV({ ...currentCV, experience: updated });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Experiência Profissional</h3>
        <AddButton action={addExperience} />
      </div>

      {currentCV.experience.map((exp: Experience, index: number) => (
        <div key={index} className="border p-4 rounded bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium text-sm">Experiência {index + 1}</span>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remover
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Empresa"
              value={exp.company}
              onChange={(e) => updateExperience(index, 'company', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="text"
              placeholder="Cargo"
              value={exp.position}
              onChange={(e) => updateExperience(index, 'position', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="text"
              placeholder="Período (ex: Jan 2020 - Dez 2022)"
              value={exp.period}
              onChange={(e) => updateExperience(index, 'period', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Responsabilidades:</label>
                <SmallAddButton action={() => addItem(index)} />
              </div>

              {exp.items.map((item: string, itemIndex: number) => (
                <div key={itemIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Descreva uma responsabilidade ou conquista..."
                    value={item}
                    onChange={(e) => updateItem(index, itemIndex, e.target.value)}
                    className="flex-1 p-2 border rounded text-sm"
                  />
                  <button
                    onClick={() => removeItem(index, itemIndex)}
                    className="text-red-600 hover:text-red-800 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};