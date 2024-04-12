// add hospital roles here

export const staff = [
  { name: "K Sharma", designation: "Nurse" },
  { name: "D Pandey", designation: "Nurse" },
  { name: "A sharma", designation: "Nurse" },
  { name: "J Patil", designation: "Nurse" },
  { name: "V Jade", designation: "Sister" },
  { name: "A Jadhav", designation: "Sister" },
  { name: "K Dasane", designation: "Cleaning staff" },
];

export const doctor = [
  { name: "Dr.Pandey", designation: "General Surgeon" },
  { name: "Dr.sharma", designation: "General Surgeon" },
  { name: "Dr.Kiran", designation: "Anesthesia Professional" },
];

export const opd_patient = [
  {
    name: "John Doe",
    status: "Waiting",
    doctor: "Dr. Smith",
    ailment: "Fever",
  },
  {
    name: "Jane Smith",
    status: "Checkup Done",
    doctor: "Dr. Johnson",
    ailment: "Cough",
  },
  {
    name: "Michael Johnson",
    status: "Waiting",
    doctor: "Dr. Lee",
    ailment: "Headache",
  },
  {
    name: "Emily Brown",
    status: "Checkup Ongoing",
    doctor: "Dr. Wilson",
    ailment: "Back Pain",
  },
  {
    name: "William Davis",
    status: "Waiting",
    doctor: "Dr. Martinez",
    ailment: "Fatigue",
  },
  {
    name: "Olivia Garcia",
    status: "Waiting",
    doctor: "Dr. Anderson",
    ailment: "Allergies",
  },
  {
    name: "Sophia Martinez",
    status: "Waiting",
    doctor: "Dr. Harris",
    ailment: "Sore Throat",
  },
  {
    name: "Ethan Thomas",
    status: "Checkup Done",
    doctor: "Dr. White",
    ailment: "Sprained Ankle",
  },
];

export const ipd_patient = [
  { name: "Emma Wilson", doctor: "Dr. Taylor", ward: "2", bed: "12" },
  { name: "James Johnson", doctor: "Dr. Davis", ward: "4", bed: "5" },
  { name: "Ava Brown", doctor: "Dr. Moore", ward: "3", bed: "8" },
  { name: "Mia Miller", doctor: "Dr. Clark", ward: "1", bed: "11" },
  { name: "Liam Taylor", doctor: "Dr. Robinson", ward: "2", bed: "7" },
  { name: "Harper Thomas", doctor: "Dr. Harris", ward: "4", bed: "3" },
  { name: "Benjamin Lee", doctor: "Dr. Wright", ward: "3", bed: "9" },
  { name: "Amelia Martinez", doctor: "Dr. King", ward: "1", bed: "15" },
];

export const emergencies = [
  {
    RoomNo: "1201",
    EmergencyType: "Heart Attack",
    instructions: "All the staff in the area to respond, get doctor patel",
  },
];

export const appointments = [
  {
    name: "K. wagh",
    doctor: "Dr. Patel",
    ailment: "Normal Checkup",
  },
  {
    name: "A Jad",
    doctor: "Dr. Patel",
    ailment: "Stomach Ache",
  },
  {
    name: "S borse",
    doctor: "Dr. Patel",
    ailment: "Routine checkup",
  },
];


export const nextShift =[
  { name: "K Sharma", designation: "Nurse" },
  { name: "D Pandey", designation: "Nurse" },
  { name: "A sharma", designation: "Nurse" },
  { name: "J Patil", designation: "Nurse" },
  { name: "V Jade", designation: "Sister" },
  { name: "A Jadhav", designation: "Sister" },
  { name: "K Dasane", designation: "Cleaning staff" },
]

