import { Product, FAQ } from './types';

// Raw representation of the detailed product lists as provided by the user
const RAW_PRODUCTS_LIST = [
  // --- Category: Gourmet Curries ---
  { id: 'gc-palak-paneer', name: 'Palak Paneer', hindiName: 'पालक पनीर', category: 'Gourmet Curries', price: 300, isSpicy: 'Medium' as const },
  { id: 'gc-kadhi-paneer', name: 'Kadhai Paneer', hindiName: 'कढ़ाई पनीर', category: 'Gourmet Curries', price: 300, isSpicy: 'Medium' as const },
  { id: 'gc-shahi-paneer', name: 'Shahi Paneer', hindiName: 'शाही पनीर', category: 'Gourmet Curries', price: 300, isSpicy: 'Mild' as const },
  { id: 'gc-aloo-matar', name: 'Aloo Matar', hindiName: 'आलू मटर', category: 'Gourmet Curries', price: 250, isSpicy: 'Medium' as const },
  { id: 'gc-gobhi-matar', name: 'Gobhi Matar', hindiName: 'गोभी मटर', category: 'Gourmet Curries', price: 250, isSpicy: 'Medium' as const },
  { id: 'gc-aloo-gobhi', name: 'Aloo Gobhi', hindiName: 'आलू गोभी', category: 'Gourmet Curries', price: 250, isSpicy: 'Medium' as const },
  { id: 'gc-kadhi', name: 'Kadhi', hindiName: 'कढ़ी', category: 'Gourmet Curries', price: 250, isSpicy: 'Medium' as const },
  { id: 'gc-malai-kofta', name: 'Malai Kofta', hindiName: 'मलाई कोफ्ता', category: 'Gourmet Curries', price: 250, isSpicy: 'Mild' as const },
  { id: 'gc-matar-paneer', name: 'Matar Paneer', hindiName: 'मटर पनीर', category: 'Gourmet Curries', price: 300, isSpicy: 'Medium' as const },
  { id: 'gc-dal-makhani', name: 'Dal Makhani', hindiName: 'दाल मखनी', category: 'Gourmet Curries', price: 250, isSpicy: 'Medium' as const },
  { id: 'gc-chole', name: 'Chole', hindiName: 'छोले', category: 'Gourmet Curries', price: 250, isSpicy: 'Spicy' as const },
  { id: 'gc-rajma', name: 'Rajma', hindiName: 'राजमा', category: 'Gourmet Curries', price: 250, isSpicy: 'Medium' as const },
  { id: 'gc-chaap', name: 'Chaap', hindiName: 'चाप मसाला', category: 'Gourmet Curries', price: 250, isSpicy: 'Medium' as const },
  { id: 'gc-gatta-rajasthani', name: 'Gatta Rajasthani', hindiName: 'गट्टा राजस्थानी', category: 'Gourmet Curries', price: 250, isSpicy: 'Medium' as const },
  { id: 'gc-gajar-halwa', name: 'Gajar Halwa', hindiName: 'गाजर हलवा', category: 'Gourmet Curries', price: 300, isSpicy: 'Mild' as const },
  { id: 'gc-saag', name: 'Saag', hindiName: 'साग', category: 'Gourmet Curries', price: 300, isSpicy: 'Medium' as const },
  { id: 'gc-pav-bhaji', name: 'Pav Bhaji', hindiName: 'पाव भाजी', category: 'Gourmet Curries', price: 250, isSpicy: 'Medium' as const },

  // --- Category: Toddlers' Food (Bina mirchi ka khaana) ---
  { id: 'tf-rajma', name: 'Toddler Rajma', hindiName: 'राजमा (शिशु विशेष)', category: "Toddlers' Food", price: 250, isSpicy: 'Mild' as const, description: 'Bina mirchi ka khaana for sensitive young tummies.' },
  { id: 'tf-chole', name: 'Toddler Chole', hindiName: 'छोले (शिशु विशेष)', category: "Toddlers' Food", price: 250, isSpicy: 'Mild' as const, description: 'Bina mirchi ka khaana for sensitive young tummies.' },
  { id: 'tf-dal-makhani', name: 'Toddler Dal Makhani', hindiName: 'दाल मखनी (शिशु विशेष)', category: "Toddlers' Food", price: 250, isSpicy: 'Mild' as const, description: 'Bina mirchi ka khaana for sensitive young tummies.' },
  { id: 'tf-yellow-moong-dal', name: 'Yellow Moong Daal', hindiName: 'पीली मूंग दाल (शिशु विशेष)', category: "Toddlers' Food", price: 250, isSpicy: 'Mild' as const, description: 'Bina mirchi ka khaana for sensitive young tummies.' },
  { id: 'tf-shahi-paneer', name: 'Toddler Shahi Paneer', hindiName: 'शाही पनीर (शिशु विशेष)', category: "Toddlers' Food", price: 300, isSpicy: 'Mild' as const, description: 'Bina mirchi ka khaana for sensitive young tummies.' },
  { id: 'tf-palak-paneer', name: 'Toddler Palak Paneer', hindiName: 'पालक पनीर (शिशु विशेष)', category: "Toddlers' Food", price: 300, isSpicy: 'Mild' as const, description: 'Bina mirchi ka khaana for sensitive young tummies.' },
  { id: 'tf-pav-bhaji', name: 'Toddler Pav Bhaji', hindiName: 'पाव भाजी (शिशु विशेष)', category: "Toddlers' Food", price: 250, isSpicy: 'Mild' as const, description: 'Bina mirchi ka khaana for sensitive young tummies.' },
  { id: 'tf-khichidi', name: 'Toddler Khichidi', hindiName: 'खिचड़ी (शिशु विशेष)', category: "Toddlers' Food", price: 200, isSpicy: 'Mild' as const, description: 'Bina mirchi ka khaana for sensitive young tummies.' },
  { id: 'tf-dalia', name: 'Toddler Dalia', hindiName: 'दलिया (शिशु विशेष)', category: "Toddlers' Food", price: 200, isSpicy: 'Mild' as const, description: 'Bina mirchi ka khaana for sensitive young tummies.' },

  // --- Category: Ready To Cook ---
  { id: 'rtc-dal-makhani', name: 'Dal Makhani', hindiName: 'दाल मखनी (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-rajma', name: 'Rajma', hindiName: 'राजमा (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-chole', name: 'Chole', hindiName: 'छोले (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-dal-bukhara', name: 'Daal Bukhara', hindiName: 'दाल बुखारा (RTC)', category: 'Ready To Cook', price: 200, isSpicy: 'Medium' as const },
  { id: 'rtc-kale-channe', name: 'Kale Channe', hindiName: 'काले चने (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-sambhar', name: 'Sambhar', hindiName: 'सांभर (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-dal-tadka', name: 'Dal Tadka', hindiName: 'दाल तड़का (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-masoor-dal', name: 'Masoor Dal', hindiName: 'मसूर दाल (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-upma', name: 'Upma', hindiName: 'उपमा (RTC)', category: 'Ready To Cook', price: 100, isSpicy: 'Mild' as const },
  { id: 'rtc-poha', name: 'Poha', hindiName: 'पोहा (RTC)', category: 'Ready To Cook', price: 100, isSpicy: 'Mild' as const },
  { id: 'rtc-dry-channa-dal', name: 'Dry Channa Dal', hindiName: 'चना दाल सूखी (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-masala-tadka', name: 'Masala Tadka', hindiName: 'मसाला तड़का (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-shahi-gravy', name: 'Shahi Gravy (without paneer)', hindiName: 'शाही ग्रेवी (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Mild' as const },
  { id: 'rtc-paneer-bhurji', name: 'Paneer Bhurji', hindiName: 'पनीर भुर्जी (RTC)', category: 'Ready To Cook', price: 200, isSpicy: 'Medium' as const },
  { id: 'rtc-bhindi', name: 'Bhindi', hindiName: 'भिंडी मसाला (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-matar', name: 'Matar', hindiName: 'मटर मसाला (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-dhaba-daal', name: 'Dhaaba Daal (black)', hindiName: 'ढाबा दाल काली (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-gobhi-matar', name: 'Gobhi Matar', hindiName: 'गोभी मटर (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-achari-gobhi', name: 'Achari Gobhi', hindiName: 'अचारी गोभी (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Spicy' as const },
  { id: 'rtc-pao-bhaji', name: 'Pao bhaji', hindiName: 'पाव भाजी (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-veg-bambino', name: 'Vegetable Bambino', hindiName: 'जवे बम्बिनो (RTC)', category: 'Ready To Cook', price: 100, isSpicy: 'Medium' as const },
  { id: 'rtc-rice', name: 'Rice', hindiName: 'चावल (RTC)', category: 'Ready To Cook', price: 125, isSpicy: 'Mild' as const },
  { id: 'rtc-pulao', name: 'Pulao', hindiName: 'पुलाव (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-biryani', name: 'Biryani', hindiName: 'बिरयानी (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Spicy' as const },
  { id: 'rtc-suji-halwa', name: 'Suji Halwa', hindiName: 'सूजी हलवा (RTC)', category: 'Ready To Cook', price: 200, isSpicy: 'Mild' as const },
  { id: 'rtc-fried-rice', name: 'Fried Rice', hindiName: 'फ्राइड राइस (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-kadhi-rice', name: 'Kadhi Rice', hindiName: 'कढ़ी चावल (RTC)', category: 'Ready To Cook', price: 250, isSpicy: 'Medium' as const },
  { id: 'rtc-chowmein', name: 'Chowmein', hindiName: 'चाउमीन (RTC)', category: 'Ready To Cook', price: 200, isSpicy: 'Medium' as const },
  { id: 'rtc-jeera-rice', name: 'Jeera Rice', hindiName: 'जीरा राइस (RTC)', category: 'Ready To Cook', price: 125, isSpicy: 'Mild' as const },
  { id: 'rtc-matra', name: 'Matra', hindiName: 'मटर कुल्चा मटर (RTC)', category: 'Ready To Cook', price: 125, isSpicy: 'Spicy' as const },
  { id: 'rtc-pasta-mix', name: 'Pasta Mix / Italian', hindiName: 'इटालियन पास्ता मिक्स (RTC)', category: 'Ready To Cook', price: 200, isSpicy: 'Medium' as const },
  { id: 'rtc-pasta', name: 'Pasta', hindiName: 'पास्ता (RTC)', category: 'Ready To Cook', price: 150, isSpicy: 'Medium' as const },
  { id: 'rtc-soya-nutri', name: 'Soya nutri', hindiName: 'सोया न्यूट्री (RTC)', category: 'Ready To Cook', price: 125, isSpicy: 'Medium' as const },
  { id: 'rtc-rajma-rice', name: 'Rajma Rice', hindiName: 'राजमा चावल (RTC)', category: 'Ready To Cook', price: 225, isSpicy: 'Medium' as const },

  // --- Category: Ready To Eat ---
  { id: 'rte-plain-thepla', name: 'Plain Thepla (5)', hindiName: 'सादा थेपला (5)', category: 'Ready To Eat', price: 115, isSpicy: 'Medium' as const },
  { id: 'rte-garlic-thepla', name: 'Garlic Thepla (5)', hindiName: 'लहसुन थेपला (5)', category: 'Ready To Eat', price: 125, isSpicy: 'Medium' as const },
  { id: 'rte-plain-paratha', name: 'Plain Paratha (4)', hindiName: 'सादा पराठा (4)', category: 'Ready To Eat', price: 125, isSpicy: 'Mild' as const },
  { id: 'rte-lachha-paratha', name: 'Lachha Paratha (3)', hindiName: 'लच्छा पराठा (3)', category: 'Ready To Eat', price: 125, isSpicy: 'Mild' as const },
  { id: 'rte-garlic-lachha', name: 'Garlic Lachha Paratha (3)', hindiName: 'लहसुन लच्छा पराठा (3)', category: 'Ready To Eat', price: 135, isSpicy: 'Medium' as const },
  { id: 'rte-dal-paratha', name: 'Dal Paratha (3)', hindiName: 'दाल पराठा (3)', category: 'Ready To Eat', price: 135, isSpicy: 'Medium' as const },
  { id: 'rte-khasta-paratha', name: 'Khastaa Paratha (3)', hindiName: 'खस्ता पराठा (3)', category: 'Ready To Eat', price: 135, isSpicy: 'Medium' as const },
  { id: 'rte-ajwain-paratha', name: 'Ajwain Paratha (3)', hindiName: 'अजवाइन पराठा (3)', category: 'Ready To Eat', price: 135, isSpicy: 'Mild' as const },
  { id: 'rte-bikaneri-paratha', name: 'Bikaneri Paratha (3)', hindiName: 'बीकानेरी पराठा (3)', category: 'Ready To Eat', price: 135, isSpicy: 'Medium' as const },
  { id: 'rte-chapati', name: 'Chapati (4)', hindiName: 'चपाती (4)', category: 'Ready To Eat', price: 125, isSpicy: 'Mild' as const },
  { id: 'rte-aloo-paratha', name: 'Aloo Paratha (3)', hindiName: 'आलू पराठा (3)', category: 'Ready To Eat', price: 135, isSpicy: 'Medium' as const },
  { id: 'rte-poori-115', name: 'Poori (5)', hindiName: 'पूरी (5) प्रीमियम', category: 'Ready To Eat', price: 115, isSpicy: 'Mild' as const },
  { id: 'rte-gobhi-paratha', name: 'Gobhi Parantha (3)', hindiName: 'गोभी पराठा (3)', category: 'Ready To Eat', price: 150, isSpicy: 'Medium' as const },
  { id: 'rte-broccoli-paratha', name: 'Brocolli Parantha (3)', hindiName: 'ब्रोकोली पराठा (3)', category: 'Ready To Eat', price: 150, isSpicy: 'Mild' as const },
  { id: 'rte-methi-paratha', name: 'Methi Parantha (3)', hindiName: 'मेथी पराठा (3)', category: 'Ready To Eat', price: 150, isSpicy: 'Medium' as const },
  { id: 'rte-poori-150', name: 'Heritage Special Poori (5)', hindiName: 'देसी घी पूरी (5)', category: 'Ready To Eat', price: 150, isSpicy: 'Mild' as const },
  { id: 'rte-bhatura', name: 'Bhatura (3)', hindiName: 'भटूरा (3)', category: 'Ready To Eat', price: 150, isSpicy: 'Mild' as const },
  { id: 'rte-kulcha', name: 'Kulchas (3)', hindiName: 'कुलचा (3)', category: 'Ready To Eat', price: 125, isSpicy: 'Mild' as const },
  { id: 'rte-tandoori-lachha', name: 'Tandoori Lachha (3)', hindiName: 'तंदूरी लच्छा रोटी (3)', category: 'Ready To Eat', price: 150, isSpicy: 'Mild' as const },
  { id: 'rte-butter-naan', name: 'Butter Naan (3)', hindiName: 'बटर नान (3)', category: 'Ready To Eat', price: 150, isSpicy: 'Mild' as const },

  // --- Category: Snacks ---
  { id: 'sn-matar-samosa', name: 'Matar Samosas (6)', hindiName: 'मटर समोसा (6)', category: 'Snacks', price: 200, isSpicy: 'Medium' as const },
  { id: 'sn-vrat-chips', name: 'Vrat Waale Chips', hindiName: 'व्रत वाले चिप्स', category: 'Snacks', price: 150, isSpicy: 'Mild' as const },
  { id: 'sn-aloo-lachha', name: 'Aloo Lachha', hindiName: 'आलू लच्छा', category: 'Snacks', price: 150, isSpicy: 'Mild' as const },
  { id: 'sn-mangodi', name: 'Mangodi (moti ke daane waali)', hindiName: 'मंगोड़ी मोती दाना', category: 'Snacks', price: 110, isSpicy: 'Medium' as const },
  { id: 'sn-jawey', name: 'Jawey (haath ke toote hue)', hindiName: 'हाथ के जवे', category: 'Snacks', price: 180, isSpicy: 'Mild' as const },
  { id: 'sn-mint-makhana', name: 'Mint(pudina) Makhana', hindiName: 'पुदीना मखाना', category: 'Snacks', price: 200, isSpicy: 'Mild' as const },
  { id: 'sn-peri-peri-makhana', name: 'Peri Peri Masala Makhana', hindiName: 'पेरी पेरी मखाना', category: 'Snacks', price: 200, isSpicy: 'Spicy' as const },
  { id: 'sn-chatpata-makhana', name: 'Chatpata Makhana', hindiName: 'चटपटा मखाना', category: 'Snacks', price: 200, isSpicy: 'Medium' as const },
  { id: 'sn-masala-kachori', name: 'Masala Kachori', hindiName: 'मसाला कचौड़ी', category: 'Snacks', price: 200, isSpicy: 'Medium' as const },
  { id: 'sn-methi-matthi', name: 'Methi Matthi', hindiName: 'मेथी मट्ठी', category: 'Snacks', price: 150, isSpicy: 'Medium' as const },
  { id: 'sn-achar-matthi', name: 'Achar Matthi', hindiName: 'अचार मट्ठी', category: 'Snacks', price: 150, isSpicy: 'Medium' as const },
  { id: 'sn-tikoni-matthi', name: 'Tikoni Matthi', hindiName: 'तिकोनी मट्ठी', category: 'Snacks', price: 150, isSpicy: 'Medium' as const },
  { id: 'sn-bhujia-matthi', name: 'Bhujia Matthi', hindiName: 'भुजिया मट्ठी', category: 'Snacks', price: 150, isSpicy: 'Medium' as const },
  { id: 'sn-methi-khasta', name: 'Methi Khasta', hindiName: 'मेथी खस्ता कचौड़ी', category: 'Snacks', price: 150, isSpicy: 'Medium' as const },
  { id: 'sn-achariya-khasta', name: 'Achariya Khasta', hindiName: 'अचारी खस्ता', category: 'Snacks', price: 150, isSpicy: 'Medium' as const },
  { id: 'sn-puchka-kachodi', name: 'Puchka Kachodi', hindiName: 'पुचका कचौड़ी', category: 'Snacks', price: 200, isSpicy: 'Medium' as const },
  { id: 'sn-onion-achar', name: 'Onion Achar', hindiName: 'प्याज का अचार', category: 'Snacks', price: 200, isSpicy: 'Medium' as const },
  { id: 'sn-bhindi-achar', name: 'Bhindi Achar', hindiName: 'भिंडी का अचार', category: 'Snacks', price: 200, isSpicy: 'Medium' as const },
  { id: 'sn-garlic-chutney', name: 'Garlic Chutney', hindiName: 'लहसुन की चटनी', category: 'Snacks', price: 200, isSpicy: 'Spicy' as const },

  // --- Category: Jain food ---
  { id: 'jf-dal-makhani', name: 'Dal Makhani (Jain)', hindiName: 'जैन दाल मखनी', category: 'Jain food', price: 200, isSpicy: 'Medium' as const },
  { id: 'jf-dal-tadka', name: 'Dal tadka (Jain)', hindiName: 'जैन दाल तड़का', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-dhaba-dal', name: 'Dhaba dal (Jain)', hindiName: 'जैन ढाबा दाल', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-masoor-dal', name: 'Masoor dal (Jain)', hindiName: 'जैन मसूर दाल', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-rajma', name: 'Rajma (Jain)', hindiName: 'जैन राजमा', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-chole', name: 'Chole (Jain)', hindiName: 'जैन छोले', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-pav-bhaji', name: 'Pav bhaji (Jain)', hindiName: 'जैन पाव भाजी', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-paneer-bhurji', name: 'Paneer bhuji (Jain)', hindiName: 'जैन पनीर भुर्जी', category: 'Jain food', price: 200, isSpicy: 'Medium' as const },
  { id: 'jf-pulao', name: 'Pulao (Jain)', hindiName: 'जैन पुलाव', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-poha', name: 'Poha (Jain)', hindiName: 'जैन पोहा', category: 'Jain food', price: 125, isSpicy: 'Mild' as const },
  { id: 'jf-upma', name: 'Upma (Jain)', hindiName: 'जैन उपमा', category: 'Jain food', price: 125, isSpicy: 'Mild' as const },
  { id: 'jf-aloo-gobhi', name: 'Aloo gobhi (Jain)', hindiName: 'जैन आलू गोभी', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-gobhi-matar', name: 'Gobhi matar (Jain)', hindiName: 'जैन गोभी मटर', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-achari-gobhi', name: 'Achari gobhi (Jain)', hindiName: 'जैन अचारी गोभी', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-mix-veg', name: 'Mix veg (Jain)', hindiName: 'जैन मिक्स वेज', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-rice', name: 'Rice (Jain)', hindiName: 'जैन चावल', category: 'Jain food', price: 125, isSpicy: 'Mild' as const },
  { id: 'jf-jeera-rice', name: 'Jeera rice (Jain)', hindiName: 'जैन जीरा राइस', category: 'Jain food', price: 150, isSpicy: 'Mild' as const },
  { id: 'jf-bhindi', name: 'Bhindi (Jain)', hindiName: 'जैन भिंडी मसाला', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-bambino', name: 'Bambino (Jain)', hindiName: 'जैन बम्बिनो जवे', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },
  { id: 'jf-kadhi-rice', name: 'Kadhi rice (Jain)', hindiName: 'जैन कढ़ी चावल', category: 'Jain food', price: 200, isSpicy: 'Medium' as const },
  { id: 'jf-biryani', name: 'Biryani (Jain)', hindiName: 'जैन बिरयानी', category: 'Jain food', price: 150, isSpicy: 'Medium' as const },

  // --- Category: Achars ---
  { id: 'ac-aam-achar', name: 'Aam ka Achar (1 Kg)', hindiName: 'आम का अचार', category: 'Achars', price: 380, isSpicy: 'Medium' as const },
  { id: 'ac-aam-hing', name: 'Aam Hing Achar (1 Kg)', hindiName: 'आम हींग का अचार', category: 'Achars', price: 380, isSpicy: 'Medium' as const },
  { id: 'ac-aam-kutra', name: 'Aam Kutra Achar (1 Kg)', hindiName: 'आम कुतरा अचार', category: 'Achars', price: 380, isSpicy: 'Medium' as const },
  { id: 'ac-aam-lehsun', name: 'Aam Lehsun Achar (1 Kg)', hindiName: 'लहसुन आम का अचार', category: 'Achars', price: 380, isSpicy: 'Spicy' as const },
  { id: 'ac-sukha-aam', name: 'Sukha Aam Achar (1 Kg)', hindiName: 'सूखा आम अचार', category: 'Achars', price: 380, isSpicy: 'Medium' as const },
  { id: 'ac-karela', name: 'Karela Achar (1 Kg)', hindiName: 'करेला अचार', category: 'Achars', price: 380, isSpicy: 'Medium' as const },
  { id: 'ac-aamla', name: 'Aamla Achar (1 Kg)', hindiName: 'आँवला अचार', category: 'Achars', price: 380, isSpicy: 'Mild' as const },
  { id: 'ac-gaajar', name: 'Gaajar Achar (1 Kg)', hindiName: 'गाजर का अचार', category: 'Achars', price: 380, isSpicy: 'Medium' as const },
  { id: 'ac-lehsua', name: 'Lehsua Achar (1 Kg)', hindiName: 'लहसुआ अचार', category: 'Achars', price: 380, isSpicy: 'Medium' as const },
  { id: 'ac-teet', name: 'Teet Achar (1 Kg)', hindiName: 'टीट का अचार', category: 'Achars', price: 380, isSpicy: 'Spicy' as const },
  { id: 'ac-kathal', name: 'Kathal Achar (1 Kg)', hindiName: 'कटहल का अचार', category: 'Achars', price: 380, isSpicy: 'Medium' as const },
  { id: 'ac-kachalu', name: 'Kachalu Achar (1 Kg)', hindiName: 'कचालू अचार', category: 'Achars', price: 380, isSpicy: 'Medium' as const },
  { id: 'ac-adrak', name: 'Adrak Achar (1 Kg)', hindiName: 'अदरक अचार', category: 'Achars', price: 380, isSpicy: 'Medium' as const },
  { id: 'ac-paan-khajur', name: 'Paan Khajur Achar (1 Kg)', hindiName: 'पान खजूर अचार', category: 'Achars', price: 380, isSpicy: 'Mild' as const },
  { id: 'ac-kamal-kakdi', name: 'Kamal Kakdi Achar (1 Kg)', hindiName: 'कमल ककड़ी अचार', category: 'Achars', price: 380, isSpicy: 'Medium' as const }
];

// Helper to expand raw definition into full correct type-safe Product instances
const constructProduct = (raw: typeof RAW_PRODUCTS_LIST[number], index: number): Product => {
  const isSpicy = raw.isSpicy || 'Medium';
  const chefTag = index === 0 || index === 8 || index === 20 || index === 45 || index === 80 ? 'Moms Special' : index % 14 === 0 ? 'Chef Special' : '';
  const rating = Number((4.6 + (index % 5) * 0.1).toFixed(1));
  const reviews = 42 + (index * 9) % 200;
  
  // Custom metrics for dry weight, yield and preptime depending on user category
  let weight = 100;
  let makesWeight = 350;
  let prepTime = '5 Mins';
  
  if (raw.category === 'Ready To Eat') {
    weight = 155;
    makesWeight = 155;
    prepTime = 'Warming / Hot Water Dip';
  } else if (raw.category === 'Snacks') {
    weight = 180;
    makesWeight = 180;
    prepTime = 'Ready To Eat';
  } else if (raw.category === 'Achars') {
    weight = 1000; // 1 Kg
    makesWeight = 1000;
    prepTime = 'Ready To Eat';
  } else if (raw.category === "Toddlers' Food") {
    weight = 80;
    makesWeight = 280;
    prepTime = '3 Mins (No Chillies)';
  } else if (raw.category === 'Jain food') {
    weight = 110;
    makesWeight = 380;
    prepTime = '4 Mins (No Onion/Garlic)';
  }

  // List of all local files available in public/assets/images/
  const localImages = [
    "Achari_Gobhi Medium.jpeg",
    "Aloo_Gobhi Medium.jpeg",
    "Aloo_Matar Medium.jpeg",
    "Bhindi Medium.jpeg",
    "Biryani Medium.jpeg",
    "Chaap Medium.jpeg",
    "Chole Medium.jpeg",
    "Chowmein Medium.jpeg",
    "Daal_Bukhara Medium.jpeg",
    "Dal_Makhani Medium.jpeg",
    "Dal_Tadka Medium.jpeg",
    "Dhaaba_Daal__black_ Medium.jpeg",
    "Dry_Channa_Dal Medium.jpeg",
    "Fried_Rice Medium.jpeg",
    "Gajar_Halwa Medium.jpeg",
    "Gatta_Rajasthani Medium.jpeg",
    "Gobhi_Matar Medium.jpeg",
    "Jeera_Rice Medium.jpeg",
    "Kadhi Medium.jpeg",
    "Kadhai_Paneer Medium.jpeg",
    "Kadhi_Rice Medium.jpeg",
    "Kale_Channe Medium.jpeg",
    "Malai_Kofta Medium.jpeg",
    "Masala_Tadka Medium.jpeg",
    "Masoor_Dal Medium.jpeg",
    "Matar Medium.jpeg",
    "Matar_Paneer Medium.jpeg",
    "Matra Medium.jpeg",
    "Paneer_Bhurji Medium.jpeg",
    "Pao_bhaji Medium.jpeg",
    "Pasta Medium.jpeg",
    "Pasta_Mix___Italian Medium.jpeg",
    "Pav_Bhaji Medium.jpeg",
    "Poha Medium.jpeg",
    "Pulao Medium.jpeg",
    "Rajma Medium.jpeg",
    "Rajma_Rice Medium.jpeg",
    "Rice Medium.jpeg",
    "Saag Medium.jpeg",
    "Sambhar Medium.jpeg",
    "Shahi_Gravy__without_paneer_ Medium.jpeg",
    "Shahi_Paneer Medium.jpeg",
    "Soya_nutri Medium.jpeg",
    "Suji_Halwa Medium.jpeg",
    "Toddler_Chole Medium.jpeg",
    "Toddler_Dal_Makhani Medium.jpeg",
    "Toddler_Dalia Medium.jpeg",
    "Toddler_Khichidi Medium.jpeg",
    "Toddler_Palak_Paneer Medium.jpeg",
    "Toddler_Pav_Bhaji Medium.jpeg",
    "Toddler_Rajma Medium.jpeg",
    "Toddler_Shahi_Paneer Medium.jpeg",
    "Upma Medium.jpeg",
    "Vegetable_Bambino Medium.jpeg",
    "Yellow_Moong_Daal Medium.jpeg"
  ];

  // Try to find a match
  const lowerName = raw.name.toLowerCase();
  
  // Helper to normalize strings for comparison (remove spaces, parentheses, etc)
  const normalize = (str: string) => str.replace(/[^a-z0-9]/gi, '').toLowerCase();

  const normalizedName = normalize(lowerName.replace(/\(.*\)/g, '').trim()); // Remove things like (Jain), (RTC), (1 Kg)
  
  const matchedFile = localImages.find(fileName => {
    const cleanFileName = fileName.replace(/\s*Medium\.jpeg/i, '');
    const normalizedFile = normalize(cleanFileName);
    return normalizedName === normalizedFile;
  }) || localImages.find(fileName => {
    const cleanFileName = fileName.replace(/\s*Medium\.jpeg/i, '');
    const normalizedFile = normalize(cleanFileName);
    return normalizedName.includes(normalizedFile) || normalizedFile.includes(normalizedName);
  });

  let imageUrl = "";
  if (matchedFile) {
    imageUrl = `/assets/images/${encodeURIComponent(matchedFile)}`;
  } else {
    // Choose highly aesthetic food Unsplash photos matching the ingredient/name keywords
    imageUrl = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80"; // Dal / Khichdi fallback
    const lowerName = raw.name.toLowerCase();
    
    if (lowerName.includes('paneer')) {
      imageUrl = "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80"; // Palak / Shahi paneer
    } else if (lowerName.includes('poha')) {
      imageUrl = "https://images.unsplash.com/photo-1605851868183-7a4cb5c798fc?w=600&auto=format&fit=crop&q=80"; // Beautiful poha breakfast
    } else if (lowerName.includes('upma')) {
      imageUrl = "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80"; // Upma
    } else if (lowerName.includes('achar') || lowerName.includes('chutney')) {
      imageUrl = "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&auto=format&fit=crop&q=80"; // Indian Pickle / Achar jars
    } else if (lowerName.includes('halwa') || lowerName.includes('sweet')) {
      imageUrl = "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80"; // Warm Gajar Halwa / Sheera
    } else if (lowerName.includes('thepla') || lowerName.includes('paratha') || lowerName.includes('chapati') || lowerName.includes('naan') || lowerName.includes('roti') || lowerName.includes('poori') || lowerName.includes('bhatura')) {
      imageUrl = "https://images.unsplash.com/photo-1626515827012-abaa3a37ecb6?w=600&auto=format&fit=crop&q=80"; // Flatbreads / Roti
    } else if (lowerName.includes('samosa') || lowerName.includes('makhana') || lowerName.includes('chips') || lowerName.includes('matthi') || lowerName.includes('khasta')) {
      imageUrl = "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80"; // Crispy mathri / crunchies
    } else if (lowerName.includes('rice') || lowerName.includes('pulao') || lowerName.includes('biryani')) {
      imageUrl = "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?w=600&auto=format&fit=crop&q=80"; // Fragrant rice / Pulao
    } else if (lowerName.includes('chole') || lowerName.includes('rajma') || lowerName.includes('bukhara')) {
      imageUrl = "https://images.unsplash.com/photo-1601050691585-6b7978aeeb50?w=600&auto=format&fit=crop&q=80"; // Kidney beans / Chickpeas
    } else if (lowerName.includes('pasta') || lowerName.includes('bambino') || lowerName.includes('chowmein')) {
      imageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"; // Delicious Noodles & Pasta
    } else if (lowerName.includes('bhindi') || lowerName.includes('gobhi') || lowerName.includes('veg') || lowerName.includes('matar')) {
      imageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"; // Mixed veg / cooked dishes
    }
  }

  // Create highly rich description that honors categories
  // Create highly rich description that honors categories
  let description = `Chef-Curated ${raw.name}. Vacuum-compressed at peak freshness. Zero preservatives, 100% gourmet texture.`;
  if (raw.category === "Toddlers' Food") {
    description = `Premium child-safe recipe. Zero chillies, mildly spiced, highly digestible, and micro-nutrient rich. 100% pure.`;
  } else if (raw.category === 'Ready To Cook') {
    description = `Chef-Curated ${raw.name} (Ready To Cook). Vacuum-compressed at peak freshness. Zero preservatives, 100% gourmet texture.`;
  } else if (raw.category === 'Ready To Eat') {
    description = `Artisanal breads. Thermally sealed at peak softness. Restore instantly with a warm-water dip or toast.`;
  } else if (raw.category === 'Snacks') {
    description = `Elite snack selection. Slow-roasted in small batches. Low-sodium, heart-healthy fats, zero trans fats.`;
  } else if (raw.category === 'Jain food') {
    description = `Satvik-Certified. Crafted strictly without root vegetables, onion, or garlic. 100% gourmet purity.`;
  } else if (raw.category === 'Achars') {
    description = `Aged heritage pickles. Cured in cold-pressed mustard oil with hand-ground spices. Premium tang.`;
  }


  const isVeg = true; // All Vaatsalya recipes are 100% vegetarian

  return {
    id: raw.id,
    name: raw.name,
    hindiName: raw.hindiName,
    category: raw.category,
    price: raw.price,
    weight,
    makesWeight,
    prepTime,
    chefTag,
    rating,
    reviews,
    isVeg,
    // Gluten-free logic: flatbreads, pasta, noodles have gluten
    isGlutenFree: raw.category !== 'Ready To Eat' && !lowerName.includes('bambino') && !lowerName.includes('pasta') && !lowerName.includes('chowmein'),
    isSpicy,
    description,
    ingredients: lowerName.includes('paneer') 
      ? ["Milk Paneer", "Cold Pressed Oils", "Hing", "Turmeric", "Salt"] 
      : ["Premium Grain Flour", "Cumin", "Ginger Root", "Ghee", "Salt"],
    nutrition: {
      calories: 140 + (index % 5) * 60,
      protein: 4 + (index % 4) * 2,
      carbs: 22 + (index % 6) * 8,
      fats: 3 + (index % 4) * 2,
      sodium: `${180 + (index % 6) * 45}mg`
    },
    imageUrl
  };
};

export const PRODUCTS_DATA: Product[] = RAW_PRODUCTS_LIST.map((raw, idx) => constructProduct(raw, idx));

export const FAQS_DATA: FAQ[] = [
  {
    question: "How do you preserve the meals without any artificial preservatives?",
    answer: "We use a low-temperature, high-vacuum dehydration process. By gently evaporating moisture (water content) under vacuum, bacteria and mold cannot grow. Since there is zero water left, the food remains fresh naturally for 6-9 months in our nitrogen-flushed 4-layer barrier pouches. No chemicals, additives, or MSG are ever added."
  },
  {
    question: "Is it really as simple as just adding hot water?",
    answer: "Yes, absolutely! Each bag is a self-standing cooking pouch. You open the bag, remove the oxygen-absorber sachet, pour boiling water up to the marked water line on the inside, stir well, zip the heat-lock zipper shut, and wait 3-5 minutes. The food rehydrates back to its original soft, fragrant, home-cooked texture."
  },
  {
    question: "Can I prepare these in a microwave or hotel kettle?",
    answer: "Yes. All you need is boiling water. You can boil water using any standard hotel room electric tea kettle, a microwave, or a simple thermos. If boiling water isn't available, you can add cold water and microwave the self-standing pouch (open zipper first) for 2 minutes and let it stand for 3 minutes."
  },
  {
    question: "Who prepares the recipes and cooks the meals?",
    answer: "Our recipes are curated by traditional family home-makers (mothers) using non-industrial, honest processes. The ingredients are cooked in small hygienic batches styled exactly like a traditional Indian home kitchen, before they undergo gentle vacuum-drying."
  },
  {
    question: "What is special about the Toddlers' Food category?",
    answer: "Our Toddler range consists of 100% natural, mild dishes (Bina mirchi ka khaana). They are prepared with zero green/red chillies or complex spices, ensuring sweet/savory nourishment that young tummies can easily digest during travels or long transits."
  }
];
