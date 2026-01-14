import React, { useState } from 'react';
import { Bell, Search, User, Moon, Sun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, title: 'Budget Alert', message: 'Tide Campaign reached 90% budget', time: '10m ago', type: 'alert' },
        { id: 2, title: 'New Approval', message: 'Sarah submitted "Summer Glow" for review', time: '1h ago', type: 'info' },
        { id: 3, title: 'System Update', message: 'Platform maintenance scheduled for tonight', time: '4h ago', type: 'system' }
    ];

    return (
        <header style={{
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            backgroundColor: 'var(--color-bg-header)',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            borderBottom: '1px solid var(--color-border)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--color-text-light)' }}>
                {/* Dynamic Title based on route could go here, for now static */}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search across platform..."
                        style={{
                            padding: '10px 16px 10px 40px',
                            borderRadius: '30px',
                            border: '1px solid var(--color-border)',
                            outline: 'none',
                            width: '320px',
                            fontSize: '14px',
                            backgroundColor: 'var(--color-bg-app)',
                            color: 'var(--color-text-main)',
                            transition: 'all 0.2s'
                        }}
                        onFocus={(e) => e.target.style.width = '360px'}
                        onBlur={(e) => e.target.style.width = '320px'}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

                    {/* Notifications */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            style={{ position: 'relative', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                        >
                            <Bell size={24} color="#64748B" />
                            <span style={{
                                position: 'absolute',
                                top: '0',
                                right: '2px',
                                width: '10px',
                                height: '10px',
                                backgroundColor: '#EF4444',
                                borderRadius: '50%',
                                border: '2px solid white'
                            }}></span>
                        </button>

                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    style={{
                                        position: 'absolute',
                                        top: '120%',
                                        right: '-10px',
                                        width: '320px',
                                        backgroundColor: 'white',
                                        borderRadius: '16px',
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                        border: '1px solid #E2E8F0',
                                        padding: '16px',
                                        zIndex: 100
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B' }}>Notifications</h3>
                                        <button onClick={() => setShowNotifications(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={16} /></button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {notifications.map(n => (
                                            <div key={n.id} style={{ display: 'flex', alignItems: 'start', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: n.type === 'alert' ? '#EF4444' : '#3B82F6', marginTop: '6px' }}></div>
                                                <div>
                                                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>{n.title}</p>
                                                    <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0' }}>{n.message}</p>
                                                    <p style={{ fontSize: '10px', color: '#94A3B8' }}>{n.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button style={{ width: '100%', marginTop: '12px', padding: '8px', fontSize: '12px', color: '#003DA5', fontWeight: '600', border: 'none', background: 'none', cursor: 'pointer' }}>Mark all as read</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div style={{ width: '1px', height: '32px', backgroundColor: '#E2E8F0' }}></div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-main)' }}>Abijit Gaman</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>Super Admin</div>
                    </div>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #003DA5 0%, #000E2F 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        color: 'white'
                    }}>
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
