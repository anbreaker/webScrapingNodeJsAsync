const cheerio = require('cheerio');
const request = require('request-promise');

const init = async () => {
  const $ = await request({
    uri: 'http://quotes.toscrape.com/',
    transform: (body) => cheerio.load(body),
  });

  const webSiteTitle = $('title');
  console.log(webSiteTitle.html());

  const webSiteHeading = $('h1');
  console.log(webSiteHeading.text().trim());

  const quote = $('.quote').find('a');
  console.log(quote.html());

  const thirdQuote = $('.quote').next().next();
  // console.log(thirdQuote.html());

  const containerClass = $('.row .col-md-8').children();
  // console.log(containerClass.html());

  const quotes = $('.quote span.text').each((index, element) => {
    // console.log(index, $(element).text())
    const quoteText = $(element).text();
    const quote = quoteText.replace(/(^\“|\”$)/g, '');
    console.log(index, quote);
  });
};

// min 29

init();
