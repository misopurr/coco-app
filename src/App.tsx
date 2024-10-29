import { useTranslation } from "react-i18next";

import useEscape from "./hooks/useEscape";
import "./i18n";
// import Header from "./components/Header";
// import Chat from "./components/Chat";
import CommandInput from "./components/CommandInput";
import Footer from "./components/Footer";

function App() {
  const { t } = useTranslation();

  useEscape();

  return (
    <div
      className={`
        bg-background
        w-screen h-screen
      `}
    >
      {/* <Header /> */}      
      <main className="w-[100%] h-[100%] flex flex-col items-center justify-center">
        <div className="text-xl text-primary">{t("welcome")}</div>

        <div className="mx-0 mt-5 w-[100%]">
          <CommandInput />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
