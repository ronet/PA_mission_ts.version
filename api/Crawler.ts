
export interface Crawler {
    titleParser(url: string, element: string): Promise<{ title: string, href: string }[]>;
    contentParser(url: string, element: string): Promise<string[]>;
}