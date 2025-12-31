"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Stepper() {
  const { checkedIn, eventStarted, setupDone, completed } = useSelector(
    (state: RootState) => state.event
  );

  const steps = [
    { id: 1, label: "Check-In", completed: checkedIn },
    { id: 2, label: "Verify OTP", completed: eventStarted },
    { id: 3, label: "Event Setup", completed: setupDone },
    { id: 4, label: "Completion", completed: completed },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center flex-1">
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white mb-2 ${
                step.completed
                  ? "bg-green-600"
                  : index === 0 || steps[index - 1]?.completed
                    ? "bg-indigo-600"
                    : "bg-gray-300"
              }`}
            >
              {step.completed ? "✓" : step.id}
            </div>

            {/* Step Label */}
            <p
              className={`text-sm font-medium text-center ${
                step.completed ? "text-green-600" : "text-gray-600"
              }`}
            >
              {step.label}
            </p>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-full mx-2 mt-2 ${
                  step.completed ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
