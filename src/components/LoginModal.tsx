// import { useState } from "react";
// import { X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// const LoginModal = ({ open, onClose }: Props) => {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/40 z-50"
//             onClick={onClose}
//           />
//           <motion.div
//   initial={{ opacity: 0, y: 50 }}
//   animate={{ opacity: 1, y: 0 }}
//   exit={{ opacity: 0, y: 50 }}
//   transition={{ duration: 0.3 }}
//   className="
//   fixed z-50 w-full max-w-md glass rounded-t-3xl md:rounded-3xl
//   bottom-0 left-0 right-0
//   md:top-1/2 md:right-10 md:left-auto md:-translate-y-1/2
//   p-5 md:p-8
//   max-h-[90vh] overflow-y-auto
// "
// >
//             <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-muted/60 rounded-full transition-colors">
//               <X className="h-5 w-5" />
//             </button>

//             <h2 className="text-2xl font-semibold mb-1">{isLogin ? "Welcome Back" : "Create Account"}</h2>
//             <p className="text-sm text-muted-foreground mb-4 md:mb-6">{isLogin ? "Sign in to your account" : "Join House of Nera"}</p>

//             <form className="flex flex-col gap-3 md:gap-4" onSubmit={(e) => e.preventDefault()}>
//               {!isLogin && (
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   className="rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
//                 />
//               )}
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
//               />
//               <button
//                 type="submit"
//                 className="rounded-full bg-foreground text-background py-3 mt-2 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
//               >
//                 {isLogin ? "Sign In" : "Sign Up"}
//               </button>
//             </form>

//             <p className="text-center text-sm text-muted-foreground mt-6">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//               <button onClick={() => setIsLogin(!isLogin)} className="text-foreground font-medium underline underline-offset-4 hover:opacity-80">
//                 {isLogin ? "Sign Up" : "Sign In"}
//               </button>
//             </p>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default LoginModal;
import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({ open, onClose }: Props) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 🔥 Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* 🔥 RIGHT SIDE DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="
              fixed top-0 right-0 h-full w-full 
              sm:w-[400px] md:w-[450px]
              bg-background z-50 shadow-2xl
              p-6 md:p-8
              overflow-y-auto
            "
          >
            {/* 🔥 Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isLogin
                    ? "Sign in to your account"
                    : "Join House of Nera"}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 hover:bg-muted/60 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 🔥 Form */}
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-xl bg-muted/60 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              )}

              <input
                type="email"
                placeholder="Email"
                className="rounded-xl bg-muted/60 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />

              <input
                type="password"
                placeholder="Password"
                className="rounded-xl bg-muted/60 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />

              <button
                type="submit"
                className="rounded-full bg-foreground text-background py-3 mt-2 text-sm font-medium hover:opacity-90 active:scale-[0.97]"
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>

            {/* 🔥 Toggle */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-foreground font-medium underline underline-offset-4"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
