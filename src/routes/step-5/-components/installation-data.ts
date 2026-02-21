export type InstallationStep = {
  number: number;
  title: string;
  description: string;
  detailedInstruction: string;
  diagramLabel: string;
  estimatedMinutes: number;
  focusArea: string;
};

export type Part = {
  id: string;
  name: string;
  partNumber: string;
  quantity: number;
  category: 'plumbing' | 'electrical' | 'mounting' | 'accessory';
};

export type QuickQuestion = {
  question: string;
  answer: string;
};

export const installationSteps: InstallationStep[] = [
  {
    number: 1,
    title: 'Prepare Cabinet Opening',
    description:
      'Verify cabinet dimensions match spec (24" W × 34" H). Remove any debris or old mounting hardware from the opening.',
    detailedInstruction:
      'Measure the cabinet opening width, height, and depth using a tape measure. The minimum clearance is 23.5" W × 33.9" H × 24.5" D. Remove all old screws, brackets, and adhesive residue from previous installations.',
    diagramLabel: 'Cabinet opening dimensions and clearance zones',
    estimatedMinutes: 8,
    focusArea: 'cabinet',
  },
  {
    number: 2,
    title: 'Position Water Supply Line',
    description:
      'Route the 3/8" braided stainless steel supply line from the hot water shutoff valve through the cabinet wall.',
    detailedInstruction:
      'Drill a 1" hole in the left side of the cabinet wall approximately 6" from the floor if one does not exist. Feed the braided supply line through and leave enough slack for the unit to slide in and out.',
    diagramLabel: 'Supply line routing through cabinet wall',
    estimatedMinutes: 10,
    focusArea: 'plumbing',
  },
  {
    number: 3,
    title: 'Connect Drain Hose',
    description:
      'Attach the drain hose to the disposal inlet or standpipe. Ensure the high-loop is secured under the countertop.',
    detailedInstruction:
      'The hose must be looped up as high as possible under the countertop and secured before connecting to the drain. This prevents backflow of wastewater into the dishwasher during operation.',
    diagramLabel: 'Drain hose high-loop configuration',
    estimatedMinutes: 12,
    focusArea: 'plumbing',
  },
  {
    number: 4,
    title: 'Run Electrical Connection',
    description:
      'Route power cable through the junction box. Connect black-to-black, white-to-white, green to ground.',
    detailedInstruction:
      'Open the junction box at the base of the dishwasher. Match wire colors exactly: black (hot) to black, white (neutral) to white, and green (ground) to the grounding screw. Secure all connections with wire nuts and wrap with electrical tape.',
    diagramLabel: 'Junction box wiring diagram',
    estimatedMinutes: 10,
    focusArea: 'electrical',
  },
  {
    number: 5,
    title: 'Slide Unit Into Position',
    description:
      'Carefully guide the dishwasher into the cabinet opening. Keep supply and drain lines clear of the base.',
    detailedInstruction:
      'Position the unit in front of the opening and carefully push it straight back. Have a second person guide the water supply and drain lines to prevent kinks or pinching as the unit slides in.',
    diagramLabel: 'Unit insertion path and line routing',
    estimatedMinutes: 5,
    focusArea: 'cabinet',
  },
  {
    number: 6,
    title: 'Level the Dishwasher',
    description:
      'Adjust front leveling legs until the unit is perfectly level side-to-side and front-to-back. Use shims if needed.',
    detailedInstruction:
      'Place a spirit level on the inside bottom of the tub. Adjust the front leveling legs by turning them clockwise to raise or counterclockwise to lower. Verify level in both directions before proceeding.',
    diagramLabel: 'Leveling leg adjustment points',
    estimatedMinutes: 8,
    focusArea: 'cabinet',
  },
  {
    number: 7,
    title: 'Secure Mounting Brackets',
    description:
      'Attach the anti-tip brackets to the underside of the countertop. Use the provided screws for wood or stone clips.',
    detailedInstruction:
      'Align the anti-tip brackets with the mounting tabs on top of the dishwasher. For wood countertops, drive screws directly into the underside. For stone or quartz, use the side-mount clips attached to the cabinet walls instead.',
    diagramLabel: 'Bracket placement for wood vs. stone countertops',
    estimatedMinutes: 7,
    focusArea: 'mounting',
  },
  {
    number: 8,
    title: 'Connect Water Supply',
    description:
      'Tighten the 3/8" compression fitting to the inlet valve. Apply Teflon tape to threads. Hand-tighten plus 1/4 turn.',
    detailedInstruction:
      'Wrap the inlet valve threads with 3-4 layers of Teflon tape in a clockwise direction. Thread the compression fitting by hand until snug, then use an adjustable wrench for an additional quarter turn. Do not over-tighten.',
    diagramLabel: 'Compression fitting assembly detail',
    estimatedMinutes: 8,
    focusArea: 'plumbing',
  },
  {
    number: 9,
    title: 'Test for Leaks',
    description:
      'Open water supply valve slowly. Inspect all connections for drips. Run a quick rinse cycle and check under the unit.',
    detailedInstruction:
      'Open the supply valve one full turn and inspect all fittings for 2 minutes. Wipe each connection with a dry paper towel to detect even small drips. Run a short rinse cycle and re-check all connections and the floor beneath the unit.',
    diagramLabel: 'Leak inspection points checklist',
    estimatedMinutes: 10,
    focusArea: 'plumbing',
  },
  {
    number: 10,
    title: 'Final Inspection & Cleanup',
    description:
      'Verify door alignment, check all connections one final time, install the kick plate, and clean the work area.',
    detailedInstruction:
      'Open and close the door to verify a uniform 1-2mm gap around the perimeter. Snap the decorative kick plate onto the two mounting clips at the bottom. Remove all packaging materials and wipe down the unit exterior.',
    diagramLabel: 'Door alignment and kick plate installation',
    estimatedMinutes: 9,
    focusArea: 'cabinet',
  },
];

