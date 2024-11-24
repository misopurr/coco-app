import { useEffect, useRef, useState } from "react";
import { open } from "@tauri-apps/plugin-shell";

interface DropdownListProps {
  selected: (item: any) => void;
  suggests: any[];
  isSearchComplete: boolean;
}

function DropdownList({ selected, suggests }: DropdownListProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showIndex, setShowIndex] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleOpenURL = async (url: string) => {
    if (!url) return;
    try {
      await open(url);
      console.log("URL opened in default browser");
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log(
      "handleKeyDown",
      e.key,
      showIndex,
      e.key >= "0" && e.key <= "9" && showIndex
    );
    if (!suggests.length) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedItem((prev) =>
        prev === null || prev === 0 ? suggests.length - 1 : prev - 1
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedItem((prev) =>
        prev === null || prev === suggests.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === "Meta") {
      e.preventDefault();
      setShowIndex(true);
    } else if (e.key === "Enter" && selectedItem !== null) {
      const item = suggests[selectedItem];
      if (item?._source?.url) {
        handleOpenURL(item?._source?.url);
      } else {
        selected(item);
      }
    }

    if (e.key >= "0" && e.key <= "9" && showIndex) {
      console.log(`number ${e.key}`);
      const item = suggests[parseInt(e.key, 10)];
      if (item?._source?.url) {
        handleOpenURL(item?._source?.url);
      } else {
        selected(item);
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    console.log("handleKeyUp", e.key);
    if (!suggests.length) return;

    if (!e.metaKey) {
      setShowIndex(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [showIndex]);

  useEffect(() => {
    if (suggests.length > 0) {
      setSelectedItem(0);
    }
  }, [JSON.stringify(suggests)]);

  useEffect(() => {
    if (selectedItem !== null && itemRefs.current[selectedItem]) {
      itemRefs.current[selectedItem]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedItem]);

  return (
    <div
      ref={containerRef}
      data-tauri-drag-region
      className="h-[500px] w-full p-2 pb-10 flex flex-col bg-search_bg_light dark:bg-chat_bg_dark bg-cover rounded-xl overflow-y-auto overflow-hidden focus:outline-none"
      tabIndex={0}
    >
      {suggests?.map((item, index) => {
        const isSelected = selectedItem === index;
        return (
          <button
            key={item._id}
            ref={(el) => (itemRefs.current[index] = el)}
            onMouseEnter={() => setSelectedItem(index)}
            onClick={() => {
              if (item?._source?.url) {
                handleOpenURL(item?._source?.url);
              } else {
                selected(item);
              }
            }}
            className={`w-full h-10 px-2 text-sm flex items-center justify-between rounded-lg transition-colors ${
              isSelected
                ? "bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,0.1)]"
                : "hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)]"
            }`}
          >
            <div className="flex gap-2 items-center">
              <img className="w-5 h-5" src={item?._source?.icon} alt="icon" />
              <span className="text-[#333] dark:text-[#d8d8d8] truncate w-80 text-left">
                {item?._source?.source}/{item?._source?.title}
              </span>
            </div>
            <div className="flex gap-2 items-center relative">
              <span className="text-sm  text-[#666] dark:text-[#666] truncate w-52 text-right">
                {item?._source?.type}
              </span>
              {showIndex && index < 10 ? (
                <div
                  className={`absolute right-0 w-4 h-4 flex items-center justify-center font-normal text-xs text-[#333] leading-[14px] bg-[#ccc] dark:bg-[#6B6B6B] shadow-[-6px_0px_6px_2px_#e6e6e6] dark:shadow-[-6px_0px_6px_2px_#000] rounded-md`}
                >
                  {index}
                </div>
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default DropdownList;
