import type { Education } from "../../types/types";
import AddButton, { SmallAddButton } from "../buttonTriz";

export default function EducationForm({ currentCV, updateCV, isVisible }: any) {
  if (!isVisible) return null;

  const addEducation = () => {
    const newEdu: Education = { course: '', period: '', institution: '', details: [] };
    updateCV({ ...currentCV, education: [...currentCV.education, newEdu] });
  };

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const updated = [...currentCV.education];
    updated[index] = { ...updated[index], [field]: value };
    updateCV({ ...currentCV, education: updated });
  };

  const removeEducation = (index: number) => {
    updateCV({ ...currentCV, education: currentCV.education.filter((_: any, i: number) => i !== index) });
  };

  const addDetail = (eduIndex: number) => {
    const updated = [...currentCV.education];
    if (!Array.isArray(updated[eduIndex].details)) {
      updated[eduIndex].details = [];
    }
    updated[eduIndex].details.push('');
    updateCV({ ...currentCV, education: updated });
  };

  const updateDetail = (eduIndex: number, detailIndex: number, value: string) => {
    const updated = [...currentCV.education];
    if (!Array.isArray(updated[eduIndex].details)) {
      updated[eduIndex].details = [];
    }
    updated[eduIndex].details[detailIndex] = value;
    updateCV({ ...currentCV, education: updated });
  };

  const removeDetail = (eduIndex: number, detailIndex: number) => {
    const updated = [...currentCV.education];
    if (Array.isArray(updated[eduIndex].details)) {
      updated[eduIndex].details = updated[eduIndex].details.filter((_: string, i: number) => i !== detailIndex);
    }
    updateCV({ ...currentCV, education: updated });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Formação Acadêmica</h3>
        <AddButton action={addEducation} />
      </div>

      {currentCV.education.map((edu: Education, index: number) => (
        <div key={index} className="border p-4 rounded bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium text-sm">Formação {index + 1}</span>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remover
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Curso"
              value={edu.course}
              onChange={(e) => updateEducation(index, 'course', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="text"
              placeholder="Instituição"
              value={edu.institution}
              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="text"
              placeholder="Período"
              value={edu.period}
              onChange={(e) => updateEducation(index, 'period', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Detalhes (opcional):</label>
                <SmallAddButton action={() => addDetail(index)} customText="+ Detalhe" />
              </div>

              {Array.isArray(edu.details) && edu.details.map((detail: string, detailIndex: number) => (
                <div key={detailIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Adicione um detalhe sobre a formação..."
                    value={detail}
                    onChange={(e) => updateDetail(index, detailIndex, e.target.value)}
                    className="flex-1 p-2 border rounded text-sm"
                  />
                  <button
                    onClick={() => removeDetail(index, detailIndex)}
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