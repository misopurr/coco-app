import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ITheme = "dark" | "light" | "system";

export type IThemeStore = {
  themes: ITheme[];
  activeTheme: ITheme;
  setTheme: (theme: ITheme) => void;
};

export const useThemeStore = create<IThemeStore>()(
  // 持久化中间件
  persist(
    (set) => ({
      themes: ["dark", "light", "system"],
      activeTheme: "system",
      setTheme: (activeTheme: ITheme) => set(() => ({ activeTheme })),
    }),
    {
      name: "active-theme", // 存储在 storage 中的 key 名
      // storage: createJSONStorage(() => sessionStorage), // 存储数据库配置，默认使用 localstorage
      // 过滤函数
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => key === "activeTheme")
        ),
    }
  )
);
