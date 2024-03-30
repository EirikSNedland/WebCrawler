const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

test('normalizeURL https', () => {
    const input = 'https://boot.dev';
    const actual = normalizeURL(input);
    const expected = 'boot.dev';
    expect(actual).toBe(expected);
  });

test('normalizeURL http', () => {
    const input = 'http://boot.dev';
    const actual = normalizeURL(input);
    const expected = 'boot.dev';
    expect(actual).toBe(expected);
});

test('normalizeURL keep path', () => {
    const input = 'http://boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'boot.dev/path';
    expect(actual).toBe(expected);
});

test('normalizeURL no / test', () => {
    const input = 'http://boot.dev';
    const actual = normalizeURL(input);
    const expected = 'boot.dev';
    expect(actual).toBe(expected);
});

test('normalizeURL capitall letters', () => {
    const input = 'http://BooT.dev';
    const actual = normalizeURL(input);
    const expected = 'boot.dev';
    expect(actual).toBe(expected);
});

// TESTS FOR getURLsFromHTML
test('getURLsFromHTML with absolute', ()=> {
    const htmlBody = '<a href="https://boot.dev">Learn Backend Development</a>';
    const url = 'https://boot.dev';
    const UrlList = getURLsFromHTML(htmlBody,url);
    const expected = ['https://boot.dev/'];
    expect(UrlList).toEqual(expected);
});

test('getURLsFromHTML with relative', ()=> {
    const htmlBody = '<a href="/path">Learn Backend Development</a><a href="/path/one">Learn Backend Development</a>';
    const url = 'https://boot.dev';
    const UrlList = getURLsFromHTML(htmlBody,url);
    const expected = ['https://boot.dev/path','https://boot.dev/path/one'];
    expect(UrlList).toEqual(expected);
});

test('getURLsFromHTML with both', ()=> {
    const htmlBody = '<a href="/path">Learn Backend Development</a><div><a href="https://other.com/path">Learn Backend Development</a></div>';
    const url = 'https://boot.dev';
    const UrlList = getURLsFromHTML(htmlBody,url);
    const expected = ['https://boot.dev/path','https://other.com/path'];
    expect(UrlList).toEqual(expected);
});

test('getURLsFromHTML with error', ()=> {
    const htmlBody = '<a href="daWdsADwa@daw">Learn Backend Development</a><div><a href="FooSoLO">Learn Backend Development</a></div>';
    const url = 'https://boot.dev';
    const UrlList = getURLsFromHTML(htmlBody,url);
    const expected = [];
    expect(UrlList).toEqual(expected);
});