import { motion, AnimatePresence } from "motion/react";
import { SupabaseGallery } from "./components/SupabaseGallery";
import { SupabaseLoginPage } from "./components/SupabaseLoginPage";
import { useSupabase } from "./hooks/useSupabase";

export default function App() {
  const { user, loading } = useSupabase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
        <span className="ml-3 text-muted-foreground">Memuat aplikasi...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {user ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6 lg:p-8"
          >
            <div className="max-w-7xl mx-auto">
              <SupabaseGallery />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <SupabaseLoginPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}