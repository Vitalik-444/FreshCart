import { createContext,useContext,useEffect,useState,type ReactNode } from 'react';
const FavoritesContext=createContext<{ids:number[];toggle:(id:number)=>void;has:(id:number)=>boolean}>({ids:[],toggle:()=>{},has:()=>false});
export function FavoritesProvider({children}:{children:ReactNode}){const [ids,setIds]=useState<number[]>(()=>{try{return JSON.parse(localStorage.getItem('freshcart-favorites')||'[]') as number[]}catch{return []}});useEffect(()=>localStorage.setItem('freshcart-favorites',JSON.stringify(ids)),[ids]);return <FavoritesContext.Provider value={{ids,toggle:id=>setIds(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]),has:id=>ids.includes(id)}}>{children}</FavoritesContext.Provider>}
export const useFavorites=()=>useContext(FavoritesContext);
