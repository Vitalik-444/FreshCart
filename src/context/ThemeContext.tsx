import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
type Theme='light'|'dark';
const ThemeContext=createContext<{theme:Theme;toggleTheme:()=>void}>({theme:'light',toggleTheme:()=>{}});
export function ThemeProvider({children}:{children:ReactNode}){const [theme,setTheme]=useState<Theme>(()=>{const saved=localStorage.getItem('freshcart-theme');return saved==='light'||saved==='dark'?saved:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'});useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('freshcart-theme',theme)},[theme]);return <ThemeContext.Provider value={{theme,toggleTheme:()=>setTheme(t=>t==='light'?'dark':'light')}}>{children}</ThemeContext.Provider>}
export const useTheme=()=>useContext(ThemeContext);
