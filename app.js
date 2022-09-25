const puppeteer = require('puppeteer')
const { email, password } = require('./config.json')

async function OverallAveragePronote() {
	await console.log("Calculing the overall average on pronote of the pupil ...")

	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()
	const navigationPromise = page.waitForNavigation()

	await page.goto('https://ent.iledefrance.fr/auth/login?callback=https%3A%2F%2Fent.iledefrance.fr%2F#/')

	await page.waitForSelector('#email')
	await page.type("#email", email)

	await page.waitForSelector('#password')
	await page.type("#password", password)

	await page.waitForSelector('.ng-valid > .flex-magnet-container > .flex-magnet-bottom-right > i18n > .no-style')
	await page.click('.ng-valid > .flex-magnet-container > .flex-magnet-bottom-right > i18n > .no-style')

	await page.navigationPromise

	await page.waitForTimeout(500)
	await page.goto('https://0912364a.index-education.net/pronote/eleve.html')

	await page.waitForSelector('#id_79id_34')
	await page.click('#id_79id_34')

	await page.waitForSelector(".liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)")

	let overallAverage = await {}

	overallAverage.pupil = await page.evaluate(() => {
		let elements = document.querySelectorAll(".liste_contenu_cellule_contenu > .liste_contenu_ligne > .Gras > div:nth-child(1)")
		let notes = []
		let result = 0

		for (element of elements) {
			let note = Number(element.innerHTML.replace(',', '.'))
			notes.push(note)

			result = result + note
		}

		return (result / notes.length).toFixed(2)
	})

	await console.log(overallAverage.pupil)

	await browser.close()
}

OverallAveragePronote()