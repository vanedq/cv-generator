import AddButton from "../buttonTriz";

export default function CertificatesForm({ currentCV, updateCV, isVisible }: any) {
  if (!isVisible) return null;

  const addCertificate = () => {
    updateCV({ ...currentCV, certificates: [...currentCV.certificates, ''] });
  };

  const updateCertificate = (index: number, value: string) => {
    const updated = [...currentCV.certificates];
    updated[index] = value;
    updateCV({ ...currentCV, certificates: updated });
  };

  const removeCertificate = (index: number) => {
    updateCV({ ...currentCV, certificates: currentCV.certificates.filter((_: string, i: number) => i !== index) });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Certificações</h3>
        <AddButton action={addCertificate} />
      </div>

      {currentCV.certificates.map((cert: string, index: number) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            placeholder="Nome da certificação"
            value={cert}
            onChange={(e) => updateCertificate(index, e.target.value)}
            className="flex-1 p-2 border rounded text-sm"
          />
          <button
            onClick={() => removeCertificate(index)}
            className="text-red-600 hover:text-red-800 px-2"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};