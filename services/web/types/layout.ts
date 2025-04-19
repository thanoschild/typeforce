export interface KeyboardLayout {
    keymapShowTopRow: boolean;
    type: 'ansi' | 'iso';
    keys: {
        row1: string[];
        row2: string[];
        row3: string[];
        row4: string[];
        row5: string[];
    };
}

export interface Layouts {
    [key: string]: KeyboardLayout;
} 