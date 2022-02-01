
const puppeteer = require('puppeteer');
const loginLink = 'https://www.hackerrank.com/auth/login'; 

let browserOpen = puppeteer.launch({
	headless: false,
	args: ['--start-maximized'],
	defaultViewport: null,
})

let page;

browserOpen.then(function(browserObj){
	let browserOpenPromise = browserObj.newPage();
	return browserOpenPromise;
}).then(function(newTab){
	page = newTab
	let hackerRankOpnPromise = newTab.goto(loginLink);
	return hackerRankOpnPromise;
})