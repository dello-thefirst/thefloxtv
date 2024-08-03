"use client";
import { useEffect } from "react";

export default function ScriptInjector() {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://zovidree.com/tag.min.js',6134024,document.body||document.documentElement)`;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return null;
}
