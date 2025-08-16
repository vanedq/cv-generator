// Seus componentes originais adaptados
interface EducationItemProps {
  course: string;
  period: string;
  institution: string;
  details?: string[];
}

export const EducationItem: React.FC<EducationItemProps> = ({ course, period, institution, details }) => {
  const detailsArray = Array.isArray(details) ? details : [];

  return (
    <article className="mt-2 first:mt-0 leading-tight">
      <div className="flex flex-row justify-between">
        <p className="font-bold">{course}</p>
        <p className="text-xs">{period}</p>
      </div>
      <p>{institution}</p>
      {detailsArray.length > 0 && (
        <ul className="text-sm list-disc list-inside">
          {detailsArray.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      )}
    </article>
  );
};