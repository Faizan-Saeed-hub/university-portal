const OpenAI = require("openai");

const Chat = require("../models/Chat");
const University = require("../models/University");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",

  apiKey: process.env.OPENROUTER_API_KEY,
});

const sendMessage = async (req, res) => {

  try {

    const { message, userEmail } = req.body;
    console.log(`[Chatbot] Incoming message: "${message}" | userEmail: "${userEmail}"`);

    // Intercept missing or placeholder OpenRouter API key to provide a helpful demo notice
    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === "no_key_provided") {
      console.log("[Chatbot] Offline/Demo Mode triggered (no OpenRouter API key configured).");
      return res.status(200).json({
        success: true,
        reply: "⚠️ The AI Chatbot is currently running in **Offline/Demo Mode** because no OpenRouter API Key has been configured.\n\n" +
               "To activate the full AI admission chat assistant, please:\n" +
               "1. Open the `backend/.env` file on your laptop.\n" +
               "2. Paste your real **OpenRouter API Key** into the `OPENROUTER_API_KEY` variable.\n" +
               "3. Restart your backend server!\n\n" +
               "*(In the meantime, all other features like university finder, eligibility calculator, and documents upload are fully functional!)*"
      });
    }

    // Retrieve user details from the database if userEmail is provided
    let userDetailsPrompt = "";
    if (userEmail) {
      const User = require("../models/User");
      const user = await User.findOne({ email: userEmail });
      if (user) {
        console.log(`[Chatbot] Found user in DB: "${user.name}" | Email: "${user.email}" | Merit: ${user.merit}%`);
        userDetailsPrompt = `\n\n[USER CONTEXT] You are chatting with a logged-in user whose details are:
- Name: ${user.name}
- Email: ${user.email}
- Role: ${user.role}
- Merit Score: ${user.merit ? user.merit + "%" : "Not calculated yet"}
- Uploaded Documents: ${user.uploadedDocuments || 0}
- Applied Universities: ${user.appliedUniversities || 0}

You are FULLY authorized and REQUIRED to share these details with the user when they ask (e.g. "what is my name", "what is my merit", "who am I", "how many documents have I uploaded"). Always greet them friendly by their name ("${user.name}").`;
      } else {
        console.log(`[Chatbot] No user found in DB for email: "${userEmail}"`);
        userDetailsPrompt = `\n\n[USER CONTEXT] No logged-in user profile was found. If they ask about their personal details, politely ask them to sign in.`;
      }
    } else {
      console.log("[Chatbot] No userEmail provided in request body.");
      userDetailsPrompt = `\n\n[USER CONTEXT] No logged-in user profile was found. If they ask about their personal details, politely ask them to sign in.`;
    }

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
              "You are an AI university admission assistant for Pakistani students.\n\n" +
              "YOUR DUTIES:\n" +
              "1. Answer academic/admission questions: university details, admissions, eligibility, merit calculations, etc.\n" +
              "2. Answer questions about the currently logged-in user: using the provided secure [USER CONTEXT], you are authorized and required to tell the user their name, email, merit score, uploaded documents, or role when they ask. Greet them by name in your responses!\n\n" +
              "RESTRICTIONS:\n" +
              "- If the user asks about themselves (e.g. 'what is my name', 'who am I', 'what is my merit', 'how many documents have I uploaded'), you must look at the [USER CONTEXT] and answer them directly using that data. Do not refuse, do not say you don't have access to personal details. You have full authorized access to this specific user's info for this chat.\n" +
              "- If they ask about programs/fees/cutoffs without specifying a university, politely ask which one (University of Sargodha, University of Punjab, or GC University Faisalabad).\n" +
              "- For completely unrelated topics outside of Pakistani admissions or the logged-in user profile, politely decline.\n\n" +
              "Here is the database of universities:\n" +
              JSON.stringify(cleanUniversities) +
              userDetailsPrompt
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