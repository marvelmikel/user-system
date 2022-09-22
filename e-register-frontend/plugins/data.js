export default (context, inject) => {
  const allFaqs = [
    {
      question: "How do I sign up on Sproutly?",
      answer: ` 
    You can sign up on Sproutly through the Sproutly App which can be downloaded from the Google playstore for Android devices or App Store for iOS devices.
    `,
      open: false,
    },
    {
      question:
        "When I choose to login on the Sproutly App, I see two gateways, parents and teens?",
      answer: ` 
    You can sign up on Sproutly through the Sproutly App which can be downloaded from the Google playstore for Android devices or App Store for iOS devices.
    `,
      open: false,
    },
    {
      question: "What is a parent’s account and why is it important?",
      answer: ` 
    You can sign up on Sproutly through the Sproutly App which can be downloaded from the Google playstore for Android devices or App Store for iOS devices.
    `,
      open: false,
    },
  ];

  inject("allFaqs", allFaqs);
};
