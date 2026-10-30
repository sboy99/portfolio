import { THEME_STORAGE_KEY } from "@/config/theme";

/** Runs before first paint: stored choice first, then the system setting. */
export const themeInitScript = `(function(){var d=document.documentElement,m=null;try{var s=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(s==="light"||s==="dark")m=s;else if(s){var p=JSON.parse(s);if(p&&(p.mode==="light"||p.mode==="dark"))m=p.mode}}catch(e){}if(!m)m=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.setAttribute("data-theme",m)})();`;
