// ConfigProvider.tsx
import {createContext, type ReactNode, useContext, useEffect, useState} from "react";

export type ConfigType = {
    color?: {
        colorPrimary?: string;
        colorPrimaryFocus?: string;
        colorSecondaryLight?: string;
        colorSecondary?: string;
        colorSecondaryFocus?: string;
        colorAccentLight?: string;
        colorAccent?: string;
        colorAccentFocus?: string;
        colorInfo?: string;
        colorInfoFocus?: string;
        colorSuccess?: string;
        colorSuccessFocus?: string;
        colorWarning?: string;
        colorWarningFocus?: string;
        colorError?: string;
        colorErrorFocus?: string;
    };
    text?: {
        textXs?: string;
        textXsLineHeight?: string;
        textSm?: string;
        textSmLineHeight?: string;
        textBase?: string;
        textBaseLineHeight?: string;
        textLg?: string;
        textLgLineHeight?: string;
        textXl?: string;
        textXlLineHeight?: string;
    };
    radius?: {
        radiusSm?: string;
        radiusMd?: string;
        radiusLg?: string;
        radiusXl?: string;
    };
    spacing?: string;
    breakpointLg?: string;
    fontSans?: string;
    fontMono?: string;
    transitionType?: {
        easeIn?: string;
        easeOut?: string;
        easeInOut?: string;
    };
    shadow?: {
        shadowSoft?: string;
        shadowSoftDark?: string;
    };
};

const defaultTheme: ConfigType = {
    color: {
        colorPrimary: "#4f46e5",
        colorPrimaryFocus: "#4338ca",
        colorSecondaryLight: "#ff57d8",
        colorSecondary: "#f000b9",
        colorSecondaryFocus: "#bd0090",
        colorAccentLight: "#818cf8",
        colorAccent: "#5f5af6",
        colorAccentFocus: "#4d47f5",
        colorInfo: "#0ea5e9",
        colorInfoFocus: "#0284c7",
        colorSuccess: "#10b981",
        colorSuccessFocus: "#059669",
        colorWarning: "#ff9800",
        colorWarningFocus: "#e68200",
        colorError: "#ff5724",
        colorErrorFocus: "#f03000",
    },
    text: {
        textXs: "0.75rem",
        textXsLineHeight: "1.33333",
        textSm: "0.875rem",
        textSmLineHeight: "1.42857",
        textBase: "1rem",
        textBaseLineHeight: "1.5",
        textLg: "1.125rem",
        textLgLineHeight: "1.55556",
        textXl: "1.25rem",
        textXlLineHeight: "1.4",
    },
    radius: {
        radiusSm: "0.25rem",
        radiusMd: "0.375rem",
        radiusLg: "0.5rem",
        radiusXl: "0.75rem",
    },
    spacing: "0.25rem",
    breakpointLg: "64rem",
    fontSans:
        "Poppins, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji','Segoe UI Symbol', 'Noto Color Emoji'",
    fontMono:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    transitionType: {
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        easeOut: "cubic-bezier(0, 0, 0.2, 1)",
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    shadow: {
        shadowSoft: "0 3px 10px 0 rgb(48 46 56 / 6%)",
        shadowSoftDark: "0 3px 10px 0 rgb(25 33 50 / 30%)",
    },
};

const applyTheme = async (
    value: Partial<ConfigType>,
    baseTheme: ConfigType
): Promise<ConfigType> => {
    const mergedTheme: ConfigType = structuredClone(baseTheme);

    const deepMerge = (
        target: Partial<ConfigType>,
        source: Partial<ConfigType>,
        prefix = ""
    ): void => {
        Object.entries(source).forEach(([key, val]) => {
            if (val && typeof val === "object" && !Array.isArray(val)) {
                if (!(key in target)) {
                    (target as any)[key] = {};
                }
                deepMerge((target as any)[key], val as any, `${prefix}${key}-`);
            } else if (val !== undefined) {
                (target as any)[key] = val;
                document.documentElement.style.setProperty(
                    `--${key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}`,
                    val as string
                );
            }
        });
    };

    deepMerge(mergedTheme, value);
    return mergedTheme;
};

const ConfigContext = createContext<{
    theme: ConfigType,
    setTheme: (theme?: ConfigType) => void
} | undefined>(undefined);

export const ConfigProvider = ({
                                   value,
                                   children,
                               }: {
    value?: ConfigType;
    children: ReactNode;
}) => {
    // merge default + value
    const [applyLoading,setApplyLoading] = useState(true);
    const [theme, apply] = useState<ConfigType>(defaultTheme);
    const [configTheme, setTheme] = useState<ConfigType | undefined>(undefined);

    const applyThemeInit = async () => {
        try {
            apply(await applyTheme(value ?? {}, defaultTheme));
        } finally {
            setApplyLoading(false);
        }
    }

    const applyThemeNext = async (configType: ConfigType) => {
        try {
            apply(await applyTheme(configType, theme));
        } catch (error) {
            console.error("Error applying theme:", error);
        }
    }

    useEffect(() => {
        applyThemeInit();
    }, [value]);

    useEffect(() => {
        if (configTheme) {
            applyThemeNext(configTheme);
        }
    }, [configTheme]);

    return (
        <ConfigContext.Provider value={{theme, setTheme}}>
            {!applyLoading && children}
        </ConfigContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useTheme must be used within a ConfigProvider');
    }
    return context;
};
