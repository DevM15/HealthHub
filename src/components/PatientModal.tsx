import React, { useState } from 'react';
import { X, User, Phone, Calendar, FileText, Activity, Pill, TestTube, Clipboard, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Patient } from '../types/Patient';

interface PatientModalProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
}

const PatientModal: React.FC<PatientModalProps> = ({ patient, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'stable': return 'bg-green-50 text-green-700 border-green-200';
      case 'recovering': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'observation': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getLabStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'abnormal': return 'text-yellow-600 bg-yellow-100';
      case 'normal': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRequirementStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'vitals', label: 'Vitals & Labs', icon: Activity },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'discharge', label: 'Discharge Plan', icon: Clipboard }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{patient.age} years old • {patient.gender}</span>
                  <span>Room {patient.roomNumber}</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Doctor Information */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Assigned Doctor</h3>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-600 p-2 rounded-full">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{patient.assignedDoctor.name}</p>
                      <p className="text-sm text-gray-600">{patient.assignedDoctor.specialty}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <p className="text-sm text-gray-600">{patient.assignedDoctor.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diagnoses */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Diagnoses</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">Primary</span>
                      <span className="text-gray-900">{patient.primaryDiagnosis}</span>
                    </div>
                    {patient.secondaryDiagnoses.map((diagnosis, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">Secondary</span>
                        <span className="text-gray-900">{diagnosis}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admission Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Admission Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Admission Date</p>
                      <p className="font-medium">{new Date(patient.admissionDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Length of Stay</p>
                      <p className="font-medium">{patient.daysInHospital} days</p>
                    </div>
                  </div>
                </div>

                {/* Nursing Staff */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Nursing Staff</h3>
                  <div className="flex flex-wrap gap-2">
                    {patient.nurses.map((nurse, index) => (
                      <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        {nurse}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Notes */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Recent Notes</h3>
                  <div className="space-y-3">
                    {patient.notes.slice(-3).map((note, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{note.author}</span>
                          <span className="text-xs text-gray-500">{new Date(note.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-700">{note.content}</p>
                        <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                          note.type === 'medical' ? 'bg-blue-100 text-blue-800' :
                          note.type === 'nursing' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {note.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vitals' && (
              <div className="space-y-6">
                {/* Current Vitals */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Current Vitals</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Heart Rate</p>
                      <p className="text-2xl font-bold text-blue-600">{patient.vitals.heartRate}</p>
                      <p className="text-xs text-gray-500">bpm</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Blood Pressure</p>
                      <p className="text-2xl font-bold text-green-600">{patient.vitals.bloodPressure}</p>
                      <p className="text-xs text-gray-500">mmHg</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Temperature</p>
                      <p className="text-2xl font-bold text-orange-600">{patient.vitals.temperature}</p>
                      <p className="text-xs text-gray-500">°F</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Oxygen Saturation</p>
                      <p className="text-2xl font-bold text-purple-600">{patient.vitals.oxygenSaturation}</p>
                      <p className="text-xs text-gray-500">%</p>
                    </div>
                  </div>
                </div>

                {/* Lab Results */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Latest Lab Results</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-3 border border-gray-200 text-sm font-medium">Test</th>
                          <th className="text-left p-3 border border-gray-200 text-sm font-medium">Result</th>
                          <th className="text-left p-3 border border-gray-200 text-sm font-medium">Normal Range</th>
                          <th className="text-left p-3 border border-gray-200 text-sm font-medium">Date</th>
                          <th className="text-left p-3 border border-gray-200 text-sm font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patient.labResults.map((result, index) => (
                          <tr key={index}>
                            <td className="p-3 border border-gray-200 text-sm">{result.test}</td>
                            <td className="p-3 border border-gray-200 text-sm font-medium">{result.result}</td>
                            <td className="p-3 border border-gray-200 text-sm text-gray-600">{result.normalRange}</td>
                            <td className="p-3 border border-gray-200 text-sm">{new Date(result.date).toLocaleDateString()}</td>
                            <td className="p-3 border border-gray-200">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getLabStatusColor(result.status)}`}>
                                {result.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Procedures */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Procedures</h3>
                  <div className="space-y-3">
                    {patient.procedures.map((procedure, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{procedure.name}</p>
                          <p className="text-sm text-gray-600">{new Date(procedure.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                          procedure.status === 'completed' ? 'bg-green-100 text-green-800' :
                          procedure.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {procedure.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'medications' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Current Medications</h3>
                <div className="grid gap-4">
                  {patient.medications.map((medication, index) => (
                    <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{medication.name}</h4>
                          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                            <div>
                              <p className="text-gray-600">Dosage</p>
                              <p className="font-medium">{medication.dosage}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Frequency</p>
                              <p className="font-medium">{medication.frequency}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-gray-600">Started</p>
                              <p className="font-medium">{new Date(medication.startDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                        <Pill className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'discharge' && (
              <div className="space-y-6">
                {/* Discharge Readiness */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Discharge Readiness</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                        <span className="text-2xl font-bold text-gray-900">{patient.dischargeReadiness}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full transition-all duration-300 ${
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
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      patient.dischargeReadiness >= 85 
                        ? 'bg-green-100 text-green-800' 
                        : patient.dischargeReadiness >= 60 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {patient.dischargeReadiness >= 85 ? 'Ready for Discharge' : 
                       patient.dischargeReadiness >= 60 ? 'Nearly Ready' : 'Not Ready'}
                    </div>
                  </div>
                </div>

                {/* Discharge Requirements */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Discharge Requirements</h3>
                  <div className="space-y-3">
                    {patient.dischargeRequirements.map((requirement, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex-shrink-0 mt-0.5">
                          {getRequirementStatusIcon(requirement.status)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{requirement.requirement}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              requirement.status === 'completed' ? 'bg-green-100 text-green-800' :
                              requirement.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {requirement.status.replace('-', ' ')}
                            </span>
                            {requirement.completedDate && (
                              <span className="text-xs text-gray-500">
                                Completed: {new Date(requirement.completedDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-gray-900 mb-2">AI Recommendations</h3>
                  <div className="space-y-2 text-sm">
                    {patient.dischargeReadiness >= 85 ? (
                      <p className="text-green-700">✓ Patient appears ready for discharge. Consider scheduling discharge planning meeting.</p>
                    ) : patient.dischargeReadiness >= 60 ? (
                      <p className="text-yellow-700">⚠ Patient making good progress. Focus on completing remaining requirements.</p>
                    ) : (
                      <p className="text-red-700">⚡ Patient requires additional care. Review critical requirements and extend stay if necessary.</p>
                    )}
                    
                    {patient.status === 'critical' && (
                      <p className="text-red-700">⚡ Critical status requires immediate attention before discharge planning.</p>
                    )}
                    
                    <p className="text-purple-700">🔍 Estimated discharge: {
                      patient.dischargeReadiness >= 85 ? '1-2 days' :
                      patient.dischargeReadiness >= 60 ? '2-3 days' :
                      '3+ days'
                    }</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;