export const parts: Part[] = [
  {
    id: 'supply-line',
    name: 'Water Supply Line',
    partNumber: 'BSH-WS38-60',
    quantity: 1,
    category: 'plumbing',
  },
  {
    id: 'drain-hose',
    name: 'Drain Hose',
    partNumber: 'BSH-DH-001',
    quantity: 1,
    category: 'plumbing',
  },
  {
    id: 'elbow-fitting',
    name: '90° Elbow Fitting',
    partNumber: 'BSH-EF-38',
    quantity: 1,
    category: 'plumbing',
  },
  {
    id: 'hose-clamp',
    name: 'Hose Clamp',
    partNumber: 'HC-SS-1.5',
    quantity: 2,
    category: 'plumbing',
  },
  {
    id: 'teflon-tape',
    name: 'Teflon Tape',
    partNumber: 'TF-12-STD',
    quantity: 1,
    category: 'plumbing',
  },
  {
    id: 'junction-box',
    name: 'Junction Box',
    partNumber: 'JB-4x4-STL',
    quantity: 1,
    category: 'electrical',
  },
  {
    id: 'wire-nuts',
    name: 'Wire Nuts (Assorted)',
    partNumber: 'WN-AST-10',
    quantity: 1,
    category: 'electrical',
  },
  {
    id: 'cable-clamp',
    name: 'Cable Clamp',
    partNumber: 'CC-NM-12',
    quantity: 1,
    category: 'electrical',
  },
  {
    id: 'mounting-bracket',
    name: 'Anti-Tip Bracket',
    partNumber: 'BSH-MTB-02',
    quantity: 2,
    category: 'mounting',
  },
  {
    id: 'mounting-screws',
    name: 'Mounting Screws',
    partNumber: 'BSH-SC-8x1',
    quantity: 4,
    category: 'mounting',
  },
  {
    id: 'leveling-legs',
    name: 'Leveling Legs',
    partNumber: 'BSH-LL-ADJ',
    quantity: 2,
    category: 'mounting',
  },
  {
    id: 'kick-plate',
    name: 'Decorative Kick Plate',
    partNumber: 'BSH-KP-SS',
    quantity: 1,
    category: 'accessory',
  },
];

