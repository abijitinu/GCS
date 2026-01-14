export const users = [
    {
        id: 1,
        name: 'Abijit Gaman',
        role: 'Super Admin',
        email: 'abijit.gaman@pg.com',
        status: 'Active',
        activity: 'Now',
        avatar: null
    },
    {
        id: 2,
        name: 'Sarah Jenkins',
        role: 'Brand Manager',
        email: 'jenkins.s@pg.com',
        status: 'Active',
        activity: '1 hour ago',
        avatar: null,
        authorizedBrands: ['Luvs', 'Pampers', 'Ninjamas', 'Dreft']
    },
    {
        id: 3,
        name: 'Michael Chen',
        role: 'Campaign Manager',
        email: 'chen.m@pg.com',
        status: 'Away',
        activity: '3 days ago',
        avatar: null,
        region: 'Europe'
    },
    {
        id: 4,
        name: 'David Ross',
        role: 'Country Manager',
        email: 'ross.d@pg.com',
        status: 'Inactive',
        activity: '2 weeks ago',
        avatar: null,
        region: 'North America'
    },
    {
        id: 5,
        name: 'Elena Rodriguez',
        role: 'Admin',
        email: 'rodriquez.e@pg.com',
        status: 'Active',
        activity: '5 mins ago',
        avatar: null
    },
    {
        id: 6,
        name: 'James Wilson',
        role: 'Brand Manager',
        email: 'wilson.j@pg.com',
        status: 'Active',
        activity: '2 days ago',
        avatar: null,
        authorizedBrands: ['Tide', 'Ariel', 'Downy', 'Gain']
    }
];

export const roles = [
    'Super Admin',
    'Admin',
    'Brand Manager',
    'Campaign Manager',
    'Country Manager',
    'Viewer'
];
