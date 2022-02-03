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

// browserOpen.then(function(browserObj){
// 	let browserOpenPromise = browserObj.newPage();
// 	return browserOpenPromise;
// }).then(function(newTab){
// 	page = newTab
// 	let hackerRankOpnPromise = newTab.goto(loginLink); // opening hackerRank Login page
// 	return hackerRankOpnPromise;
// }).then(function(){
// 	let emailIsEntered = page.type("input[id = 'input-1']", email, {delay:50}) // typing email
// 	return emailIsEntered;
// }).then(function(){
// 	let passIsEntered = page.type("input[type = 'password']", password, {delay:50}) // typing password
// 	return passIsEntered;
// }).then(function(){
// 	let loginBtnClicked = page.click('button[data-analytics = "LoginPassword"]', {delay: 50}) // clicking login
// 	return loginBtnClicked;
// }).then(function(){
// 	let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page) // clicking on algorithm 
// 	return clickOnAlgoPromise;
// }).then(function(){
// 	let getToWarmUp = waitAndClick('input[value = "warmup"]', page) // clicking checkBox warmup
// 	return getToWarmUp
// }).then(function(){
// 	let waitFor3Seconds = page.waitFor(3000) // waitFor inbuilt function
// 	return waitFor3Seconds;
// }).then(function(){
// 	// $$ -> document.querySelectorAll short Form
// 	// Selecting the all the questions array
// 	let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay:50}) 
// 	return allChallengesPromise;
// }).then(function(questionsArr){

// 	console.log("num of question inside warmup",questionsArr.length);
// 	// Passing the 1st question to solver
// 	let questionWillBeSolved = questionSolver(page,questionsArr[0], codeObj.answer[0]);
// 	return questionWillBeSolved
// })

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

// function questionSolver(page,question,answer){

// 	return new Promise(function(resolve,reject){
// 		let questionWillBeClicked = question.click();
// 		questionWillBeClicked.then(function(){
// 			let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page) // Main Editor
// 			return EditorInFocusPromise;
// 		}).then(function(){
// 			return waitAndClick('.checkbox-input', page) // clicking the checkbox to display the custom input editor
// 		}).then(function(){
// 			return page.waitForSelector('textarea.custominput',page);// pointing cursor at custom Input
// 		}).then(function(){
// 			return page.type('textarea.custominput', answer, {delay: 20}) // typing the code
// 		}).then(function(){
// 			let ctrlIsPressed = page.keyboard.down('Control') // down is for holding it
// 			return ctrlIsPressed
// 		}).then(function(){
// 			let AIsPressed = page.keyboard.press('A', {delay:300}) // selecting the code
// 			return AIsPressed;
// 		}).then(function(){
// 			let XisPressed = page.keyboard.press('X',{delay:300}) // cutting the code
// 			return XisPressed;
// 		}).then(function(){
// 			let ctrlIsUnpressed = page.keyboard.up('Control') // Releasing ctrl
// 			return ctrlIsUnpressed
// 		}).then(function(){
// 			let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page)
// 			return mainEditorInFocus;
// 		}).then(function(){
// 			let ctrlIsPressed = page.keyboard.down('Control') // down is for holding it
// 			return ctrlIsPressed;
// 		}).then(function(){
// 			let AIsPressed = page.keyboard.press('A', {delay:300}) // selecting the code at once
// 			return AIsPressed;
// 		}).then(function(){
// 			let VisPressed = page.keyboard.press('V',{delay:300}) // pasting the code
// 			return VisPressed;
// 		}).then(function(){
// 			let ctrlIsUnpressed = page.keyboard.up('Control') // Releasing ctrl
// 			return ctrlIsUnpressed
// 		}).then(function(){
// 			return page.click('.hr-monaco__run-code',{delay:100})
// 		}).then(function(resolve,reject){
// 			resolve();
// 		}).catch(function(err){
// 			reject();
// 		})
// 	})
// }