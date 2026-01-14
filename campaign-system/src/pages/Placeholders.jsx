import React from 'react';

const PlaceholderPage = ({ title }) => (
    <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', color: 'var(--color-primary)', marginBottom: '16px' }}>{title}</h1>
        <p style={{ color: 'var(--color-text-light)' }}>This module is currently under development.</p>
    </div>
);

export const Campaigns = () => <PlaceholderPage title="Campaign Management" />;
export const Brands = () => <PlaceholderPage title="Brand Portfolio" />;
export const Analytics = () => <PlaceholderPage title="Detailed Analytics" />;
export const Reports = () => <PlaceholderPage title="Reports Generation" />;
export const IAM = () => <PlaceholderPage title="Identity Access Management" />;
export const Support = () => <PlaceholderPage title="Support & Helpdesk" />;
