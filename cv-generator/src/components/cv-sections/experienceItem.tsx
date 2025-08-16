interface ExperienceItemProps {
  company: string;
  period: string;
  position: string;
  items: string[];
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ company, period, position, items }) => {
  return (
    <article className="mt-2 first:mt-0 leading-tight">
      <div className="flex flex-row justify-between">
        <p className="font-bold">{company}</p>
        <p className="text-xs">{period}</p>
      </div>
      <p>{position}</p>
      <ul className="text-sm list-disc list-inside">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  );
};