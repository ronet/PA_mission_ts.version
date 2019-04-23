import { CrawlerImpl } from "./api/CrawlerImpl";

(async () => {
    const url = 'https://www.naver.com',
        titleE = '.ah_k',
        contentE = '._related_keyword_ul li a';

    const crawler = new CrawlerImpl();

    const list = await crawler.titleParser(url, titleE);
    const listResult = list.slice(0, 10);
    console.log(listResult);

    const result = await Promise.all(
        listResult.map((async e => {
            return crawler.contentParser(e.href, contentE);
        }))
    );

    console.log(result);
})()