/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TourismSpot,
  HistoricalEvent,
  GovernmentScheme,
  EmergencyService,
  KnowledgeItem,
  LanguageOption,
  SQLTableSchema
} from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'mni', name: 'Manipuri (Meiteilon)', nativeName: 'ꯃꯤꯇꯩꯂꯣꯟ / Meiteilon', script: 'ꯃꯤꯇꯩ ꯃꯌꯦꯛ (Meitei Mayek) & Latin' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

export const TOURISM_SPOTS: TourismSpot[] = [
  {
    id: 'loktak-lake',
    name: 'Loktak Lake',
    nativeName: 'ꯂꯣꯛꯇꯥꯛ ꯄꯥꯠ (Loktak Pat)',
    district: 'Bishnupur District',
    significance: 'Largest freshwater lake in Northeast India & world\'s only lake with floating islands (Phumdis)',
    description: 'Loktak Lake is famous for its circular floating vegetative masses called "Phumdis". It sustains hundreds of fishermen families and provides water for hydropower, irrigation, and drinking. The Sendra tourist island offers panoramic 360-degree views of the floating lake landscape.',
    bestSeason: 'October to March',
    howToReach: 'Approx. 45 km from Imphal Airport via Tiddim Road (NH-2). Taxis and shared cabs readily available from Imphal.',
    distanceFromImphal: '48 km',
    tags: ['Ramsar Site', 'Phumdis', 'Eco-tourism', 'Boating', 'Photography'],
    coordinates: { x: -0.3, y: 0.1, z: 0.8 },
  },
  {
    id: 'keibul-lamjao',
    name: 'Keibul Lamjao National Park',
    nativeName: 'ꯀꯩꯕꯨꯜ ꯂꯝꯖꯥꯑꯣ ꯂꯩꯄꯥꯛꯀꯤ ꯂꯝꯕꯤ (Keibul Lamjao)',
    district: 'Bishnupur District',
    significance: 'World\'s only floating national park & sole natural habitat of the endangered Sangai (Brow-antlered deer)',
    description: 'Located in the southeastern part of Loktak Lake, this 40 sq km park is comprised of floating biomass. It is the last remaining haven for the "dancing deer" of Manipur, the Sangai (Rucervus eldii eldii), which walks lightly on the spongy floating turf.',
    bestSeason: 'December to April (early morning viewing is best for spotting Sangai)',
    howToReach: '53 km from Imphal. Nearest entry check-post at Keibul. Forest department permits and watchtowers available.',
    distanceFromImphal: '53 km',
    tags: ['Wildlife', 'Sangai Deer', 'UNESCO Tentative', 'Floating Sanctuary'],
    coordinates: { x: -0.2, y: 0.05, z: 1.0 },
  },
  {
    id: 'kangla-fort',
    name: 'Kangla Fort',
    nativeName: 'ꯀꯪꯂꯥ (Kangla)',
    district: 'Imphal West',
    significance: 'Ancient seat of Manipur Kingdom, sacred spiritual hub, and seat of royal power for over 2,000 years',
    description: 'Situated at the heart of Imphal along the banks of the Imphal River, Kangla was the royal palace of King Pakhangba and successive Meitei monarchs. It houses the Kangla Sha dragon-lion statues, sacred groves, the coronation hall, Govindaji temple remnants, and historical moats.',
    bestSeason: 'Round the year (Open 9:00 AM to 5:00 PM, closed on Wednesdays)',
    howToReach: 'Located in city center, Imphal. 7 km from Bir Tikendrajit International Airport.',
    distanceFromImphal: '0 km (City Center)',
    tags: ['Heritage', 'Royal Palace', 'Spiritual', 'Kangla Sha', 'Museum'],
    coordinates: { x: 0.0, y: 0.2, z: 0.0 },
  },
  {
    id: 'ima-keithel',
    name: 'Ima Keithel (Mother\'s Market)',
    nativeName: 'ꯏꯃꯥ ꯀꯩꯊꯦꯜ (Ima Keithel)',
    district: 'Imphal West',
    significance: 'Asia\'s largest and oldest all-women operated commercial market (over 500 years old)',
    description: 'Run exclusively by over 4,000-5,000 women vendors ("Imas"), this legendary market is split across three large heritage buildings. It stands as a world symbol of female empowerment, economic leadership, and community resilience dating back to the historical Lallup system.',
    bestSeason: 'Open daily from early morning till evening. Early morning is ideal for vibrant fresh produce.',
    howToReach: 'Right across Kangla Fort along Bir Tikendrajit Road in central Imphal.',
    distanceFromImphal: '1 km',
    tags: ['Women Empowerment', 'Heritage Market', 'Local Handloom', 'Spices', 'Culture'],
    coordinates: { x: 0.05, y: 0.15, z: 0.05 },
  },
  {
    id: 'shirui-hills',
    name: 'Shirui Hills (Shirui Kashong)',
    nativeName: 'ꯁꯤꯔꯨꯏ ꯆꯤꯡ (Shirui Ching)',
    district: 'Ukhrul District',
    significance: 'Only natural home in the entire world of the rare endemic flower Shirui Lily (Lilium mackliniae)',
    description: 'Shirui Kashong peak towers at 2,835 meters above sea level. Every May-June, the unique bell-shaped pale bluish-pink Shirui Lily blooms on the upper ridges. The annual Shirui Lily Festival attracts travelers, rock musicians, and nature lovers worldwide.',
    bestSeason: 'Mid-May to early June (for the lily blossom) or October to February (for panoramic mountain trekking)',
    howToReach: '84 km from Imphal to Ukhrul town by highway, followed by a scenic 18 km drive to Shirui village base camp and a 2-hour summit trek.',
    distanceFromImphal: '102 km',
    tags: ['Trekking', 'Endemic Flora', 'Shirui Lily', 'Hills', 'Tangkhul Heritage'],
    coordinates: { x: 0.8, y: 0.6, z: -0.9 },
  },
  {
    id: 'dzukou-valley',
    name: 'Dzukou Valley (Manipur-Nagaland Border)',
    nativeName: 'ꯖꯨꯀꯣ ꯇꯝꯄꯥꯛ (Dzukou Valley)',
    district: 'Senapati District border',
    significance: 'Known as the "Valley of Flowers of the East", famed for sweeping emerald rolling hills and rare seasonal lilies',
    description: 'Nestled at 2,452 meters altitude, Dzukou Valley features meandering crystal streams, bonsai-like dwarf bamboo hills, and carpet blooms during monsoon. Accessible from Mount Isii (Senapati side) or Viswema/Jakhama.',
    bestSeason: 'June to September for flowers; October to March for crisp blue skies and cool trekking',
    howToReach: 'Via Senapati / Mao on the Manipur border or Jakhama route.',
    distanceFromImphal: '105 km',
    tags: ['Adventure', 'Trekking', 'Eco-tourism', 'Emerald Meadows'],
    coordinates: { x: -0.1, y: 0.5, z: -1.2 },
  },
  {
    id: 'ina-memorial-moirang',
    name: 'INA Memorial Complex',
    nativeName: 'ꯏꯟꯗꯤꯌꯥꯟ ꯅꯦꯁ꯭ꯅꯦꯜ ꯑꯥꯔꯃꯤ ꯃꯣꯏꯔꯥꯡ (INA Moirang)',
    district: 'Bishnupur District',
    significance: 'Historic site where the Indian National Army under Netaji Subhas Chandra Bose first hoisted the Tricolor on Indian soil on April 14, 1944',
    description: 'Houses the bronze statue of Netaji, wartime photographs, artillery relics, uniforms, letters, and documents from the Burma Campaign during World War II.',
    bestSeason: 'Round the year (Closed on Mondays)',
    howToReach: '45 km south of Imphal, located inside Moirang town near Loktak Lake.',
    distanceFromImphal: '45 km',
    tags: ['Freedom Struggle', 'WWII Heritage', 'Netaji Subhas Bose', 'Museum'],
    coordinates: { x: -0.35, y: 0.1, z: 0.75 },
  },
  {
    id: 'andro-village',
    name: 'Andro Cultural Heritage Village',
    nativeName: 'ꯑꯟꯗ꯭ꯔꯣ ꯈꯨꯜ (Andro)',
    district: 'Imphal East District',
    significance: 'Ancient village preserving an unextinguished sacred fire burning since the 1st century AD (Meitei King Poireiton era)',
    description: 'Famous for traditional coil pottery practiced exclusively by married women, the Mutua Bahadur Cultural Museum depicting tribal housing replicas, and the sacred fire shrine protected by village rotation.',
    bestSeason: 'October to April',
    howToReach: '25 km east of Imphal via Yairipok road.',
    distanceFromImphal: '25 km',
    tags: ['Sacred Fire', 'Traditional Pottery', 'Living Museum', 'Indigenous Culture'],
    coordinates: { x: 0.45, y: 0.25, z: 0.2 },
  }
];

