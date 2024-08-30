import React from "react";
import styles from "./Settings.module.css";

const Settings = () => {
  const settingsOptions = [
    { id: 1, name: "Profile", icon: "account_circle" },
    { id: 2, name: "Notifications", icon: "notifications" },
    { id: 3, name: "Privacy", icon: "privacy_tip" },
    { id: 4, name: "Security", icon: "security" },
    { id: 5, name: "Billing", icon: "payments" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        {settingsOptions.map((option) => (
          <div key={option.id} className={styles.option}>
            <i className="material-icons" color="white">
              {option.icon}
            </i>
            <span>{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
