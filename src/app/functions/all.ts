"use client";
export function hostName() {
  if (typeof window !== "undefined") {
    if (window.location.hostname == "thefloxtv.com") {
      return "Thefloxtv";
    } else {
      return "Movieboxx";
    }
  } else {
    return "Nothing";
  }
}