export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    id: 'ancient-kangleipak',
    year: '33 AD',
    period: 'Ancient Period',
    title: 'Coronation of King Nongda Lairen Pakhangba',
    description: 'Ascension of King Nongda Lairen Pakhangba at Kangla marked the formal unification of seven salai (clans) of the Meiteis and established the Ningthouja Dynasty, one of the longest continuous dynasties in world history.',
    keyFigures: ['Nongda Lairen Pakhangba', 'Queen Laisana'],
    significance: 'Foundation of recorded Manipuri polity and statecraft detailed in the royal chronicle Cheitharol Kumbaba.',
  },
  {
    id: 'king-bhagyachandra-era',
    year: '1763 - 1798 AD',
    period: 'Medieval Golden Age',
    title: 'Maharaja Bhagyachandra & Genesis of Manipuri Raas Leela',
    description: 'Maharaja Bhagyachandra (Jai Singh) consecrated the sacred idol of Shri Govindaji and, inspired by a divine dream at Langthabal, choreographed the classical Maha Raas Leela dance and designed the ornate Kumil / Potloi costume.',
    keyFigures: ['Maharaja Bhagyachandra', 'Princess Bimbabati'],
    significance: 'Elevated Manipuri classical dance into an internationally recognized sublime devotional art form.',
  },
  {
    id: 'anglo-manipur-war',
    year: '1891 AD',
    period: 'Colonial Era',
    title: 'Anglo-Manipur War & Battle of Khongjom',
    description: 'A valiant defense of Manipuri sovereignty against the British Empire. Major Paona Brajabashi and fellow warriors fought heroically to the last breath at Khongjom hills rather than surrender. Crown Prince Bir Tikendrajit and General Thangal were subsequently martyred at Pheidabung.',
    keyFigures: ['Bir Tikendrajit', 'General Thangal', 'Paona Brajabashi', 'Maharaja Kulachandra'],
    significance: 'April 23 is commemorated every year across the state as "Khongjom Day", and August 13 as "Patriots\' Day".',
  },
  {
    id: 'nupi-lan',
    year: '1904 & 1939 AD',
    period: 'Women\'s Movements',
    title: 'Nupi Lan (Women\'s War of Manipur)',
    description: 'Historic uprisings led by courageous Manipuri women: First in 1904 against the British forced-labor order (Lallup), and second in 1939 against artificial rice scarcity created by unmonitored rice exports by mills. The women shut down administration and forced change.',
    keyFigures: ['Manipuri Mothers (Imas)'],
    significance: 'December 12 is observed annually as Nupi Lan Day, celebrating the extraordinary bravery of Manipuri mothers.',
  },
  {
    id: 'merger-agreement',
    year: '1949 AD',
    period: 'Modern Era',
    title: 'Accession and Merger of Manipur with India',
    description: 'The Manipur State Constitution Act was drafted in 1947 establishing an elected legislative assembly. On September 21, 1949, the Merger Agreement was signed at Shillong by Maharaja Bodhchandra, and Manipur became a Part C state of the Indian Union on October 15, 1949, later gaining full Statehood on January 21, 1972.',
    keyFigures: ['Maharaja Bodhchandra', 'V.P. Menon', 'Sardar Vallabhbhai Patel'],
    significance: 'Transition from historic sovereign kingdom to constitutional state of modern India.',
  }
];

