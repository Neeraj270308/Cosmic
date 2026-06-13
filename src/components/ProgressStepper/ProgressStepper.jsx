import React from "react";
import styles from "./ProgressStepper.module.css";

const steps = [
  {
    key: "service",
    number: 1,
    title: "Service",
  },
  {
    key: "bike",
    number: 2,
    title: "Bike",
  },
  {
    key: "details",
    number: 3,
    title: "Details",
  },
  {
    key: "schedule",
    number: 4,
    title: "Schedule",
  },
  {
    key: "confirm",
    number: 5,
    title: "Confirm",
  },
];

const ProgressStepper = ({ currentStepKey }) => {
  const currentIndex = steps.findIndex(
    (step) => step.key === currentStepKey
  );

  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => (
        <React.Fragment key={step.key}>
          <div className={styles.stepContainer}>
            <div
              className={`${styles.circle} ${
                index <= currentIndex ? styles.active : ""
              }`}
            >
              {step.number}
            </div>

            <span
              className={`${styles.label} ${
                index <= currentIndex ? styles.activeLabel : ""
              }`}
            >
              {step.title}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`${styles.line} ${
                index < currentIndex ? styles.activeLine : ""
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressStepper;