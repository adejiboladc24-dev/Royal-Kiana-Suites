import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RoomCard = ({ room, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group card-premium overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden rounded-xl mb-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <img 
            src={room.image} 
            alt={room.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ₦{room.price.toLocaleString()}/night
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">{room.name}</h3>
        <p className="text-gray-600 dark:text-white/60 text-sm">{room.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {room.features.map((feature, idx) => (
            <span
              key={idx}
              className="text-xs bg-white/5 dark:bg-white/5 px-3 py-1 rounded-full text-gray-700 dark:text-white/70 border border-gray-200 dark:border-white/10"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/booking"
          className="block w-full text-center btn-primary mt-4"
        >
          Book Now
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;
