export const Contact = () => {
    return (
        <div className={`flex flex-col gap-2 w-auto`}>
            <h1 className="text-xl text-white font-bold">Find me</h1>
            <a
                className="flex gap-4"
                href="https://www.linkedin.com/in/johanwulf/"
                target="_blank"
            >
                <img src="./linkedin.svg" className="invert" />
                <p className="text-white">LinkedIn</p>
            </a>
            <a
                className="flex gap-4"
                href="https://www.github.com/johanwulf"
                target="_blank"
            >
                <img src="./github.svg" className="invert" />
                <p className="text-white">GitHub</p>
            </a>
            <a className="flex gap-4" href="mailto:johan@wulf.gg">
                <img src="./mail.svg" className="invert" />
                <p className="text-white">johan@wulf.gg</p>
            </a>
        </div>
    );
};
