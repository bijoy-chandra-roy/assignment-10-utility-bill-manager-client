import React, { useEffect } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaPaperPlane, FaCommentDots } from "react-icons/fa";
import Swal from "sweetalert2";

const ContactPage = () => {
  useEffect(() => {
    document.title = "UtilityHub - Contact Us";
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    if (!name || !email || !message) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill in all fields!',
            confirmButtonColor: '#2563eb'
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'We will get back to you soon.',
        showConfirmButton: false,
        timer: 1500
    });

    form.reset();
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="card bg-primary text-primary-content shadow-xl h-full">
          <div className="card-body justify-center p-10">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="mb-8 opacity-90 text-lg">
              Have questions about your bills or payments? Our support team is here to help you 24/7.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-sm opacity-80">PHONE</p>
                  <p className="text-lg font-semibold">+880 1111 222 333</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-sm opacity-80">EMAIL</p>
                  <p className="text-lg font-semibold">support@utilityhub.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-sm opacity-80">LOCATION</p>
                  <p className="text-lg font-semibold">Gulshan 2, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 dark:bg-base-300 shadow-2xl border border-base-200 dark:border-base-content/5">
          <form onSubmit={handleSendMessage} className="card-body p-8 md:p-10 gap-4">
            
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-primary mb-1">Send us a Message</h2>
              <p className="text-base-content/70">We'll get back to you within 24 hours.</p>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <FaUser className="text-base-content/40" />
                </div>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="John Doe" 
                  className="input input-bordered w-full pl-10 focus:input-primary transition-all bg-base-100 dark:bg-base-200" 
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <FaEnvelope className="text-base-content/40" />
                </div>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="john@example.com" 
                  className="input input-bordered w-full pl-10 focus:input-primary transition-all bg-base-100 dark:bg-base-200" 
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Message</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none z-10">
                  <FaCommentDots className="text-base-content/40 mt-1" />
                </div>
                <textarea 
                  name="message" 
                  className="textarea textarea-bordered h-32 w-full pl-10 focus:textarea-primary transition-all text-base bg-base-100 dark:bg-base-200" 
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
            </div>

            <div className="form-control mt-4">
              <button className="btn btn-primary text-white text-lg shadow-lg hover:shadow-primary/40 transition-all gap-2">
                Send Message <FaPaperPlane className="text-sm" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;