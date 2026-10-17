import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockWaterSources } from '../data/mockWaterSources';
import { mockReports } from '../data/mockReports';
import { mockAlerts } from '../data/mockAlerts';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Water sources
  const [sources, setSources] = useState(() => {
    try {
      const saved = localStorage.getItem('aquasure-sources');
      return saved ? JSON.parse(saved) : mockWaterSources;
    } catch {
      return mockWaterSources;
    }
  });

  // Incident Reports
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem('aquasure-reports');
      return saved ? JSON.parse(saved) : mockReports;
    } catch {
      return mockReports;
    }
  });

  // Public Alerts
  const [alerts, setAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem('aquasure-alerts');
      return saved ? JSON.parse(saved) : mockAlerts;
    } catch {
      return mockAlerts;
    }
  });

  // Bookmarked / Saved water sources
  const [savedSources, setSavedSources] = useState(() => {
    try {
      const saved = localStorage.getItem('aquasure-saved-sources');
      return saved ? JSON.parse(saved) : ["WS-01", "WS-04", "WS-13"];
    } catch {
      return ["WS-01", "WS-04", "WS-13"];
    }
  });

  // Current mock user
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aquasure-user');
      return saved ? JSON.parse(saved) : {
        name: "Dr. Alok Verma",
        email: "alok.verma@civic.org",
        role: "admin", // 'citizen' or 'admin'
        region: "North Zone",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        phone: "+91 98112 45890",
        contributions: 14,
        memberSince: "January 2026"
      };
    } catch {
      return null;
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: "ntf-1",
      title: "Boil-Water Advisory Active",
      message: "Najafgarh Basin Sector 9 groundwater tested positive for coliform bacteria.",
      time: "25 min ago",
      read: false,
      type: "critical",
      link: "/alerts"
    },
    {
      id: "ntf-2",
      title: "Ticket Status Updated: AQ-2026-1002",
      message: "Pipeline repair in MP Nagar Zone II marked as Resolved.",
      time: "2 hours ago",
      read: false,
      type: "success",
      link: "/report"
    },
    {
      id: "ntf-3",
      title: "Yamuna Cleanup Drive Next Saturday",
      message: "Volunteer slots 70% filled. Join the civic taskforce today.",
      time: "5 hours ago",
      read: true,
      type: "info",
      link: "/community"
    }
  ]);

  // Global modals and toast
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('aquasure-sources', JSON.stringify(sources));
  }, [sources]);

  useEffect(() => {
    localStorage.setItem('aquasure-reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('aquasure-alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('aquasure-saved-sources', JSON.stringify(savedSources));
  }, [savedSources]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aquasure-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aquasure-user');
    }
  }, [user]);

  // Toast notification trigger
  const showToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(curr => (curr?.id === id ? null : curr));
    }, duration);
  };

  // Add a new issue report
  const addReport = (reportData) => {
    const newId = `AQ-2026-${1000 + reports.length + 1}`;
    const newReport = {
      ...reportData,
      id: newId,
      status: "Submitted",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedOfficer: "Pending Assignment",
      timeline: [
        {
          status: "Submitted",
          time: new Date().toISOString(),
          note: "Incident logged and registered in the AquaSure civic database."
        }
      ]
    };
    setReports(prev => [newReport, ...prev]);

    // Push notification
    setNotifications(prev => [
      {
        id: `ntf-${Date.now()}`,
        title: `Report Filed: ${newId}`,
        message: `Your report for "${reportData.categoryLabel || reportData.type}" is now in review.`,
        time: "Just now",
        read: false,
        type: "info",
        link: "/report"
      },
      ...prev
    ]);

    showToast(`Report filed successfully! Ticket ID: ${newId}`, 'success');
    return newReport;
  };

  // Update report status (Admin action)
  const updateReportStatus = (reportId, newStatus, note = "") => {
    setReports(prev =>
      prev.map(rep => {
        if (rep.id === reportId) {
          const updatedTimeline = [
            ...rep.timeline,
            {
              status: newStatus,
              time: new Date().toISOString(),
              note: note || `Status updated to ${newStatus} by water inspector.`
            }
          ];
          return {
            ...rep,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            timeline: updatedTimeline
          };
        }
        return rep;
      })
    );
    showToast(`Report ${reportId} updated to ${newStatus}`, 'success');
  };

  // Add a new water source (Admin action)
  const addWaterSource = (sourceData) => {
    const newId = `WS-${String(sources.length + 1).padStart(2, '0')}`;
    const newSource = {
      ...sourceData,
      id: newId,
      lastTested: new Date().toISOString().split('T')[0]
    };
    setSources(prev => [newSource, ...prev]);
    showToast(`New water source "${sourceData.name}" added successfully!`, 'success');
    return newSource;
  };

  // Toggle bookmarking a water source
  const toggleSaveSource = (sourceId) => {
    setSavedSources(prev => {
      const exists = prev.includes(sourceId);
      const updated = exists ? prev.filter(id => id !== sourceId) : [...prev, sourceId];
      showToast(exists ? "Removed from saved water points" : "Saved to your safe water points", exists ? "info" : "success");
      return updated;
    });
  };

  // Alert subscription
  const subscribeAlerts = (contactInfo, region) => {
    showToast(`Subscribed ${contactInfo} to emergency water advisories for ${region}!`, 'success');
  };

  // User auth helpers
  const login = (userData) => {
    setUser(userData);
    showToast(`Welcome back, ${userData.name}!`, 'success');
    setIsAuthOpen(false);
  };

  const logout = () => {
    setUser(null);
    showToast("You have been signed out.", 'info');
  };

  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast("Notifications cleared", 'info');
  };

  return (
    <DataContext.Provider
      value={{
        sources,
        reports,
        alerts,
        savedSources,
        user,
        notifications,
        isSearchOpen,
        setIsSearchOpen,
        isAuthOpen,
        setIsAuthOpen,
        toast,
        showToast,
        addReport,
        updateReportStatus,
        addWaterSource,
        toggleSaveSource,
        subscribeAlerts,
        login,
        logout,
        markNotificationRead,
        clearAllNotifications
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
