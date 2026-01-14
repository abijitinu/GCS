import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Filter, Calendar, Globe, ChevronDown, Share2, Printer, BarChart3, TrendingUp, Users, DollarSign, MousePointer } from 'lucide-react';
import { brands } from '../data/brands';
import { locations } from '../data/locations';

const Reports = () => {
    const [selectedBrand, setSelectedBrand] = useState('All Brands');
    const [selectedCampaign, setSelectedCampaign] = useState('All Campaigns');
    const [selectedLocation, setSelectedLocation] = useState('Global');
    const [dateRange, setDateRange] = useState('Last 30 Days');

    // Mock specific campaigns for filter
    const campaigns = [
        { id: 1, name: 'Summer Olympics 2024', brand: 'Gillette' },
        { id: 2, name: 'Back to School Promo', brand: 'Pampers' },
        { id: 3, name: 'Super Bowl LVIII', brand: 'Tide' },
        { id: 4, name: 'Holiday Special', brand: 'Old Spice' },
        { id: 5, name: 'Q1 Launch', brand: 'Olay' },
        { id: 6, name: 'Fabric Softener Push', brand: 'Downy' }
    ];

    // Filter logic
    const filteredCampaigns = selectedBrand === 'All Brands'
        ? campaigns
        : campaigns.filter(c => c.brand === selectedBrand);

    const currentBrandData = brands.find(b => b.name === selectedBrand);

    // Dynamic Reports List based on selection (Mock logic)
    const allReports = [
        { name: 'Q3 Global Campaign Performance', type: 'PDF', size: '2.4 MB', date: 'Oct 24, 2024', author: 'System Generated', brand: 'All Brands' },
        { name: 'Widen The Screen - Reach Analysis', type: 'Excel', size: '1.1 MB', date: 'Oct 22, 2024', author: 'Sarah Jenkins', brand: 'Pampers' },
        { name: 'Sustainability Usage Metrics', type: 'PDF', size: '4.8 MB', date: 'Oct 20, 2024', author: 'Mike Ross', brand: 'Tide' },
        { name: 'Brand Sentiment Q3', type: 'PDF', size: '3.2 MB', date: 'Oct 18, 2024', author: 'System Generated', brand: 'Gillette' },
        { name: 'Budget Utilization Review', type: 'Excel', size: '890 KB', date: 'Oct 15, 2024', author: 'Finance Team', brand: 'Olay' },
    ];

    const displayReports = selectedBrand === 'All Brands'
        ? allReports
        : allReports.filter(r => r.brand === selectedBrand || r.brand === 'All Brands');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', pb: '40px' }}>
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Reports & Analytics</h1>
                    <p style={{ color: '#64748B' }}>Generate insights, track KPIs, and export performance data.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: 'white', color: '#64748B', fontWeight: '600', cursor: 'pointer' }}>
                        <Share2 size={18} /> Share
                    </button>
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
                        <Download size={20} /> Export Report
                    </button>
                </div>
            </motion.div>

            {/* Filter Bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ backgroundColor: 'white', padding: '16px 24px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
            >
                <Filter size={20} color="#64748B" />
                <div style={{ height: '24px', width: '1px', backgroundColor: '#E2E8F0' }}></div>

                {/* Location Selector */}
                <div style={{ position: 'relative' }}>
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        style={{ padding: '8px 32px 8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', color: '#475569', outline: 'none', appearance: 'none', backgroundColor: '#F8FAFC', cursor: 'pointer', minWidth: '160px' }}
                    >
                        <option value="Global">Global</option>
                        {Object.entries(locations).map(([region, countries]) => (
                            <optgroup key={region} label={region}>
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
                </div>

                {/* Brand Selector */}
                <div style={{ position: 'relative' }}>
                    <select
                        value={selectedBrand}
                        onChange={(e) => {
                            setSelectedBrand(e.target.value);
                            setSelectedCampaign('All Campaigns'); // Reset campaign on brand change
                        }}
                        style={{ padding: '8px 32px 8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', color: '#475569', outline: 'none', appearance: 'none', backgroundColor: '#F8FAFC', cursor: 'pointer', minWidth: '160px' }}
                    >
                        <option value="All Brands">All Brands</option>
                        {brands.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
                </div>

                {/* Campaign Selector */}
                <div style={{ position: 'relative' }}>
                    <select
                        value={selectedCampaign}
                        onChange={(e) => setSelectedCampaign(e.target.value)}
                        style={{ padding: '8px 32px 8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', color: '#475569', outline: 'none', appearance: 'none', backgroundColor: '#F8FAFC', cursor: 'pointer', minWidth: '180px' }}
                    >
                        <option value="All Campaigns">All Campaigns</option>
                        {filteredCampaigns.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
                </div>

                {/* Date Selector */}
                <div style={{ position: 'relative', marginLeft: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', cursor: 'pointer' }}>
                        <Calendar size={16} color="#64748B" />
                        <span style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>{dateRange}</span>
                        <ChevronDown size={14} color="#64748B" />
                    </div>
                </div>
            </motion.div>

            {/* Main Report Content */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '24px' }}>

                {/* Dynamic Report Header Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '32px', overflow: 'hidden', position: 'relative' }}
                >
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #003DA5 0%, #0891B2 100%)' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '16px',
                                backgroundColor: selectedBrand === 'All Brands' ? '#F1F5F9' : 'white',
                                border: '1px solid #E2E8F0',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                            }}>
                                {selectedBrand === 'All Brands' ? (
                                    <Globe size={40} color="#003DA5" />
                                ) : currentBrandData?.imageUrl ? (
                                    <img src={currentBrandData.imageUrl} alt={selectedBrand} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
                                ) : (
                                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#003DA5' }}>{selectedBrand.charAt(0)}</span>
                                )}
                            </div>
                            <div>
                                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1E293B', marginBottom: '4px' }}>
                                    {selectedBrand === 'All Brands' ? `${selectedLocation} Performance Overview` : `${selectedBrand} Brand Report - ${selectedLocation}`}
                                </h2>
                                <p style={{ color: '#64748B', fontSize: '16px' }}>
                                    {selectedCampaign === 'All Campaigns' ? 'Aggregated data across all active campaigns' : `Detailed analysis for ${selectedCampaign}`}
                                </p>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '4px' }}>Report Period</div>
                            <div style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B' }}>Oct 1 - Oct 31, 2024</div>
                        </div>
                    </div>
                </motion.div>

                {/* KPI Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                    {[
                        { label: 'Total Spend', value: '$1.2M', change: '+12%', icon: DollarSign, color: '#003DA5' },
                        { label: 'Impressions', value: '45.2M', change: '+8.5%', icon: Users, color: '#0891B2' },
                        { label: 'Avg. CTR', value: '2.4%', change: '-0.2%', icon: MousePointer, color: '#EA580C' },
                        { label: 'ROAS', value: '3.8x', change: '+15%', icon: TrendingUp, color: '#16A34A' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                            style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{ padding: '12px', backgroundColor: `${stat.color}15`, borderRadius: '12px', color: stat.color }}>
                                    <stat.icon size={20} />
                                </div>
                                <span style={{
                                    fontSize: '12px', fontWeight: '600', padding: '4px 8px', borderRadius: '20px',
                                    backgroundColor: stat.change.startsWith('+') ? '#DCFCE7' : '#FEE2E2',
                                    color: stat.change.startsWith('+') ? '#166534' : '#991B1B'
                                }}>
                                    {stat.change}
                                </span>
                            </div>
                            <div style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '4px' }}>{stat.value}</div>
                            <div style={{ fontSize: '14px', color: '#64748B' }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Area Placeholder */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', minHeight: '300px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B' }}>Performance Trends</h3>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Filter size={16} /></button>
                        </div>
                        {/* Fake Line Chart Visual using CSS Gradients/Shapes as placeholder */}
                        <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px' }}>
                            {[40, 60, 45, 70, 65, 80, 50, 60, 75, 90, 85, 95].map((h, i) => (
                                <div key={i} style={{
                                    width: '6%',
                                    height: `${h}%`,
                                    backgroundColor: '#E2E8F0',
                                    borderRadius: '4px',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        height: `${h * 0.7}%`,
                                        backgroundColor: '#003DA5',
                                        borderRadius: '4px',
                                        opacity: 0.8
                                    }}></div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px', color: '#94A3B8' }}>
                            <span>Oct 1</span><span>Oct 5</span><span>Oct 10</span><span>Oct 15</span><span>Oct 20</span><span>Oct 25</span><span>Oct 30</span>
                        </div>
                    </motion.div>
                </div>

                {/* Available Reports List */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}
                >
                    <div style={{ padding: '24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B' }}>Detailed Reports</h3>
                        <button style={{ color: '#003DA5', fontSize: '14px', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>View All History</button>
                    </div>
                    <div>
                        {displayReports.length > 0 ? displayReports.map((doc, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #F1F5F9', justifyContent: 'space-between', transition: 'background-color 0.2s' }} className="hover:bg-slate-50">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '48px', height: '48px',
                                        borderRadius: '12px',
                                        backgroundColor: doc.type === 'PDF' ? '#FEF2F2' : '#F0FDF4',
                                        color: doc.type === 'PDF' ? '#EF4444' : '#16A34A',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#1E293B', marginBottom: '4px' }}>{doc.name}</div>
                                        <div style={{ fontSize: '12px', color: '#64748B' }}>
                                            <span style={{ fontWeight: '500', color: '#475569' }}>{doc.brand}</span> • {doc.type} • {doc.size} • {doc.date}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: 'white', cursor: 'pointer', color: '#64748B' }}>
                                        <Printer size={18} />
                                    </button>
                                    <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: 'white', cursor: 'pointer', color: '#64748B' }}>
                                        <Download size={18} />
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                                No reports found for this selection.
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Reports;
