import React from 'react';
import { Clock, User, AlertTriangle, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { Patient } from '../types/Patient';

interface PatientCardProps {
  patient: Patient;
  onClick: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'stable': return 'bg-green-50 text-green-700 border-green-200';
      case 'recovering': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'observation': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getDischargeReadinessColor = (readiness: number) => {
    if (readiness >= 85) return 'text-green-600 bg-green-100';
    if (readiness >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDischargeReadinessText = (readiness: number) => {
    if (readiness >= 85) return 'Ready';
    if (readiness >= 60) return 'Soon';
    return 'Not Ready';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {patient.name}
          </h3>
          <div className="flex items-center space-x-3 mt-1">
            <span className="text-sm text-gray-600">{patient.age} years old • {patient.gender}</span>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3 text-gray-400" />
              <span className="text-sm text-gray-600">{patient.roomNumber}</span>
            </div>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
        </div>
      </div>

      {/* Primary Diagnosis */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Primary Diagnosis</p>
        <p className="text-sm text-gray-900">{patient.primaryDiagnosis}</p>
      </div>

      {/* Doctor & Duration */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center space-x-1">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">{patient.assignedDoctor.name}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">{patient.daysInHospital} days</span>
        </div>
      </div>

      {/* Vitals */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-gray-500">Heart Rate</p>
          <p className="font-medium text-gray-900">{patient.vitals.heartRate} bpm</p>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-gray-500">Temp</p>
          <p className="font-medium text-gray-900">{patient.vitals.temperature}°F</p>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-gray-500">BP</p>
          <p className="font-medium text-gray-900">{patient.vitals.bloodPressure}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-gray-500">SpO₂</p>
          <p className="font-medium text-gray-900">{patient.vitals.oxygenSaturation}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Discharge Progress</span>
          <span className="text-sm text-gray-600">{patient.dischargeReadiness}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              patient.dischargeReadiness >= 85 
                ? 'bg-green-500' 
                : patient.dischargeReadiness >= 60 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
            }`}
            style={{ width: `${patient.dischargeReadiness}%` }}
          />
        </div>
      </div>

      {/* Discharge Status */}
      <div className="flex items-center justify-between">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDischargeReadinessColor(patient.dischargeReadiness)}`}>
          <TrendingUp className="h-3 w-3 inline mr-1" />
          {getDischargeReadinessText(patient.dischargeReadiness)}
        </div>
        
        {patient.status === 'critical' && (
          <div className="flex items-center space-x-1 text-red-600">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-medium">Urgent</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;