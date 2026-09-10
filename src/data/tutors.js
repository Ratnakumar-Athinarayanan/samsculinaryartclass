// tutors.js - Faculty Team from About Us Section

export const TUTORS = [
  {
    id: 'tut-1',
    name: 'Mrs. M. Vahitha Jeevanandam',
    role: 'Founder & Master Chef Instructor',
    credentials: 'MCA, M.Phil., Diploma in Clinical Nutrition and Dietetics',
    bio: 'Former Assistant Professor in the Department of Computer Science and Applications & Chief Examiner for UG board at University of Madras. Awarded Best Teacher 2025 and CIMSME Entrepreneur of the Year 2019.',
    avatar: '/profile.webp'
  },
  {
    id: 'tut-2',
    name: 'Mrs. Sujani Franklin',
    role: 'Icing & Frosting Tutor',
    credentials: '13+ Years Industry Experience',
    bio: 'Accomplished pastry chef and cake artist with 13+ years of industry experience. Trains students across diploma and professional baking courses.',
    avatar: '/Sujani Franklin.webp'
  },
  {
    id: 'tut-3',
    name: 'Mrs. Kayalvizhi Rajakumar',
    role: "Icing & Frosting, Chocolatier Tutor",
    credentials: 'Buttercream & Fondant Specialist',
    bio: 'Specialises in buttercream, fondant, and advanced cake finishing techniques with practical, friendly hands-on instruction.',
    avatar: '/Kayalvizhi Rajakumar.webp'
  },
  {
    id: 'tut-4',
    name: 'Mrs. P. Kirupavathy Ezhlian',
    role: 'Traditional Sweets, Savouries & Cookies Tutor',
    credentials: 'Festive Culinary Heritage Expert',
    bio: 'Expert in authentic Indian sweets, savouries, and festive delicacies, preserving age-old culinary heritage.',
    avatar: '/Kirupavathy Ezhlian.webp'
  },
  {
    id: 'tut-5',
    name: 'Ms. Deepthaa Maharabushanam',
    role: 'Digital Marketing & Business Executive',
    credentials: 'B.Com., MBA',
    bio: 'Manages branding initiatives and culinary business operations at Sam’s Culinary Art Class.',
    avatar: '/Deepthaa Maharabushanam.webp'
  }
];

export function getTutorByName(name) {
  return TUTORS.find((t) => t.name === name) || TUTORS[0];
}
