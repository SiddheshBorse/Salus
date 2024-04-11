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
  {name: "John Doe", status: "Waiting", doctor: "Dr. Smith", ailment: "Fever"},
  {name: "Jane Smith", status: "Checkup Done", doctor: "Dr. Johnson", ailment: "Cough"},
  {name: "Michael Johnson", status: "Waiting", doctor: "Dr. Lee", ailment: "Headache"},
  {name: "Emily Brown", status: "Checkup Ongoing", doctor: "Dr. Wilson", ailment: "Back Pain"},
  {name: "William Davis", status: "Waiting", doctor: "Dr. Martinez", ailment: "Fatigue"},
  {name: "Olivia Garcia", status: "Waiting", doctor: "Dr. Anderson", ailment: "Allergies"},
  {name: "Sophia Martinez", status: "Waiting", doctor: "Dr. Harris", ailment: "Sore Throat"},
  {name: "Ethan Thomas", status: "Checkup Done", doctor: "Dr. White", ailment: "Sprained Ankle"}
];

export const ipd_patient = [
  {name: "Emma Wilson", doctor: "Dr. Taylor", ward: "2", bed: "12"},
  {name: "James Johnson", doctor: "Dr. Davis", ward: "4", bed: "5"},
  {name: "Ava Brown", doctor: "Dr. Moore", ward: "3", bed: "8"},
  {name: "Mia Miller", doctor: "Dr. Clark", ward: "1", bed: "11"},
  {name: "Liam Taylor", doctor: "Dr. Robinson", ward: "2", bed: "7"},
  {name: "Harper Thomas", doctor: "Dr. Harris", ward: "4", bed: "3"},
  {name: "Benjamin Lee", doctor: "Dr. Wright", ward: "3", bed: "9"},
  {name: "Amelia Martinez", doctor: "Dr. King", ward: "1", bed: "15"}
];

export const emergencies=[
  {RoomNo: "1201", EmergencyType: "Heart Attack", instructions:"All the staff in the area to respond, get doctor patel"}
]