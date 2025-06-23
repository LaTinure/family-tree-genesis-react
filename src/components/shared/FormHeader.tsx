
interface FormHeaderProps {
  title: string;
  subtitle?: string;
}

export const FormHeader = ({ title, subtitle }: FormHeaderProps) => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  );
};
