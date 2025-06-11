// Mock data for opportunities based on user profile
export const getMockOpportunities = (user) => {
  const opportunities = [];
  
  // Generate opportunities based on occupation and interests
  if (user.occupation.toLowerCase().includes('student')) {
    opportunities.push(
      {
        id: `${user.id}-scholarship-1`,
        title: 'National Scholarship for Higher Education',
        description: 'Scholarship for undergraduate students with financial need. Covers tuition and provides monthly stipend.',
        deadline: '30 June 2023',
        type: 'scholarship',
        applied: false
      },
      {
        id: `${user.id}-internship-1`,
        title: 'Summer Internship Program at Tech Innovations',
        description: 'Three-month paid internship for students interested in technology and innovation.',
        deadline: '15 May 2023',
        type: 'internship',
        applied: false
      }
    );
  }
  
  if (user.occupation.toLowerCase().includes('farmer')) {
    opportunities.push(
      {
        id: `${user.id}-scheme-1`,
        title: 'PM Kisan Samman Nidhi Scheme',
        description: 'Financial benefit of ₹6000 per year for all farmer families paid in three equal installments.',
        deadline: 'Ongoing',
        type: 'government_scheme',
        applied: false
      },
      {
        id: `${user.id}-loan-1`,
        title: 'Kisan Credit Card Scheme',
        description: 'Provides farmers with affordable credit for their agricultural needs.',
        deadline: 'Ongoing',
        type: 'loan',
        applied: false
      }
    );
  }
  
  // Check for specific interests
  if (user.interests.some(interest => 
    ['technology', 'tech', 'it', 'software', 'programming', 'coding'].includes(interest.toLowerCase())
  )) {
    opportunities.push(
      {
        id: `${user.id}-job-tech-1`,
        title: 'Software Developer at TechSolutions India',
        description: 'Looking for experienced developers with knowledge of React, Node.js, and database technologies.',
        deadline: '10 June 2023',
        type: 'job',
        applied: false
      }
    );
  }
  
  if (user.interests.some(interest => 
    ['robotics', 'automation', 'ai', 'artificial intelligence', 'machine learning'].includes(interest.toLowerCase())
  )) {
    opportunities.push(
      {
        id: `${user.id}-job-robotics-1`,
        title: 'Robotics Engineer at Innovation Labs',
        description: 'Seeking engineers with experience in robotics, automation, and AI technologies.',
        deadline: '20 June 2023',
        type: 'job',
        applied: false
      }
    );
  }
  
  // Add some generic opportunities
  opportunities.push(
    {
      id: `${user.id}-skill-1`,
      title: 'Free Digital Skills Training Program',
      description: 'Government-sponsored program to enhance digital literacy and skills for all citizens.',
      deadline: 'Ongoing',
      type: 'training',
      applied: false
    }
  );
  
  // If user is young (18-35), add youth-specific opportunities
  if (user.age >= 18 && user.age <= 35) {
    opportunities.push(
      {
        id: `${user.id}-startup-1`,
        title: 'Startup India Seed Fund Scheme',
        description: 'Financial assistance for startups for proof of concept, prototype development, product trials, etc.',
        deadline: '31 July 2023',
        type: 'funding',
        applied: false
      }
    );
  }
  
  return opportunities;
};