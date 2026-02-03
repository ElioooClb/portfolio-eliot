type TagProps = {
  label: string;
};

const Tag = ({ label }: TagProps) => {
  return (
    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
      {label}
    </span>
  );
};

export default Tag;
