import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Book, ChevronDown, ChevronUp, Mail } from 'lucide-react';

const Support = () => {
    const faqs = [
        { q: 'How do I request access for a new team member?', a: 'You can invite new members via the IAM & Security tab. Navigate to IAM, click "Invite Member", and enter their P&G email address and assigning a role.' },
        { q: 'Where can I find the brand assets guidelines?', a: 'Brand guidelines are available within each Brand\'s detail page under the "Assets & Guidelines" tab, or in the global Reports center.' },
        { q: 'How is the Engagement Score calculated?', a: 'The Engagement Score is a weighted average of social interactions, click-through rates, and average session duration across all active campaign channels.' },
        { q: 'Can I export raw data for my own analysis?', a: 'Yes, go to the Reports section and select "Generate Report". You can choose CSV format to export raw data points for external analysis.' }
    ];

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Support Center</h1>
                <p style={{ color: '#64748B' }}>Get help with the Global Campaign System.</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <HelpCircle color="var(--color-primary)" /> Frequently Asked Questions
                    </h2>

                    <div className="card-flow" style={{ padding: '0', overflow: 'hidden' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                                <button
                                    onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                                    style={{
                                        width: '100%',
                                        padding: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    <span style={{ fontWeight: '600', color: '#1E293B', fontSize: '16px' }}>{faq.q}</span>
                                    {openIndex === i ? <ChevronUp size={20} color="#64748B" /> : <ChevronDown size={20} color="#64748B" />}
                                </button>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ padding: '0 24px 24px 24px', color: '#475569', lineHeight: '1.6' }}
                                    >
                                        {faq.a}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Contact & Resources */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1E293B' }}>Contact Support</h2>

                    <div className="card-flow" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#003DA5', height: 'fit-content' }}>
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>Submit a Ticket</h3>
                                <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '12px' }}>For technical issues or bug reports.</p>
                                <button style={{ color: '#003DA5', fontWeight: '600', fontSize: '14px', border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>Open Ticket &rarr;</button>
                            </div>
                        </div>

                        <div style={{ height: '1px', backgroundColor: '#F1F5F9' }}></div>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#F0FDF4', color: '#16A34A', height: 'fit-content' }}>
                                <Book size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>Documentation</h3>
                                <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '12px' }}>Detailed guides on GCS features.</p>
                                <button style={{ color: '#16A34A', fontWeight: '600', fontSize: '14px', border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>View Docs &rarr;</button>
                            </div>
                        </div>

                        <div style={{ height: '1px', backgroundColor: '#F1F5F9' }}></div>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#FEF3C7', color: '#D97706', height: 'fit-content' }}>
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>Email Support</h3>
                                <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '12px' }}>Direct line to the support team.</p>
                                <a href="mailto:support@gcs.pg.com" style={{ color: '#D97706', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>support@gcs.pg.com</a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Support;
