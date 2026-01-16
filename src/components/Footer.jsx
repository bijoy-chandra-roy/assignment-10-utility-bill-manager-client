import { Link } from "react-router";
import logo from "/images/download.svg"
import { FaPinterest } from "react-icons/fa";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-base-300">
      <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-4 p-8 md:p-10">
        <aside className="flex flex-col items-start gap-4 flex-1">
          <img src={logo} alt="UtilityHub" className="w-16 h-16" />
          <p className="text-lg md:text-base font-medium">
            <span className="text-xl font-bold">UtilityHub</span>
            <br />
            Utility bill management made simple
          </p>
        </aside>

        <nav className="flex-1">
          <h6 className="font-bold text-lg mb-3">Explore</h6>
          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:text-blue-600 hover:underline transition">
              Home
            </Link>
            <Link to="/bills" className="hover:text-blue-600 hover:underline transition">
              Bills
            </Link>
            <Link to="/my-pay-bills" className="hover:text-blue-600 hover:underline transition">
              My Pay Bills
            </Link>
          </div>
        </nav>

        <nav className="flex-1">
          <h6 className="font-bold text-lg mb-3">Company</h6>
          <div className="flex flex-col gap-2">
            <Link to="/about" className="hover:text-blue-600 hover:underline transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-blue-600 hover:underline transition">
              Contact
            </Link>
            <Link to="/careers" className="hover:text-blue-600 hover:underline transition">
              Careers
            </Link>
          </div>
        </nav>

        <nav className="flex-1">
          <h6 className="font-bold text-lg mb-3">Legal</h6>
          <div className="flex flex-col gap-2">
            <Link to="/terms" className="hover:text-blue-600 hover:underline transition">
              Terms of use
            </Link>
            <Link to="/privacy" className="hover:text-blue-600 hover:underline transition">
              Privacy policy
            </Link>
          </div>
        </nav>

        <nav className="flex-1">
          <h6 className="font-bold text-lg mb-3">Social</h6>
          <div className="flex gap-4">
            <a
              href="https://x.com/Bijoy00001"
              className="hover:text-blue-600 transition"
              target="_blank"
              rel="noreferrer"
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://www.youtube.com/@bijoychandraroy"
              className="hover:text-blue-600 transition"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/bijoychandraroy001/"
              className="hover:text-blue-600 transition"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/bijoy_chandra_roy/"
              target="_blank"
              className="hover:text-blue-600 transition"
            >
              <FaSquareInstagram size={24} />
            </a>
            <a
              href="https://www.pinterest.com/bijoychandraroyjr001"
              target="_blank"
              className="hover:text-blue-600 transition"
            >
              <FaPinterest size={24} />
            </a>
          </div>
        </nav>
      </div>
      <div className="text-center py-8">
        <hr className="border-gray-400" />
        <p className="pt-4">Copyright © 2025 UtilityHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;