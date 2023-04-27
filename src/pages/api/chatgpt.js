import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    console.log("handler:", req.body);
    const messages = JSON.parse(req.body);
    console.log("messages:", messages)
    const message = {'role': 'user', 'message': 'What is your name?'};
    try {
        const response = await openai.createChatCompletion({
            'model': "gpt-3.5-turbo",
            'messages': messages
        // }, { timeout: 30000, proxy: {host: "127.0.0.1", port: 7890} });
        }, { timeout: 30000});
        // const response = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: `Suggest three names for an animal that is a superhero.
        //     Animal: Cat
        //     Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
        //     Animal: Dog
        //     Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
        //     Animal: Elephant
        //     Names:`,
        //     temperature: 0.5,
        // }, { timeout: 10000, proxy: {host: "127.0.0.1", port: 7890} });

        // const response = await openai.listModels({ timeout: 10000, proxy: {host: "127.0.0.1", port: 7890} });

        console.log(response.data)
        res.status(200).json(response.data);
    } catch (err) {
        console.log(err);

        if (err.response) {
            res.status(err.response.status).json({
                statusCode: err.response.status,
                message: err.response.statusText,
            });
        } else {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    }
}
