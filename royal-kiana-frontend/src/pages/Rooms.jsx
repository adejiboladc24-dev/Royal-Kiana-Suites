import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';

const Rooms = () => {
  const rooms = [
    {
      id: 1,
      name: 'Standard Room',
      price: 25000,
      description: 'Comfortable room with essential amenities for a pleasant stay',
      features: ['Queen Bed', 'WiFi', 'TV', 'AC'],
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'
    },
    {
      id: 2,
      name: 'Deluxe Room',
      price: 35000,
      description: 'Spacious room with premium amenities and city views',
      features: ['King Bed', 'City View', 'WiFi', 'Mini Bar', 'Work Desk'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'
    },
    {
      id: 3,
      name: 'Executive Suite',
      price: 50000,
      description: 'Luxurious suite with separate living area and workspace',
      features: ['King Bed', 'Living Room', 'WiFi', 'Mini Bar', 'Coffee Maker'],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'
    },
    {
      id: 4,
      name: 'Family Suite',
      price: 60000,
      description: 'Perfect for families with multiple beds and extra space',
      features: ['2 Beds', 'Living Area', 'WiFi', 'Kitchenette', 'Balcony'],
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80'
    },
    {
      id: 5,
      name: 'Presidential Suite',
      price: 120000,
      description: 'Ultimate luxury with private terrace and butler service',
      features: ['Master Bedroom', 'Terrace', 'Butler', 'Jacuzzi', 'Dining Area'],
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'
    },
    {
      id: 6,
      name: 'Honeymoon Suite',
      price: 80000,
      description: 'Romantic suite with special amenities for couples',
      features: ['King Bed', 'Jacuzzi', 'Champagne', 'Rose Petals', 'City View'],
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80'
    },
    {
      id: 7,
      name: 'Superior Room',
      price: 28000,
      description: 'Enhanced comfort with modern design and amenities',
      features: ['Queen Bed', 'WiFi', 'Smart TV', 'AC', 'Mini Fridge'],
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80'
    },
    {
      id: 8,
      name: 'Business Suite',
      price: 45000,
      description: 'Ideal for business travelers with workspace and meeting area',
      features: ['King Bed', 'Work Desk', 'WiFi', 'Printer', 'Coffee Maker'],
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80'
    },
    {
      id: 9,
      name: 'Garden View Room',
      price: 32000,
      description: 'Peaceful room overlooking our beautiful gardens',
      features: ['Queen Bed', 'Garden View', 'WiFi', 'AC', 'Balcony'],
      image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80'
    },
    {
      id: 10,
      name: 'Twin Room',
      price: 30000,
      description: 'Perfect for friends or colleagues traveling together',
      features: ['2 Twin Beds', 'WiFi', 'TV', 'AC', 'Work Desk'],
      image: 'https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800&q=80'
    },
    {
      id: 11,
      name: 'Junior Suite',
      price: 42000,
      description: 'Spacious suite with sitting area and premium amenities',
      features: ['King Bed', 'Sitting Area', 'WiFi', 'Mini Bar', 'City View'],
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80'
    },
    {
      id: 12,
      name: 'Penthouse Suite',
      price: 150000,
      description: 'Top floor luxury with panoramic views and exclusive services',
      features: ['Master Bedroom', 'Panoramic View', 'Butler', 'Private Bar', 'Terrace'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80'
    },
    {
      id: 13,
      name: 'Studio Room',
      price: 27000,
      description: 'Compact yet comfortable with all essential amenities',
      features: ['Double Bed', 'WiFi', 'TV', 'AC', 'Kitchenette'],
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80'
    },
    {
      id: 14,
      name: 'Premium Deluxe',
      price: 40000,
      description: 'Enhanced deluxe experience with luxury furnishings',
      features: ['King Bed', 'City View', 'WiFi', 'Mini Bar', 'Bathtub'],
      image: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80'
    },
    {
      id: 15,
      name: 'Royal Suite',
      price: 95000,
      description: 'Regal accommodation with elegant decor and premium services',
      features: ['King Bed', 'Living Room', 'Dining Area', 'Butler', 'Jacuzzi'],
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&q=80'
    },
    {
      id: 16,
      name: 'Accessible Room',
      price: 26000,
      description: 'Specially designed for guests with mobility needs',
      features: ['Queen Bed', 'Wheelchair Access', 'WiFi', 'AC', 'Safety Rails'],
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    },
    {
      id: 17,
      name: 'Corner Suite',
      price: 55000,
      description: 'Spacious corner suite with windows on two sides',
      features: ['King Bed', 'Corner View', 'WiFi', 'Mini Bar', 'Sitting Area'],
      image: 'https://images.unsplash.com/photo-1594560913095-8cf34bda3a1f?w=800&q=80'
    },
    {
      id: 18,
      name: 'Luxury Twin',
      price: 38000,
      description: 'Premium twin room with upscale amenities',
      features: ['2 Twin Beds', 'WiFi', 'Smart TV', 'Mini Bar', 'Work Desk'],
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80'
    },
    {
      id: 19,
      name: 'Skyline Suite',
      price: 75000,
      description: 'Stunning city skyline views with modern luxury',
      features: ['King Bed', 'Skyline View', 'WiFi', 'Mini Bar', 'Balcony'],
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80'
    },
    {
      id: 20,
      name: 'Triple Room',
      price: 48000,
      description: 'Spacious room accommodating three guests comfortably',
      features: ['3 Beds', 'WiFi', 'TV', 'AC', 'Mini Fridge'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
    },
    {
      id: 21,
      name: 'Ambassador Suite',
      price: 110000,
      description: 'Diplomatic-level luxury with exclusive amenities',
      features: ['Master Bedroom', 'Meeting Room', 'Butler', 'Private Bar', 'Terrace'],
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80'
    },
    {
      id: 22,
      name: 'Poolside Room',
      price: 36000,
      description: 'Direct access to pool area with private patio',
      features: ['King Bed', 'Pool Access', 'WiFi', 'AC', 'Patio'],
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80'
    },
    {
      id: 23,
      name: 'Panoramic Suite',
      price: 85000,
      description: 'Floor-to-ceiling windows with breathtaking views',
      features: ['King Bed', 'Panoramic View', 'WiFi', 'Mini Bar', 'Sitting Area'],
      image: 'https://images.unsplash.com/photo-1559599238-1c99d5f6f4d7?w=800&q=80'
    },
    {
      id: 24,
      name: 'Quad Room',
      price: 58000,
      description: 'Perfect for groups with four separate beds',
      features: ['4 Beds', 'WiFi', 'TV', 'AC', 'Sitting Area'],
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80'
    },
    {
      id: 25,
      name: 'VIP Suite',
      price: 130000,
      description: 'Exclusive VIP treatment with personalized services',
      features: ['Master Bedroom', 'Private Lounge', 'Butler', 'Jacuzzi', 'Champagne'],
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80'
    },
    {
      id: 26,
      name: 'Connecting Rooms',
      price: 52000,
      description: 'Two rooms with connecting door for families',
      features: ['2 Queen Beds', 'Connecting Door', 'WiFi', 'TV', 'AC'],
      image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800&q=80'
    }
  ];

  return (
    <div className="pt-20 bg-gray-50 dark:bg-dark-900">
      {/* Hero Section with Room Image */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=80)'
          }}
        ></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
              Rooms & Suites
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Discover our collection of elegantly designed rooms and suites
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500/10 to-primary-700/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Ready to Book Your Stay?
            </h2>
            <p className="text-gray-600 dark:text-white/60 mb-8 max-w-2xl mx-auto">
              Experience luxury and comfort at Royal Kiana Hotel. Book now and enjoy exclusive rates.
            </p>
            <Link to="/booking" className="btn-primary inline-block">
              Book Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
