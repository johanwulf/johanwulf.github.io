export const Introduction = () => {
  const getAge = () => {
    var ageDifMs = Date.now() - new Date("1998-08-26").getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div
      className={`flex flex-col gap-1 transition-all duration-500 ease-in-out opacity-100 text-white mb-4`}
    >
      <p className="text-xl font-semibold">Hello!</p>
      <div className="indent-3">
        My name is Johan Wulf and I am a {getAge()}-year-old Junior Software
        Engineer currently working at IKEA. I have a passion for technology and
        am always striving to learn new things, both in frontend and backend
        development.
      </div>
    </div>
  );
};