export const GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'cmht',
    name: 'Chief Minister-gi Hakshelgi Tengbang (CMHT)',
    department: 'Health & Family Welfare Department, Government of Manipur',
    targetGroup: 'Poor, Antyodaya Anna Yojana (AAY) card holders, widows, media persons, and unorganized workers',
    benefits: 'Cashless medical treatment up to ₹5,00,000 per family per year for secondary and tertiary care across empaneled public & private hospitals.',
    eligibility: [
      'Permanent resident of Manipur',
      'Valid Ration Card (AAY / BPL) or verified income certificate below threshold',
      'Not already covered under government employee health reimbursement'
    ],
    documentsRequired: [
      'Aadhaar Card of all family members',
      'Ration Card / Income Certificate from SDO/BDO',
      'Passport size photographs',
      'Valid mobile phone number'
    ],
    officialPortal: 'https://cmhtmanipur.gov.in',
  },
  {
    id: 'manipur-startup',
    name: 'Manipur StartUp 2.0 Scheme',
    department: 'Department of Planning, Government of Manipur',
    targetGroup: 'Local entrepreneurs, youth innovators, self-help groups, agri-business ventures',
    benefits: 'Financial grants and soft loans across three categories: Revenue Stage (up to ₹30 Lakhs), Idea Stage (up to ₹3 Lakhs), and Partner Bank tie-up support, with dedicated mentorship.',
    eligibility: [
      'Domicile of Manipur aged 18 years or above',
      'Innovative business idea or existing operational unit in Manipur',
      'Focus areas: Food processing (Chak-Hao, ginger, lemon), IT/ITES, tourism, handloom/handicrafts, renewable energy'
    ],
    documentsRequired: [
      'Detailed Project Report (DPR)',
      'Proof of identity and residency in Manipur',
      'Educational qualifications / skills certificate',
      'Bank Account details'
    ],
    officialPortal: 'https://startupmanipur.in',
  },
  {
    id: 'mission-organic',
    name: 'Mission Organic Value Chain Development for North Eastern Region (MOVCDNER)',
    department: 'Department of Agriculture & Horticulture, Manipur',
    targetGroup: 'Farmers, Farmer Producer Companies (FPCs), Organic Growers',
    benefits: 'Full certification support, subsidy on organic bio-inputs, cold chain logistics, branding, and export access for indigenous crops like Chak-Hao (Black Rice), Kachai Lemon, and Sirarakhong Hathei.',
    eligibility: [
      'Small and marginal farming clusters committed to 100% chemical-free organic protocol'
    ],
    documentsRequired: [
      'Farmer Land Records (Patta/Jamabandi)',
      'Aadhaar & Bank Passbook',
      'Cluster Membership registration'
    ],
    officialPortal: 'https://agrimanipur.gov.in',
  },
  {
    id: 'scholarship-portal',
    name: 'State & Pre-Matric/Post-Matric Scholarships for Manipur Students',
    department: 'Directorate of MOBC / Tribal Affairs & Hills / Higher Education',
    targetGroup: 'ST, SC, OBC, Minority, and economically disadvantaged school and college students of Manipur',
    benefits: 'Tuition reimbursement, monthly maintenance stipends, book allowances for technical, medical, and general degree courses.',
    eligibility: [
      'Domicile of Manipur enrolled in recognized school/college/university',
      'Family income ceiling within specified scheme limits'
    ],
    documentsRequired: [
      'Bonafide student certificate from institution',
      'Mark sheets of previous qualifying examinations',
      'Income and Caste/Tribe certificate',
      'Aadhaar-linked bank account'
    ],
    officialPortal: 'https://scholarships.gov.in',
  }
];

