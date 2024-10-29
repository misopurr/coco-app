import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";

export default function Header() {
  return (
    <div className="fixed w-[100%] h-10 px-4 flex justify-between items-center">
      <div>Coco</div>
      <div className="flex items-center gap-2">
        <LangToggle />
        <ThemeToggle />
        <img
          className="h-5 w-5 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
