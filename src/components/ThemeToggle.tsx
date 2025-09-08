"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setTheme, Theme } from "@/slices/themeSlice";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";

interface ThemeToggleProps {
    variant?: "button" | "switch";
    size?: "sm" | "md" | "lg";
    showLabel?: boolean;
}

export function ThemeToggle({
    variant = "button",
    size = "md",
    showLabel = false,
}: ThemeToggleProps) {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootState) => state.theme);

    const toggleTheme = () => {
        let nextTheme: Theme;
        if (theme === "light") {
            nextTheme = "dark";
        } else if (theme === "dark") {
            nextTheme = "system";
        } else {
            nextTheme = "light";
        }
        dispatch(setTheme(nextTheme));
    };

    const getIcon = () => {
        switch (theme) {
            case "light":
                return <Sun className="w-5 h-5" />;
            case "dark":
                return <Moon className="w-5 h-5" />;
            case "system":
                return <Monitor className="w-5 h-5" />;
            default:
                return <Sun className="w-5 h-5" />;
        }
    };

    const getLabel = () => {
        switch (theme) {
            case "light":
                return "Light";
            case "dark":
                return "Dark";
            case "system":
                return "System";
            default:
                return "Light";
        }
    };

    if (variant === "button") {
        return (
            <Button
                variant="ghost"
                size={size === "sm" ? "sm" : "default"}
                onClick={toggleTheme}
                className={`${size === "sm" ? "p-2" : "p-3"} hover:bg-accent transition-colors`}
                title={`Switch to ${theme === "light"
                    ? "dark"
                    : theme === "dark"
                        ? "system"
                        : "light"
                    } theme`}
            >
                {getIcon()}
                {showLabel && <span className="ml-2">{getLabel()}</span>}
            </Button>
        );
    }

    // "switch" variant (settings-style)
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                {getIcon()}
                <div>
                    <p className="font-medium">Theme</p>
                    <p className="text-sm text-muted-foreground">
                        Current: {getLabel()}
                    </p>
                </div>
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="min-w-[80px]"
            >
                {getLabel()}
            </Button>
        </div>
    );
}
