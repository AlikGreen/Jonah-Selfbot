import { config } from "dotenv"
import { Client } from "discord.js-selfbot-v13"
import { OpenAI } from "openai"

config()

const openai = new OpenAI({
    apiKey: process.env.API_KEY
})



const client = new Client(
    { 
        checkUpdate: false
    }
)

client.on('ready', async () => {
    console.log("client is ready")
})

client.on('messageCreate', async (message) => {
    if(message.author.id != client.user.id && message.content.length < 150)
    {
        if( message.content.toLowerCase().includes("jonah") || 
            message.content.toLowerCase().includes("are") ||
            message.content.toLowerCase().includes("?") ||
            message.content.toLowerCase().includes("anyone") ||
            message.content.toLowerCase().includes("bozo") ||
            message.content.toLowerCase().includes("game") ||
            message.content.toLowerCase().includes("wanna") ||
            message.content.toLowerCase().includes("play") ||
            message.content.toLowerCase().includes("want") ||
            message.content.toLowerCase().includes("hi") ||
            message.content.toLowerCase().includes("hello") ||
            message.content.toLowerCase().includes("how") ||
            message.content.toLowerCase().includes("u") ||
            message.content.toLowerCase().includes("you") ||
            message.content.toLowerCase().includes("y") ||
            message.content.toLowerCase().includes("why"))
        {
            const response = await openai.chat.completions.create(
            {
                messages: [
                    { role: 'system', content: 'you are a 15 year old boy called jonah'},
                    { role: 'user', content: message.content }
                ],
                model: 'ft:gpt-3.5-turbo-1106:personal::8Qvny0q4',
            })

            message.channel.send(response.choices[0].message.content)
        }
    }
})

client.login(process.env.DISCORD_TOKEN)