export const Projects = () => {
  return (
    <div className={`flex flex-col gap-1 w-auto mt-4`}>
      <h1 className="text-xl text-white font-bold">Projects</h1>
      <div className="flex gap-4">
        <h1 className="text-l text-white font-bold">2023</h1>
        <p className="text-white">
          wulf.gg - The very website you are looking at
        </p>
      </div>
      <div className="flex gap-4">
        <h1 className="text-l text-white font-bold">2023</h1>
        <p className="text-white">
          cuiz - Quiz for custom command-line aliases
        </p>
      </div>
    </div>
  );
};
