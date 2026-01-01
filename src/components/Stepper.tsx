"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Stepper() {
  const { checkedIn, eventStarted, setupDone, completed } = useSelector(
    (state: RootState) => state.event
  );

  const steps = [
    { id: 1, label: "Check-In", icon: "📍" },
    { id: 2, label: "Verify OTP", icon: "🔐" },
    { id: 3, label: "Event Setup", icon: "⚙️" },
    { id: 4, label: "Completion", icon: "✨" },
  ];

  const isStepCompleted = (index: number) => {
    if (index === 0) return checkedIn;
    if (index === 1) return eventStarted;
    if (index === 2) return setupDone;
    if (index === 3) return completed;
    return false;
  };

  const isStepActive = (index: number) => {
    if (index === 0) return true;
    return isStepCompleted(index - 1);
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between relative">
        {/* Background Connector Lines */}
        {steps.map((_, index) => {
          if (index === steps.length - 1) return null;
          const isCompleted = isStepCompleted(index);
          const stepWidth = 95 / (steps.length - 1);
          return (
            <div
              key={`line-${index}`}
              className={`absolute top-7 h-0.5 transition-colors duration-300 ${
                isCompleted ? "bg-green-500" : "bg-gray-300"
              }`}
              style={{
                left: `${index * stepWidth}%`,
                width: `${stepWidth}%`,
              }}
            />
          );
        })}

        {/* Steps */}
        {steps.map((step, index) => {
          const completed = isStepCompleted(index);
          const active = isStepActive(index);
          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              {/* Step Circle */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl transition-all duration-300 shadow-md ${
                  completed
                    ? "bg-gradient-to-br from-green-400 to-green-600 text-white scale-110"
                    : active
                      ? "bg-gradient-to-br from-indigo-500 to-indigo-700 text-white ring-4 ring-indigo-200"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {completed ? "✓" : step.icon}
              </div>

              {/* Step Label */}
              <p
                className={`text-xs font-bold text-center mt-3 transition-colors duration-300 ${
                  completed
                    ? "text-green-600"
                    : active
                      ? "text-indigo-600"
                      : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
