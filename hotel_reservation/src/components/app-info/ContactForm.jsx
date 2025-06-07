import { Facebook } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Twitter } from 'lucide-react';
import { useState } from 'react';
// import { apiRequest } from '@/lib/queryClient';
// import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  // const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    property: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    // // Clear error when user types
    // if (errors[id as errors]) {
    //     setErrors(prev => ({ ...prev, [id]: '' }));
    // }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // try {
    //   await apiRequest('POST', '/api/contact', formData);

    //   setFormData({
    //     name: '',
    //     email: '',
    //     property: '',
    //     message: ''
    //   });

    //   toast({
    //     title: "Message Sent!",
    //     description: "We'll get back to you as soon as possible.",
    //   });

    //   setFormSubmitted(true);
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    //   toast({
    //     title: "Something went wrong",
    //     description: "Please try again later.",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <section className="py-32 bg-gradient-to-b from-slate-100 to-slate-200 relative overflow-hidden" id="contact">
      <div className="max-w-screen-xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full font-semibold text-sm mb-6">Contact Us</span>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent leading-tight">
              Let's Discuss Your Hotel's Needs
            </h2>
            <p className="text-slate-500 text-lg mb-12 max-w-xl">
              Our experts are ready to help you transform your hotel operations with Reserve Hub's powerful platform.
            </p>

            {/* Contact Info (Phone, Email, Location) */}
            <div className="mb-12 space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  {/* Phone icon */}
                  <Phone />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-1">Call Us</h4>
                  <p className="text-slate-500">+1 (800) 123-4567</p>
                </div>
              </div>

              {/* ...repeat for email and location... */}
            </div>

            {/* Social Icons */}
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Follow Us</h4>
              <div className='flex gap-2'>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition transform hover:-translate-y-1 text-blue-500">
                    {/* Facebook icon */}
                    <Twitter />
                  </a>
                  {/* Repeat for Twitter, LinkedIn, Instagram */}
                </div>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition transform hover:-translate-y-1 text-blue-500">
                    {/* Facebook icon */}
                    <Facebook />
                  </a>
                  {/* Repeat for Twitter, LinkedIn, Instagram */}
                </div><div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition transform hover:-translate-y-1 text-blue-500">
                    {/* Facebook icon */}
                    <Instagram />
                  </a>
                  {/* Repeat for Twitter, LinkedIn, Instagram */}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-8">Send Us a Message</h3>

              {/* Form begins */}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-slate-700 font-medium">Full Name</label>
                    <div className="relative">
                      {/* Icon */}
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full pl-10 py-3 rounded-md border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-300'
                          } focus:ring-2 focus:ring-indigo-200 focus:outline-none`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Email input similar */}
                </div>

                {/* Property Type Select */}
                <div className="mb-6">
                  <label htmlFor="property" className="block mb-2 text-slate-700 font-medium">Property Type</label>
                  <select
                    id="property"
                    value={formData.property}
                    onChange={handleChange}
                    className="w-full pl-3 pr-10 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  >
                    <option value="">Select property type</option>
                    <option value="boutique">Boutique Hotel (1-25 rooms)</option>
                    <option value="midsize">Midsize Hotel (26-100 rooms)</option>
                    <option value="large">Large Hotel (101-300 rooms)</option>
                    <option value="resort">Resort Property</option>
                    <option value="chain">Hotel Chain</option>
                    <option value="vacation">Vacation Rentals</option>
                  </select>
                </div>

                {/* Message textarea */}
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 text-slate-700 font-medium">Your Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full pl-4 pr-4 py-3 rounded-md border ${errors.message ? 'border-red-500 bg-red-50' : 'border-slate-300'
                      } focus:ring-2 focus:ring-indigo-200 focus:outline-none resize-vertical`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-500 text-white rounded-md font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="opacity-25"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default ContactForm;
