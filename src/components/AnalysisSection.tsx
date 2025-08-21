import React from "react";
import {
  TrendingUp,
  AlertTriangle,
  Clock,
  Users,
  BarChart3,
  Brain,
  Target,
  Calendar,
} from "lucide-react";
import { Patient } from "../types/Patient";

interface AnalysisSectionProps {
  patients: Patient[];
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ patients }) => {
  const getAnalytics = () => {
    const total = patients.length;
    const critical = patients.filter((p) => p.status === "critical").length;
    const readyForDischarge = patients.filter(
      (p) => p.dischargeReadiness >= 85
    ).length;
    const avgStay =
      total > 0
        ? patients.reduce((acc, p) => acc + p.daysInHospital, 0) / total
        : 0;
    const avgReadiness =
      total > 0
        ? patients.reduce((acc, p) => acc + p.dischargeReadiness, 0) / total
        : 0;

    return {
      total,
      critical,
      readyForDischarge,
      avgStay: Math.round(avgStay * 10) / 10,
      avgReadiness: Math.round(avgReadiness),
      needsAttention: patients.filter((p) => p.dischargeReadiness < 60).length,
    };
  };

  const analytics = getAnalytics();

  const getTopDiagnoses = () => {
    const diagnoses: { [key: string]: number } = {};
    patients.forEach((patient) => {
      const primary = patient.primaryDiagnosis;
      diagnoses[primary] = (diagnoses[primary] || 0) + 1;
    });

    return Object.entries(diagnoses)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([diagnosis, count]) => ({ diagnosis, count }));
  };

  const topDiagnoses = getTopDiagnoses();

  const getAIInsights = () => {
    const insights = [];

    if (analytics.critical > 0) {
      insights.push({
        type: "alert",
        title: "Critical Patients Alert",
        message: `${analytics.critical} patient${
          analytics.critical > 1 ? "s" : ""
        } require immediate attention.`,
        priority: "high",
      });
    }

    if (analytics.readyForDischarge > 0) {
      insights.push({
        type: "success",
        title: "Discharge Opportunities",
        message: `${analytics.readyForDischarge} patient${
          analytics.readyForDischarge > 1 ? "s are" : " is"
        } ready for discharge.`,
        priority: "medium",
      });
    }

    if (analytics.avgStay > 7) {
      insights.push({
        type: "warning",
        title: "Extended Stay Alert",
        message: `Average length of stay (${analytics.avgStay} days) is above optimal range.`,
        priority: "medium",
      });
    }

    if (analytics.needsAttention > 0) {
      insights.push({
        type: "info",
        title: "Care Plan Review",
        message: `${analytics.needsAttention} patient${
          analytics.needsAttention > 1 ? "s" : ""
        } may need care plan adjustments.`,
        priority: "low",
      });
    }

    return insights;
  };

  const aiInsights = getAIInsights();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 mx-6 rounded-lg">
      <div className=" mx-auto">
        {/* AI Analysis Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-purple-600 p-3 rounded-lg">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              AI Analysis Dashboard
            </h2>
            <p className="text-sm text-gray-600">Real-time insights</p>
          </div>
        </div>

        {/* Horizontal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Key Metrics */}
          <div className="lg:col-span-4 grid grid-rows-[auto_1fr_auto]">
            <h3 className="text-md font-semibold text-gray-900 flex items-center space-x-2 mb-3">
              <BarChart3 className="h-4 w-4" />
              <span>Key Metrics</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">
                    Total
                  </span>
                </div>
                <p className="text-xl font-bold text-blue-900 mt-1">
                  {analytics.total}
                </p>
              </div>

              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">
                    Critical
                  </span>
                </div>
                <p className="text-xl font-bold text-red-900 mt-1">
                  {analytics.critical}
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    Ready
                  </span>
                </div>
                <p className="text-xl font-bold text-green-900 mt-1">
                  {analytics.readyForDischarge}
                </p>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-600 font-medium">
                    Avg Days
                  </span>
                </div>
                <p className="text-xl font-bold text-yellow-900 mt-1">
                  {analytics.avgStay}
                </p>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="lg:col-span-5">
            <h3 className="text-md font-semibold text-gray-900 flex items-center space-x-2 mb-3">
              <Brain className="h-4 w-4" />
              <span>AI Insights</span>
            </h3>
            <div className="space-y-2 overflow-y-auto">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg border text-sm ${
                    insight.type === "alert"
                      ? "bg-red-50 border-red-200 text-red-800"
                      : insight.type === "success"
                      ? "bg-green-50 border-green-200 text-green-800"
                      : insight.type === "warning"
                      ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                      : "bg-blue-50 border-blue-200 text-blue-800"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {insight.type === "alert" && (
                      <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
                    )}
                    {insight.type === "success" && (
                      <Target className="h-6 w-6 text-green-600 flex-shrink-0" />
                    )}
                    {insight.type === "warning" && (
                      <Clock className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                    )}
                    {insight.type === "info" && (
                      <Brain className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium">{insight.title}</p>
                      <p className="text-sm opacity-90">{insight.message}</p>
                    </div>
                  </div>
                </div>
              ))}

              {aiInsights.length === 0 && (
                <div className="bg-green-50 border border-green-200 p-2 rounded-lg">
                  <p className="text-xs text-green-800 font-medium">
                    All Systems Normal
                  </p>
                  <p className="text-xs text-green-700 opacity-90">
                    No critical issues detected
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Discharge Analysis & Predictions */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-md font-semibold text-gray-900 flex items-center space-x-2 mb-3">
              <TrendingUp className="h-4 w-4" />
              <span>Discharge Analysis</span>
            </h3>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-200 mb-3 flex-1 flex flex-col justify-around">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Overall Readiness
                </span>
                <span className="text-lg font-bold text-purple-900">
                  {analytics.avgReadiness}%
                </span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${analytics.avgReadiness}%` }}
                />
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg flex-1 flex flex-col justify-center">
              <p className="text-sm font-medium text-indigo-900 mb-2">
                Expected Discharges
              </p>
              <p className="text-sm text-indigo-700">
                24h: {Math.ceil(analytics.readyForDischarge * 0.6)} patients
              </p>
              <p className="text-sm text-indigo-700">
                48h: {Math.ceil(analytics.readyForDischarge * 0.9)} patients
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;
