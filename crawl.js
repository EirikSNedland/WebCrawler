const { JSDOM } = require('jsdom')

function normalizeURL(url){
    const urlObj = new URL(url);
    let fullUrl = `${urlObj.hostname}${urlObj.pathname}`;
    if(fullUrl.slice(-1) === '/'){
        fullUrl = fullUrl.slice(0,-1)
    }
    return fullUrl;
}

function getURLsFromHTML(htmlBody,baseUrl){
    const dom = new JSDOM(htmlBody);
    const urlList = [];
    const aElements = dom.window.document.querySelectorAll('a');

    for(const aElement of aElements){
        if(aElement.href.slice(0,1) === '/'){ //Cheacks if it is a relative url or absolute url
            try {
                urlList.push(new URL(aElement.href, baseUrl).href);
            } catch (e){
                console.log(`${e.message}: ${aElement.href}`);
            }
        } else {
            try {
                urlList.push(new URL(aElement.href).href);
            } catch (e){
                console.log(`${e.message}: ${aElement.href}`);
            }
        }
    }
    return urlList;
}

async function crawlPage(baseUrl,currentUrl, pages){
    const baseUrlObj = new URL(baseUrl);
    const currentUrlObj = new URL(currentUrl);
    if (baseUrlObj.host != currentUrlObj.host){
        return pages;
    }
    const normalizedUrl = normalizeURL(currentUrl);
    if (pages[normalizedUrl] > 0){
        pages[normalizedUrl]++
        return pages
      }
    pages[normalizedUrl] = 1
    console.log(`Started crawling on ${normalizedUrl}`)
    let htmlBodyText = '';
    try {
        const htmlBody = await fetch(baseUrlObj);
        if(htmlBody.status > 399){
            console.log('Got http error');
            return pages;
        }
        const contentType = htmlBody.headers.get('Content-Type');
        const expectedContentType = 'text/html; charset=utf-8';
        if (contentType != expectedContentType){
            console.log(`Got wrong content type: ${contentType}, expected: ${expectedContentType} `);
            return pages;
        }
        htmlBodyText = await htmlBody.text();
        
    } catch (err){
        console.log(err.message);
    }
    const nextURLs = getURLsFromHTML(htmlBodyText, baseUrl)
    for (const nextURL of nextURLs){
      pages = await crawlPage(baseUrl, nextURL, pages)
    }
  
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};