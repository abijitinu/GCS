import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { brands } from '../data/brands';

const Brands = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(brands.map(b => b.category))];

    const filteredBrands = brands.filter(brand => {
        const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || brand.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Brand Portfolio</h1>
                <p style={{ color: '#64748B' }}>Manage and view all {brands.length} P&G brands across global markets.</p>
            </motion.div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                        type="text"
                        placeholder="Search brands..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '12px 16px 12px 40px',
                            borderRadius: 'var(--radius-pill)',
                            border: '1px solid #E2E8F0',
                            outline: 'none',
                            width: '320px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: 'var(--radius-pill)',
                                fontSize: '13px',
                                fontWeight: '600',
                                border: selectedCategory === cat ? 'none' : '1px solid #E2E8F0',
                                backgroundColor: selectedCategory === cat ? 'var(--color-primary)' : 'white',
                                color: selectedCategory === cat ? 'white' : 'var(--color-text-secondary)',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Brand Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '24px'
            }}>
                {filteredBrands.map((brand, index) => (
                    <motion.div
                        key={brand.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="card-flow"
                        style={{
                            padding: '32px 24px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            minHeight: '180px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease'
                        }}
                        whileHover={{ y: -5 }}
                    >
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: brand.imageUrl ? 'white' : 'var(--color-bg-app)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            overflow: 'hidden',
                            boxShadow: brand.imageUrl ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none',
                            border: brand.imageUrl ? '1px solid #F1F5F9' : 'none',
                            padding: brand.imageUrl ? '12px' : '0'
                        }}>
                            {brand.imageUrl ? (
                                <img
                                    src={brand.imageUrl}
                                    alt={brand.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                            ) : (
                                <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-primary)' }}>
                                    {brand.name.charAt(0)}
                                </span>
                            )}
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '4px' }}>{brand.name}</h3>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '12px' }}>
                            {brand.category}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Brands;
