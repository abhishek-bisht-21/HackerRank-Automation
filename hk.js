
const puppeteer = require('puppeteer');
const loginLink = 'https://www.hackerrank.com/auth/login'; 
const email = 'xexawod378@kruay.com';
const password = '9062111'

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
}).then(function(){
	let emailIsEntered = page.type("input[id = 'input-1']", email, {delay:50})
	return emailIsEntered;
}).then(function(){
	let passIsEntered = page.type("input[type = 'password']", password, {delay:50})
	return passIsEntered;
}).then(function(){
	let loginBtnClicked = page.click('button[data-analytics = "LoginPassword"]', {delay: 50})
	return loginBtnClicked;
}).then(function(){
	let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)
	return clickOnAlgoPromise;
}).then(function(){
	let getToWarmUp = waitAndClick('input[value = "warmup"]', page)
	return getToWarmUp
}).then(function(){
	let waitFor3Seconds = page.waitFor(3000) // waitFor inbuilt function
	return waitFor3Seconds;
}).then(function(){
	// $$ -> document.querySelectorAll short Form
	let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay:50}) 
	return allChallengesPromise;
}).then(function(questionsArr){
	console.log("num of question inside warmup",questionsArr.length);
	let questionWillBeSolved = questionSolver(questionsArr[0]);
	return questionWillBeSolved
})

// Whenever we move from one page to another. this function makes sure that we perform the further desired
// activities on that page only when it is fully loaded and our desired selector is actually present there.
// This function is neccesary cause many a times page takes time to load fully and our automation script 
// tries to proceed further.
function waitAndClick(selector,cPage){
	return new Promise(function(resolve,reject){
		let waitForModelPromise = cPage.waitForSelector(selector) //waitForSelector is inbuilt function
		waitForModelPromise.then(function(){
			let clickModel = cPage.click(selector);
			return clickModel;
		}).then(function(){
			resolve();
		}).catch(function(){
			reject(); 
		})
	})
}

function questionSolver(question){

	return new Promise(function(resolve,reject){
		let questionWillBeClicked = question.click();
		questionWillBeClicked.then(function(){
			let EditorInFocus
		})
	})
}