export const Introduction = () => {
  return (
    <div
      className={`flex flex-col gap-1 transition-all duration-500 ease-in-out opacity-100 text-white mb-4`}
    >
      <p className="text-l font-semibold">Hello!</p>
      <div className="indent-3">
        My name is Johan Wulf and I am a 25-year-old Junior Software Engineer
        currently working at IKEA. I have a passion for technology and am always
        striving to learn new things, both in frontend and backend development.
      </div>
      <div className="indent-3">
        I am particularly interested in web development, and have experience
        with languages such as JavaScript, HTML, CSS, and Python. I also love
        working with different frameworks like React, Angular and Node.js. When
        I am not working, I enjoy spending my free time training my beloved
        puppy.
      </div>
    </div>
  );
};
