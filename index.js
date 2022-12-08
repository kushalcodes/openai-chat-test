const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
	apiKey: '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'
})
const openai = new OpenAIApi(configuration)

app.post('/chat', async (req, res) => {
	try {
		const text = req.body.text
		if (!text) return res.end('Please enter something to chat about!')

		const chatResponse = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: text,
			temperature: 0.9,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.6,
			stop: [' Human:', ' AI:']
		})
		return res.send(chatResponse.data.choices[0].text)
	} catch (error) {
		console.log(error)
	}
})

const port = 3000
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
