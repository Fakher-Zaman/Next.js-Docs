// lib/modeStatus.ts

export const getModeStatus = (): 'dark' | 'light' => {
    if (typeof window !== 'undefined') {
        const mode = localStorage.getItem('mode');
        return mode === 'dark' ? 'dark' : 'light';
    }
    return 'light'; // Default to 'light' if localStorage is unavailable
};

export const setModeStatus = (mode: 'dark' | 'light') => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('mode', mode);
    }
};