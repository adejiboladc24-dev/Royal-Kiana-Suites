import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900/20"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 mx-auto mb-6 border-4 border-primary-500 border-t-transparent rounded-full"
        />
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-3xl font-display font-bold gradient-text"
        >
          Royal Kiana
        </motion.h2>
        <motion.p
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          className="text-white/60 mt-2"
        >
          Loading luxury experience...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