export const quickQuestions: Record<number, QuickQuestion[]> = {
  1: [
    {
      question: 'What if my cabinet is slightly too narrow?',
      answer:
        'The minimum width is 23.5". If your cabinet is less than 24", you may need to shim the sides. Do not force the unit into an undersized opening.',
    },
    {
      question: 'Do I need to remove the old mounting screws?',
      answer:
        "Yes, remove all previous mounting hardware. Fill any large holes with wood filler if they don't align with the new bracket positions.",
    },
  ],
  2: [
    {
      question: 'Can I use the old supply line?',
      answer:
        "It's recommended to use a new braided stainless steel supply line. Old lines may have micro-cracks or weakened fittings that could cause leaks.",
    },
    {
      question: 'Where should the supply line enter?',
      answer:
        'Route it through the left side of the cabinet wall, approximately 6" from the floor. Drill a 1" hole if one doesn\'t exist.',
    },
  ],
  3: [
    {
      question: 'What is a high-loop drain?',
      answer:
        'A high-loop secures the drain hose as high as possible under the countertop before it drops down to the disposal. This prevents backflow of dirty water.',
    },
    {
      question: 'Can I connect to a standpipe instead?',
      answer:
        'Yes. If you don\'t have a garbage disposal, connect the drain hose to a standpipe with an air gap fitting. The standpipe should be 18-30" above the floor.',
    },
  ],
  4: [
    {
      question: 'Is a GFCI outlet required?',
      answer:
        'NEC 2020 requires GFCI protection for dishwasher circuits. Check your local code — some jurisdictions still allow non-GFCI dedicated circuits.',
    },
    {
      question: 'Can I hardwire instead of using an outlet?',
      answer:
        'Yes, the Bosch SHPM88Z75N supports both plug-in and hardwired connections. Use a properly rated junction box for hardwired installations.',
    },
  ],
  5: [
    {
      question: 'How heavy is the unit?',
      answer:
        'The SHPM88Z75N weighs approximately 57.3 lbs (26 kg). Two people are recommended for sliding it into position to avoid damaging the floor or connections.',
    },
  ],
  6: [
    {
      question: "How do I know it's level?",
      answer:
        'Place a spirit level on the bottom of the open door. Check both side-to-side and front-to-back. The bubble should be centered in both directions.',
    },
  ],
  7: [
    {
      question: 'What if I have a stone countertop?',
      answer:
        'Use the included stone clips instead of screws. These attach to the side walls of the cabinet rather than drilling into the countertop.',
    },
  ],
  8: [
    {
      question: 'How tight should the fitting be?',
      answer:
        'Hand-tighten the compression fitting, then use a wrench for an additional 1/4 turn. Over-tightening can damage the ferrule and cause leaks.',
    },
  ],
  9: [
    {
      question: 'I see a small drip — what do I do?',
      answer:
        'Turn off the water supply. Check if the fitting needs an additional 1/8 turn. If the drip persists, remove the fitting, re-apply Teflon tape, and reconnect.',
    },
  ],
  10: [
    {
      question: 'How do I install the kick plate?',
      answer:
        'The kick plate snaps onto the two mounting clips at the bottom of the dishwasher door. Align the clips and press firmly until it clicks into place.',
    },
    {
      question: 'What should the final door gap be?',
      answer:
        'The door should have a uniform 1-2mm gap around its perimeter when closed. Adjust leveling legs if the gap is uneven.',
    },
  ],
};

export const partCategories = ['all', 'plumbing', 'electrical', 'mounting', 'accessory'] as const;
