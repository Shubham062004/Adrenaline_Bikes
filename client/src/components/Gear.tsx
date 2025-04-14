
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { motion } from 'framer-motion';

const Gear = () => {
  const primaryColor = "#9b87f5"; // Purple color
  
  const bikeChecklist = {
    documents: [
      "Registration Certificate (RC): Ensure it's valid and matches the bike's details",
      "Bike Insurance: Check for valid insurance coverage",
      "Road Tax Certificate: Verify tax is paid and up-to-date",
      "Service Records: For used bikes, check maintenance history",
      "Original Invoice: For new bikes, ensure you have the original invoice",
      "Extended Warranty: Check validity of any extended warranty"
    ],
    inspection: [
      "Bodywork & Paint: Look for damage, scratches, or dents",
      "Engine & Transmission: Check for unusual noises, vibrations, or leaks",
      "Electrical Components: Verify all lights and horn work correctly",
      "Tires: Check condition, tread depth, and pressure",
      "Brakes: Test for smooth and effective engagement",
      "Chassis Number: Verify it matches the documents",
      "Odometer: Check the reading for tampering (used bikes)",
      "Fluid Levels: Check fuel and engine oil are adequate",
      "Accessories: Inspect for damage or issues"
    ],
    testRide: [
      "Performance: Assess acceleration, handling, and braking",
      "Comfort: Ensure it fits your riding style and body size",
      "Smoothness: Check for unusual vibrations or noises",
      "Brakes: Test responsiveness and stopping power",
      "Controls: Verify all controls function correctly"
    ],
    considerations: [
      "Budget: Determine and stick to your budget",
      "Maintenance Costs: Research costs and service center availability",
      "Fuel Efficiency: Consider impact on daily usage",
      "Riding Needs: Choose based on your specific requirements",
      "Safety Features: Consider ABS and disc brakes",
      "Insurance: Ensure adequate coverage",
      "Bike Weight: Consider if you're a beginner"
    ]
  };

  return (
    <section id="gear" className="py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mt-4 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Before Buying Your Dream Bike</h2>
          <p className="text-center text-muted-foreground mb-10">
            Purchasing a motorcycle is a significant decision. Here's a comprehensive guide to help ensure you make the right choice.
          </p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ 
              staggerChildren: 0.1
            }}
          >
            <motion.div 
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: "#9b87f5" }}>Document Checklist</h3>
              <ul className="space-y-2 text-sm">
                {bikeChecklist.documents.map((item, index) => (
                  <li key={`doc-${index}`} className="flex items-start">
                    <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: "#9b87f5" }}></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: "#9b87f5" }}>Inspection Points</h3>
              <ul className="space-y-2 text-sm">
                {bikeChecklist.inspection.map((item, index) => (
                  <li key={`insp-${index}`} className="flex items-start">
                    <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: "#9b87f5" }}></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: "#9b87f5" }}>Test Ride Essentials</h3>
              <ul className="space-y-2 text-sm">
                {bikeChecklist.testRide.map((item, index) => (
                  <li key={`ride-${index}`} className="flex items-start">
                    <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: "#9b87f5" }}></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: "#9b87f5" }}>Other Considerations</h3>
              <ul className="space-y-2 text-sm">
                {bikeChecklist.considerations.map((item, index) => (
                  <li key={`cons-${index}`} className="flex items-start">
                    <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: "#9b87f5" }}></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <div className="mt-8 text-center">
            <HoverCard>
              <HoverCardTrigger asChild>
                <button 
                  className="inline-flex items-center px-6 py-3 rounded-md font-medium transition-colors text-white"
                  style={{ backgroundColor: "#9b87f5" }}
                >
                  Get Expert Advice
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="p-4">
                <p className="text-sm">
                  Our motorcycle experts are available to help guide you through the buying process. 
                  Schedule a consultation for personalized advice.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gear;
