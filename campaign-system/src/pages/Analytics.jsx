import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Doughnut, Bar } from 'react-chartjs-2';
import { TrendingUp, Users, DollarSign, Target, ArrowUp, ArrowDown } from 'lucide-react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Analytics = () => {
    // Mock Data
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

    const performanceData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Revenue (M)',
                data: [65, 59, 80, 81, 56, 95],
                backgroundColor: 'rgba(0, 61, 165, 0.8)',
            },
            {
                label: 'Cost (M)',
                data: [28, 48, 40, 19, 46, 27],
                backgroundColor: 'rgba(148, 163, 184, 0.5)',
            }
        ]
    };

    const kpiCards = [
        { title: 'Total Revenue', value: '$84.2M', change: '+12.5%', isPositive: true, icon: DollarSign },
        { title: 'Conversion Rate', value: '4.8%', change: '-0.4%', isPositive: false, icon: Target },
        { title: 'Total Impressions', value: '1.2B', change: '+24.0%', isPositive: true, icon: Users },
        { title: 'Avg. ROI', value: '340%', change: '+18.2%', isPositive: true, icon: TrendingUp },
    ];



    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Analytics</h1>
                        <p style={{ color: '#64748B' }}>Deep dive into campaign performance and ROI metrics.</p>
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

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Main Performance Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="card-flow"
                    style={{ padding: '24px' }}
                >
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Financial Performance</h3>
                    <div style={{ height: '300px' }}>
                        <Bar data={performanceData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: '#F1F5F9' } }, x: { grid: { display: false } } }, borderRadius: 4 }} />
                    </div>
                </motion.div>

                {/* Regional Breakdown */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="card-flow"
                    style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', alignSelf: 'flex-start' }}>Impact by Region</h3>
                    <div style={{ height: '240px', width: '100%', position: 'relative' }}>
                        <Doughnut
                            data={regionData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                cutout: '70%',
                                plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } } }
                            }}
                        />
                        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1E293B' }}>1.2B</div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>Impressions</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Analytics;
