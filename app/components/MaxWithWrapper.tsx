const MaxWhidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`max-w-[1280px] mx-auto ${className}`}>{children}</div>
  );
};

export default MaxWhidthWrapper;
