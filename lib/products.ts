export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string;
  image: string;
  category: 'headphones' | 'speakers' | 'earphones';
  isNew?: boolean;
  includes?: {
    item: string;
    quantity: number;
  }[];
  gallery?: string[];
}

export const products: Product[] = [
  {
    id: 'xx99-mark-two',
    name: 'XX99 Mark II Headphones',
    price: 2999,
    description: 'Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.',
    features: 'Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy everything they do. This pair of closed-back headphones are made with high-quality materials.',
    image: '/images/xx99-mark-two.jpg',
    category: 'headphones',
    isNew: true,
    includes: [
      { item: 'Headphone unit', quantity: 1 },
      { item: 'Replacement earcups', quantity: 2 },
      { item: 'User manual', quantity: 1 },
      { item: '3.5mm 5m audio cable', quantity: 1 },
      { item: 'Travel bag', quantity: 1 }
    ]
  },
  {
    id: 'xx99-mark-one',
    name: 'XX99 Mark I Headphones',
    price: 1750,
    description: 'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction.',
    features: 'As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise.',
    image: '/images/xx99-mark-one.jpg',
    category: 'headphones',
    includes: [
      { item: 'Headphone unit', quantity: 1 },
      { item: 'Replacement earcups', quantity: 2 },
      { item: 'User manual', quantity: 1 },
      { item: '3.5mm 5m audio cable', quantity: 1 }
    ]
  },
  {
    id: 'xx59',
    name: 'XX59 Headphones',
    price: 899,
    description: 'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones.',
    features: 'These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel.',
    image: '/images/xx59.jpg',
    category: 'headphones',
    includes: [
      { item: 'Headphone unit', quantity: 1 },
      { item: 'Replacement earcups', quantity: 2 },
      { item: 'User manual', quantity: 1 },
      { item: '3.5mm 5m audio cable', quantity: 1 }
    ]
  },
  {
    id: 'zx9',
    name: 'ZX9 Speaker',
    price: 4500,
    description: 'Upgrade your sound system with the all new ZX9 active speaker. It\'s a bookshelf speaker system that offers truly wireless connectivity.',
    features: 'Connect via Bluetooth or nearly any wired source. These speakers have built-in amplifiers and a full range of drivers.',
    image: '/images/zx9-speaker.jpg',
    category: 'speakers',
    isNew: true,
    includes: [
      { item: 'Speaker unit', quantity: 2 },
      { item: 'Speaker cloth panel', quantity: 2 },
      { item: 'User manual', quantity: 1 },
      { item: '3.5mm 10m audio cable', quantity: 1 },
      { item: '10m optical cable', quantity: 1 }
    ]
  },
  {
    id: 'zx7',
    name: 'ZX7 Speaker',
    price: 3500,
    description: 'Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end materials.',
    features: 'The ZX7 speaker is the perfect blend of stylish design and high performance. It houses an encased MDF wooden enclosure which minimises acoustic resonance.',
    image: '/images/zx7-speaker.jpg',
    category: 'speakers',
    includes: [
      { item: 'Speaker unit', quantity: 2 },
      { item: 'Speaker cloth panel', quantity: 2 },
      { item: 'User manual', quantity: 1 },
      { item: '3.5mm 7.5m audio cable', quantity: 1 }
    ]
  },
  {
    id: 'yx1',
    name: 'YX1 Wireless Earphones',
    price: 599,
    description: 'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones.',
    features: 'Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit.',
    image: '/images/yx1-earphones.jpg',
    category: 'earphones',
    isNew: true,
    includes: [
      { item: 'Earphone unit', quantity: 2 },
      { item: 'Multi-size earplugs', quantity: 6 },
      { item: 'User manual', quantity: 1 },
      { item: 'USB-C charging cable', quantity: 1 },
      { item: 'Travel pouch', quantity: 1 }
    ]
  }
];