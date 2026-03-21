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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md glass rounded-3xl p-8"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-muted/60 rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-semibold mb-1">{isLogin ? "Welcome Back" : "Create Account"}</h2>
            <p className="text-sm text-muted-foreground mb-6">{isLogin ? "Sign in to your account" : "Join House of Nera"}</p>

            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                className="rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="password"
                placeholder="Password"
                className="rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="rounded-full bg-foreground text-background py-3 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-foreground font-medium underline underline-offset-4 hover:opacity-80">
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
