import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, MapPin, Tag, LayoutGrid, List as ListIcon, MoreHorizontal, Clock, CheckCircle, AlertCircle, FileText, Trash2, Shield } from 'lucide-react';
import { brands } from '../data/brands';
import { locations } from '../data/locations';
import { users } from '../data/users';
import CreateCampaignWizard from '../components/CreateCampaignWizard';

const Campaigns = () => {
    // Top-level State
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'board'
    const [showWizard, setShowWizard] = useState(false);
    const [currentUser, setCurrentUser] = useState(users.find(u => u.role === 'Super Admin') || users[0]);


    // Filter State
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('Global');
    const [selectedBrand, setSelectedBrand] = useState('All');

    // Mock Data Init
    const [campaigns, setCampaigns] = useState(() => {
        // Generate robust mock data once
        const statuses = ['Active', 'Planning', 'Review', 'Completed'];
        const allRegions = ['Global', ...Object.keys(locations)];

        return Array.from({ length: 18 }).map((_, i) => {
            const brand = brands[i % brands.length];
            const status = statuses[i % 4];
            return {
                id: i + 1,
                name: `${brand.name} ${['Summer', 'Back to School', 'Holiday', 'Q1'][i % 4]} Promo`,
                brand: brand.name,
                status: status,
                budget: `$${(Math.random() * 500 + 50).toFixed(0)}k`,
                reach: `${(Math.random() * 5 + 0.5).toFixed(1)}M`,
                startDate: '2024-06-01',
                endDate: '2024-08-30',
                location: allRegions[i % allRegions.length],
                owner: 'Sarah J.'
            };
        });
    });

    // Filtering Logic
    const filteredCampaigns = useMemo(() => {
        let data = campaigns;

        // RBAC Constraints
        if (currentUser.role === 'Country Manager' && currentUser.region) {
            data = data.filter(c => c.location === currentUser.region || c.location === 'Global');
        } else if (currentUser.role === 'Brand Manager' && currentUser.authorizedBrands) {
            data = data.filter(c => currentUser.authorizedBrands.includes(c.brand));
        }

        if (filterStatus !== 'All') {
            data = data.filter(c => c.status === filterStatus);
        }
        if (selectedBrand !== 'All') {
            data = data.filter(c => c.brand === selectedBrand);
        }
        if (selectedLocation !== 'Global') {
            data = data.filter(c => c.location === selectedLocation);
        }
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            data = data.filter(c => c.name.toLowerCase().includes(lower) || c.brand.toLowerCase().includes(lower));
        }
        return data;
    }, [campaigns, filterStatus, selectedBrand, selectedLocation, searchTerm, currentUser]);

    // Grouping for Kanban
    const kanbanColumns = {
        'Planning': filteredCampaigns.filter(c => c.status === 'Planning'),
        'Active': filteredCampaigns.filter(c => c.status === 'Active'),
        'Review': filteredCampaigns.filter(c => c.status === 'Review'),
        'Completed': filteredCampaigns.filter(c => c.status === 'Completed'),
    };

    const handleCreateCampaign = (newCampaign) => {
        const campaign = {
            id: campaigns.length + 1,
            ...newCampaign,
            status: 'Planning', // Default new to planning
            reach: '0M',
            owner: 'Abijit G.'
        };
        setCampaigns([campaign, ...campaigns]);
        setShowWizard(false);
    };

    const deleteCampaign = (id) => {
        setCampaigns(prev => prev.filter(c => c.id !== id));
    };

    const StatusBadge = ({ status }) => {
        const colors = {
            'Active': { bg: '#DCFCE7', text: '#166534' },
            'Planning': { bg: '#E0F2FE', text: '#075985' },
            'Review': { bg: '#FEF3C7', text: '#B45309' },
            'Completed': { bg: '#F1F5F9', text: '#64748B' }
        };
        const c = colors[status] || colors['Completed'];
        return (
            <span style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', backgroundColor: c.bg, color: c.text }}>
                {status}
            </span>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '24px' }}>

            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Campaigns</h1>
                    <p style={{ color: '#64748B' }}>Manage and track all global marketing initiatives.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>

                    {/* RBAC Simulator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <Shield size={14} color="#64748B" />
                        <select
                            value={currentUser.id}
                            onChange={(e) => setCurrentUser(users.find(u => u.id === parseInt(e.target.value)))}
                            style={{ border: 'none', background: 'transparent', fontSize: '12px', fontWeight: '600', color: '#1E293B', outline: 'none', cursor: 'pointer' }}
                        >
                            {users.map(u => <option key={u.id} value={u.id}>{u.role}</option>)}
                        </select>
                    </div>

                    {/* View Toggle */}
                    <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '8px', padding: '4px', border: '1px solid #E2E8F0' }}>
                        <button
                            onClick={() => setViewMode('list')}
                            style={{ padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: viewMode === 'list' ? '#F1F5F9' : 'transparent', color: viewMode === 'list' ? '#0F172A' : '#64748B', cursor: 'pointer' }}
                        >
                            <ListIcon size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('board')}
                            style={{ padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: viewMode === 'board' ? '#F1F5F9' : 'transparent', color: viewMode === 'board' ? '#0F172A' : '#64748B', cursor: 'pointer' }}
                        >
                            <LayoutGrid size={18} />
                        </button>
                    </div>

                    <button
                        className="btn-primary"
                        onClick={() => setShowWizard(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
                    >
                        <Plus size={20} /> New Campaign
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div style={{ backgroundColor: 'white', padding: '16px 24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '14px' }}
                    />
                </div>

                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', color: '#475569', fontSize: '14px', outline: 'none' }}
                >
                    <option value="Global">Global Location</option>
                    {Object.keys(locations).map(l => <option key={l} value={l}>{l}</option>)}
                </select>

                <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', color: '#475569', fontSize: '14px', outline: 'none' }}
                >
                    <option value="All">All Brands</option>
                    {brands.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                </select>
            </div>

            {/* Content Area */}
            <AnimatePresence mode='wait'>
                {viewMode === 'list' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="card-flow"
                        style={{ padding: 0, overflow: 'hidden' }}
                    >
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                                <tr>
                                    {['Campaign Name', 'Brand', 'Location', 'Status', 'Budget', 'Start Date', ''].map((h, i) => (
                                        <th key={i} style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCampaigns.map((c, i) => (
                                    <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                        <td style={{ padding: '16px 24px', fontWeight: '600', color: '#1E293B' }}>{c.name}</td>
                                        <td style={{ padding: '16px 24px', color: '#475569' }}>{c.brand}</td>
                                        <td style={{ padding: '16px 24px', color: '#475569' }}>{c.location}</td>
                                        <td style={{ padding: '16px 24px' }}><StatusBadge status={c.status} /></td>
                                        <td style={{ padding: '16px 24px', color: '#475569' }}>{c.budget}</td>
                                        <td style={{ padding: '16px 24px', color: '#475569' }}>{c.startDate}</td>
                                        <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                            {c.status === 'Planning' ? (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); deleteCampaign(c.id); }}
                                                    style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}
                                                    title="Delete Campaign"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            ) : (
                                                <button style={{ color: '#94A3B8', border: 'none', background: 'none', cursor: 'pointer' }}><MoreHorizontal size={20} /></button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', alignItems: 'start' }}
                    >
                        {Object.entries(kanbanColumns).map(([status, items]) => (
                            <div key={status} style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '16px', minHeight: '500px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', padding: '0 4px' }}>
                                    <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>{status}</h3>
                                    <span style={{ fontSize: '12px', color: '#94A3B8', backgroundColor: '#E2E8F0', padding: '2px 8px', borderRadius: '12px' }}>{items.length}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {items.map(c => (
                                        <motion.div
                                            key={c.id}
                                            layoutId={c.id}
                                            style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', cursor: 'grab' }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '10px', fontWeight: '700', color: '#003DA5', textTransform: 'uppercase' }}>{c.brand}</span>
                                                {c.status === 'Planning' ? (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); deleteCampaign(c.id); }}
                                                        style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', padding: '0' }}
                                                        title="Delete Campaign"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                ) : (
                                                    <MoreHorizontal size={14} color="#94A3B8" />
                                                )}
                                            </div>
                                            <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', marginBottom: '12px', lineHeight: '1.4' }}>{c.name}</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B' }}>
                                                    <DollarSign size={12} /> {c.budget}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B' }}>
                                                    <Clock size={12} /> {c.startDate}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Campaign Wizard */}
            {showWizard && <CreateCampaignWizard onClose={() => setShowWizard(false)} onSave={handleCreateCampaign} />}
        </div>
    );
};

// Helper Icon for Kanban card because I used DollarSign inside map but didn't import distinct one there
const DollarSign = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
);

export default Campaigns;
