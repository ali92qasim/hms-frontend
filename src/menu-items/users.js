// assets
import { IconShieldHalfFilled, IconUsers, IconUserHeart } from '@tabler/icons-react';

// constant
const icons = {
    IconShieldHalfFilled,
    IconUsers,
    IconUserHeart
};

// ==============================|| USER MENU ITEMS ||============================== //

const users = {
    id: 'group-users',
    title: 'Users',
    icon: icons.IconShieldHalfFilled,
    type: 'group',
    children: [
        {
            id: 'role',
            title: 'Role',
            type: 'collapse',
            icon: icons.IconShieldHalfFilled,
            children: [
                {
                    id: 'role-list',
                    title: 'List',
                    type: 'item',
                    url: 'role/role-list',
                }
            ]
        },
        {
            id: 'user',
            title: 'User',
            type: 'collapse',
            icon: icons.IconUsers,
            children: [
                {
                    id: 'user-list',
                    title: 'List',
                    type: 'item',
                    url: 'user/user-list',
                }
            ]
        },
        {
            id: 'patient',
            title: 'Patient',
            type: 'collapse',
            icon: icons.IconUserHeart,
            children: [
                {
                    id: 'patient-list',
                    title: 'List',
                    type: 'item',
                    url: 'patient/patient-list',
                },
                {
                    id: 'visit-list',
                    title: 'Visit',
                    type: 'item',
                    url: 'visit/visit-list',
                }
            ]
        }
    ]
};

export default users;