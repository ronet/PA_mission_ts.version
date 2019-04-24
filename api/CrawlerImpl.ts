import { Crawler } from "./Crawler";
import request from 'request';
import * as cheerio from 'cheerio';

export class CrawlerImpl implements Crawler {
    private async pageRequest(url: string): Promise<string> {
        return new Promise((resolve) => {
            request(url, (_err, _res, body) => {
                return resolve(body);
            })
        })
    }

    async titleParser(url: string, element: string): Promise<{ title: string, href: string }[]> {
        const body = await new CrawlerImpl().pageRequest(url);
        const $ = cheerio.load(body);

        return $(element).map((_i, e) => {
            const result = {
                title: $(e).text(),
                href: $(e)
                    .parent()
                    .attr("href")
            }
            if (result.href !== '#')
                return result;
        }).get();
    }

    async contentParser(url: string, element: string): Promise<string[]> {
        const body = await new CrawlerImpl().pageRequest(url);
        const $ = cheerio.load(body);

        return $(element).map((_i, e) => {
            return $(e).text();
        }).get();
    }
}