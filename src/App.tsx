import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Activity,
  Clock,
  User,
  AlertCircle,
  TrendingUp,
  Calendar,
  Stethoscope,
} from "lucide-react";
import PatientCard from "./components/PatientCard";
import PatientModal from "./components/PatientModal";
import AnalysisSection from "./components/AnalysisSection";
import { Patient } from "./types/Patient";
import { generateMockPatients } from "./data/mockData";

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const mockPatients = generateMockPatients();
    setPatients(mockPatients);
  }, []);

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.roomNumber.includes(searchTerm);
    const matchesFilter =
      filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-600 bg-red-50";
      case "stable":
        return "text-green-600 bg-green-50";
      case "recovering":
        return "text-blue-600 bg-blue-50";
      case "observation":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getDischargeReadiness = () => {
    const ready = patients.filter((p) => p.dischargeReadiness >= 85).length;
    const total = patients.length;
    return {
      ready,
      total,
      percentage: total > 0 ? Math.round((ready / total) * 100) : 0,
    };
  };

  const dischargeStats = getDischargeReadiness();

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 mx-6 mb-6 rounded-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-3 rounded-full">
              <Stethoscope className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HealthHub</h1>
              <p className="text-sm text-gray-600">
                Patient Discharge Analysis System
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* AI Analysis Section */}
      <AnalysisSection patients={patients} />

      <div className="flex">
        {/* Main Content */}
        <div className="w-full p-6">
          {/* Controls */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4 bg-white p-3 rounded-xl shadow-sm border border-gray-200">
              <div className="flex gap-2 items-center">
                <p className="text-sm text-gray-500">Total Patients :</p>
                <p className="text-xl font-semibold text-gray-900">
                  {patients.length}
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  {dischargeStats.ready} Ready for Discharge
                </span>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients or room numbers..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Patients</option>
                  <option value="critical">Critical</option>
                  <option value="stable">Stable</option>
                  <option value="recovering">Recovering</option>
                  <option value="observation">Observation</option>
                </select>
              </div>
            </div>
          </div>

          {/* Patient Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onClick={() => handlePatientClick(patient)}
              />
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No patients found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Patient Modal */}
      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default App;