export const EMERGENCY_SERVICES: EmergencyService[] = [
  {
    id: 'police-emergency',
    service: 'Manipur Police Emergency Response',
    helpline: '112',
    alternateNumber: '0385-2450000',
    category: 'police',
    description: 'Centralized 24x7 emergency helpline for police dispatch, quick response teams, and distress calls statewide.',
    is24x7: true,
  },
  {
    id: 'medical-ambulance',
    service: 'State Ambulance Service',
    helpline: '108',
    alternateNumber: '102',
    category: 'medical',
    description: 'Free emergency ambulance pickup for accidents, trauma, maternal labor, and critical hospital transfers.',
    is24x7: true,
  },
  {
    id: 'women-helpline',
    service: 'Women In Distress Helpline',
    helpline: '181',
    alternateNumber: '0385-2441111',
    category: 'women',
    description: 'Toll-free 24-hour emergency counseling, police protection, legal aid, and rescue for women facing domestic violence or harassment.',
    is24x7: true,
  },
  {
    id: 'childline',
    service: 'Childline Manipur',
    helpline: '1098',
    category: 'child',
    description: 'Dedicated round-the-clock emergency assistance and care for children in distress, abandoned minors, and child protection.',
    is24x7: true,
  },
  {
    id: 'disaster-management',
    service: 'State Emergency Operation Centre (Disaster Management)',
    helpline: '1070',
    alternateNumber: '0385-2443441',
    category: 'disaster',
    description: 'Flood alerts, landslide mitigation, earthquake response, and rescue operations coordinated through Manipur SDMA.',
    is24x7: true,
  },
  {
    id: 'rims-hospital',
    service: 'Regional Institute of Medical Sciences (RIMS) Casualty',
    helpline: '0385-2414629',
    category: 'medical',
    description: 'Premier tertiary healthcare hospital and trauma center located in Lamphelpat, Imphal.',
    is24x7: true,
  },
  {
    id: 'jnims-hospital',
    service: 'Jawaharlal Nehru Institute of Medical Sciences (JNIMS)',
    helpline: '0385-2443144',
    category: 'medical',
    description: 'State government multi-speciality teaching hospital and round-the-clock emergency trauma unit in Porompat, Imphal.',
    is24x7: true,
  }
];

