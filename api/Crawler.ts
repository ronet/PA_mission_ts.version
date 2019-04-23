
export interface Crawler {
    // pageRequest(url:string): string;
    // contentParser(body:string, element: string): string;
    titleParser(url: string, element: string): Promise<{ title: string, href: string }[]>;
    contentParser(url: string, element: string): Promise<string[]>;
}