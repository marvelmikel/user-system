export default (context, inject) => {
  const allFaqs = [
    {
      question: "What are	procedures for the accreditation?",
      answer: {
        header: null,
        list: [
          'Purchase of accreditation application form by applicant',
          'Submission of the completed application form with all the required documents',
          'Review of submitted application for completeness by the accreditation desk',
          'Inspection and validation of applicant’s facility by accreditation officers.',
          'Invitation of applicant whose facility has been validated for an interview.',
          'Successful applicant makes payment for issuance of accreditation certificate',
          'The accreditation certificate for consultancy services is valid for two (2) years while that for environmental laboratory services is for five (5) years. ',
          'Consultants are advised to apply for the renewal of their certificates at least 2 weeks before the expiry date.'
        ],
        footer: null,
      },
      open: true,
    },
    {
      question:
        "What are areas of accreditation?",
      answer : {
        header: null,
        list: [
          'Environmental Consultancy Services  (EIA, Baseline/Post Impact Studies, Compliance Monitoring/Audit, Environmental Accounting/Environmental Economics, Environmental Management System & Strategic Environmental Risk Management)',
          'Laboratory Consultancy Services.',
          'Environmental Laboratory Services',
          'Environmental Management Services (Waste Management Technology, Engineering-Oil & Gas Sector, Pollution Control, Remediation, Marine Pollution Management, Effluent Treatment, Renewable Energy, Sewage/Sludge Evacuation, Oil Spill Cleanup, Tank Cleaning, Clean Development Mechanism)',
          'Erosion Control/Flood & Coastal Zone Management',
          'Municipal Solid Waste Management (Collection & Treatment & Disposal)',
          'Hazardous Waste Management Technology ',
          'Environmental Equipment Supplies',
          'Environmental Education',
          'Environmental Law',
          'Landscaping, Afforestation/Reforestation, Drought & Desertification',
          'Environmental Health & Hygiene (Fumigation & Pest Chemicals Application, Cleaning Services & Industrial Hygiene)',
          'Climate Change Issues (Greenhouse gas Emission Inventory, Mitigation of Issues, Vulnerability & Adaptation)',
          'Environmental Contractor'
        ],
        footer: null,
      },
      open: false,
    },
    {
      question: "What are list of requirements?",
      answer : {
        header: null,
        list: [
          'Formal application letter, specifying areas of interest, addressed to the Honorable Minister of Environment',
          'Evidence of payment for the purchase of application form',
          'Certificate of incorporation or Registration with Memorandum and Article of Association with minimum of N3 million as share capital',
          'Current tax clearance certificate',
          'Profile of the company ',
          'Evidence of previous environmental job done (if any)',
          'Detailed curriculum vitae and copies of academic certificates of all technical staff ',
          'Affidavit of consent by the technical staff for the use of their CVs and credentials for the accreditation process ',
          'List of equipment available in the company (where applicable)',
          'Letter of credibility from bankers ',
          'Evidence of membership of relevant professional bodies e.g. COREN, IPAN, NES, WAMASON, etc.',
          'Evidence of collaboration/affiliation-partners agreement (MOU) between an indigenous/ overseas based company or an evidence of legal arrangements (where applicable)',
          'Copy of National Identity card or International Passport of two members of the board of directors.',
        ],
        footer: null
      },
      open: false,
    },

    {
      question: "Renewal of expired accreditation certificate?",
      answer : {
        header: 'Upload supporting documents. Only PDF and JPG are allowed. All uploaded documents should not be more than 1mb in size.',
        list: [
          'A formal application letter to the Honourable Minister of Environment requesting for the renewal of the expired certificate',
          'Proof of payment for the Renewal',
          'Current Tax Clearance Certificate ',
          'Copy of Expired Certificate ',
          'Report of the activities of the company within the period under review.',
          'Verification visit to the company to monitor compliance with applicable environmental regulations, guidelines and standards',
        ],
        footer: null
      },
      open: false,
    },

    {
      question: "Statutory fee?",
      answer : {
        header: 'The approved fees payable by applicants through the Treasury Single Account (TSA) are as below:',
        list: [
          'Five thousand (₦5,000:00) for purchase of the application form',
          'Fifty thousand (₦50,000:00) naira only for one area of accreditation',
          'One hundred thousand (₦100,000:00) naira for two or more areas',
          'One hundred and twenty thousand (₦120, 000:00) naira for environmental laboratory services.'
        ],
        footer: `The Remita Retrieval Reference (RRR) can be generated from the address: https://login.remita.net/remita/onepage/OAGFCRF/biller.spa using 1000070835 as GIFMIS code and ACCERDITATION FEE FROM ENVIRONMENTAL CONSULTANT as purpose of payment `
      },
      open: false,
    },
  ];

  inject("allFaqs", allFaqs);
};