export const MANIPUR_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'kb-chakhao',
    category: 'agriculture',
    title: 'Chak-Hao (Manipur Black Aromatic Rice)',
    titleManipuri: 'ꯆꯥꯛ-ꯍꯥꯑꯣ (Chak-Hao)',
    summary: 'A fragrant, deep purple-black glutinous rice native to Manipur, awarded the prestigious Geographical Indication (GI) Tag No. 364 in 2020.',
    content: `Chak-Hao has been cultivated in Manipur for centuries and is deeply entwined with traditional Meitei community feasts and rituals.
Key Attributes:
1. High Anthocyanin Content: Powerful natural antioxidant that gives it its purple-black color and combats inflammation.
2. Distinct Aroma & Nutty Texture: Unlike regular black rice, Chak-Hao is naturally sweet and aromatic.
3. Traditional Delicacy: Commonly prepared as 'Chak-Hao Kheer' (sweet dessert pudding), steamed rice cakes, and organic health beverages.
4. Export Potential: Grown under traditional organic farming without synthetic chemicals, primarily in Imphal West, Bishnupur, Thoubal, and Kakching districts.`,
    verifiedSource: 'Department of Agriculture Manipur & Geographical Indications Registry of India',
    tags: ['Chak-Hao', 'Black Rice', 'GI Tag', 'Organic Agriculture', 'Nutrition'],
  },
  {
    id: 'kb-sangai',
    category: 'tourism',
    title: 'The Sangai - Dancing Deer of Manipur',
    titleManipuri: 'ꯁꯉꯥꯏ (Sangai)',
    summary: 'The state animal of Manipur and one of the rarest deer species on earth, living exclusively on the floating phumdis of Keibul Lamjao.',
    content: `The Sangai (Rucervus eldii eldii) was once believed to be extinct in the 1950s before a small remnant population was rediscovered in the southern marshes of Loktak Lake.
Key Facts:
- Adaptations: Its hooves have specially adapted calloused pads that prevent it from sinking into the trembling, springy floating meadows (phumdi).
- Cultural Symbolism: Believed in Meitei mythology to be a bridge between nature and humans.
- Conservation Success: Dedicated protection efforts by the Manipur Forest Department and local communities have helped the wild count grow from less than 15 individuals to over 260 individuals.
- Manipur Sangai Festival: Celebrated every November from 21st to 30th as the state's grandest international tourism showcase.`,
    verifiedSource: 'Manipur Forest and Environment Department & Wildlife Institute of India',
    tags: ['Sangai', 'State Animal', 'Keibul Lamjao', 'Wildlife Conservation'],
  },
  {
    id: 'kb-shirui-lily',
    category: 'tourism',
    title: 'Shirui Lily (Kashong Timrawon)',
    titleManipuri: 'ꯁꯤꯔꯨꯏ ꯂꯤꯂꯤ (Shirui Lily)',
    summary: 'The State Flower of Manipur, a rare, bell-shaped pale pink blossom that refuses to grow anywhere else on the globe except the heights of Shirui Kashong.',
    content: `Discovered to modern science by English botanist Frank Kingdon-Ward in 1946 and named after his wife Jean Macklin (Lilium mackliniae).
Significance:
- Microclimate Sensitivity: Repeated attempts to transplant the lily outside the upper winds and soil of Shirui peak have failed, making it an extraordinary ecological miracle.
- Bloom Timing: Late May through early June.
- Tangkhul Legend: Known locally as Kashong Timrawon, said to be a guardian spirit flower protecting love and mountain serenity.`,
    verifiedSource: 'Directorate of Environment and Climate Change, Manipur',
    tags: ['Shirui Lily', 'State Flower', 'Ukhrul', 'Botany', 'Endemic Flora'],
  },
  {
    id: 'kb-yaoshang-festival',
    category: 'culture',
    title: 'Yaoshang Festival & Thabal Chongba',
    titleManipuri: 'ꯌꯥꯑꯣꯁꯪ ꯑꯃꯁꯨꯡ ꯊꯕꯥꯜ ꯆꯣꯡꯕ',
    summary: 'The premier spring festival of Manipur, celebrated for five days beginning on the full moon of Lamta (February-March), integrating sports and nocturnal folk dancing.',
    content: `Yaoshang is Manipur's most vibrant festival, blending spiritual traditions with sporting excellence.
Traditions:
1. Yaoshang Mei Thaba: Lighting of a small thatch hut on the first evening, symbolizing the burning of evil.
2. Sports Movement: Over the last four decades, Manipuri neighborhoods transformed the five festival days into organized grassroots sports meets (football, athletics, traditional Mukna wrestling), producing countless Olympians and national champions.
3. Thabal Chongba (Dancing by Moonlight): Young people join hands in rhythmic circle folk dances to the beat of traditional drums and folk rhythms.`,
    verifiedSource: 'Manipur State Kala Akademi & Directorate of Art & Culture',
    tags: ['Yaoshang', 'Thabal Chongba', 'Spring Festival', 'Sports', 'Meitei Traditions'],
  },
  {
    id: 'kb-classical-dance',
    category: 'culture',
    title: 'Manipuri Classical Dance (Jagoi) & Raas Leela',
    titleManipuri: 'ꯃꯅꯤꯄꯨꯔꯤ ꯖꯒꯣꯏ ꯑꯃꯁꯨꯡ ꯔꯥꯁ ꯂꯤꯂꯥ',
    summary: 'One of the eight recognized Indian classical dances, famous for its graceful, soft circular movements (lasya) and the iconic glittering cylindrical skirt (Potloi/Kumil).',
    content: `Unlike other Indian classical dance forms characterized by sharp foot-stamping, Manipuri dance is renowned for unbroken serpentine curves (figure-8 movements) where the feet lightly kiss the ground.
Elements:
- Pung Cholom: The dramatic acrobatic drum dance where male performers dance dynamically while playing the Meitei double-headed drum (Pung).
- Raas Leela: Choreographed under Maharaja Bhagyachandra in 1779, narrating divine love through five classical formats: Maha Raas, Kunja Raas, Vasant Raas, Nitya Raas, and Diba Raas.
- Attire: The Kumil/Potloi costume decorated with mirror-work, fine embroidery, and translucent floating gossamer veil (Innaphi).`,
    verifiedSource: 'Sangeet Natak Akademi & Jawaharlal Nehru Manipur Dance Academy (JNMDA)',
    tags: ['Classical Dance', 'Raas Leela', 'Pung Cholom', 'Potloi', 'Heritage'],
  },
  {
    id: 'kb-polo-sagolkangjei',
    category: 'history',
    title: 'Sagol Kangjei - The Manipur Origin of Modern Polo',
    titleManipuri: 'ꯁꯒꯣꯜ ꯀꯥꯡꯖꯩ (Sagol Kangjei)',
    summary: 'Manipur is globally celebrated as the birthplace of modern polo, originated from the traditional game of Sagol Kangjei played on the indigenous Manipuri pony.',
    content: `Historical facts:
- Origin: Documented in the royal chronicles as early as the 1st millennium, played on the sure-footed Manipuri Pony.
- Introduction to the West: British military officers and tea planters observed the game in Cachar and Imphal in the 1850s, codifying the rules and establishing the world's first polo club at Silchar in 1859.
- Oldest Living Polo Ground: The Mapal Kangjeibung located adjacent to Kangla Fort in Imphal is officially recognized by Guinness World Records as the oldest operational polo ground in the world.
- The Manipuri Pony: A critically pure, hardy indigenous breed that survives in semi-wild state on grazing commons.`,
    verifiedSource: 'Manipur Horse Riding and Polo Association & Guinness World Records',
    tags: ['Polo', 'Sagol Kangjei', 'Mapal Kangjeibung', 'Manipuri Pony', 'Sports History'],
  }
];

