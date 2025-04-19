export interface Language {
    name: string;
    noLazyMode: boolean;
    orderedByFrequency: boolean;
    words: string[];
}

export interface Languages {
    [key: string]: Language;
} 