const OpenAI = require("openai");

const Chat = require("../models/Chat");
const University = require("../models/University");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",

  apiKey: process.env.OPENROUTER_API_KEY,
});

const sendMessage = async (req, res) => {

  try {

    const { message } = req.body;
    const msgLower = (message || "").toLowerCase();

    // Determine target university from user message to save context tokens
    let targetUni = null;
    if (msgLower.includes("sargodha") || msgLower.includes("uos")) {
      targetUni = "University of Sargodha";
    } else if (msgLower.includes("punjab") || msgLower.includes("pu") || msgLower.includes("lahore")) {
      targetUni = "University of Punjab";
    } else if (msgLower.includes("gcuf") || msgLower.includes("gcuf") || msgLower.includes("faisalabad")) {
      targetUni = "GC University Faisalabad";
    }

    const universities = await University.find();

    // Clean up and filter MongoDB payload to save tokens and speed up inference
    const cleanUniversities = targetUni 
      ? universities.map(u => {
          const isTarget = u.name.toLowerCase().includes(targetUni.toLowerCase()) || targetUni.toLowerCase().includes(u.name.toLowerCase());
          if (isTarget) {
            return {
              name: u.name,
              city: u.city,
              type: u.type,
              averageFee: u.averageFee,
              hostel: u.hostel,
              departments: (u.departments || []).map(d => ({
                name: d.name,
                programs: (d.programs || []).map(p => ({
                  title: p.title,
                  requiredDegree: p.requiredDegree
                })),
                meritFormula: d.meritFormula,
                cutoffHistory: d.cutoffHistory,
                applyLink: d.applyLink
              }))
            };
          } else {
            return {
              name: u.name,
              city: u.city
            };
          }
        })
      : universities.map(u => ({ name: u.name }));

    const completion =
      await client.chat.completions.create({

        model: "meta-llama/llama-3.1-8b-instruct",
        max_tokens: 1000,

        messages: [
          {
            role: "system",
            content:
              "You are an AI university admission assistant for Pakistani students. " +
              "You must ONLY answer questions directly related to universities, colleges, admissions, eligibility, " +
              "entry tests, academic programs, courses, degrees, merit calculations, career guidance, and academic campus life. " +
              "If the user's message is not directly related to these topics, you must politely decline to answer. " +
              "\n\nHere is the official database of seeded universities, departments, merit requirements, and cutoff histories: \n" +
              JSON.stringify(cleanUniversities) + "\n\n" +
              "If the user asks about programs, eligibility, fees, or cutoff merits but has NOT specified a university, " +
              "you MUST politely ask them which university they are referring to (University of Sargodha, University of Punjab, or GC University Faisalabad) " +
              "before you can provide specific details. Be precise, helpful, and friendly!"
          },

          {
            role: "user",
            content: message,
          },
        ],
      });

    const botReply =
      completion.choices[0].message.content;

    /* Save Chat */

    const newChat = new Chat({
      userMessage: message,
      botReply,
    });

    await newChat.save();

    res.status(200).json({
      success: true,
      reply: botReply,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  sendMessage,
};