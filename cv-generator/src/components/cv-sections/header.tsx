import { Globe, Link, Linkedin, Mail, Phone, Pin } from "lucide-react";

interface HeaderProps {
  fullName: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  github?: string;
  linkedin?: string;
  website?: string;
  template?: 'modern' | 'minimal' | 'creative';
  creativeColor?: 'emerald' | 'blue' | 'purple' | 'rose' | 'orange' | 'teal';
}

export const Header: React.FC<HeaderProps> = ({ fullName, title, email, phone, location, github, linkedin, website, template, creativeColor = 'emerald' }) => {
  const getHeaderClasses = () => {
    if (template === 'creative') {
      const colorMap = {
        emerald: 'bg-emerald-900 text-white',
        blue: 'bg-blue-900 text-white',
        purple: 'bg-purple-900 text-white',
        rose: 'bg-rose-900 text-white',
        orange: 'bg-orange-900 text-white',
        teal: 'bg-teal-900 text-white'
      };
      return `creative-header flex flex-col justify-center items-center gap-2 -m-6 mb-4 p-6 ${colorMap[creativeColor]}`;
    }
    return "flex flex-col justify-center items-center gap-1 mt-2 text-sm";
  };

  const getIconColor = () => {
    return template === 'creative' ? 'text-white' : 'text-black';
  };

  const getLinkColor = () => {
    return template === 'creative' ? 'text-white hover:text-gray-200' : 'text-black';
  };

  return (
    <section className={getHeaderClasses()}>
      <h1 className="text-xl font-bold">{fullName.toUpperCase()}</h1>
      <p className="font-normal text-base">{title}</p>

      <div className="flex flex-wrap gap-2 justify-center items-center">
        <div className="inline-flex items-center gap-1">
          <Mail className={`w-3 ${getIconColor()}`} aria-hidden="true" focusable="false" />
          <span>{email}</span>
        </div>
        {phone && (
          <div className="inline-flex items-center gap-1">
            <Phone className={`w-3 ${getIconColor()}`} aria-hidden="true" focusable="false" />
            <span>{phone}</span>
          </div>
        )}
        <div className="inline-flex items-center gap-1">
          <Pin className={`w-4 ${getIconColor()}`} aria-hidden="true" focusable="false" />
          <span>{location}</span>
        </div>
      </div>

      {(github || linkedin || website) && (
        <div className="flex flex-wrap gap-2 justify-center items-center text-sm">
          {github && (
            <a className={`inline-flex items-center gap-1 ${getLinkColor()}`} href={github.startsWith('http') ? github : `https://github.com/${github}`}>
              <Link className={`w-3 ${getIconColor()}`} aria-hidden="true" focusable="false" />
              <span>{github.replace('https://github.com/', 'github.com/')}</span>
            </a>
          )}
          {linkedin && (
            <a className={`inline-flex items-center gap-1 ${getLinkColor()}`} href={linkedin.startsWith('http') ? linkedin : `https://linkedin.com/in/${linkedin}`}>
              <Linkedin className={`w-3 ${getIconColor()}`} aria-hidden="true" focusable="false" />
              <span>{linkedin.replace('https://linkedin.com/in/', 'linkedin.com/in/')}</span>
            </a>
          )}
          {website && (
            <a className={`inline-flex items-center gap-1 ${getLinkColor()}`} href={website.startsWith('http') ? website : `https://${website}`}>
              <Globe className={`w-3 ${getIconColor()}`} aria-hidden="true" focusable="false" />
              <span>{website}</span>
            </a>
          )}
        </div>
      )}
    </section>
  );
};