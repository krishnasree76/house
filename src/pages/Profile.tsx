// import { ArrowLeft, User, Mail, Phone, MapPin } from "lucide-react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const Profile = () => (
//   <div className="min-h-screen flex items-center justify-center px-4">
//     <div className="container mx-auto px-4 min-h-[80vh] flex items-center justify-center">
//       <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
//         <ArrowLeft className="h-4 w-4" /> Back to Shop
//       </Link>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//         className="glass rounded-3xl p-8"
//       >
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
//             <User className="h-8 w-8 text-muted-foreground" />
//           </div>
//           <h1 className="text-xl font-semibold">Your Profile</h1>
//           <p className="text-sm text-muted-foreground">Manage your account</p>
//         </div>

//         <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
//           <div>
//             <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Full Name</label>
//             <input type="text" placeholder="Enter your name" className="w-full rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Email</label>
//             <input type="email" placeholder="your@email.com" className="w-full rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Phone</label>
//             <input type="tel" placeholder="Your phone number" className="w-full rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Address</label>
//             <textarea placeholder="Your address" rows={3} className="w-full rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
//           </div>
//           <button type="submit" className="mt-2 rounded-full bg-foreground text-background py-3 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]">
//             Save Changes
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   </div>
// );
import { ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Profile = () => {
  return (
    <div className="min-h-screen pastel-gradient-animated">
      
      {/* ✅ Navbar (same as other pages) */}
      {/* <Navbar /> */}

      <div className="container mx-auto px-4 py-8">
        
        {/* 🔙 Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        {/* 🔥 Profile Card (NORMAL PAGE, NOT CENTERED POPUP) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 md:p-8 max-w-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Your Profile</h1>
              <p className="text-sm text-muted-foreground">
                Manage your account
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-xl bg-muted/60 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-xl bg-muted/60 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">
                Phone
              </label>
              <input
                type="tel"
                placeholder="Your phone number"
                className="w-full rounded-xl bg-muted/60 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">
                Address
              </label>
              <textarea
                rows={3}
                placeholder="Your address"
                className="w-full rounded-xl bg-muted/60 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-full bg-foreground text-background py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Save Changes
            </button>
          </form>
        </motion.div>
      </div>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default Profile;