export default function SummaryForm({ currentCV, updateCV, isVisible }: any) {
  if (!isVisible) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Resumo Profissional</h3>
      <textarea
        placeholder="Escreva um resumo profissional breve e impactante..."
        value={currentCV.professionalSummary}
        onChange={(e) => updateCV({ ...currentCV, professionalSummary: e.target.value })}
        className="w-full p-2 border rounded h-24"
      />
    </div>
  );
};