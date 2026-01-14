import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Megaphone, Briefcase, BarChart2, FileText, Users, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Campaigns', icon: Megaphone, path: '/campaigns' },
    { name: 'Brands', icon: Briefcase, path: '/brands' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Reports', icon: FileText, path: '/reports' },
    { name: 'IAM Access', icon: Users, path: '/iam' },
    { name: 'Support', icon: HelpCircle, path: '/support' },
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      backgroundColor: 'var(--color-bg-white)',
      borderRight: '1px solid #E2E8F0',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 50
    }}>
      <div style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/src/assets/logo.png" alt="GCS Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
        <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-primary)' }}>GCS</span>
      </div>

      <nav style={{ flex: 1, padding: '0 16px', marginTop: '20px' }}>
        <ul style={{ listStyle: 'none' }}>
          {menuItems.map((item) => (
            <li key={item.name} style={{ marginBottom: '8px' }}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-light)',
                  backgroundColor: isActive ? '#E6F0FF' : 'transparent', // Light blue bg for active
                  fontWeight: isActive ? '600' : '500',
                  transition: 'all 0.2s ease'
                })}
              >
                <item.icon size={20} />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ padding: '24px' }}>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          width: '100%',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-text-light)',
          backgroundColor: 'transparent',
          fontWeight: '500',
          transition: 'all 0.2s ease'
        }}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
