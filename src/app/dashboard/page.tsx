'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {
    AppProvider,
    type Session,
    type Navigation,
} from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { useSession } from "next-auth/react";
import { signOut as nextAuthSignOut } from "next-auth/react";



const NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }: { pathname: string }) {
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography>Dashboard content for {pathname}</Typography>
        </Box>
    );
}

function CustomAppTitle() {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Link href="/" underline="none" color="inherit">
                <Typography variant="h6" fontWeight="bold">
                    🌟 EduMarket
                </Typography>
            </Link>
        </Stack>
    );
}


interface DemoProps {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
}

export default function DashboardLayoutAccount(props: DemoProps) {
    const { window } = props;
    const { data: sessions, status } = useSession()
    console.log(">>> check data: ", sessions, status)


    const [session, setSession] = React.useState<Session | null>(null);

    // Cập nhật session sau khi load xong và có dữ liệu
    React.useEffect(() => {
        if (status === 'authenticated' && sessions?.user) {
            setSession({
                user: {
                    name: sessions?.user?.name,
                    email: sessions?.user?.email,
                    image: sessions?.user?.image ?? 'https://avatars.githubusercontent.com/u/19550456',
                },
            });
        }
    }, [status, sessions]);

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: sessions?.user?.name.toString(),
                        email: sessions?.user?.email.toString(),
                        image: 'https://avatars.githubusercontent.com/u/19550456',
                    },
                });
            },
            signOut: () => {
                nextAuthSignOut({ callbackUrl: '/' }); // sẽ xóa cookie và chuyển hướng về '/'
            },
        };
    }, []);

    const router = useDemoRouter('/dashboard');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        // Remove this provider when copying and pasting into your project.
        <DemoProvider window={demoWindow}>
            {/* preview-start */}
            <AppProvider
                session={session}
                authentication={authentication}
                navigation={NAVIGATION}
                router={router}
                theme={demoTheme}
                window={demoWindow}
            >
                <DashboardLayout
                    slots={{
                        appTitle: CustomAppTitle,
                    }}
                >
                    <DemoPageContent pathname={router.pathname} />
                </DashboardLayout>
            </AppProvider>
            {/* preview-end */}
        </DemoProvider>
    );
}
