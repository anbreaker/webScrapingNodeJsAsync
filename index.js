const cheerio = require('cheerio');
const request = require('request-promise');

const fs = require('fs-extra');
const writeStream = fs.createWriteStream('quotes.csv');

const init = async () => {
  try {
    const $ = await request({
      uri: 'http://quotes.toscrape.com/',
      transform: (body) => cheerio.load(body),
    });

    writeStream.write('Quote|Author|Tags\n');

    $('.quote').each((index, element) => {
      const text = $(element)
        .find('span.text')
        .text()
        .replace(/(^\“|\”$)/g, '');
      const author = $(element).find('span small.author').text();
      const tags = [];
      const tag = $(element)
        .find('.tags a.tag')
        .each((index, element) => tags.push($(element).text()));
      writeStream.write(`${text}|${author}|${tags}\n`);
      // console.log(tags.join(','));
    });

    console.log('Done.');
  } catch (error) {
    console.log(error);
  }
};

const testScraping = async () => {
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
  console.log(thirdQuote.html());

  const containerClass = $('.row .col-md-8').children();
  console.log(containerClass.html());

  const quotes = $('.quote span.text').each((index, element) => {
    console.log(index, $(element).text());
    const quoteText = $(element).text();
    const quote = quoteText.replace(/(^\“|\”$)/g, '');
    console.log(index, quote);
  });
};

// testScraping();
init();
