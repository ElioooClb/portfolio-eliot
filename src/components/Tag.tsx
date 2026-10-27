type TagProps = {
  label: string;
};

const Tag = ({ label }: TagProps) => {
  return (
    <span className="rounded-full border border-line bg-surface2 px-3 py-1 text-xs font-medium text-body">
      {label}
    </span>
  );
};

export default Tag;
