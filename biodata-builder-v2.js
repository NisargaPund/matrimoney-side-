// Biodata Builder V2 Logic (Shadi.com style, with Welcome and Confirmation)

document.addEventListener('DOMContentLoaded', function() {
    // Steps array: each step is an object with fields or a special type (welcome/confirmation)
    const steps = [
        // Step 0: Welcome
        {
            type: 'welcome',
            title: 'Namaste! Great to see you today!',
            subtitle: "Looks like you are looking for a long term relationship, right? Let us help you find good matches."
        },
        // Step 1: Profile Details
        {
            title: 'Profile Details',
            fields: [
                { label: 'This profile is for', name: 'profileFor', type: 'button-group', options: ['Male', 'Female'], required: true },
                { label: 'You are creating profile for', name: 'creatingFor', type: 'select', options: ['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Friend', 'Relative', 'Other'], required: true },
                { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your full name', required: true },
                { label: 'Marital Status', name: 'maritalStatus', type: 'button-group', options: ['Single', 'Divorced', 'Widowed', 'Awaiting divorce'], required: true }
            ]
        },
        // Step 2: Location & Visa
        {
            title: 'Location & Visa',
            fields: [
                { label: 'Living in India since', name: 'livingInIndiaSince', type: 'select', options: ['1 year', '2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years', '9 years', '10+ years', '20+ years', '30+ years', 'Since Birth'], required: true },
                { label: 'Country', name: 'country', type: 'select', options: ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Other'], required: true },
                { label: 'Visa Status', name: 'visaStatus', type: 'button-group', options: ['Citizenship', 'Legal Permanent Residence', 'Work Visa', 'Student Visa'], required: true }
            ]
        },
        // Step 3: Personal Details
        {
            title: 'Personal Details',
            fields: [
                { label: 'Ethnicity', name: 'ethnicity', type: 'select', options: ['Indian', 'North Indian', 'South Indian', 'Hyderabadi', 'Arab', 'Pakistani', 'Bangladeshi', 'Other'], required: true },
                { label: 'Profession', name: 'profession', type: 'select', options: ['Accountant', 'Administrative', 'Air Hostess', 'Allied Health Care', 'Architect', 'Armed Forces', 'Artist', 'Astrologer', 'Aviation', 'Banking', 'Beautician', 'Business Development Manager', 'Chef', 'Civil Engineer', 'Consultant', 'Content Writer', 'Customer Service', 'Data Analyst', 'Dentist', 'Designer', 'Doctor', 'Driver', 'Electrician', 'Engineer', 'Entrepreneur', 'Event Manager', 'Farmer', 'Fashion Designer', 'Finance', 'Firefighter', 'Fitness Trainer', 'Graphic Designer', 'Hotel Management', 'Human Resources', 'IT Professional', 'Journalist', 'Lawyer', 'Lecturer', 'Logistics', 'Manager', 'Marketing', 'Mechanic', 'Medical Professional', 'Model', 'Musician', 'Nurse', 'Pharmacist', 'Photographer', 'Pilot', 'Plumber', 'Police', 'Politician', 'Professor', 'Project Manager', 'Psychologist', 'Public Relations', 'Real Estate', 'Receptionist', 'Researcher', 'Retail', 'Sales', 'Scientist', 'Software Developer', 'Sportsperson', 'Teacher', 'Technician', 'Translator', 'Veterinarian', 'Videographer', 'Writer', 'Other'], required: true },
                { label: 'Income', name: 'income', type: 'select', options: ['$24,999 or less', '$25,000 to $34,999', '$35,000 to $49,999', '$50,000 to $74,999', '$75,000 to $99,999', '$100,000 to $149,999', '$150,000 to $249,999', '$250,000 to $349,999', '$350,000 to $449,999', '$450,000+', 'Not mentioned', 'Will tell you later'], required: true }
            ]
        },
        // Step 4: Education Details
        {
            title: 'Education Details',
            fields: [
                { label: 'Education', name: 'education', type: 'select', options: ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate', 'Other'], required: true }
            ]
        },
        // Step 5: Location Details
        {
            title: 'Location Details',
            fields: [
                { label: 'Country', name: 'country', type: 'select', options: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'], required: true },
                { label: 'State', name: 'state', type: 'select', options: [], required: true },
                { label: 'City', name: 'city', type: 'text', placeholder: 'Enter your city', required: true }
            ]
        },
        // Step 6: Physical Details
        {
            title: 'Physical Details',
            fields: [
                { label: 'Height', name: 'height', type: 'select', options: ['5ft 0in', '5ft 1in', '5ft 2in', '5ft 3in', '5ft 4in', '5ft 5in', '5ft 6in', '5ft 7in', '5ft 8in', '5ft 9in', '5ft 10in', '5ft 11in', '6ft 0in', '6ft 1in', '6ft 2in', '6ft 3in', '6ft 4in', '6ft 5in', '6ft 6in', '6ft 7in', '6ft 8in', '6ft 9in', '6ft 10in', '6ft 11in', '7ft 0in'], required: true },
                { label: 'Weight', name: 'weight', type: 'select', options: ['40kg', '45kg', '50kg', '55kg', '60kg', '65kg', '70kg', '75kg', '80kg', '85kg', '90kg', '95kg', '100kg', '105kg', '110kg', '115kg', '120kg', '125kg', '130kg', '135kg', '140kg', '145kg', '150kg', '155kg', '160kg', '165kg', '170kg', '175kg', '180kg'], required: true },
                { label: 'Body type', name: 'bodyType', type: 'select', options: ['Slim', 'Average', 'Athletic', 'Heavy', 'Tell you later'], required: true },
                { label: 'Family Status', name: 'familyStatus', type: 'button-group', options: ['Rich / Affluent', 'Upper Middle Class', 'Middle Class'], required: true }
            ]
        },
        // Step 7: Lifestyle
        {
            title: 'Lifestyle',
            fields: [
                { label: 'Complexion', name: 'complexion', type: 'select', options: ['Fair', 'Medium', 'Dark', 'Wheatish'], required: true },
                { label: 'Diet', name: 'diet', type: 'select', options: ['Veg', 'Non-Veg', 'Jain Food'], required: true },
                { label: 'Drink', name: 'drink', type: 'select', options: ['Do not drink', 'Drink socially/occasionally', 'Drink regularly'], required: true },
                { label: 'Smoke', name: 'smoke', type: 'select', options: ['Do not smoke', 'Smoke socially/occasionally', 'Smoke regularly'], required: true }
            ]
        },
        // Step 8: Contact
        {
            title: 'Contact',
            fields: [
                { label: 'Mobile/Cell Number', name: 'mobile', type: 'text', placeholder: 'Enter your cell No.', required: true }
            ]
        },
        // Step 9: Partner Preferences 1
        {
            title: 'Partner Preferences',
            fields: [
                { label: 'Preferred match marital status', name: 'partnerMaritalStatus', type: 'select', options: ['Single', 'Divorced', 'Widowed', 'Awaiting divorce', 'Any'], required: true },
                { label: 'Preferred match religion', name: 'partnerReligion', type: 'select', options: ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist', 'Other'], required: true },
                { label: 'Preferred match education', name: 'partnerEducation', type: 'select', options: ['Any', 'High school', 'Associates', 'Technical school', 'Bachelors', 'Masters'], required: true }
            ]
        },
        // Step 10: Partner Preferences 2
        {
            title: 'More Partner Preferences',
            fields: [
                { label: 'Preferred match countries', name: 'partnerCountries', type: 'select', options: ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Other'], required: true },
                { label: 'Preferred match age', name: 'partnerAge', type: 'age-range', required: true },
                { label: 'Preferred match habits', name: 'partnerHabits', type: 'grouped-select', options: [
                    { label: 'Drinking', name: 'partnerDrink', options: ['Do not drink', 'Drink socially/occasionally', 'Drink regularly'] },
                    { label: 'Smoking', name: 'partnerSmoke', options: ['Do not smoke', 'Smoke socially/occasionally', 'Smoke regularly'] }
                ], required: true },
                { label: 'Looking for a', name: 'lookingFor', type: 'button-group', options: ['Citizen', 'Legal Permanent Residence', 'Does not matter'], required: true },
                { label: 'Preferred match diet', name: 'partnerDiet', type: 'button-group', options: ['Veg', 'Non-Veg', 'Does not matter'], required: true }
            ]
        },
        // Step 11: About Yourself
        {
            title: 'About Yourself',
            fields: [
                { label: 'About yourself', name: 'about', type: 'textarea', placeholder: 'Enter at least 50 characters', required: true, minLength: 50, maxLength: 4000, rows: 8 }
            ]
        },
        // Step 12: Confirmation
        {
            type: 'confirmation',
            title: 'Please confirm the following details for this profile',
        }
    ];

    // State
    let currentStep = 0;
    const answers = {};
    const questionCardContainer = document.getElementById('questionCardContainer');
    const prevBtn = document.getElementById('prevBtnV2');
    const nextBtn = document.getElementById('nextBtnV2');
    const submitBtn = document.getElementById('submitBtnV2');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const form = document.getElementById('biodataFormV2');
    const previewSection = document.getElementById('biodataPreviewSectionV2');
    const previewContent = document.getElementById('biodataPreviewContentV2');
    const gotoProfileBtn = document.getElementById('gotoProfileFromPreviewBtnV2');

    // Add this data structure before the addDropdownListeners function
    const locationData = {
        'India': {
            states: {
                'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati', 'Rajahmundry', 'Kakinada', 'Kadapa', 'Anantapur'],
                'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Bomdila', 'Ziro', 'Along', 'Tezu', 'Aalo', 'Daporijo'],
                'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Sivasagar', 'Dhubri', 'Diphu'],
                'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Arrah', 'Begusarai', 'Katihar', 'Chapra'],
                'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Dhamtari', 'Rajnandgaon', 'Durg'],
                'Goa': ['Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda', 'Mormugao', 'Bicholim', 'Valpoi', 'Sanquelim', 'Curchorem'],
                'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Anand', 'Navsari'],
                'Haryana': ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula'],
                'Himachal Pradesh': ['Shimla', 'Mandi', 'Solan', 'Dharamshala', 'Bilaspur', 'Kullu', 'Chamba', 'Hamirpur', 'Una', 'Nahan'],
                'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Medininagar', 'Chatra'],
                'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Bellary', 'Bijapur', 'Shimoga'],
                'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Alappuzha', 'Palakkad', 'Malappuram', 'Kannur', 'Kottayam'],
                'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa'],
                'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Nanded'],
                'Manipur': ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Ukhrul', 'Senapati', 'Tamenglong', 'Chandel', 'Jiribam', 'Moreh'],
                'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Williamnagar', 'Baghmara', 'Nongpoh', 'Mairang', 'Resubelpara', 'Khliehriat'],
                'Mizoram': ['Aizawl', 'Lunglei', 'Saiha', 'Champhai', 'Kolasib', 'Serchhip', 'Lawngtlai', 'Mamit', 'Saitual', 'Khawzawl'],
                'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Phek', 'Kiphire', 'Longleng', 'Peren'],
                'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda'],
                'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Hoshiarpur', 'Moga', 'Firozpur', 'Pathankot'],
                'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar', 'Bharatpur', 'Sikar'],
                'Sikkim': ['Gangtok', 'Namchi', 'Mangan', 'Gyalshing', 'Rangpo', 'Singtam', 'Jorethang', 'Ravongla', 'Pelling', 'Lachen'],
                'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi'],
                'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Ramagundam', 'Khammam', 'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Siddipet'],
                'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailasahar', 'Belonia', 'Khowai', 'Teliamura', 'Ambassa', 'Sabroom', 'Amarpur'],
                'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly', 'Gorakhpur', 'Aligarh', 'Moradabad'],
                'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Kotdwara', 'Ramnagar', 'Pithoragarh'],
                'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol', 'Bardhaman', 'Malda', 'Baharampur', 'Habra', 'Kharagpur']
            }
        },
        'USA': {
            states: {
                'Alabama': ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa', 'Auburn', 'Dothan', 'Hoover', 'Decatur', 'Madison'],
                'Alaska': ['Anchorage', 'Fairbanks', 'Juneau', 'Wasilla', 'Sitka', 'Ketchikan', 'Kenai', 'Kodiak', 'Bethel', 'Palmer'],
                'Arizona': ['Phoenix', 'Tucson', 'Mesa', 'Scottsdale', 'Glendale', 'Chandler', 'Gilbert', 'Tempe', 'Peoria', 'Surprise'],
                'Arkansas': ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro', 'North Little Rock', 'Conway', 'Rogers', 'Pine Bluff', 'Bentonville'],
                'California': ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Anaheim', 'Santa Ana'],
                'Colorado': ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Thornton', 'Arvada', 'Westminster', 'Pueblo', 'Boulder'],
                'Connecticut': ['Bridgeport', 'New Haven', 'Stamford', 'Hartford', 'Waterbury', 'Norwalk', 'Danbury', 'New Britain', 'Bristol', 'Meriden'],
                'Delaware': ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna', 'Milford', 'Seaford', 'Georgetown', 'Elsmere', 'New Castle'],
                'Florida': ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg', 'Hialeah', 'Tallahassee', 'Fort Lauderdale', 'Port St. Lucie', 'Cape Coral'],
                'Georgia': ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah', 'Athens', 'Sandy Springs', 'Roswell', 'Albany', 'Johns Creek'],
                'Hawaii': ['Honolulu', 'Pearl City', 'Hilo', 'Kailua', 'Waipahu', 'Mililani Town', 'Kaneohe', 'Ewa Gentry', 'Kihei', 'Makakilo'],
                'Idaho': ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Pocatello', 'Caldwell', 'Coeur d\'Alene', 'Twin Falls', 'Lewiston', 'Post Falls'],
                'Illinois': ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville', 'Springfield', 'Peoria', 'Elgin', 'Waukegan', 'Champaign'],
                'Indiana': ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel', 'Bloomington', 'Fishers', 'Hammond', 'Gary', 'Lafayette'],
                'Iowa': ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City', 'Waterloo', 'Ames', 'West Des Moines', 'Council Bluffs', 'Dubuque'],
                'Kansas': ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka', 'Lawrence', 'Shawnee', 'Manhattan', 'Lenexa', 'Salina'],
                'Kentucky': ['Lexington', 'Louisville', 'Bowling Green', 'Owensboro', 'Covington', 'Richmond', 'Georgetown', 'Florence', 'Elizabethtown', 'Nicholasville'],
                'Louisiana': ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles', 'Kenner', 'Bossier City', 'Monroe', 'Alexandria', 'Houma'],
                'Maine': ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn', 'Biddeford', 'Sanford', 'Brunswick', 'Augusta', 'Scarborough'],
                'Maryland': ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie', 'Hagerstown', 'Annapolis', 'College Park', 'Salisbury', 'Laurel'],
                'Massachusetts': ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Brockton', 'New Bedford', 'Quincy', 'Lynn', 'Fall River'],
                'Michigan': ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Lansing', 'Ann Arbor', 'Flint', 'Dearborn', 'Livonia', 'Westland'],
                'Minnesota': ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth', 'Bloomington', 'Brooklyn Park', 'Plymouth', 'St. Cloud', 'Eagan', 'Woodbury'],
                'Mississippi': ['Jackson', 'Gulfport', 'Hattiesburg', 'Southaven', 'Biloxi', 'Meridian', 'Tupelo', 'Greenville', 'Olive Branch', 'Horn Lake'],
                'Missouri': ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence', 'Lee\'s Summit', 'O\'Fallon', 'St. Joseph', 'St. Charles', 'St. Peters'],
                'Montana': ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte', 'Helena', 'Kalispell', 'Havre', 'Anaconda', 'Miles City'],
                'Nebraska': ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney', 'Fremont', 'Hastings', 'Norfolk', 'Columbus', 'La Vista'],
                'Nevada': ['Las Vegas', 'Reno', 'Henderson', 'North Las Vegas', 'Sparks', 'Carson City', 'Fernley', 'Elko', 'Mesquite', 'Boulder City'],
                'New Hampshire': ['Manchester', 'Nashua', 'Concord', 'Dover', 'Rochester', 'Keene', 'Derry', 'Portsmouth', 'Laconia', 'Lebanon'],
                'New Jersey': ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison', 'Woodbridge', 'Lakewood', 'Toms River', 'Hamilton', 'Trenton'],
                'New Mexico': ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell', 'Farmington', 'South Valley', 'Clovis', 'Hobbs', 'Alamogordo'],
                'New York': ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'New Rochelle', 'Mount Vernon', 'Schenectady', 'Utica'],
                'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary', 'Wilmington', 'High Point', 'Greenville'],
                'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo', 'Williston', 'Dickinson', 'Mandan', 'Jamestown', 'Wahpeton'],
                'Ohio': ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton', 'Parma', 'Canton', 'Lorain', 'Hamilton'],
                'Oklahoma': ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton', 'Edmond', 'Moore', 'Midwest City', 'Enid', 'Stillwater'],
                'Oregon': ['Portland', 'Salem', 'Eugene', 'Gresham', 'Hillsboro', 'Beaverton', 'Bend', 'Medford', 'Springfield', 'Corvallis'],
                'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton', 'Bethlehem', 'Lancaster', 'Harrisburg', 'Altoona'],
                'Rhode Island': ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence', 'Woonsocket', 'Coventry', 'Cumberland', 'North Providence', 'West Warwick'],
                'South Carolina': ['Columbia', 'Charleston', 'North Charleston', 'Mount Pleasant', 'Rock Hill', 'Greenville', 'Summerville', 'Sumter', 'Hilton Head Island', 'Florence'],
                'South Dakota': ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown', 'Mitchell', 'Yankton', 'Pierre', 'Huron', 'Vermillion'],
                'Tennessee': ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro', 'Franklin', 'Jackson', 'Johnson City', 'Kingsport'],
                'Texas': ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Laredo'],
                'Utah': ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem', 'Sandy', 'Ogden', 'St. George', 'Layton', 'South Jordan'],
                'Vermont': ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier', 'Winooski', 'St. Albans', 'Newport', 'Vergennes', 'Middlebury'],
                'Virginia': ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News', 'Alexandria', 'Hampton', 'Roanoke', 'Portsmouth', 'Suffolk'],
                'Washington': ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Kent', 'Everett', 'Yakima', 'Renton', 'Spokane Valley'],
                'West Virginia': ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling', 'Weirton', 'Fairmont', 'Martinsburg', 'Beckley', 'Clarksburg'],
                'Wisconsin': ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine', 'Appleton', 'Waukesha', 'Oshkosh', 'Eau Claire', 'Janesville'],
                'Wyoming': ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs', 'Sheridan', 'Green River', 'Evanston', 'Riverton', 'Cody']
            }
        },
        'UK': {
            states: {
                'England': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Newcastle', 'Sheffield', 'Bristol', 'Leicester', 'Coventry'],
                'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness', 'Perth', 'Stirling', 'Ayr', 'Dunfermline', 'Paisley'],
                'Wales': ['Cardiff', 'Swansea', 'Newport', 'Bangor', 'St Davids', 'St Asaph', 'Wrexham', 'Rhyl', 'Llandudno', 'Aberystwyth'],
                'Northern Ireland': ['Belfast', 'Derry', 'Lisburn', 'Newry', 'Bangor', 'Craigavon', 'Ballymena', 'Newtownabbey', 'Carrickfergus', 'Coleraine']
            }
        },
        'Canada': {
            states: {
                'Alberta': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'St. Albert', 'Medicine Hat', 'Grande Prairie', 'Airdrie', 'Spruce Grove', 'Leduc'],
                'British Columbia': ['Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Richmond', 'Abbotsford', 'Coquitlam', 'Kelowna', 'Kamloops', 'Nanaimo'],
                'Manitoba': ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie', 'Winkler', 'Selkirk', 'Morden', 'Dauphin', 'The Pas'],
                'New Brunswick': ['Moncton', 'Saint John', 'Fredericton', 'Dieppe', 'Miramichi', 'Edmundston', 'Riverview', 'Quispamsis', 'Bathurst', 'Rothesay'],
                'Newfoundland and Labrador': ['St. John\'s', 'Mount Pearl', 'Conception Bay South', 'Corner Brook', 'Grand Falls-Windsor', 'Gander', 'Paradise', 'Torbay', 'Labrador City', 'Happy Valley-Goose Bay'],
                'Nova Scotia': ['Halifax', 'Sydney', 'Truro', 'New Glasgow', 'Glace Bay', 'Kentville', 'Dartmouth', 'Amherst', 'New Waterford', 'Port Hawkesbury'],
                'Ontario': ['Toronto', 'Ottawa', 'Hamilton', 'London', 'Windsor', 'Oshawa', 'St. Catharines', 'Sudbury', 'Barrie', 'Kingston'],
                'Prince Edward Island': ['Charlottetown', 'Summerside', 'Stratford', 'Cornwall', 'Montague', 'Kensington', 'Souris', 'Alberton', 'Tignish', 'Georgetown'],
                'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke', 'Saguenay', 'Levis', 'Trois-Rivieres', 'Terrebonne'],
                'Saskatchewan': ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current', 'Yorkton', 'North Battleford', 'Estevan', 'Weyburn', 'Cranbrook'],
                'Northwest Territories': ['Yellowknife', 'Hay River', 'Inuvik', 'Fort Smith', 'Behchoko', 'Fort Simpson', 'Tuktoyaktuk', 'Fort Providence', 'Fort Resolution', 'Fort Liard'],
                'Nunavut': ['Iqaluit', 'Rankin Inlet', 'Arviat', 'Baker Lake', 'Cambridge Bay', 'Igloolik', 'Pangnirtung', 'Pond Inlet', 'Cape Dorset', 'Kugluktuk'],
                'Yukon': ['Whitehorse', 'Dawson City', 'Watson Lake', 'Haines Junction', 'Carmacks', 'Faro', 'Mayo', 'Teslin', 'Pelly Crossing', 'Ross River']
            }
        },
        'Australia': {
            states: {
                'New South Wales': ['Sydney', 'Newcastle', 'Wollongong', 'Maitland', 'Coffs Harbour', 'Wagga Wagga', 'Albury', 'Port Macquarie', 'Tamworth', 'Orange'],
                'Victoria': ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo', 'Melton', 'Mildura', 'Shepparton', 'Wodonga', 'Sunbury', 'Traralgon'],
                'Queensland': ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Townsville', 'Cairns', 'Toowoomba', 'Mackay', 'Rockhampton', 'Bundaberg', 'Hervey Bay'],
                'Western Australia': ['Perth', 'Bunbury', 'Geraldton', 'Albany', 'Kalgoorlie', 'Broome', 'Port Hedland', 'Karratha', 'Busselton', 'Mandurah'],
                'South Australia': ['Adelaide', 'Mount Gambier', 'Whyalla', 'Murray Bridge', 'Port Augusta', 'Port Pirie', 'Port Lincoln', 'Victor Harbor', 'Gawler', 'Millicent'],
                'Tasmania': ['Hobart', 'Launceston', 'Devonport', 'Burnie', 'Ulverstone', 'Kingston', 'Clarence', 'Glenorchy', 'Sorell', 'Bridgewater'],
                'Northern Territory': ['Darwin', 'Palmerston', 'Alice Springs', 'Katherine', 'Tennant Creek', 'Jabiru', 'Nhulunbuy', 'Jabiru', 'Tennant Creek', 'Katherine'],
                'Australian Capital Territory': ['Canberra', 'Belconnen', 'Woden', 'Tuggeranong', 'Gungahlin', 'Fyshwick', 'Dickson', 'Kingston', 'Manuka', 'Civic']
            }
        }
    };

    function renderStep() {
        const step = steps[currentStep];
        let html = '';
        if (step.type === 'welcome') {
            html += `<div class="welcome-step"><h2>${step.title}</h2><p>${step.subtitle}</p><button type="button" class="next-btn-v2" id="welcomeContinueBtn">Continue</button></div>`;
            questionCardContainer.innerHTML = html;
            document.getElementById('welcomeContinueBtn').onclick = () => {
                currentStep++;
                renderStep();
                updateProgress();
                updateButtons();
            };
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'none';
            return;
        }
        if (step.type === 'confirmation') {
            html += `<h2>${step.title}</h2><ul class="confirmation-list">`;
            let idx = 0;
            steps.forEach((s, sIdx) => {
                if (s.fields) {
                    s.fields.forEach(field => {
                        let value = answers[field.name];
                        if (field.type === 'button-group' || field.type === 'select') {
                            value = value || '';
                        } else if (field.type === 'age-range') {
                            value = value ? `${value.from} - ${value.to}` : '';
                        } else if (field.type === 'grouped-select') {
                            value = value ? Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', ') : '';
                        }
                        html += `<li><strong>${field.label}:</strong> ${value || ''} <button type="button" class="edit-btn" data-step="${sIdx}">Edit</button></li>`;
                        idx++;
                    });
                }
            });
            html += '</ul>';
            questionCardContainer.innerHTML = html;
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.onclick = function() {
                    currentStep = parseInt(this.getAttribute('data-step'));
                    renderStep();
                    updateProgress();
                    updateButtons();
                };
            });
            prevBtn.style.display = 'inline-block';
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
            return;
        }
        html += `<h2>${step.title}</h2>`;
        step.fields.forEach(field => {
            if (field.type === 'text') {
                html += `<label>${field.label}</label><input type="text" name="${field.name}" id="${field.name}" value="${answers[field.name] || ''}" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''} />`;
            } else if (field.type === 'textarea') {
                html += `<label>${field.label}</label><textarea name="${field.name}" id="${field.name}" rows="${field.rows || 4}" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''} style="width: 100%; min-height: 120px; resize: vertical;">${answers[field.name] || ''}</textarea>`;
            } else if (field.type === 'select') {
                if (field.name === 'country') {
                    html += `<label>${field.label}</label><select name="${field.name}" id="${field.name}" ${field.required ? 'required' : ''}><option value="">Please select country...</option>${field.options.map(opt => `<option value="${opt}" ${answers[field.name] === opt ? 'selected' : ''}>${opt}</option>`).join('')}</select>`;
                } else if (field.name === 'state') {
                    html += `<label>${field.label}</label><select name="${field.name}" id="${field.name}" ${field.required ? 'required' : ''}><option value="">Please select state...</option></select>`;
                } else if (field.name === 'city') {
                    html += `<label>${field.label}</label><select name="${field.name}" id="${field.name}" ${field.required ? 'required' : ''}><option value="">Please select city...</option></select>`;
                } else {
                    html += `<label>${field.label}</label><select name="${field.name}" id="${field.name}" ${field.required ? 'required' : ''}><option value="">Please select...</option>${field.options.map(opt => `<option value="${opt}" ${answers[field.name] === opt ? 'selected' : ''}>${opt}</option>`).join('')}</select>`;
                }
            } else if (field.type === 'button-group') {
                html += `<label>${field.label}</label><div class="button-group">${field.options.map(opt => `<button type="button" class="btn-group-opt${answers[field.name] === opt ? ' selected' : ''}" data-name="${field.name}" data-value="${opt}">${opt}</button>`).join('')}</div>`;
            } else if (field.type === 'age-range') {
                const from = answers[field.name]?.from || '';
                const to = answers[field.name]?.to || '';
                html += `<label>${field.label}</label><div class="age-range-group"><input type="number" min="18" max="99" id="${field.name}_from" placeholder="From" value="${from}" style="width:80px;"> - <input type="number" min="18" max="99" id="${field.name}_to" placeholder="To" value="${to}" style="width:80px;"></div>`;
            } else if (field.type === 'grouped-select') {
                html += `<label>${field.label}</label><div class="grouped-select" style="display: flex; flex-direction: column; gap: 15px;">`;
                field.options.forEach(optGroup => {
                    const val = answers[field.name]?.[optGroup.name] || '';
                    html += `<div style="display: flex; flex-direction: column; gap: 5px;"><label style="font-weight:400;">${optGroup.label}</label><select id="${field.name}_${optGroup.name}" style="width: 100%;"><option value="">Please select...</option>${optGroup.options.map(opt => `<option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>`).join('')}</select></div>`;
                });
                html += '</div>';
            }
        });
        questionCardContainer.innerHTML = html;

        // Button group logic
        document.querySelectorAll('.btn-group-opt').forEach(btn => {
            btn.onclick = function() {
                const name = this.getAttribute('data-name');
                const value = this.getAttribute('data-value');
                answers[name] = value;
                document.querySelectorAll(`.btn-group-opt[data-name="${name}"]`).forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
            };
        });

        // Add dropdown listeners for cascading dropdowns
        addDropdownListeners();

        // If we have saved answers, populate the state and city dropdowns
        if (answers.country && answers.state) {
            const countrySelect = document.getElementById('country');
            const stateSelect = document.getElementById('state');
            const cityInput = document.getElementById('city');

            if (countrySelect && stateSelect && cityInput) {
                // Trigger country change to populate states
                const countryEvent = new Event('change');
                countrySelect.value = answers.country;
                countrySelect.dispatchEvent(countryEvent);

                // Wait for states to populate, then set state and trigger city population
                setTimeout(() => {
                    stateSelect.value = answers.state;
                    const stateEvent = new Event('change');
                    stateSelect.dispatchEvent(stateEvent);

                    // Wait for cities to populate, then set city
                    setTimeout(() => {
                        if (answers.city) {
                            cityInput.value = answers.city;
                        }
                    }, 100);
                }, 100);
            }
        }
    }

    function updateProgress() {
        const percent = Math.round((currentStep) / (steps.length - 1) * 100);
        progressBar.style.width = percent + '%';
        progressText.textContent = percent + '% completed';
    }

    function updateButtons() {
        prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = (currentStep === steps.length - 1 || steps[currentStep].type === 'welcome' || steps[currentStep].type === 'confirmation') ? 'none' : 'inline-block';
        submitBtn.style.display = (steps[currentStep].type === 'confirmation') ? 'inline-block' : 'none';
    }

    function saveCurrentAnswers() {
        const step = steps[currentStep];
        if (!step.fields) return;
        step.fields.forEach(field => {
            if (field.type === 'text' || field.type === 'textarea' || field.type === 'select') {
                const el = document.getElementById(field.name);
                if (el) answers[field.name] = el.value;
            } else if (field.type === 'age-range') {
                const from = document.getElementById(field.name + '_from').value;
                const to = document.getElementById(field.name + '_to').value;
                answers[field.name] = { from, to };
            } else if (field.type === 'grouped-select') {
                answers[field.name] = {};
                field.options.forEach(optGroup => {
                    const el = document.getElementById(field.name + '_' + optGroup.name);
                    if (el) answers[field.name][optGroup.name] = el.value;
                });
            }
        });
    }

    function validateCurrent() {
        const step = steps[currentStep];
        if (!step.fields) return true;
        let valid = true;
        step.fields.forEach(field => {
            if (field.required) {
                if (field.type === 'text' || field.type === 'select') {
                    const el = document.getElementById(field.name);
                    if (!el || !el.value.trim()) valid = false;
                } else if (field.type === 'textarea') {
                    const el = document.getElementById(field.name);
                    if (!el || el.value.trim().length < (field.minLength || 1)) valid = false;
                } else if (field.type === 'button-group') {
                    if (!answers[field.name]) valid = false;
                } else if (field.type === 'age-range') {
                    const from = document.getElementById(field.name + '_from').value;
                    const to = document.getElementById(field.name + '_to').value;
                    if (!from || !to || parseInt(from) > parseInt(to)) valid = false;
                } else if (field.type === 'grouped-select') {
                    field.options.forEach(optGroup => {
                        const el = document.getElementById(field.name + '_' + optGroup.name);
                        if (!el || !el.value) valid = false;
                    });
                }
            }
        });
        return valid;
    }

    prevBtn.onclick = function() {
        if (currentStep > 0) {
            saveCurrentAnswers();
            currentStep--;
            renderStep();
            updateProgress();
            updateButtons();
        }
    };

    nextBtn.onclick = function() {
        if (!validateCurrent()) {
            alert('Please fill in all required fields.');
            return;
        }
        saveCurrentAnswers();
        if (currentStep < steps.length - 1) {
            currentStep++;
            renderStep();
            updateProgress();
            updateButtons();
        }
    };

    form.onsubmit = function(e) {
        e.preventDefault();
        if (steps[currentStep].type === 'confirmation') {
            // Save answers to localStorage (simulate user list)
            let users = JSON.parse(localStorage.getItem('usersList')) || [];
            users.push(answers);
            localStorage.setItem('usersList', JSON.stringify(users));
            // Show submitted message
            form.style.display = 'none';
            previewSection.style.display = 'block';
            previewContent.innerHTML = `<div style="text-align:center;padding:40px 0;"><i class='fa fa-check-circle' style='font-size:3rem;color:#28a745;'></i><h2 style='color:#28a745;margin:18px 0 8px;'>Submitted!</h2><p>Your biodata has been submitted successfully.</p></div>`;
            document.querySelector('.biodata-preview-actions-v2').style.display = 'none';
            setTimeout(function() {
                window.location.href = 'main.html';
            }, 2000);
        } else {
            if (!validateCurrent()) {
                alert('Please fill in all required fields.');
                return;
            }
            saveCurrentAnswers();
            currentStep++;
            renderStep();
            updateProgress();
            updateButtons();
        }
    };

    gotoProfileBtn.onclick = function() {
        window.location.href = 'profile.html';
    };

    // Initial render
    renderStep();
    updateProgress();
    updateButtons();

    // 3. Fix dropdown persistence: ensure answers are always saved on change
    function addDropdownListeners() {
        const countrySelect = document.getElementById('country');
        const stateSelect = document.getElementById('state');
        const cityInput = document.getElementById('city');

        if (countrySelect) {
            countrySelect.addEventListener('change', function() {
                const country = this.value;
                // Clear and reset state dropdown
                stateSelect.innerHTML = '<option value="">Please select state...</option>';
                stateSelect.disabled = !country;
                
                // Clear city input
                if (cityInput) {
                    cityInput.value = '';
                }

                if (country && locationData[country]) {
                    const states = Object.keys(locationData[country].states);
                    states.forEach(state => {
                        const option = document.createElement('option');
                        option.value = state;
                        option.textContent = state;
                        stateSelect.appendChild(option);
                    });
                    stateSelect.disabled = false;
                }
                
                answers['country'] = country;
                answers['state'] = '';
                answers['city'] = '';
            });
        }

        if (stateSelect) {
            stateSelect.addEventListener('change', function() {
                const country = countrySelect.value;
                const state = this.value;
                
                // Clear city input
                if (cityInput) {
                    cityInput.value = '';
                }
                
                answers['state'] = state;
                answers['city'] = '';
            });
        }

        if (cityInput) {
            cityInput.addEventListener('input', function() {
                answers['city'] = this.value;
            });
        }

        // Initialize dropdowns if we have saved values
        if (answers.country) {
            countrySelect.value = answers.country;
            const countryEvent = new Event('change');
            countrySelect.dispatchEvent(countryEvent);

            if (answers.state) {
                setTimeout(() => {
                    stateSelect.value = answers.state;
                    if (answers.city && cityInput) {
                        cityInput.value = answers.city;
                    }
                }, 100);
            }
        }
    }
}); 