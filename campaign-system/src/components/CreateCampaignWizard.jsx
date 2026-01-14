import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check, Calendar, DollarSign, Globe, Upload } from 'lucide-react';
import { brands } from '../data/brands';
import { locations } from '../data/locations';

const steps = [
    { id: 1, title: 'Campaign Details', icon: Globe },
    { id: 2, title: 'Budget & Timeline', icon: DollarSign },
    { id: 3, title: 'Assets & Review', icon: Upload }
];

const CreateCampaignWizard = ({ onClose, onSave }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        brand: brands[0].name,
        region: 'Global',
        budget: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    const handleNext = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
        else onSave(formData);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    style={{
                        backgroundColor: 'white',
                        width: '90%',
                        maxWidth: '700px',
                        borderRadius: '24px',
                        padding: '40px',
                        position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
                    >
                        <X size={24} />
                    </button>

                    <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Create New Campaign</h2>
                    <p style={{ color: '#64748B', marginBottom: '32px' }}>Launch a new marketing initiative in just a few steps.</p>

                    {/* Stepper */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 0, right: 0, top: '20px', transform: 'translateY(-50%)', height: '2px', backgroundColor: '#E2E8F0', zIndex: 0 }}></div>
                        {steps.map((step) => {
                            const isActive = step.id === currentStep;
                            const isCompleted = step.id < currentStep;
                            return (
                                <div key={step.id} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: isActive ? 'var(--color-primary)' : (isCompleted ? '#10B981' : 'white'),
                                        border: `2px solid ${isActive ? 'var(--color-primary)' : (isCompleted ? '#10B981' : '#E2E8F0')}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: isActive || isCompleted ? 'white' : '#64748B',
                                        transition: 'all 0.3s'
                                    }}>
                                        {isCompleted ? <Check size={20} /> : <step.icon size={18} />}
                                    </div>
                                    <span style={{ fontSize: '12px', fontWeight: '600', color: isActive ? 'var(--color-primary)' : '#64748B' }}>{step.title}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Step Content */}
                    <div style={{ flex: 1, overflowY: 'auto', marginBottom: '32px' }}>
                        {currentStep === 1 && (
                            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="e.g. Summer Glow 2024"
                                        autoFocus
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                                    />
                                </div>

                                {/* Reordered: Location First */}
                                <div style={{ marginTop: '16px' }}>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Target Region</label>
                                    <select
                                        value={formData.region}
                                        onChange={e => setFormData({ ...formData, region: e.target.value })}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', backgroundColor: 'white' }}
                                    >
                                        <option value="Global">Global</option>
                                        {Object.keys(locations).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                    </select>
                                </div>

                                {/* Brand Selection changed to Dropdown */}
                                <div style={{ marginTop: '16px' }}>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Select Brand</label>
                                    <select
                                        value={formData.brand}
                                        onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', backgroundColor: 'white' }}
                                    >
                                        {brands.map(brand => (
                                            <option key={brand.name} value={brand.name}>{brand.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Total Budget (USD)</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}>$</span>
                                        <input
                                            type="number"
                                            value={formData.budget}
                                            onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                            placeholder="50,000"
                                            style={{ width: '100%', padding: '12px 12px 12px 32px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                                <div style={{ border: '2px dashed #CBD5E1', borderRadius: '12px', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', cursor: 'pointer' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                        <Upload size={24} color="var(--color-primary)" />
                                    </div>
                                    <p style={{ fontWeight: '600', color: '#1E293B' }}>Upload Campaign Assets</p>
                                    <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Drag and drop or click to browse (Mock)</p>
                                </div>
                                <div style={{ marginTop: '24px', backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Summary</h4>
                                    <p style={{ fontSize: '14px', color: '#475569' }}><strong>Name:</strong> {formData.name}</p>
                                    <p style={{ fontSize: '14px', color: '#475569' }}><strong>Target:</strong> {formData.region}</p>
                                    <p style={{ fontSize: '14px', color: '#475569' }}><strong>Brand:</strong> {formData.brand}</p>
                                    <p style={{ fontSize: '14px', color: '#475569' }}><strong>Budget:</strong> ${formData.budget}</p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid #F1F5F9' }}>
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '30px',
                                fontWeight: '600',
                                color: currentStep === 1 ? '#CBD5E1' : '#64748B',
                                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                                background: 'none',
                                border: 'none'
                            }}
                        >
                            Back
                        </button>
                        <button
                            className="btn-primary"
                            onClick={handleNext}
                            style={{ padding: '12px 32px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            {currentStep === 3 ? 'Launch Campaign' : 'Next Step'} <ChevronRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CreateCampaignWizard;
