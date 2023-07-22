const Container = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) => {
  return (
    <div id={id} className="w-full max-w-6xl mx-auto">
      {children}
    </div>
  );
};

export default Container;
