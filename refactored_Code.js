// Using Async Await


const puppeteer = require('puppeteer');
const { answer } = require('./codes');
const loginLink = 'https://www.hackerrank.com/auth/login'; 
const email = 'xexawod378@kruay.com';
const password = '9062111';

const codeObj = require('./codes');


//IIFE
(async function(){
	try {

		let browserInstance = await puppeteer.launch({
		headless: false,
		args: ['--start-maximized'],
		defaultViewport: null,
		})

		let newTab = await browserInstance.newPage()
		await newTab.goto(loginLink)
		await newTab.type("input[id = 'input-1']", email, {delay:50})
		await newTab.type("input[type = 'password']", password, {delay:50})
		await newTab.click('button[data-analytics = "LoginPassword"]', {delay: 50})
		await waitAndClick('.topic-card a[data-attr1="algorithms"]', newTab)
		await waitAndClick('input[value = "warmup"]', newTab)
		let allChanllenges = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay:50})
		console.log('Total questions', allChanllenges.length);
		await questionSolver(newTab,allChanllenges[0], codeObj.answer[0]);

		
	} catch (error) {
		console.log(error)
	}
})()



// // Whenever we move from one page to another. this function makes sure that we perform the further desired
// // activities on that page only when it is fully loaded and our desired selector is actually present there.
// // This function is neccesary cause many a times page takes time to load fully and our automation script 
// // tries to proceed further.
async function waitAndClick(selector,cPage){
	await cPage.waitForSelector(selector);
	let selectorClicked = cPage.click(selector)
	return selectorClicked
}

// // 1) Clicks a particular passed question
// // 2) Reaches its editor
// // 3) Due to autocomplete we won't write our code their. 
// // 4) We will click the checkBox for text agaisnt custom input then type our code their and then run it.
// // 5) Now we have to type our ans in it.
// // 6) cut our typed ans from custom input box
// // 7) To the main editor and paste it their
// // 8) Click submit


async function questionSolver(page,question,answer){

	await question.click();
	await waitAndClick('.monaco-editor.no-user-select.vs', page)
	await waitAndClick('.checkbox-input', page)
	await page.waitForSelector('textarea.custominput',page)
	await page.type('textarea.custominput', answer, {delay: 20})
	await page.keyboard.down('Control')
	await page.keyboard.press('A', {delay:300})
	await page.keyboard.press('X',{delay:300})
	await page.keyboard.up('Control')
	await waitAndClick('.monaco-editor.no-user-select.vs', page)
	await page.keyboard.down('Control')
	await page.keyboard.press('A', {delay:300})
	await page.keyboard.press('V',{delay:300})
	await page.keyboard.up('Control')
	await page.click('.hr-monaco__run-code',{delay:100})
	
}

