export const About = () => {
  return (
    <div className={`flex flex-col gap-1 w-auto`}>
      <h1 className="text-xl text-white font-bold">About</h1>
      <div className="indent-4 text-white">
        I am particularly interested in web development, and have experience
        with languages such as JavaScript, HTML, CSS, and TypeScript. I also
        love working with different frameworks like React and Node.js. When I am
        not working, I enjoy spending my free time training my beloved puppy.
      </div>
      <h1 className="text-xl text-white font-bold">This page</h1>
      <div className="indent-4 text-white">
        This page was built using{" "}
        <a
          href="https://www.typescriptlang.org/"
          target="_blank"
          className="font-bold hover:animate-pulse hover:text-orange-400 duration-1000"
        >
          TypeScript
        </a>
        ,{" "}
        <a
          href="https://reactjs.org/"
          target="_blank"
          className="font-bold hover:animate-pulse hover:text-orange-400 duration-1000"
        >
          React
        </a>{" "}
        and{" "}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          className="font-bold hover:animate-pulse hover:text-orange-400 duration-1000"
        >
          Tailwind
        </a>
        . Some UI components are from{" "}
        <a
          href="https://daisyui.com/"
          target="_blank"
          className="font-bold hover:animate-pulse hover:text-orange-400 duration-1000"
        >
          DaisyUI
        </a>
      </div>
    </div>
  );
};
