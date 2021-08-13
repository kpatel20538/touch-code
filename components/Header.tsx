import { SiJavascript } from "react-icons/si";

export default function Header() {
  return (
    <div className="shadow-md px-4 py-2 inset-x-0 top-0 fixed bg-white z-30">
      <div className="text-black font-bold p-2 ">
        <SiJavascript className="mr-3 inline-block" size="1.5em" />
        <span>index.js</span>
      </div>
    </div>
  );
}
