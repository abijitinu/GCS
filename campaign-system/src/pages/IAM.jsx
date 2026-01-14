import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Mail, MoreHorizontal, Plus, Trash2, Edit2, X, Check, Globe, Briefcase, Tag, CheckCircle } from 'lucide-react';
import { users as initialUsers, roles } from '../data/users';
import { brands } from '../data/brands';
import { locations } from '../data/locations';

const IAM = () => {
    const [users, setUsers] = useState(initialUsers);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Brand Manager', brands: [], countries: [], campaigns: [] });
    const [notification, setNotification] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [editingUserId, setEditingUserId] = useState(null);

    // Mock campaigns for the permission selector
    const mockCampaigns = [
        { id: 1, name: 'Summer Olympics 2024', brand: 'Gillette' },
        { id: 2, name: 'Back to School Promo', brand: 'Pampers' },
        { id: 3, name: 'Super Bowl LVIII', brand: 'Tide' },
        { id: 4, name: 'Holiday Special', brand: 'Old Spice' },
        { id: 5, name: 'Q1 Launch', brand: 'Olay' }
    ];

    const steps = [
        { number: 1, title: 'User Details' },
        { number: 2, title: 'Access Scope' },
        { number: 3, title: editingUserId ? 'Review & Save' : 'Review & Invite' }
    ];

    const handleSaveUser = () => {
        if (!newUser.name || !newUser.email) return;

        if (editingUserId) {
            setUsers(users.map(u => u.id === editingUserId ? { ...u, ...newUser } : u));
            showNotification(`Updated profile for ${newUser.name}`);
        } else {
            const user = {
                id: users.length + 1,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                status: 'Active',
                activity: 'Just now',
                avatar: null,
                brands: newUser.brands || [],
                countries: newUser.countries || [],
                campaigns: newUser.campaigns || []
            };
            setUsers([...users, user]);
            showNotification(`Successfully invited ${user.name}`);
        }
        handleCloseModal();
    };

    const handleEditUser = (user) => {
        setEditingUserId(user.id);
        setNewUser({
            name: user.name,
            email: user.email,
            role: user.role,
            brands: user.brands || [],
            countries: user.countries || [],
            campaigns: user.campaigns || []
        });
        setCurrentStep(1);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewUser({ name: '', email: '', role: 'Brand Manager', brands: [], countries: [], campaigns: [] });
        setCurrentStep(1);
        setEditingUserId(null);
    };

    const toggleSelection = (field, value) => {
        setNewUser(prev => {
            const list = prev[field] || [];
            if (list.includes(value)) {
                return { ...prev, [field]: list.filter(item => item !== value) };
            } else {
                return { ...prev, [field]: [...list, value] };
            }
        });
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(u => u.id !== id));
        showNotification('User removed successfully');
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'Super Admin': return '#7C3AED'; // Violet
            case 'Admin': return '#003DA5'; // P&G Blue
            case 'Brand Manager': return '#0891B2'; // Cyan
            case 'Campaign Manager': return '#EA580C'; // Orange
            case 'Country Manager': return '#16A34A'; // Green
            default: return '#64748B'; // Slate
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '8px' }}>Full Name <span style={{ color: '#EF4444' }}>*</span></label>
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    placeholder="e.g. John Doe"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '8px' }}>Email Address <span style={{ color: '#EF4444' }}>*</span></label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    placeholder="john.doe@pg.com"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '8px' }}>Role <span style={{ color: '#EF4444' }}>*</span></label>
                            <select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: 'white' }}
                            >
                                {roles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '8px', lineHeight: '1.4', backgroundColor: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                                <strong>Role Description:</strong><br />
                                {newUser.role === 'Super Admin' ? 'Full access to all settings, users, and billing.' :
                                    newUser.role === 'Admin' ? 'Can manage most settings and users, but cannot view billing.' :
                                        newUser.role === 'Brand Manager' ? 'Access to specific campaigns and assets for assigned brands.' :
                                            newUser.role === 'Country Manager' ? 'Access to all activity within assigned regions.' :
                                                'Limited read-only access to assigned projects.'}
                            </p>
                        </div>
                    </div>
                );
            case 2:
                // Tabs for Permissions (Vertical layout for now)
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* 1. Country Access */}
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#1E293B', marginBottom: '12px' }}>
                                <Globe size={16} /> Country / Region Access
                            </label>
                            <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', maxHeight: '160px', overflowY: 'auto', backgroundColor: '#F8FAFC' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                    {Object.keys(locations).map(region => (
                                        <label key={region} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569', cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'background 0.2s' }} className="hover:bg-slate-200">
                                            <input
                                                type="checkbox"
                                                checked={newUser.countries?.includes(region)}
                                                onChange={() => toggleSelection('countries', region)}
                                                style={{ accentColor: '#003DA5' }}
                                            />
                                            {region}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 2. Brand Access */}
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#1E293B', marginBottom: '12px' }}>
                                <Briefcase size={16} /> Brand Access
                            </label>
                            <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', maxHeight: '160px', overflowY: 'auto', backgroundColor: '#F8FAFC' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                    {brands.slice(0, 15).map(brand => (
                                        <label key={brand.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={newUser.brands?.includes(brand.name)}
                                                onChange={() => toggleSelection('brands', brand.name)}
                                                style={{ accentColor: '#003DA5' }}
                                            />
                                            {brand.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3. Campaign Access */}
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#1E293B', marginBottom: '12px' }}>
                                <Tag size={16} /> Specific Campaign Access (Optional)
                            </label>
                            <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', maxHeight: '160px', overflowY: 'auto', backgroundColor: '#F8FAFC' }}>
                                {mockCampaigns.map(c => (
                                    <label key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #E2E8F0', cursor: 'pointer' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <input
                                                type="checkbox"
                                                checked={newUser.campaigns?.includes(c.id)}
                                                onChange={() => toggleSelection('campaigns', c.id)}
                                                style={{ accentColor: '#003DA5' }}
                                            />
                                            <span style={{ fontSize: '13px', color: '#1E293B', fontWeight: '500' }}>{c.name}</span>
                                        </div>
                                        <span style={{ fontSize: '11px', color: '#64748B', backgroundColor: '#E2E8F0', padding: '2px 8px', borderRadius: '12px' }}>{c.brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: '#DCFCE7', color: '#166534', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <CheckCircle size={32} />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
                            {editingUserId ? 'Review Changes' : 'Review Invitation'}
                        </h3>
                        <p style={{ color: '#64748B', fontSize: '14px', maxWidth: '400px', margin: '0 auto 32px' }}>
                            {editingUserId
                                ? <span>You are updating access for <strong>{newUser.name}</strong> as a <strong>{newUser.role}</strong>.</span>
                                : <span>You are about to invite <strong>{newUser.name}</strong> as a <strong>{newUser.role}</strong>.</span>
                            }
                        </p>

                        <div style={{ backgroundColor: '#F8FAFC', padding: '24px', borderRadius: '12px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
                                <span style={{ color: '#64748B', fontSize: '13px' }}>Global Access</span>
                                <span style={{ color: '#1E293B', fontSize: '13px', fontWeight: '600' }}>{newUser.countries?.length > 0 ? newUser.countries.join(', ') : 'None'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
                                <span style={{ color: '#64748B', fontSize: '13px' }}>Brand Access</span>
                                <span style={{ color: '#1E293B', fontSize: '13px', fontWeight: '600' }}>{newUser.brands?.length > 0 ? `${newUser.brands.length} Brands Selected` : 'None'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748B', fontSize: '13px' }}>Specific Campaigns</span>
                                <span style={{ color: '#1E293B', fontSize: '13px', fontWeight: '600' }}>{newUser.campaigns?.length > 0 ? `${newUser.campaigns.length} Campaigns` : 'All Available'}</span>
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>

            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        style={{
                            position: 'fixed',
                            top: '24px',
                            left: '50%',
                            backgroundColor: '#1E293B',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '30px',
                            fontSize: '14px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            zIndex: 1000,
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Check size={16} color="#4ADE80" />
                        {notification}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>IAM & Security</h1>
                    <p style={{ color: '#64748B' }}>Manage user access, roles, and permissions across the platform.</p>
                </div>
                <button
                    className="btn-primary"
                    onClick={() => setShowModal(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
                >
                    <Plus size={20} /> Invite Member
                </button>
            </motion.div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {[
                    { title: 'Total Users', value: users.length, sub: 'Active accounts' },
                    { title: 'Super Admins', value: users.filter(u => u.role === 'Super Admin').length, sub: 'Full access' },
                    { title: 'Security Score', value: '98%', sub: 'Excellent' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="card-flow"
                        style={{ padding: '24px' }}
                    >
                        <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>{stat.title}</div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B' }}>{stat.value}</div>
                        <div style={{ fontSize: '12px', color: '#003DA5', marginTop: '4px' }}>{stat.sub}</div>
                    </motion.div>
                ))}
            </div>

            {/* Users Table */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card-flow"
                style={{ padding: '0', overflow: 'hidden' }}
            >
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        <tr>
                            {['User', 'Role', 'Status', 'Last Activity', 'Actions'].map((h, i) => (
                                <th key={i} style={{ padding: '16px 24px', textAlign: i === 4 ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                <td style={{ padding: '20px 24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#003DA5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '16px' }}>{user.name.charAt(0)}</div>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#1E293B' }}>{user.name}</div>
                                            <div style={{ fontSize: '12px', color: '#64748B' }}>{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '20px 24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Shield size={14} color={getRoleColor(user.role)} />
                                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#475569' }}>{user.role}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '20px 24px' }}>
                                    <span style={{
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        backgroundColor: user.status === 'Active' ? '#DCFCE7' : user.status === 'Away' ? '#FEF3C7' : '#F1F5F9',
                                        color: user.status === 'Active' ? '#166534' : user.status === 'Away' ? '#B45309' : '#64748B',
                                    }}>
                                        {user.status}
                                    </span>
                                </td>
                                <td style={{ padding: '20px 24px', fontSize: '14px', color: '#64748B' }}>{user.activity}</td>
                                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            style={{ padding: '8px', color: '#64748B', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '4px' }}
                                            className="hover:bg-slate-100"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            style={{ padding: '8px', color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '4px' }}
                                            className="hover:bg-red-50"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {/* Wizard Modal */}
            <AnimatePresence>
                {showModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                zIndex: 40
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
                            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                width: '100%',
                                maxWidth: '700px', // Increased width for wizard
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '32px',
                                zIndex: 50,
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                maxHeight: '90vh',
                                overflowY: 'auto'
                            }}
                        >
                            {/* Header With Steps */}
                            <div style={{ marginBottom: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                    <div>
                                        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1E293B' }}>
                                            {editingUserId ? 'Edit User Profile' : 'Invite Team Member'}
                                        </h2>
                                        <p style={{ color: '#64748B', fontSize: '14px' }}>
                                            {editingUserId ? 'Update user details and access permissions.' : 'Grant access to the campaign management system.'}
                                        </p>
                                    </div>
                                    <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                                        <X size={24} />
                                    </button>
                                </div>
                                {/* Stepper Visual */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: 0, right: 0, top: '15px', height: '2px', backgroundColor: '#E2E8F0', zIndex: 0 }}></div>
                                    {steps.map((step) => (
                                        <div key={step.number} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                            <div style={{
                                                width: '32px', height: '32px', borderRadius: '50%',
                                                backgroundColor: currentStep >= step.number ? '#003DA5' : 'white',
                                                border: currentStep >= step.number ? 'none' : '2px solid #E2E8F0',
                                                color: currentStep >= step.number ? 'white' : '#94A3B8',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '14px',
                                                transition: 'all 0.3s ease'
                                            }}>
                                                {step.number}
                                            </div>
                                            <span style={{ fontSize: '12px', fontWeight: '600', color: currentStep >= step.number ? '#1E293B' : '#94A3B8' }}>{step.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Wizard Body */}
                            <div style={{ minHeight: '320px' }}>
                                {renderStepContent()}
                            </div>

                            {/* Wizard Footer */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #F1F5F9' }}>
                                {currentStep > 1 ? (
                                    <button
                                        onClick={() => setCurrentStep(prev => prev - 1)}
                                        style={{ padding: '12px 24px', borderRadius: '30px', border: '1px solid #E2E8F0', backgroundColor: 'white', color: '#64748B', fontWeight: '600', cursor: 'pointer' }}
                                    >
                                        Back
                                    </button>
                                ) : (
                                    <div></div> // Spacer
                                )}

                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        onClick={handleCloseModal}
                                        style={{ padding: '12px 24px', borderRadius: '30px', border: 'none', backgroundColor: 'transparent', color: '#64748B', fontWeight: '600', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>

                                    {currentStep < 3 ? (
                                        <button
                                            onClick={() => setCurrentStep(prev => prev + 1)}
                                            className="btn-primary"
                                            style={{ padding: '12px 32px', borderRadius: '30px' }}
                                        >
                                            Next Step
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSaveUser}
                                            className="btn-primary"
                                            style={{ padding: '12px 32px', borderRadius: '30px' }}
                                        >
                                            {editingUserId ? 'Save Changes' : 'Send Invite'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IAM;