export const wards = [
  {
    name: "Ward 1",
    occupancy: "18",
    totalCapacity: "18",
    patients: [
      {
        name: "John Doe",
        ailment: "Fever",
        doctor: "Dr. Smith",
        checkInDate: "2024-04-12",
        lastVisited: "2024-04-12"
      },
      {
        name: "Jane Smith",
        ailment: "Broken Leg",
        doctor: "Dr. Johnson",
        checkInDate: "2024-04-10",
        lastVisited: "2024-04-12"
      },
      {
        name: "Alice Johnson",
        ailment: "Headache",
        doctor: "Dr. Lee",
        checkInDate: "2024-04-11",
        lastVisited: "2024-04-12"
      },
      {
        name: "Bob Williams",
        ailment: "Stomachache",
        doctor: "Dr. Garcia",
        checkInDate: "2024-04-11",
        lastVisited: "2024-04-12"
      },
      {
        name: "Emily Brown",
        ailment: "Migraine",
        doctor: "Dr. Anderson",
        checkInDate: "2024-04-09",
        lastVisited: "2024-04-12"
      },
      {
        name: "Michael Jones",
        ailment: "Flu",
        doctor: "Dr. Martinez",
        checkInDate: "2024-04-08",
        lastVisited: "2024-04-12"
      },
      {
        name: "Sarah Wilson",
        ailment: "Sprained Ankle",
        doctor: "Dr. Thompson",
        checkInDate: "2024-04-07",
        lastVisited: "2024-04-12"
      },
      {
        name: "David Brown",
        ailment: "Sore Throat",
        doctor: "Dr. Adams",
        checkInDate: "2024-04-06",
        lastVisited: "2024-04-12"
      },
      {
        name: "Emma Johnson",
        ailment: "Allergy",
        doctor: "Dr. Harris",
        checkInDate: "2024-04-05",
        lastVisited: "2024-04-12"
      },
      {
        name: "James Smith",
        ailment: "Injury",
        doctor: "Dr. Carter",
        checkInDate: "2024-04-04",
        lastVisited: "2024-04-12"
      },
      {
        name: "Olivia Garcia",
        ailment: "Cough",
        doctor: "Dr. Cooper",
        checkInDate: "2024-04-03",
        lastVisited: "2024-04-12"
      },
      {
        name: "William Wilson",
        ailment: "Back Pain",
        doctor: "Dr. Parker",
        checkInDate: "2024-04-02",
        lastVisited: "2024-04-12"
      },
      {
        name: "Sophia Martinez",
        ailment: "Rash",
        doctor: "Dr. Evans",
        checkInDate: "2024-04-01",
        lastVisited: "2024-04-12"
      },
      {
        name: "Liam Thompson",
        ailment: "Earache",
        doctor: "Dr. Rivera",
        checkInDate: "2024-03-31",
        lastVisited: "2024-04-12"
      },
      {
        name: "Ava Adams",
        ailment: "Eye Infection",
        doctor: "Dr. Nelson",
        checkInDate: "2024-03-30",
        lastVisited: "2024-04-12"
      },
      {
        name: "Noah Harris",
        ailment: "Joint Pain",
        doctor: "Dr. Mitchell",
        checkInDate: "2024-03-29",
        lastVisited: "2024-04-12"
      },
      {
        name: "Isabella Carter",
        ailment: "Anxiety",
        doctor: "Dr. King",
        checkInDate: "2024-03-28",
        lastVisited: "2024-04-12"
      },
      {
        name: "Mason Cooper",
        ailment: "Nausea",
        doctor: "Dr. Wright",
        checkInDate: "2024-03-27",
        lastVisited: "2024-04-12"
      }
    ]
  },
  {
    name: "Ward 2",
    occupancy: "5",
    totalCapacity: "10",
    patients: [
      {
        name: "Sophie Davis",
        ailment: "Fever",
        doctor: "Dr. Patel",
        checkInDate: "2024-04-12",
        lastVisited: "2024-04-12"
      },
      {
        name: "Matthew Wilson",
        ailment: "Broken Arm",
        doctor: "Dr. Lopez",
        checkInDate: "2024-04-10",
        lastVisited: "2024-04-12"
      },
      {
        name: "Ella Martinez",
        ailment: "Sprained Wrist",
        doctor: "Dr. Garcia",
        checkInDate: "2024-04-09",
        lastVisited: "2024-04-12"
      },
      {
        name: "Lucas Brown",
        ailment: "Cough",
        doctor: "Dr. Lewis",
        checkInDate: "2024-04-08",
        lastVisited: "2024-04-12"
      },
      {
        name: "Amelia Johnson",
        ailment: "Headache",
        doctor: "Dr. Turner",
        checkInDate: "2024-04-07",
        lastVisited: "2024-04-12"
      }
    ]
  }
];