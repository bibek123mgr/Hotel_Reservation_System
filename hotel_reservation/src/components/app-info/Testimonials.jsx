import { useState } from 'react';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      content:
        "After implementing Reserve Hub, we've seen a 42% increase in direct bookings and reduced our operational costs by 28%. The AI-powered pricing recommendations alone increased our RevPAR by 35% in the first quarter.",
      author: 'Alexandra Reynolds',
      position: 'Operations Director',
      company: 'Grand Meridian Hotel & Spa',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
    },
    {
      id: 2,
      content:
        "Managing our 12 properties used to be a logistical nightmare. With Reserve Hub's multi-property dashboard, we now have real-time visibility across all locations. The enterprise analytics helped us identify underperforming properties and optimize staff allocation.",
      author: 'Michael Chen',
      position: 'CEO',
      company: 'Urban Collection Hotels',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
    },
    {
      id: 3,
      content:
        'The mobile check-in feature and guest experience tools have transformed how we serve our clientele. We\'ve received exceptional feedback on our personalization efforts, and our customer satisfaction scores have increased from 4.2 to 4.8 within six months.',
      author: 'Gabriela Morales',
      position: 'Guest Relations Manager',
      company: 'Oceanview Resort',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="testimonials">
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-indigo-200/10 to-violet-200/10 rounded-full top-[-400px] right-[-400px] z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 text-transparent bg-clip-text mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-slate-500 text-lg">
            See how Reserve Hub is transforming operations for hotels and properties worldwide.
          </p>
        </div>

        {/* Testimonials Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-10">
            <div className="flex flex-col gap-4">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => setActiveTestimonial(index)}
                  className={`flex items-center gap-4 p-3 rounded-lg transition ${activeTestimonial === index ? 'bg-slate-100' : 'hover:bg-slate-50'
                    }`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                    {activeTestimonial === index && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-semibold text-slate-800">{testimonial.author}</h4>
                    <p className="text-sm text-slate-500">{testimonial.company}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Logos */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h5 className="text-sm font-medium text-slate-500 mb-4">Trusted by:</h5>
              <div className="grid grid-cols-2 gap-4 text-slate-700 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-600">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5..."></path>
                    </svg>
                  </span>
                  Luxury Resort
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-600">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9l9-7 9 7v11..."></path>
                    </svg>
                  </span>
                  Urban Hotels
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-600">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    </svg>
                  </span>
                  Grand Meridian
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-600">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5..."></path>
                    </svg>
                  </span>
                  Ocean Resorts
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Main */}
          <div className="lg:w-2/3 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl relative">
              <div className="absolute top-6 right-6 text-indigo-600 opacity-10 scale-150">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="..." stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <p className="text-lg text-slate-800 font-medium mb-6">
                "{testimonials[activeTestimonial].content}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[activeTestimonial].image}
                    className="w-14 h-14 rounded-full object-cover"
                    alt={testimonials[activeTestimonial].author}
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">{testimonials[activeTestimonial].author}</h4>
                    <p className="text-sm text-slate-500">
                      {testimonials[activeTestimonial].position}, {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27..."></polygon>
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 text-transparent bg-clip-text">
                  3,500+
                </div>
                <div className="text-sm text-slate-300">Active Hotels</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 text-transparent bg-clip-text">
                  98.7%
                </div>
                <div className="text-sm text-slate-300">Client Retention</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 text-transparent bg-clip-text">
                  $2.8B+
                </div>
                <div className="text-sm text-slate-300">Bookings Processed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
