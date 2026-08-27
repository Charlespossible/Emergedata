import type { Leader } from './types';

export const leadershipIntro =
  'Emerge Data is led by a management team that combines deep technical expertise in data science, economics, business development, and community programming with extensive practical experience in Nigeria and across Sub-Saharan Africa.';

/**
 * Bios are verbatim from the 2025 company profile. Only typography has been corrected
 * (curly quotes, stray double spaces). No degree, institution, award or year is altered.
 * The one exception is flagged in `editorialNote`.
 */
export const leaders: Leader[] = [
  {
    slug: 'kenneth-apeh',
    order: 1,
    name: 'Dr. Kenneth Apeh (PhD)',
    role: 'Principal Partner & Chief Executive',
    photo: '/images/team/kenneth-apeh',
    teaser:
      'Provides strategic leadership across management consulting, data intelligence and advisory, with 12+ years supporting governments and multilaterals.',
    bio: [
      'As Principal Partner at Emerge Data, Kenneth provides strategic leadership and brings intellectual rigour, commercial insight, and extensive experience in management consulting, data intelligence, and strategic advisory to the firm. He holds a PhD from Nasarawa State University and has over 12 years of professional experience supporting governments, multilateral organisations, and private sector clients across Nigeria and West Africa.',
      'Kenneth is recognised for his ability to translate complex research and analytical findings into clear, actionable insights for senior decision-makers, and has led multidisciplinary data and research initiatives across diverse sectors. Prior to joining Emerge Data, he served at ENL Consortium Ltd., where he established and led a data-driven marketing intelligence function, strengthening the organisation’s use of evidence and analytics to inform commercial strategy and decision-making.',
    ],
    email: 'kennetha@emergedata.com.ng',
    phone: '+234 802 7982900',
  },
  {
    slug: 'lydia-ezenwa',
    order: 2,
    name: 'Lydia Ezenwa',
    role: 'Head of Research & Intelligence',
    photo: '/images/team/lydia-ezenwa',
    teaser:
      'A decade at the intersection of information systems, artificial intelligence and digital innovation across Africa and the diaspora.',
    bio: [
      'Lydia is a Programmes and Project Management professional with a decade of experience at the intersection of information systems, artificial intelligence, and digital innovation across Africa and the diaspora. She has a proven track record in leading AI research, IT-enabled programme delivery, innovation initiatives, data-driven diagnostics, and policy analysis at scale, and is experienced in managing complex, multi-country technology programmes involving AI systems, digital platforms, and stakeholder-facing IT solutions.',
      'She develops reporting pipelines that keep complex initiatives on schedule, standardises evaluation and reporting to ensure consistent and defensible results for funders and government stakeholders, and translates technical research findings into actionable, decision-ready policy recommendations. She is bilingual in English and French, and holds an MBA in Information Systems.',
    ],
    editorialNote:
      'AWAITING CLIENT APPROVAL: the source bio is written in clipped CV register. Rewritten into full third-person sentences. No facts changed.',
  },
  {
    slug: 'loveth-olanma-ubi',
    order: 3,
    name: 'Loveth Olanma-Ubi',
    role: 'Co-Founder & Chief Operating Officer',
    photo: '/images/team/loveth-olanma-ubi',
    teaser:
      'Leads programme development, financial management and organisational strategy, and directs the Emergelabs Foundation.',
    bio: [
      'Loveth ensures that Emerge Data’s operational engine runs with the precision that world-class consulting demands. She leads the firm’s programme development, financial management, and organisational strategy, and directs the Emergelabs Foundation — Emerge Data’s community development arm, which oversees women-led support programmes, after-school initiatives, nutrition management, and teacher development.',
      'Loveth holds an honours degree in Geology and Mining from Enugu State University of Science and Technology, and completed the Mathematics for Sub-Saharan Africa (MS4SSA) Programme at Worcester Polytechnic Institute, Massachusetts, USA.',
    ],
    email: 'lovetho@emergedata.com.ng',
  },
  {
    slug: 'fortune-iriaye',
    order: 4,
    name: 'Fortune Iriaye',
    role: 'Head of Data Science & Analytics',
    photo: '/images/team/fortune-iriaye',
    teaser:
      'Designs the measurement frameworks, evaluation systems and machine learning tools behind the firm’s intelligence products.',
    bio: [
      'Fortune is the analytical cornerstone of Emerge Data’s intelligence operations. With an MSc in Data Science from the University of Alabama at Birmingham and a BSc in Statistics from the University of Abuja, he brings over a decade of experience in programme monitoring, evaluation, and data science across health and education sectors.',
      'Fortune leads Emerge Data’s data infrastructure — designing measurement frameworks, building evaluation systems, and deploying machine learning tools that transform field data into strategic insight. His work directly supports the firm’s intelligence products for donors, governments, and private sector clients.',
    ],
    email: 'fortunei@emergedata.com.ng',
  },
  {
    slug: 'hope-nelson',
    order: 5,
    name: 'Hope Nelson',
    role: 'Director, Business Development & Human Capital Management',
    photo: '/images/team/hope-nelson',
    teaser:
      'Leads business development and client engagement strategy, and oversees human capacity development across the firm.',
    bio: [
      'Hope brings structured thinking, strategic business acumen, and deep cross-sector experience to Emerge Data’s business development and human capacity management functions. An alumna of the University of Ibadan, with certifications in business process engineering, business strategy, and emotional intelligence, she has advised business leaders across manufacturing, healthcare, education, banking, logistics, agribusiness, and hospitality, helping organisations strengthen revenue growth, optimise costs, improve organisational performance, and create sustainable stakeholder value.',
      'At Emerge Data, Hope leads the firm’s business development and client engagement strategy, while overseeing human capacity development initiatives, including the design and delivery of capacity-building programmes, organisational development interventions, and SME and private-sector advisory services. She brings a strong ability to translate organisational needs into practical business solutions, build strategic partnerships, and develop people and systems that support sustainable growth.',
    ],
  },
  {
    slug: 'arome-ibrahim',
    order: 6,
    name: 'Arome Ibrahim',
    role: 'Senior Manager, Innovation & Emerging Technologies',
    photo: '/images/team/arome-ibrahim',
    teaser:
      'Drives the integration of AI, immersive and emerging technologies into the firm’s intelligence and advisory services.',
    bio: [
      'Arome leads Emerge Data’s innovation and emerging technologies agenda, driving the integration of digital technologies, artificial intelligence, immersive technologies, and other emerging solutions into the firm’s data intelligence and advisory services. He holds an MBA from the Zagreb School of Economics and Management and a Master’s in Business Sustainability Management from ISM University, Lithuania.',
      'Internationally recognised as one of the Top 50 Voices in VR, AR, and 3D, he is also a recipient of the Next Economy Impact Award from the Dutch Ministry of Foreign Affairs. As the lead of Immersive Tech Africa, Arome brings extensive experience in technology ecosystem development, innovation leadership, and emerging technology adoption, strengthening Emerge Data’s capacity to translate new technologies into practical, scalable solutions for clients and partners.',
    ],
    email: 'aromei@emergedata.com.ng',
  },
  {
    slug: 'alberta-atigbi',
    order: 7,
    name: 'Alberta Atigbi',
    role: 'Senior Research Analyst',
    photo: '/images/team/alberta-atigbi',
    teaser:
      'Specialises in machine learning-augmented data analysis and evidence communication across the firm’s research delivery.',
    bio: [
      'Alberta is the engine of Emerge Data’s research and analytics delivery. Specialising in machine learning-augmented data analysis and evidence communication, she combines critical thinking, problem-solving, and field research expertise to deliver the analytical outputs that underpin Emerge Data’s client recommendations.',
      'Alberta works closely with project managers and sector leads to ensure that every dataset is interrogated rigorously and every finding is translated into clear, actionable intelligence.',
    ],
    email: 'alberta@emergedata.com.ng',
  },
];

export const getLeaderBySlug = (slug: string): Leader | undefined =>
  leaders.find((leader) => leader.slug === slug);
