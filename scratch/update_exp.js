require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    company: String,
    role: String,
    description: String,
});

const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);

async function update() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    
    const result = await Experience.updateOne(
        { company: /Saan Coaching/i },
        { 
            $set: { 
                description: "• Taught HTML, CSS, JavaScript, React.js, and Python to beginner and intermediate learners in structured, hands-on sessions\n• Mentored students in building real-world projects and guided them on career paths in software engineering" 
            } 
        }
    );
    
    console.log('Update result:', result);
    process.exit(0);
}

update();