export const MEITEILON_GLOSSARY = [
  { phrase: 'Khurumjari', script: 'ꯈꯨꯔꯨꯃꯖꯔꯤ', english: 'Greetings / Namaste / Hello', context: 'Formal polite greeting' },
  { phrase: 'Eikhoi Manipur AI ni', script: 'ꯑꯩꯈꯣꯏ ꯃꯅꯤꯄꯨꯔ ꯑꯦꯑꯥꯏ ꯅꯤ', english: 'We are Manipur AI', context: 'Introduction' },
  { phrase: 'Kari toubige?', script: 'ꯀꯔꯤ ꯇꯧꯕꯤꯒꯦ?', english: 'How may I assist you?', context: 'Help offer' },
  { phrase: 'Nanggi ming kari koui?', script: 'ꯅꯪꯒꯤ ꯃꯤꯡ ꯀꯔꯤ ꯀꯧꯏ?', english: 'What is your name?', context: 'Conversation' },
  { phrase: 'Eigi ming... koui', script: 'ꯑꯩꯒꯤ ꯃꯤꯡ... ꯀꯧꯏ', english: 'My name is...', context: 'Self introduction' },
  { phrase: 'Thaagatchari', script: 'ꯊꯥꯒꯠꯆꯔꯤ', english: 'Thank you very much', context: 'Gratitude' },
  { phrase: 'Nungaibara?', script: 'ꯅꯨꯡꯉꯥꯏꯕꯔꯥ?', english: 'How are you / Are you well?', context: 'Inquiry' },
  { phrase: 'Nungaijei', script: 'ꯅꯨꯡꯉꯥꯏꯖꯩ', english: 'I am doing well', context: 'Reply' },
  { phrase: 'Loktak Pat kadaida leibage?', script: 'ꯂꯣꯛꯇꯥꯛ ꯄꯥꯠ ꯀꯗꯥꯏꯗ ꯂꯩꯕꯒꯦ?', english: 'Where is Loktak Lake located?', context: 'Tourism inquiry' },
  { phrase: 'Yamna nungaite', script: 'ꯌꯥꯝꯅ ꯅꯨꯡꯉꯥꯏꯇꯦ', english: 'I am so sorry / not well', context: 'Empathy' },
  { phrase: 'Kangleipak', script: 'ꯀꯪꯂꯩꯄꯥꯛ', english: 'Ancient native name of Manipur', context: 'Historical identity' },
  { phrase: 'Phumdi', script: 'ꯐꯨꯝꯗꯤ', english: 'Heterogeneous floating island of soil, vegetation and organic matter on Loktak Lake', context: 'Geography' },
];

