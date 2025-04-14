
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'test-ride'
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          interest: 'test-ride'
        });
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="section py-24 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-kawasaki-gray"></div>

      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle mx-auto">
          Have questions about the Kawasaki Ninja? Schedule a test ride or reach out to our team for more information.
        </p>
      </div>

      {/* Contact Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Form Side */}
        <div className="glass-card p-8 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-bg-purple-800 focus:border-transparent"
                  placeholder="John Doe"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-bg-purple-600 focus:border-transparent"
                  placeholder="john@example.com"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-bg-purple-600 focus:border-transparent"
                  placeholder="(123) 456-7890"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="interest" className="block text-sm font-medium">
                  I'm Interested In
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-bg-purple-600 focus:border-transparent"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                >
                  <option value="test-ride">Test Ride</option>
                  <option value="purchase">Purchase Information</option>
                  <option value="service">Service Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-bg-purple-600 focus:border-transparent resize-none"
                placeholder="Tell us more about your inquiry..."
                disabled={formStatus === 'submitting' || formStatus === 'success'}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formStatus === 'submitting' || formStatus === 'success'}
              className={cn(
                "w-full py-3 rounded-full font-medium transition-all duration-300",
                formStatus === 'success'
                  ? "bg-purple-600 text-white"
                  : "bg-purple-600 text-white hover:bg-purple-600",
                formStatus === 'submitting' && "opacity-70 cursor-not-allowed"
              )}
            >
              {formStatus === 'idle' && "Submit Inquiry"}
              {formStatus === 'submitting' && "Sending..."}
              {formStatus === 'success' && "Message Sent!"}
              {formStatus === 'error' && "Try Again"}
            </button>
          </form>
        </div>

        {/* Info Side */}
        <div className="space-y-10">
          {/* Dealership Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Visit Our Dealership</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-6 flex flex-col">
                <h4 className="font-medium mb-2 text-lg">Opening Hours</h4>
                <div className="space-y-1 text-muted-foreground flex-grow">
                  <p>Monday - Friday: 9AM - 6PM</p>
                  <p>Saturday: 10AM - 4PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="glass-panel p-6 flex flex-col">
                <h4 className="font-medium mb-2 text-lg">Contact Info</h4>
                <div className="space-y-1 text-muted-foreground flex-grow">
                  <p>Email: info@kawasakidealer.com</p>
                  <p>Phone: (123) 456-7890</p>
                  <p>Fax: (123) 456-7891</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h4 className="font-medium mb-2 text-lg">Address</h4>
              <p className="text-muted-foreground">123 Motorcycle Boulevard<br />Speedway, CA 90210<br />United States</p>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-bg-purple-600 mt-4 hover:underline"
              >
                <span>View on map</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-purple-600 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">Ready for an Adrenaline Rush?</h3>
            <p className="mb-6">Experience the thrill of the Kawasaki Ninja with a test ride. Our team is ready to get you on the road.</p>
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm opacity-80">Call us directly</p>
                <p className="text-xl font-semibold">(123) 456-7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
