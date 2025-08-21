import React from 'react';
import { TrendingUp, AlertTriangle, Clock, Users, BarChart3, Brain, Target, Calendar } from 'lucide-react';
import { Patient } from '../types/Patient';

interface AnalysisSectionProps {
  patients: Patient[];
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ patients }) => {
  const getAnalytics = () => {
    const total = patients.length;
    const critical = patients.filter(p => p.status === 'critical').length;
    const readyForDischarge = patients.filter(p => p.dischargeReadiness >= 85).length;
    const avgStay = total > 0 ? patients.reduce((acc, p) => acc + p.daysInHospital, 0) / total : 0;
    const avgReadiness = total > 0 ? patients.reduce((acc, p) => acc + p.dischargeReadiness, 0) / total : 0;
    
    return {
      total,
      critical,
      readyForDischarge,
      avgStay: Math.round(avgStay * 10) / 10,
      avgReadiness: Math.round(avgReadiness),
      needsAttention: patients.filter(p => p.dischargeReadiness < 60).length
    };
  };

  const analytics = getAnalytics();

  const getTopDiagnoses = () => {
    const diagnoses: { [key: string]: number } = {};
    patients.forEach(patient => {
      const primary = patient.primaryDiagnosis;
      diagnoses[primary] = (diagnoses[primary] || 0) + 1;
    });
    
    return Object.entries(diagnoses)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([diagnosis, count]) => ({ diagnosis, count }));
  };

  const topDiagnoses = getTopDiagnoses();

  const getAIInsights = () => {
    const insights = [];
    
    if (analytics.critical > 0) {
      insights.push({
        type: 'alert',
        title: 'Critical Patients Alert',
        message: `${analytics.critical} patient${analytics.critical > 1 ? 's' : ''} require immediate attention.`,
        priority: 'high'
      });
    }
    
    if (analytics.readyForDischarge > 0) {
      insights.push({
        type: 'success',
        title: 'Discharge Opportunities',
        message: `${analytics.readyForDischarge} patient${analytics.readyForDischarge > 1 ? 's are' : ' is'} ready for discharge.`,
        priority: 'medium'
      });
    }
    
    if (analytics.avgStay > 7) {
      insights.push({
        type: 'warning',
        title: 'Extended Stay Alert',
        message: `Average length of stay (${analytics.avgStay} days) is above optimal range.`,
        priority: 'medium'
      });
    }

    if (analytics.needsAttention > 0) {
      insights.push({
        type: 'info',
        title: 'Care Plan Review',
        message: `${analytics.needsAttention} patient${analytics.needsAttention > 1 ? 's' : ''} may need care plan adjustments.`,
        priority: 'low'
      });
    }

    return insights;
  };

  const aiInsights = getAIInsights();

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* AI Analysis Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-purple-600 p-2 rounded-lg">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Analysis</h2>
            <p className="text-sm text-gray-600">Real-time insights</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Key Metrics</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">Total</span>
              </div>
              <p className="text-xl font-bold text-blue-900 mt-1">{analytics.total}</p>
            </div>
            
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-xs text-red-600 font-medium">Critical</span>
              </div>
              <p className="text-xl font-bold text-red-900 mt-1">{analytics.critical}</p>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600 font-medium">Ready</span>
              </div>
              <p className="text-xl font-bold text-green-900 mt-1">{analytics.readyForDischarge}</p>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-xs text-yellow-600 font-medium">Avg Days</span>
              </div>
              <p className="text-xl font-bold text-yellow-900 mt-1">{analytics.avgStay}</p>
            </div>
          </div>
        </div>

        {/* Discharge Readiness Overview */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Discharge Analysis</span>
          </h3>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Readiness</span>
              <span className="text-lg font-bold text-purple-900">{analytics.avgReadiness}%</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${analytics.avgReadiness}%` }}
              />
            </div>
            <p className="text-xs text-purple-700 mt-2">
              Average across all patients
            </p>
          </div>
        </div>

        {/* AI Insights */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>AI Insights</span>
          </h3>
          
          <div className="space-y-3">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border text-sm ${
                  insight.type === 'alert' ? 'bg-red-50 border-red-200 text-red-800' :
                  insight.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                  insight.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                  'bg-blue-50 border-blue-200 text-blue-800'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {insight.type === 'alert' && <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />}
                  {insight.type === 'success' && <Target className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />}
                  {insight.type === 'warning' && <Clock className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />}
                  {insight.type === 'info' && <Brain className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />}
                  <div>
                    <p className="font-medium">{insight.title}</p>
                    <p className="text-xs opacity-90">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {aiInsights.length === 0 && (
              <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                <p className="text-sm text-green-800 font-medium">All Systems Normal</p>
                <p className="text-xs text-green-700 opacity-90">No critical issues detected</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Diagnoses */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Top Diagnoses</span>
          </h3>
          
          <div className="space-y-2">
            {topDiagnoses.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-xs text-gray-700 flex-1 pr-2" title={item.diagnosis}>
                  {item.diagnosis.length > 25 ? item.diagnosis.substring(0, 25) + '...' : item.diagnosis}
                </span>
                <span className="text-xs font-semibold text-gray-900 bg-white px-2 py-1 rounded">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Predictions */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Predictions</span>
          </h3>
          
          <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg">
            <p className="text-sm font-medium text-indigo-900">Expected Discharges</p>
            <p className="text-xs text-indigo-700 mt-1">
              Next 24 hours: {Math.ceil(analytics.readyForDischarge * 0.6)} patients
            </p>
            <p className="text-xs text-indigo-700">
              Next 48 hours: {Math.ceil(analytics.readyForDischarge * 0.9)} patients
            </p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
            <p className="text-sm font-medium text-orange-900">Capacity Planning</p>
            <p className="text-xs text-orange-700 mt-1">
              Projected bed availability: {analytics.readyForDischarge} beds in 24h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;