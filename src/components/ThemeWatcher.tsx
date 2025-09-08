"use client"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setTheme, setActualTheme } from "@/slices/themeSlice";

export default function ThemeWatcher() {

    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootState) => state.theme);


    // On mount, load theme from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("nova-theme") as
                | "light"
                | "dark"
                | "system"
                | null;
            dispatch(setTheme(savedTheme ?? "system"));
        }
    }, [dispatch]);


    // Update actualTheme and HTML class when theme changes
    useEffect(() => {
        if (!theme) return;

        let newActualTheme: "light" | "dark";
        if (theme === "system") {
            newActualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        } else {
            newActualTheme = theme;
        }

        dispatch(setActualTheme(newActualTheme));

        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newActualTheme);
    }, [theme, dispatch]);


    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = () => {
            if (theme === "system") {
                const newActualTheme = mediaQuery.matches ? "dark" : "light";
                dispatch(setActualTheme(newActualTheme));

                const root = document.documentElement;
                root.classList.remove("light", "dark");
                root.classList.add(newActualTheme);
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme, dispatch]);


    return null;
}