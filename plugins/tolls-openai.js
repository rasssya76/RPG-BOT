const { Configuration, OpenAIApi } = await import("openai");

let handler = async (m, { args, usedPrefix, command, text }) => {
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: text,
  temperature: 0.3,                 max_tokens: 3000,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
});
m.reply(completion.data.choices[0].text);
}
handler.help = ['openai']
handler.tags = ['tools']
handler.command = /^(ai|openai)$/i

export default handler