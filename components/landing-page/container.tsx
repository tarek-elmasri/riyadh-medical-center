const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto">
      <div className="p-10 md:p-20">{children}</div>
    </div>
  );
};

export default Container;
