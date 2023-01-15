export const Home = () => {
  return (
    <div className={`flex flex-col gap-1 w-auto`}>
      <h1 className="text-xl text-white font-bold">Biography</h1>
      <div className="flex gap-4">
        <h1 className="text-l text-white font-bold">1998</h1>
        <p className="text-white">Born in Växjö, Sweden</p>
      </div>
      <div className="flex gap-4">
        <h1 className="text-l text-white font-bold">2022</h1>
        <p className="text-white">
          Graduated from Lunds Tekniska Högskola, Bachelor of Science in
          Engineering, Computer Science and Engineering
        </p>
      </div>
      <div className="flex gap-4">
        <h1 className="text-l text-white font-bold">2022</h1>
        <p className="text-white">
          Began working for IKEA as a Junior Software Engineer
        </p>
      </div>
    </div>
  );
};
