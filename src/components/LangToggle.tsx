import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, Globe2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Language {
  code: string;
  name: string;
  flag: string;
  keyboard: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", keyboard: "E" },
  { code: "zh", name: "中文", flag: "🇨🇳", keyboard: "Z" },
];

export default function LangToggle() {
  const { i18n } = useTranslation();
  const [currentLng, setCurrentLng] = useState(languages[0]);
  const changeLanguage = (lng: Language) => {
    setCurrentLng(lng);
    i18n.changeLanguage(lng.code);
  };

  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold dark:text-white shadow-inner dark:shadow-white/10 focus:outline-none dark:data-[hover]:bg-gray-700 dark:data-[open]:bg-gray-700 data-[focus]:outline-1 dark:data-[focus]:outline-white">
        <Globe2 className="h-4 w-4 text-gray-600" />
        <span className="text-base">{currentLng.flag}</span>
        <span>{currentLng.name}</span>
        <ChevronDown className="size-4 dark:fill-white/60" />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="w-[160px] origin-top-right rounded-xl border dark:border-white/5 dark:bg-white/5 p-1 text-sm/6 dark:text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {languages.map((language) => (
          <MenuItem key={language.code}>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 dark:data-[focus]:bg-white/10"
              onClick={() => changeLanguage(language)}
            >
              <span className="mr-1 text-base">{language.flag}</span>
              <span>{language.name}</span>
              <kbd className="ml-auto hidden font-sans text-xs dark:text-white/50 group-data-[focus]:inline">
                ⌘{language.keyboard}
              </kbd>
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
