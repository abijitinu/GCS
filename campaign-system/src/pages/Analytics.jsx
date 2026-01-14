import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { TrendingUp, Users, DollarSign, Target, ArrowUp, ArrowDown, Activity, Calendar, Filter, ChevronDown } from 'lucide-react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title
} from 'chart.js';
import { brands } from '../data/brands';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title
);

const Analytics = () => {
    // --- Filter States ---
    const [dateRange, setDateRange] = useState('Last 30 Days');
    const [selectedRegion, setSelectedRegion] = useState('All Global');
    const [selectedCampaignType, setSelectedCampaignType] = useState('All Campaigns');

    // --- Mock Data ---

    // 1. Existing: Impact by Region
    const regionData = {
        labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'MEA'],
        datasets: [{
            data: [45, 25, 20, 7, 3],
            backgroundColor: [
                '#003DA5', // P&G Blue
                '#00A3E0', // Heritage Blue
                '#97D700', // Lime
                '#E87722', // Orange
                '#EF3340'  // Red
            ],
            borderWidth: 0
        }]
    };

    // 2. Existing: Financial Performance
    const performanceData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Revenue (M)',
                data: [65, 59, 80, 81, 56, 95],
                backgroundColor: 'rgba(0, 61, 165, 0.8)',
                borderRadius: 4,
            },
            {
                label: 'Cost (M)',
                data: [28, 48, 40, 19, 46, 27],
                backgroundColor: 'rgba(148, 163, 184, 0.5)',
                borderRadius: 4,
            }
        ]
    };

    // 3. New: Category Performance (Baby Care vs Fabric vs Grooming etc)
    // Aggregating some mock data based on categories found in brands.js
    const categoryData = {
        labels: ['Baby Care', 'Fabric Care', 'Family Care', 'Grooming', 'Hair Care', 'Oral Care'],
        datasets: [
            {
                label: 'Sales Volume (Units)',
                data: [12000, 19000, 8000, 15000, 11000, 9500],
                backgroundColor: 'rgba(124, 58, 237, 0.6)', // Violet
                borderColor: 'rgba(124, 58, 237, 1)',
                borderWidth: 1,
                borderRadius: 4
            }
        ]
    };

    // 4. New: Channel Breakdown
    const channelData = {
        labels: ['Social Media', 'TV Ads', 'In-Store', 'Email', 'Search'],
        datasets: [
            {
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#3B82F6', // Blue
                    '#EF4444', // Red
                    '#10B981', // Emerald
                    '#F59E0B', // Amber
                    '#6366F1'  // Indigo
                ],
                borderWidth: 0
            }
        ]
    };

    // 5. New: Audience Demographics
    const demographicsData = {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        datasets: [
            {
                label: 'Male',
                data: [15, 25, 20, 15, 10],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                stack: 'Stack 0',
            },
            {
                label: 'Female',
                data: [20, 30, 25, 20, 15],
                backgroundColor: 'rgba(236, 72, 153, 0.7)',
                stack: 'Stack 0',
            },
        ]
    };

    // 6. New: Top Performing Brands (Mock logic)
    const topBrands = brands.slice(0, 5).map((brand, i) => ({
        ...brand,
        roi: `${(Math.random() * 200 + 150).toFixed(0)}%`,
        revenue: `$${(Math.random() * 50 + 10).toFixed(1)}M`,
        trend: Math.random() > 0.4 ? 'up' : 'down'
    }));

    // 7. New: Real-Time Active Users (Simulated)
    const [activeUsers, setActiveUsers] = useState(1245);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveUsers(prev => prev + Math.floor(Math.random() * 10 - 4));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const kpiCards = [
        { title: 'Total Revenue', value: '$84.2M', change: '+12.5%', isPositive: true, icon: DollarSign },
        { title: 'Conversion Rate', value: '4.8%', change: '-0.4%', isPositive: false, icon: Target },
        { title: 'Total Impressions', value: '1.2B', change: '+24.0%', isPositive: true, icon: Users },
        { title: 'Avg. ROI', value: '340%', change: '+18.2%', isPositive: true, icon: TrendingUp },
    ];

    const FilterButton = ({ label, value, icon: Icon }) => (
        <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            color: '#475569',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}>
            {Icon && <Icon size={16} />}
            <span>{value}</span>
            <ChevronDown size={14} />
        </button>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Analytics</h1>
                            <p style={{ color: '#64748B' }}>Deep dive into campaign performance and ROI metrics.</p>
                        </div>
                        {/* Real-time Users Widget */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                            <div style={{ position: 'relative' }}>
                                <Activity size={24} color="#10B981" />
                                <span style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%', border: '2px solid white' }}></span>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>Active Users</div>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', fontVariantNumeric: 'tabular-nums' }}>{activeUsers.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>

                    {/* Filters Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '8px' }}>
                        <FilterButton icon={Calendar} value={dateRange} label="Date Range" />
                        <FilterButton icon={Globe} value={selectedRegion} label="Region" />
                        <FilterButton icon={Filter} value={selectedCampaignType} label="Campaign Type" />
                        <div style={{ flex: 1 }}></div>
                        <button style={{
                            padding: '8px 16px',
                            backgroundColor: '#F1F5F9',
                            color: '#64748B',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            Reset Filters
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                {kpiCards.map((kpi, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                        className="card-flow"
                        style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#F1F5F9' }}>
                                <kpi.icon size={20} color="var(--color-primary)" />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '600', color: kpi.isPositive ? '#166534' : '#B91C1C', backgroundColor: kpi.isPositive ? '#DCFCE7' : '#FEE2E2', padding: '4px 8px', borderRadius: '20px' }}>
                                {kpi.isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                                {kpi.change}
                            </div>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B' }}>{kpi.value}</h3>
                            <span style={{ fontSize: '14px', color: '#64748B' }}>{kpi.title}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Row 2: Financial Performance (Large) & Demographics */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="card-flow"
                    style={{ padding: '24px' }}
                >
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Financial Performance</h3>
                    <div style={{ height: '300px' }}>
                        <Bar data={performanceData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: '#F1F5F9' } }, x: { grid: { display: false } } } }} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="card-flow"
                    style={{ padding: '24px' }}
                >
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Audience Demographics</h3>
                    <div style={{ height: '300px' }}>
                        <Bar
                            data={demographicsData}
                            options={{
                                indexAxis: 'y',
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, grid: { display: false } } },
                                plugins: { legend: { position: 'bottom' } }
                            }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Row 3: Category Performance & Channel Breakdown & Top Brands */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                {/* Category Performance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-flow"
                    style={{ padding: '24px' }}
                >
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Sales by Category</h3>
                    <div style={{ height: '220px' }}>
                        <Bar
                            data={categoryData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: { x: { grid: { display: false } } }
                            }}
                        />
                    </div>
                </motion.div>

                {/* Channel Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card-flow"
                    style={{ padding: '24px' }}
                >
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Channel Breakdown</h3>
                    <div style={{ height: '220px', display: 'flex', justifyContent: 'center' }}>
                        <Doughnut
                            data={channelData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                cutout: '60%',
                                plugins: { legend: { position: 'right', labels: { boxWidth: 12 } } }
                            }}
                        />
                    </div>
                </motion.div>

                {/* Top Performing Brands */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card-flow"
                    style={{ padding: '24px', overflowY: 'auto' }}
                >
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Top Brands</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {topBrands.map((brand, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ fontWeight: '600', color: '#334155' }}>{i + 1}.</div>
                                    {brand.imageUrl ?
                                        <img src={brand.imageUrl} alt={brand.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                                        : <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#E2E8F0' }}></div>
                                    }
                                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{brand.name}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B' }}>{brand.roi}</div>
                                    <div style={{ fontSize: '11px', color: brand.trend === 'up' ? '#166534' : '#B91C1C' }}>
                                        {brand.trend === 'up' ? '▲' : '▼'} {brand.revenue}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Impact by Region (Keep at bottom or move up if preferred) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="card-flow"
                style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', alignSelf: 'flex-start' }}>Global Impact by Region</h3>
                <div style={{ height: '300px', width: '100%', position: 'relative' }}>
                    <Doughnut
                        data={regionData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: '70%',
                            plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } } }
                        }}
                    />
                    <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B' }}>1.2B</div>
                        <div style={{ fontSize: '14px', color: '#64748B' }}>Impressions</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Analytics;
