import React, { useEffect } from "react";
import { FaBriefcase, FaUsers, FaRocket, FaUser, FaEnvelope, FaLink, FaPaperPlane, FaCommentDots } from "react-icons/fa";
import Swal from "sweetalert2";

const CareersPage = () => {
  useEffect(() => {
    document.title = "UtilityHub - Careers";
  }, []);

  const handleApply = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const portfolio = form.portfolio.value;
    const message = form.message.value;

    if (!name || !email || !portfolio) {
        Swal.fire({
            icon: 'error',
            title: 'Incomplete Application',
            text: 'Please fill in your name, email, and portfolio link.',
            confirmButtonColor: '#2563eb'
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Application Received!',
        text: 'Our HR team will review your profile and get back to you.',
        showConfirmButton: false,
        timer: 2000
    });

    form.reset();
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Culture & Benefits */}
        <div className="card bg-primary text-primary-content shadow-xl h-full">
          <div className="card-body justify-center p-10">
            <h2 className="text-3xl font-bold mb-6">Build the Future</h2>
            <p className="mb-8 opacity-90 text-lg">
              Join UtilityHub and help us simplify utility management for millions. We are looking for passionate problem solvers.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <FaRocket className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-lg">Innovation First</p>
                  <p className="text-sm opacity-80">Work with the latest tech stack (MERN) and solve real-world problems.</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <FaUsers className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-lg">Inclusive Culture</p>
                  <p className="text-sm opacity-80">We believe in diversity, remote-friendly work, and open communication.</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <FaBriefcase className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-lg">Career Growth</p>
                  <p className="text-sm opacity-80">Mentorship programs and regular reviews to help you level up your skills.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Application Form */}
        <div className="card bg-base-100 dark:bg-base-300 shadow-2xl border border-base-200 dark:border-base-content/5">
          <form onSubmit={handleApply} className="card-body p-8 md:p-10 gap-4">
            
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-primary mb-1">Apply Now</h2>
              <p className="text-base-content/70">Drop your details below. We are always hiring!</p>
            </div>

            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <FaUser className="text-base-content/40" />
                </div>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  className="input input-bordered w-full pl-10 focus:input-primary transition-all bg-base-100 dark:bg-base-200" 
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <FaEnvelope className="text-base-content/40" />
                </div>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="you@example.com" 
                  className="input input-bordered w-full pl-10 focus:input-primary transition-all bg-base-100 dark:bg-base-200" 
                  required
                />
              </div>
            </div>

            {/* LinkedIn/Portfolio Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">LinkedIn / Portfolio</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <FaLink className="text-base-content/40" />
                </div>
                <input 
                  type="url" 
                  name="portfolio" 
                  placeholder="https://linkedin.com/in/..." 
                  className="input input-bordered w-full pl-10 focus:input-primary transition-all bg-base-100 dark:bg-base-200" 
                  required
                />
              </div>
            </div>

            {/* Cover Letter Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Cover Letter (Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none z-10">
                  <FaCommentDots className="text-base-content/40 mt-1" />
                </div>
                <textarea 
                  name="message" 
                  className="textarea textarea-bordered h-24 w-full pl-10 focus:textarea-primary transition-all text-base bg-base-100 dark:bg-base-200" 
                  placeholder="Tell us why you're a good fit..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button className="btn btn-primary text-white text-lg shadow-lg hover:shadow-primary/40 transition-all gap-2">
                Submit Application <FaPaperPlane className="text-sm" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default CareersPage;