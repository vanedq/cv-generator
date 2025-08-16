interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="text-left leading-tight">
      <h2 className="my-3 mb-2 border-0 border-b-2 border-solid uppercase font-bold">
        {title}
      </h2>
      {children}
    </section>
  );
};