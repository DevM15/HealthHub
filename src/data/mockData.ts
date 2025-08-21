import { Patient } from '../types/Patient';

export const generateMockPatients = (): Patient[] => {
  return [
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 45,
      gender: 'Female',
      roomNumber: '302A',
      admissionDate: '2025-01-10',
      status: 'stable',
      daysInHospital: 3,
      dischargeReadiness: 85,
      primaryDiagnosis: 'Acute Myocardial Infarction',
      secondaryDiagnoses: ['Hypertension', 'Type 2 Diabetes'],
      assignedDoctor: {
        name: 'Dr. Michael Chen',
        specialty: 'Cardiology',
        phone: '(555) 123-4567'
      },
      nurses: ['Jennifer Martinez', 'Robert Kim'],
      vitals: {
        heartRate: 72,
        bloodPressure: '140/90',
        temperature: 98.6,
        oxygenSaturation: 98
      },
      medications: [
        { name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily', startDate: '2025-01-10' },
        { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', startDate: '2025-01-10' }
      ],
      labResults: [
        { test: 'Troponin I', result: '0.8 ng/mL', normalRange: '<0.04 ng/mL', date: '2025-01-12', status: 'abnormal' },
        { test: 'Hemoglobin', result: '12.5 g/dL', normalRange: '12-16 g/dL', date: '2025-01-12', status: 'normal' }
      ],
      procedures: [
        { name: 'Cardiac Catheterization', date: '2025-01-11', status: 'completed' },
        { name: 'Echocardiogram', date: '2025-01-13', status: 'scheduled' }
      ],
      dischargeRequirements: [
        { requirement: 'Stable cardiac enzymes', status: 'completed', completedDate: '2025-01-12' },
        { requirement: 'Patient education completed', status: 'completed', completedDate: '2025-01-12' },
        { requirement: 'Follow-up appointment scheduled', status: 'in-progress' }
      ],
      notes: [
        { date: '2025-01-12', author: 'Dr. Michael Chen', content: 'Patient responding well to treatment. Chest pain resolved.', type: 'medical' },
        { date: '2025-01-12', author: 'Jennifer Martinez', content: 'Patient ambulatory, no complaints of pain.', type: 'nursing' }
      ]
    },
    {
      id: '2',
      name: 'Robert Thompson',
      age: 68,
      gender: 'Male',
      roomNumber: '415B',
      admissionDate: '2025-01-08',
      status: 'critical',
      daysInHospital: 5,
      dischargeReadiness: 35,
      primaryDiagnosis: 'Pneumonia with Sepsis',
      secondaryDiagnoses: ['COPD', 'Atrial Fibrillation'],
      assignedDoctor: {
        name: 'Dr. Lisa Rodriguez',
        specialty: 'Pulmonology',
        phone: '(555) 234-5678'
      },
      nurses: ['Maria Santos', 'David Johnson'],
      vitals: {
        heartRate: 110,
        bloodPressure: '90/60',
        temperature: 101.2,
        oxygenSaturation: 89
      },
      medications: [
        { name: 'Vancomycin', dosage: '1g', frequency: 'Every 12 hours', startDate: '2025-01-08' },
        { name: 'Piperacillin-Tazobactam', dosage: '4.5g', frequency: 'Every 8 hours', startDate: '2025-01-08' }
      ],
      labResults: [
        { test: 'WBC Count', result: '18,500/μL', normalRange: '4,000-11,000/μL', date: '2025-01-12', status: 'critical' },
        { test: 'Procalcitonin', result: '5.2 ng/mL', normalRange: '<0.25 ng/mL', date: '2025-01-12', status: 'critical' }
      ],
      procedures: [
        { name: 'Chest X-ray', date: '2025-01-12', status: 'completed' },
        { name: 'CT Chest', date: '2025-01-13', status: 'scheduled' }
      ],
      dischargeRequirements: [
        { requirement: 'Fever-free for 24 hours', status: 'pending' },
        { requirement: 'Oxygen saturation >95% on room air', status: 'pending' },
        { requirement: 'Completing antibiotic course', status: 'in-progress' }
      ],
      notes: [
        { date: '2025-01-12', author: 'Dr. Lisa Rodriguez', content: 'Patient still febrile, increasing oxygen requirements.', type: 'medical' },
        { date: '2025-01-12', author: 'Maria Santos', content: 'Patient reports improved breathing, appetite returning.', type: 'nursing' }
      ]
    },
    {
      id: '3',
      name: 'Emily Davis',
      age: 32,
      gender: 'Female',
      roomNumber: '220A',
      admissionDate: '2025-01-11',
      status: 'recovering',
      daysInHospital: 2,
      dischargeReadiness: 92,
      primaryDiagnosis: 'Appendectomy (Laparoscopic)',
      secondaryDiagnoses: [],
      assignedDoctor: {
        name: 'Dr. James Wilson',
        specialty: 'General Surgery',
        phone: '(555) 345-6789'
      },
      nurses: ['Angela Thompson', 'Carlos Rivera'],
      vitals: {
        heartRate: 68,
        bloodPressure: '118/75',
        temperature: 98.8,
        oxygenSaturation: 99
      },
      medications: [
        { name: 'Ibuprofen', dosage: '600mg', frequency: 'Every 6 hours as needed', startDate: '2025-01-11' },
        { name: 'Ondansetron', dosage: '4mg', frequency: 'Every 8 hours as needed', startDate: '2025-01-11' }
      ],
      labResults: [
        { test: 'Complete Blood Count', result: 'Normal', normalRange: 'Normal', date: '2025-01-12', status: 'normal' },
        { test: 'Basic Metabolic Panel', result: 'Normal', normalRange: 'Normal', date: '2025-01-12', status: 'normal' }
      ],
      procedures: [
        { name: 'Laparoscopic Appendectomy', date: '2025-01-11', status: 'completed' }
      ],
      dischargeRequirements: [
        { requirement: 'Tolerating regular diet', status: 'completed', completedDate: '2025-01-12' },
        { requirement: 'Pain controlled with oral medications', status: 'completed', completedDate: '2025-01-12' },
        { requirement: 'Wound healing appropriately', status: 'completed', completedDate: '2025-01-12' }
      ],
      notes: [
        { date: '2025-01-12', author: 'Dr. James Wilson', content: 'Surgical site healing well, no signs of infection. Ready for discharge.', type: 'medical' },
        { date: '2025-01-12', author: 'Angela Thompson', content: 'Patient ambulating well, minimal pain complaints.', type: 'nursing' }
      ]
    },
    {
      id: '4',
      name: 'William Brown',
      age: 75,
      gender: 'Male',
      roomNumber: '508C',
      admissionDate: '2025-01-09',
      status: 'observation',
      daysInHospital: 4,
      dischargeReadiness: 70,
      primaryDiagnosis: 'Congestive Heart Failure Exacerbation',
      secondaryDiagnoses: ['Chronic Kidney Disease', 'Diabetes Mellitus'],
      assignedDoctor: {
        name: 'Dr. Patricia Lee',
        specialty: 'Cardiology',
        phone: '(555) 456-7890'
      },
      nurses: ['Michael Chang', 'Sarah Williams'],
      vitals: {
        heartRate: 88,
        bloodPressure: '135/82',
        temperature: 98.4,
        oxygenSaturation: 94
      },
      medications: [
        { name: 'Furosemide', dosage: '40mg', frequency: 'Twice daily', startDate: '2025-01-09' },
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2025-01-09' }
      ],
      labResults: [
        { test: 'BNP', result: '450 pg/mL', normalRange: '<100 pg/mL', date: '2025-01-12', status: 'abnormal' },
        { test: 'Creatinine', result: '1.8 mg/dL', normalRange: '0.6-1.2 mg/dL', date: '2025-01-12', status: 'abnormal' }
      ],
      procedures: [
        { name: 'Echocardiogram', date: '2025-01-10', status: 'completed' },
        { name: 'Chest X-ray', date: '2025-01-12', status: 'completed' }
      ],
      dischargeRequirements: [
        { requirement: 'Fluid balance stable', status: 'in-progress' },
        { requirement: 'Home care services arranged', status: 'pending' },
        { requirement: 'Medication reconciliation', status: 'completed', completedDate: '2025-01-11' }
      ],
      notes: [
        { date: '2025-01-12', author: 'Dr. Patricia Lee', content: 'Diuresis ongoing, patient losing excess fluid. Monitor kidney function.', type: 'medical' },
        { date: '2025-01-12', author: 'Michael Chang', content: 'Patient reports less shortness of breath, sleeping better.', type: 'nursing' }
      ]
    },
    {
      id: '5',
      name: 'Jennifer Garcia',
      age: 28,
      gender: 'Female',
      roomNumber: '156A',
      admissionDate: '2025-01-12',
      status: 'stable',
      daysInHospital: 1,
      dischargeReadiness: 88,
      primaryDiagnosis: 'Postpartum - Normal Delivery',
      secondaryDiagnoses: ['Gestational Diabetes (resolved)'],
      assignedDoctor: {
        name: 'Dr. Karen Anderson',
        specialty: 'Obstetrics & Gynecology',
        phone: '(555) 567-8901'
      },
      nurses: ['Lisa Park', 'Thomas Miller'],
      vitals: {
        heartRate: 75,
        bloodPressure: '125/80',
        temperature: 99.1,
        oxygenSaturation: 98
      },
      medications: [
        { name: 'Ibuprofen', dosage: '600mg', frequency: 'Every 6 hours', startDate: '2025-01-12' },
        { name: 'Prenatal Vitamins', dosage: '1 tablet', frequency: 'Once daily', startDate: '2025-01-12' }
      ],
      labResults: [
        { test: 'Hemoglobin', result: '10.2 g/dL', normalRange: '12-16 g/dL', date: '2025-01-12', status: 'abnormal' },
        { test: 'Glucose', result: '105 mg/dL', normalRange: '70-100 mg/dL', date: '2025-01-12', status: 'normal' }
      ],
      procedures: [
        { name: 'Normal Vaginal Delivery', date: '2025-01-12', status: 'completed' }
      ],
      dischargeRequirements: [
        { requirement: 'Successful breastfeeding', status: 'completed', completedDate: '2025-01-12' },
        { requirement: 'Newborn care education', status: 'completed', completedDate: '2025-01-12' },
        { requirement: 'Follow-up appointment scheduled', status: 'in-progress' }
      ],
      notes: [
        { date: '2025-01-12', author: 'Dr. Karen Anderson', content: 'Delivery uncomplicated. Mother and baby doing well.', type: 'medical' },
        { date: '2025-01-12', author: 'Lisa Park', content: 'Breastfeeding well established, patient comfortable.', type: 'nursing' }
      ]
    },
    {
      id: '6',
      name: 'David Martinez',
      age: 52,
      gender: 'Male',
      roomNumber: '333B',
      admissionDate: '2025-01-07',
      status: 'recovering',
      daysInHospital: 6,
      dischargeReadiness: 78,
      primaryDiagnosis: 'Hip Replacement Surgery',
      secondaryDiagnoses: ['Osteoarthritis', 'Hypertension'],
      assignedDoctor: {
        name: 'Dr. Robert Kim',
        specialty: 'Orthopedic Surgery',
        phone: '(555) 678-9012'
      },
      nurses: ['Nancy Davis', 'Kevin Lopez'],
      vitals: {
        heartRate: 70,
        bloodPressure: '148/88',
        temperature: 98.2,
        oxygenSaturation: 97
      },
      medications: [
        { name: 'Oxycodone', dosage: '5mg', frequency: 'Every 4-6 hours as needed', startDate: '2025-01-07' },
        { name: 'Enoxaparin', dosage: '40mg', frequency: 'Once daily', startDate: '2025-01-07' }
      ],
      labResults: [
        { test: 'Complete Blood Count', result: 'Normal', normalRange: 'Normal', date: '2025-01-11', status: 'normal' },
        { test: 'PT/INR', result: '1.1', normalRange: '0.8-1.2', date: '2025-01-11', status: 'normal' }
      ],
      procedures: [
        { name: 'Total Hip Replacement', date: '2025-01-07', status: 'completed' },
        { name: 'Physical Therapy Evaluation', date: '2025-01-10', status: 'completed' }
      ],
      dischargeRequirements: [
        { requirement: 'Physical therapy goals met', status: 'in-progress' },
        { requirement: 'Home safety assessment', status: 'completed', completedDate: '2025-01-11' },
        { requirement: 'Pain controlled with oral medications', status: 'completed', completedDate: '2025-01-10' }
      ],
      notes: [
        { date: '2025-01-12', author: 'Dr. Robert Kim', content: 'Surgical site healing well. Patient making good progress with PT.', type: 'medical' },
        { date: '2025-01-12', author: 'Nancy Davis', content: 'Patient ambulating with walker, following hip precautions.', type: 'nursing' }
      ]
    }
  ];
};