import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bar, Line } from 'react-chartjs-2';
import { brands } from '../data/brands';
import { locations } from '../data/locations';
import { users } from '../data/users';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { ArrowUpRight, Users, Globe, Layers, Activity, Briefcase, MapPin, Tag, Filter, Shield } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Dashboard = () => {
    // State for Filters
    const [selectedLocation, setSelectedLocation] = useState('Global');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedCampaign, setSelectedCampaign] = useState('All');

    // State for Simulation (RBAC)
    // Default to first Super Admin found or the logged in user
    const [currentUser, setCurrentUser] = useState(users.find(u => u.role === 'Super Admin') || users[0]);

    // Flatten locations for dropdown
    const allRegions = Object.keys(locations);

    // Generate Mock Campaigns (memoized to persist across renders)
    const allCampaigns = useMemo(() => {
        const baseCampaigns = [
            { id: 101, name: 'Widen The Screen', brand: 'Corporate', regions: 'Global', status: 'Active', color: 'var(--color-status-active)', bg: 'rgba(0, 177, 64, 0.1)' },
            { id: 102, name: 'Olympics 2024', brand: 'Corporate', regions: 'Europe', status: 'Planning', color: 'var(--color-status-planning)', bg: 'rgba(0, 163, 224, 0.1)' }
        ];

        const generated = brands.slice(0, 15).map((brand, i) => ({
            id: i + 1,
            name: `${brand.name} ${brand.category === 'Baby Care' ? 'Loyalty Program' : 'Summer Promo'}`,
            brand: brand.name,
            regions: ['Global', 'North America', 'Europe', 'Asia & Pacific'][i % 4],
            country: i % 3 === 0 ? 'United States' : (i % 3 === 1 ? 'France' : 'China'), // simplistic distribution
            status: ['Active', 'Planning', 'Review'][i % 3],
            color: ['Active', 'Review'].includes(['Active', 'Planning', 'Review'][i % 3]) ? 'var(--color-status-active)' : 'var(--color-status-planning)',
            bg: 'rgba(0, 177, 64, 0.1)'
        }));

        return [...baseCampaigns, ...generated];
    }, []);

    // --- FILTER LOGIC ---
    const filteredData = useMemo(() => {
        let data = allCampaigns;

        // 1. Filter by Location
        if (selectedLocation !== 'Global') {
            if (allRegions.includes(selectedLocation)) {
                // Region Select
                data = data.filter(c => c.regions === 'Global' || c.regions === selectedLocation);
            } else {
                // Country Select
                data = data.filter(c => c.regions === 'Global' || c.country === selectedLocation);
            }
        }

        // 2. Filter by Brand
        if (selectedBrand !== 'All') {
            data = data.filter(c => c.brand === selectedBrand);
        }

        // 3. Filter by Campaign Name
        if (selectedCampaign !== 'All') {
            data = data.filter(c => c.name === selectedCampaign);
        }

        // 4. Filter by ROLE (Constraint)
        // If Country Manager, strictly limit? For now, we assume the dropdowns do the filtering, 
        // but let's enforce "visibility" based on role logic if needed. 
        // For this demo, we'll assume the USER uses the filters to find what they need, 
        // but the WIDGETS layout changes based on role.

        return data;
    }, [selectedLocation, selectedBrand, selectedCampaign, allCampaigns, allRegions]);

    // Recalculate Stats based on filteredData
    const stats = [
        { title: 'Total Campaigns', value: filteredData.length, change: '+12%', icon: Layers },
        { title: 'Active Brands', value: new Set(filteredData.map(c => c.brand)).size, change: '+5%', icon: Briefcase },
        { title: 'Total Reach', value: `${(filteredData.length * 0.5 + 1.2).toFixed(1)}M`, change: '+18%', icon: Globe },
        { title: 'Avg. Engagement', value: '24%', change: '+2%', icon: Activity },
    ];

    // --- RBAC WIDGET VISIBILITY ---
    const visibleWidgets = useMemo(() => {
        const role = currentUser.role;
        // Define widget IDs: 'stats', 'chart', 'list', 'banner'
        if (role === 'Super Admin') return ['stats', 'chart', 'list', 'banner'];
        if (role === 'Brand Manager') return ['stats', 'chart', 'list']; // No banner
        if (role === 'Country Manager') return ['stats', 'list']; // No chart, no banner
        if (role === 'Campaign Manager') return ['list', 'chart'];
        return ['stats', 'list']; // Default
    }, [currentUser]);

    // Chart Data
    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Total Engagement',
            data: [12000, 19000, 15000, 22000, 28000, 35000].map(v => v * (filteredData.length / allCampaigns.length)), // Scale data by filter
            borderColor: '#003DA5',
            backgroundColor: 'rgba(0, 61, 165, 0.1)',
            fill: true,
            tension: 0.4,
        }],
    };

    const lineChartOptions = {
        responsive: true,
        plugins: { legend: { display: false }, title: { display: false } },
        scales: { y: { beginAtZero: true, grid: { color: '#E2E8F0' } }, x: { grid: { display: false } } },
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Top Bar: Welcome + Role Switcher (Simulation) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
                        Welcome back, {currentUser.name.split(' ')[0]}
                    </h1>
                    <p style={{ color: '#64748B' }}>Here's what's happening with your campaigns today.</p>
                </motion.div>

                {/* Role Simulator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', backgroundColor: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
                        <Shield size={14} /> Viewing as:
                    </div>
                    <select
                        value={currentUser.id}
                        onChange={(e) => {
                            const user = users.find(u => u.id === parseInt(e.target.value));
                            setCurrentUser(user);
                        }}
                        style={{ border: 'none', background: 'transparent', fontWeight: '700', color: '#003DA5', cursor: 'pointer', outline: 'none' }}
                    >
                        {users.map(u => (
                            <option key={u.id} value={u.id}>{u.role}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Global Filters Bar */}
            <div style={{ backgroundColor: 'white', padding: '16px 24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontWeight: '600', fontSize: '14px' }}>
                    <Filter size={18} /> Filters:
                </div>

                {/* Location Filter */}
                <div style={{ position: 'relative' }}>
                    <MapPin size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        style={{ padding: '8px 12px 8px 32px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', minWidth: '140px', cursor: 'pointer' }}
                    >
                        <option value="Global">Global View</option>
                        {allRegions.map(region => (
                            <optgroup key={region} label={region}>
                                <option value={region}>{region}</option>
                                {locations[region].map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                {/* Brand Filter */}
                <div style={{ position: 'relative' }}>
                    <Briefcase size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                    <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        style={{ padding: '8px 12px 8px 32px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', minWidth: '140px', cursor: 'pointer' }}
                    >
                        <option value="All">All Brands</option>
                        {brands.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                    </select>
                </div>

                {/* Campaign Filter */}
                <div style={{ position: 'relative' }}>
                    <Tag size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                    <select
                        value={selectedCampaign}
                        onChange={(e) => setSelectedCampaign(e.target.value)}
                        style={{ padding: '8px 12px 8px 32px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', minWidth: '140px', cursor: 'pointer' }}
                    >
                        <option value="All">All Campaigns</option>
                        {allCampaigns.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                </div>

                <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#64748B' }}>
                    Showing {filteredData.length} results
                </div>
            </div>

            {/* Dashboard Content - Conditional Rendering based on Roles */}

            {/* 1. Stats Grid */}
            {visibleWidgets.includes('stats') && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                    {stats.map((stat, index) => (
                        <StatsCard key={index} stat={stat} index={index} />
                    ))}
                </div>
            )}

            {/* Main Grid: Chart + List */}
            <div style={{ display: 'grid', gridTemplateColumns: visibleWidgets.includes('chart') ? '2fr 1fr' : '1fr', gap: '24px' }}>

                {/* 2. Analytics Chart */}
                {visibleWidgets.includes('chart') && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-card)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Engagement Overview</h3>
                            <select style={{ padding: '4px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}>
                                <option>Last 6 Months</option>
                                <option>Last Year</option>
                            </select>
                        </div>
                        <div style={{ height: '300px' }}>
                            <Line data={lineChartData} options={lineChartOptions} />
                        </div>
                    </motion.div>
                )}

                {/* 3. Active Campaigns List */}
                {visibleWidgets.includes('list') && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="card-flow"
                        style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}
                    >
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Active Campaigns</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', maxHeight: '300px' }}>
                            {filteredData.slice(0, 5).map((campaign, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
                                    <div>
                                        <div style={{ fontWeight: '600', color: 'var(--color-text-main)', fontSize: '14px' }}>{campaign.name}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{campaign.regions}</div>
                                    </div>
                                    <span style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '12px', backgroundColor: campaign.bg, color: 'var(--color-primary)', fontWeight: '600' }}>
                                        {campaign.status}
                                    </span>
                                </div>
                            ))}
                            {filteredData.length === 0 && <div style={{ color: '#64748B', fontStyle: 'italic' }}>No campaigns match filters.</div>}
                        </div>
                        <button style={{ marginTop: 'auto', color: 'var(--color-primary)', fontWeight: '600', fontSize: '14px', alignSelf: 'center', padding: '10px' }}>View All</button>
                    </motion.div>
                )}
            </div>

            {/* 4. Featured Banner */}
            {visibleWidgets.includes('banner') && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{
                        height: '240px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'linear-gradient(105deg, var(--color-pg-blue) 0%, #000E2F 100%)',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 40px',
                        color: 'white',
                        overflow: 'hidden',
                        boxShadow: '0 20px 25px -5px rgba(0, 61, 165, 0.15)'
                    }}
                >
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2070&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4, mixBlendMode: 'overlay' }} />
                    <div style={{ zIndex: 1, maxWidth: '60%' }}>
                        <div style={{ display: 'inline-block', padding: '6px 16px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '30px', fontSize: '11px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Campaign</div>
                        <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', lineHeight: '1.2' }}>Widen The Screen</h2>
                        <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: '1.5', fontWeight: '300' }}>An expansive content platform aimed at widening the screen to widen our view of the Black experience.</p>
                        <button className="btn-primary" style={{ marginTop: '24px', backgroundColor: 'white', color: 'var(--color-pg-blue)', display: 'flex', alignItems: 'center', gap: '8px', border: 'none' }}>
                            Explore Assets <ArrowUpRight size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

const StatsCard = ({ stat, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={20} color="var(--color-primary)" />
            </div>
            <span style={{ fontSize: '12px', color: '#10B981', backgroundColor: '#DCFCE7', padding: '4px 8px', borderRadius: '16px', fontWeight: '600' }}>{stat.change}</span>
        </div>
        <div>
            <h4 style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B' }}>{stat.value}</h4>
            <p style={{ color: '#64748B', fontSize: '14px' }}>{stat.title}</p>
        </div>
    </motion.div>
);

export default Dashboard;
