export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  roomNumber: string;
  admissionDate: string;
  status: 'critical' | 'stable' | 'recovering' | 'observation';
  daysInHospital: number;
  dischargeReadiness: number;
  primaryDiagnosis: string;
  secondaryDiagnoses: string[];
  assignedDoctor: {
    name: string;
    specialty: string;
    phone: string;
  };
  nurses: string[];
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSaturation: number;
  };
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
  }>;
  labResults: Array<{
    test: string;
    result: string;
    normalRange: string;
    date: string;
    status: 'normal' | 'abnormal' | 'critical';
  }>;
  procedures: Array<{
    name: string;
    date: string;
    status: 'completed' | 'scheduled' | 'cancelled';
  }>;
  dischargeRequirements: Array<{
    requirement: string;
    status: 'completed' | 'pending' | 'in-progress';
    completedDate?: string;
  }>;
  notes: Array<{
    date: string;
    author: string;
    content: string;
    type: 'general' | 'medical' | 'nursing';
  }>;
}