export const SQL_SERVER_SCHEMAS: SQLTableSchema[] = [
  {
    tableName: 'Users',
    description: 'System registered user accounts, authentication credentials, and status flags',
    rowCount: 1420,
    columns: [
      { name: 'UserID', type: 'UNIQUEIDENTIFIER', isPrimaryKey: true, nullable: false, description: 'Unique user UUID' },
      { name: 'FullName', type: 'NVARCHAR(150)', nullable: false, description: 'Legal name of the user' },
      { name: 'Email', type: 'VARCHAR(255)', nullable: false, description: 'Unique email address' },
      { name: 'PasswordHash', type: 'VARCHAR(255)', nullable: false, description: 'Bcrypt hashed password' },
      { name: 'Role', type: 'VARCHAR(50)', nullable: false, description: 'Role: citizen, student, tourist, admin' },
      { name: 'IsActive', type: 'BIT', nullable: false, description: 'Active status indicator' },
      { name: 'CreatedAt', type: 'DATETIME2', nullable: false, description: 'Account creation timestamp' }
    ],
    records: [
      { UserID: 'u-101', FullName: 'Bikash Laishram', Email: 'bikash.l@manipur.gov.in', Role: 'admin', IsActive: 1, CreatedAt: '2026-01-10 09:30:00' },
      { UserID: 'u-102', FullName: 'Linthoingambi Devi', Email: 'linthoi.d@gmail.com', Role: 'student', IsActive: 1, CreatedAt: '2026-02-14 11:20:00' },
      { UserID: 'u-103', FullName: 'Tomba Singh', Email: 'tomba.meitei@outlook.com', Role: 'citizen', IsActive: 1, CreatedAt: '2026-02-18 14:45:00' }
    ]
  },
  {
    tableName: 'UserProfiles',
    description: 'Extended personal profile, native language preferences, and district metadata',
    rowCount: 1420,
    columns: [
      { name: 'ProfileID', type: 'UNIQUEIDENTIFIER', isPrimaryKey: true, nullable: false, description: 'Primary key' },
      { name: 'UserID', type: 'UNIQUEIDENTIFIER', isForeignKey: true, references: 'Users.UserID', nullable: false, description: 'Foreign key to Users' },
      { name: 'PreferredLanguage', type: 'VARCHAR(10)', nullable: false, description: 'Language code: en, mni, hi' },
      { name: 'District', type: 'NVARCHAR(100)', nullable: true, description: 'Home district in Manipur' },
      { name: 'Interests', type: 'NVARCHAR(MAX)', nullable: true, description: 'Topics of interest (JSON array)' },
      { name: 'BiometricEnabled', type: 'BIT', nullable: false, description: 'Mobile biometric flag' }
    ],
    records: [
      { ProfileID: 'p-101', UserID: 'u-101', PreferredLanguage: 'mni', District: 'Imphal West', Interests: '["History", "Polo", "Tech"]', BiometricEnabled: 1 },
      { ProfileID: 'p-102', UserID: 'u-102', PreferredLanguage: 'en', District: 'Ukhrul', Interests: '["Tourism", "Shirui Lily"]', BiometricEnabled: 1 }
    ]
  },
  {
    tableName: 'Conversations',
    description: 'Chat session metadata, summary, and user ownership',
    rowCount: 5890,
    columns: [
      { name: 'ConversationID', type: 'UNIQUEIDENTIFIER', isPrimaryKey: true, nullable: false, description: 'Unique conversation ID' },
      { name: 'UserID', type: 'UNIQUEIDENTIFIER', isForeignKey: true, references: 'Users.UserID', nullable: false, description: 'Owner of conversation' },
      { name: 'Title', type: 'NVARCHAR(200)', nullable: false, description: 'Generated session title' },
      { name: 'LanguageCode', type: 'VARCHAR(10)', nullable: false, description: 'Primary language used' },
      { name: 'TotalTokensUsed', type: 'INT', nullable: false, description: 'Cumulative tokens consumed' },
      { name: 'CreatedAt', type: 'DATETIME2', nullable: false, description: 'Created timestamp' },
      { name: 'UpdatedAt', type: 'DATETIME2', nullable: false, description: 'Last active timestamp' }
    ],
    records: [
      { ConversationID: 'c-301', UserID: 'u-101', Title: 'Loktak Lake Phumdis & Sangai Conservation', LanguageCode: 'en', TotalTokensUsed: 1420, CreatedAt: '2026-11-06 18:22:10', UpdatedAt: '2026-11-06 18:25:40' },
      { ConversationID: 'c-302', UserID: 'u-102', Title: 'CMHT Health Scheme Application Requirements', LanguageCode: 'mni', TotalTokensUsed: 980, CreatedAt: '2026-11-06 20:10:05', UpdatedAt: '2026-11-06 20:14:30' }
    ]
  },
  {
    tableName: 'Messages',
    description: 'Individual conversation turns including role, content, and audio metadata',
    rowCount: 32400,
    columns: [
      { name: 'MessageID', type: 'UNIQUEIDENTIFIER', isPrimaryKey: true, nullable: false, description: 'Primary key' },
      { name: 'ConversationID', type: 'UNIQUEIDENTIFIER', isForeignKey: true, references: 'Conversations.ConversationID', nullable: false, description: 'Parent conversation' },
      { name: 'Role', type: 'VARCHAR(20)', nullable: false, description: 'user or assistant' },
      { name: 'Content', type: 'NVARCHAR(MAX)', nullable: false, description: 'Text content of the message' },
      { name: 'HasAttachments', type: 'BIT', nullable: false, description: 'Document/image attachment flag' },
      { name: 'AudioSynthesized', type: 'BIT', nullable: false, description: 'TTS audio generated flag' },
      { name: 'CreatedAt', type: 'DATETIME2', nullable: false, description: 'Turn timestamp' }
    ],
    records: [
      { MessageID: 'm-901', ConversationID: 'c-301', Role: 'user', Content: 'What makes Loktak lake unique in the world?', HasAttachments: 0, AudioSynthesized: 0, CreatedAt: '2026-11-06 18:22:10' },
      { MessageID: 'm-902', ConversationID: 'c-301', Role: 'assistant', Content: 'Loktak Lake in Manipur is the only lake in the world with floating islands called Phumdis...', HasAttachments: 0, AudioSynthesized: 1, CreatedAt: '2026-11-06 18:22:12' }
    ]
  },
  {
    tableName: 'KnowledgeDocuments',
    description: 'Verified corpus documents, policy whitepapers, and cultural histories',
    rowCount: 184,
    columns: [
      { name: 'DocumentID', type: 'UNIQUEIDENTIFIER', isPrimaryKey: true, nullable: false, description: 'Document ID' },
      { name: 'Category', type: 'VARCHAR(50)', nullable: false, description: 'history, culture, tourism, government, etc.' },
      { name: 'Title', type: 'NVARCHAR(255)', nullable: false, description: 'Official document title' },
      { name: 'SourceAgency', type: 'NVARCHAR(200)', nullable: false, description: 'Verifying ministry or research authority' },
      { name: 'VerificationStatus', type: 'VARCHAR(30)', nullable: false, description: 'verified, pending, under_review' },
      { name: 'LastUpdated', type: 'DATETIME2', nullable: false, description: 'Last revision date' }
    ],
    records: [
      { DocumentID: 'doc-01', Category: 'agriculture', Title: 'Chak-Hao Black Rice GI Specification (No. 364)', SourceAgency: 'Geographical Indications Registry', VerificationStatus: 'verified', LastUpdated: '2026-05-12' },
      { DocumentID: 'doc-02', Category: 'government', Title: 'Chief Minister-gi Hakshelgi Tengbang Guidelines', SourceAgency: 'Health Dept, Govt of Manipur', VerificationStatus: 'verified', LastUpdated: '2026-08-20' },
      { DocumentID: 'doc-03', Category: 'tourism', Title: 'Keibul Lamjao Habitat Assessment 2026', SourceAgency: 'Wildlife Institute of India', VerificationStatus: 'verified', LastUpdated: '2026-10-01' }
    ]
  },
  {
    tableName: 'TourismPlaces',
    description: 'Curated tourist destinations, geolocations, and season guidelines',
    rowCount: 42,
    columns: [
      { name: 'PlaceID', type: 'VARCHAR(50)', isPrimaryKey: true, nullable: false, description: 'Unique slug ID' },
      { name: 'Name', type: 'NVARCHAR(150)', nullable: false, description: 'English name' },
      { name: 'NativeName', type: 'NVARCHAR(150)', nullable: false, description: 'Meitei Mayek / Roman script name' },
      { name: 'District', type: 'NVARCHAR(100)', nullable: false, description: 'District in Manipur' },
      { name: 'BestSeason', type: 'NVARCHAR(100)', nullable: false, description: 'Ideal visiting window' },
      { name: 'DistanceFromImphal', type: 'VARCHAR(50)', nullable: false, description: 'Kilometers from state capital' }
    ],
    records: [
      { PlaceID: 'loktak-lake', Name: 'Loktak Lake', NativeName: 'ꯂꯣꯛꯇꯥꯛ ꯄꯥꯠ', District: 'Bishnupur', BestSeason: 'Oct - Mar', DistanceFromImphal: '48 km' },
      { PlaceID: 'kangla-fort', Name: 'Kangla Fort', NativeName: 'ꯀꯪꯂꯥ', District: 'Imphal West', BestSeason: 'Year-round', DistanceFromImphal: '0 km' }
    ]
  },
  {
    tableName: 'APIUsage',
    description: 'System-wide token monitoring, API calls, and telemetry log',
    rowCount: 84900,
    columns: [
      { name: 'UsageID', type: 'BIGINT', isPrimaryKey: true, nullable: false, description: 'Incremental log ID' },
      { name: 'Endpoint', type: 'VARCHAR(100)', nullable: false, description: 'API route invoked' },
      { name: 'ModelUsed', type: 'VARCHAR(50)', nullable: false, description: 'AI Model: gemini-3.8-flash' },
      { name: 'PromptTokens', type: 'INT', nullable: false, description: 'Input token count' },
      { name: 'ResponseTokens', type: 'INT', nullable: false, description: 'Output token count' },
      { name: 'LatencyMs', type: 'INT', nullable: false, description: 'Response execution latency' },
      { name: 'Timestamp', type: 'DATETIME2', nullable: false, description: 'Call timestamp' }
    ],
    records: [
      { UsageID: 10041, Endpoint: '/api/chat', ModelUsed: 'gemini-3.8-flash', PromptTokens: 412, ResponseTokens: 380, LatencyMs: 820, Timestamp: '2026-11-06 23:12:05' },
      { UsageID: 10042, Endpoint: '/api/translate', ModelUsed: 'gemini-3.8-flash', PromptTokens: 85, ResponseTokens: 72, LatencyMs: 340, Timestamp: '2026-11-06 23:14:18' }
    ]
  }
];
